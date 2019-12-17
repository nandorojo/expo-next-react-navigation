import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { Link, useRouting } from 'expo-next-react-navigation'

export function Home() {
  return (
    <View style={styles.container}>
      <Text>Home Screen 🥳</Text>
      <Link routeName="Profile">Click me to open profile :)</Link>
    </View>
  )
}

export function Profile() {
  const { navigate } = useRouting()

  return (
    <View style={styles.container}>
      <Text>Profile! 🏋️‍♀️</Text>
      <Button
        text="👈 Go back"
        onPress={() => navigate({ routeName: 'Home' })}
      />
    </View>
  )
}

const AppNavigator = createStackNavigator({
  Home,
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
    backgroundColor: 'lightblue',
  },
})

function Button({ text, onPress }: { text: string; onPress?: () => void }) {
  return (
    <Text
      style={{
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: 'purple',
        color: 'white',
        margin: 20,
      }}
      onPress={onPress}
    >
      {text}
    </Text>
  )
}
