// Thanks to Roman Tymchyk. https://medium.com/swlh/snackbars-in-react-an-exercise-in-hooks-and-context-299b43fd2a2b
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import { Animated, StatusBar, Text, View } from 'react-native'

interface ISnackBarProvider {
  children: React.ReactNode
}

interface ISnackBarContext {
  addAlert: (content: any) => void
}

type MessageProps = {
  message: string
  onHide: () => void
}

const contextInitialState: ISnackBarContext = {} as any
const SnackBarContext = createContext<ISnackBarContext>(contextInitialState)

const Message = (props: MessageProps): JSX.Element => {
  const currentStatusBarHeight = StatusBar.currentHeight as number
  const opacity = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }),
      Animated.delay(2000),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true
      })
    ]).start(() => {
      props.onHide()
    })
  }, [])

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          width: '100%',
          opacity,
          transform: [
            {
              translateY: opacity.interpolate({
                inputRange: [0, 1],
                outputRange: [-20, 0]
              })
            }
          ],
          marginBottom: 5,
          backgroundColor: 'white',
          padding: 10,
          borderRadius: 4,
          shadowColor: 'black',
          shadowOffset: {
            width: 0,
            height: 3
          },
          shadowOpacity: 0.15,
          shadowRadius: 5,
          elevation: 6,
          paddingTop: currentStatusBarHeight + 10
        }
      ]}
    >
      <Text>{props.message}</Text>
    </Animated.View>
  )
}

export function SnackBarProvider ({ children }: ISnackBarProvider): JSX.Element {
  const [messages, setMessages] = useState<string[]>([])

  const onHide = (message: string): void => {
    setMessages((oldAlert) =>
      oldAlert.filter((currentMessage) => currentMessage !== message)
    )
  }

  const addAlert = useCallback((content) => {
    setTimeout(() => {
      setMessages((oldMessages) => [content, ...oldMessages])
    }, 400)
  }, [])

  const value = { addAlert }

  return (
    <SnackBarContext.Provider value={value}>
      {children}
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0
        }}
      >
        {messages.map((message, index) => (
          <Message
            key={`${message}-${index}`}
            message={message.length === 0 ? 'beijos' : message}
            onHide={() => onHide(message)}
          />
        ))}
      </View>
    </SnackBarContext.Provider>
  )
}

export function useSnackBars (): ISnackBarContext {
  const context = useContext(SnackBarContext)

  return context
}
