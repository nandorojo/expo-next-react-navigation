import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { Link, useRouting } from 'expo-next-react-navigation'

// See the pages/folder for the next.js routes
// everything else is confined in this file :)

export function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen 🥳</Text>
      <Link style={{ color: 'green', fontSize: 20 }} routeName="Profile">
        Click me to open profile :)
      </Link>
    </View>
  )
}

export function Profile() {
  const { goBack } = useRouting()

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile! 🏋️‍♀️</Text>
      <Button text="👈 Go back" onPress={() => goBack()} />
    </View>
  )
}

const AppNavigator = createStackNavigator({
  '/': Home,
  Profile,
})

export default createAppContainer(AppNavigator)

/**
 *
 *
 *
 *
 *
 *
 * styles, button, etc
 */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    margin: 20,
  },
})

function Button({ text, onPress }: { text: string; onPress?: () => void }) {
  return (
    <Text
      style={{
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: 'black',
        color: 'white',
        margin: 20,
      }}
      onPress={onPress}
    >
      {text}
    </Text>
  )
}
