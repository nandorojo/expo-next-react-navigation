import * as React from 'react'
import { Text } from 'react-native'
import NextLink from 'next/link'
import { LinkMaker, LinkProps } from 'expo-navigation-core'

type NextProps = {
  nextLinkProps?: React.ComponentPropsWithoutRef<typeof NextLink>
}
type Web = {
  /**
   * Alternative path to override routeName on web.
   */
  path?: string
  /**
   * A custom URL ending to show in the browser address bar instead of the `web.path` or `routeName`.
   *
   * Should start with `/`.
   */
  as?: string
}

const Link = React.forwardRef<Text, LinkProps<NextProps, Web>>((props, ref) => {
  const L = LinkMaker<NextProps, Web>()
  return <L {...props} ref={ref} />
})

export default Link
