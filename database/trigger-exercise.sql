
/*SQL para a criação da tabela de usuários*/
CREATE TABLE usuario (
id integer NOT NULL PRIMARY KEY,
nm_login character varying,
ds_senha character varying,
fg_bloqueado boolean,
nu_tentativa_login integer
);

/* Queremos, toda vez que um usuário for excluído, guardar as suas informações em uma tabela reserva.*/

/*SQL para a criação da tabela de backup*/
CREATE TABLE bkp_usuario (
id integer NOT NULL,
nm_login character varying,
ds_senha character varying,
fg_bloqueado boolean,
nu_tentativa_login integer,
data_exclusao timestamp,
CONSTRAINT pk_bkp_usuario PRIMARY KEY (id)
);

/*Inserção de dados na tabela usuários*/
INSERT INTO usuario VALUES
 (1, 'hallan', 'hallan2011', false, 0),
 (2, 'maria', 'abcd1234', false, 2),
 (3, 'joao', '123456', false, 0);
 
/*O próximo passo então é criar a função que será disparada toda vez que um usuário for excluído.*/
CREATE OR REPLACE FUNCTION backup_usuario()
RETURNS TRIGGER AS
$$
  BEGIN
    INSERT INTO bkp_usuario (id, nm_login, ds_senha, fg_bloqueado, nu_tentativa_login, data_exclusao) VALUES
      (OLD.id, OLD.nm_login, OLD.ds_senha, OLD.fg_bloqueado, OLD.nu_tentativa_login, NOW() );
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql;
    
/*s criar o gatilho que fará ela ser disparada toda vez que ocorrer um comando
de DELETE na tabela de usuários.*/
CREATE TRIGGER trigger_usuario AFTER DELETE
ON usuario FOR EACH ROW
   EXECUTE PROCEDURE backup_usuario();

/*Nosso gatilho será disparado sempre depois de um comando de exclusão (AFTER DELETE) na tabela de
usuário, e para cada linha (FOR EACH ROW) executa a função (EXECUTE PROCEDURE)
backup_usuario*/
DELETE FROM usuario WHERE id = 2;

SELECT * FROM usuario;

SELECT * FROM bkp_usuario;

-------AUDITORIA----
CREATE TABLE usuario_auditoria (
    id integer NOT NULL,
    data_alteracao timestamp,
    operacao_realizada CHARACTER VARYING
);

CREATE OR REPLACE FUNCTION usuario_log()
RETURNS trigger AS 
$$
   BEGIN
     -- Aqui temos um bloco IF que confirmará o tipo de operação.
     IF (TG_OP = 'INSERT') THEN
           INSERT INTO usuario_auditoria (id, data_alteracao, operacao_realizada) VALUES 
               (NEW.id, current_timestamp, ' Operação de inserção. A linha de código ' || NEW.id || ' foi inserido');
           RETURN NEW;
     -- Aqui temos um bloco IF que confirmará o tipo de operação UPDATE.
     ELSIF (TG_OP = 'UPDATE') THEN
           INSERT INTO usuario_auditoria (id, data_alteracao, operacao_realizada) VALUES
               (NEW.id, current_timestamp, 'Operação de UPDATE. A linha de código ' || NEW.id || ' teve os valores atualizados ' || OLD || ' com ' || NEW.* || '.');
           RETURN NEW;
     -- Aqui temos um bloco IF que confirmará o tipo de operação DELETE
     ELSIF (TG_OP = 'DELETE') THEN
           INSERT INTO usuario_auditoria (id, data_alteracao, operacao_realizada) VALUES 
                (OLD.id, current_timestamp, 'Operação DELETE. A linha de código ' || OLD.id || ' foi excluída ');
           RETURN OLD;
     END IF;
     RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_log_todas_as_operacoes
AFTER INSERT OR UPDATE OR DELETE ON usuario FOR EACH ROW
    EXECUTE PROCEDURE usuario_log();
    
INSERT INTO usuario VALUES
 (4, 'joaquim', 'quim2011', false, 0);    
 
SELECT * FROM usuario_auditoria;

INSERT INTO usuario VALUES
 (5, 'pedro', 'x4bds', false, 1),
 (6, 'mateus', 'max78', false, 0);    
 
UPDATE usuario set nm_login = 'patricia' WHERE id = 6; 

DELETE FROM usuario WHERE id = 6;

CREATE OR REPLACE FUNCTION valida_senha()
RETURNS TRIGGER AS
$$
	BEGIN
  	IF LENGTH(NEW.ds_senha) < 6 THEN
    	RAISE EXCEPTION 'Senha deve ter mais de 6 caracteres.';
    END IF;
    
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql;

DROP TRIGGER trigger_validar_senha_antes_de_registrar ON usuario;

CREATE TRIGGER trigger_validar_senha_antes_de_registrar
BEFORE INSERT OR UPDATE ON usuario FOR EACH ROW
    EXECUTE PROCEDURE valida_senha();
    
INSERT INTO usuario VALUES
 (7, 'lucas', '123456', false, 0);  
 DELETE FROM usuario WHERE id = 7;

 SELECT * FROM usuario;
