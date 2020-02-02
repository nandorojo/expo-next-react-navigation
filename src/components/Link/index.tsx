import * as React from 'react'
import { Text } from 'react-native'
import { Link as NextLink } from 'next/router'
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

export default React.forwardRef<Text, LinkProps<NextProps, Web>>(function Link(
  props,
  ref
) {
  const L = LinkMaker<NextProps, Web>()
  return <L {...props} ref={ref} />
})
