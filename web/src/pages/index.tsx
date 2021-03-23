import Head from 'next/head'
import styles from '@/styles/guest-home.module.scss'

export default function GuestHome (): JSX.Element {
  return (
    <div className={styles.container}>
      <Head>
        <title>MiniSIGAA</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Mini Academic Management System!</h1>
      </main>
    </div>
  )
}
