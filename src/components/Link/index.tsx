import * as React from 'react'
import { Text } from 'react-native'
import NextLink from 'next/link'
import { LinkMaker, LinkProps } from 'expo-navigation-core'
import { NextProps, Web } from './types'

const Link = React.forwardRef<Text, LinkProps<NextProps, Web>>(function Link(
  props,
  ref
) {
  const L = LinkMaker<NextProps, Web>() // we have to do this to be able to forward refs 🙃
  return <L {...props} ref={ref} />
})

export default Link
