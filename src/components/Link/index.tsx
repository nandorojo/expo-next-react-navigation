import React, { useCallback } from 'react'
import { LinkProps } from './types'
import { TouchableOpacity, Text } from 'react-native'
import useRouting from '../../hooks/use-routing'

/**
 * Link component for react-navigation and nextjs.
 *
 * @param props
 *  - routeName: string
 *  - params?: object
 *  - web: `{ path?: string; as?: string }`
 *
 * ## Usage
 *
 * ```diff
 * -import { TouchableOpacity } from 'react-native'
 * -...
 * -<TouchableOpacity onPress={() => navigate({ routeName: 'home' })}>
 * -  Press me!
 * - </TouchableOpacity>
 *
 * +import { Link } from 'expo-next-react-navigation'
 * + ...
 * +<Link routeName="Link">
 * +  Press me!
 * +</Link>
 *```
 *
 */
export default function Link(props: LinkProps) {
  const { navigate } = useRouting()
  const { children, ...navigation } = props
  const nav = useCallback(() => navigate(navigation), [navigate, navigation])

  return (
    <TouchableOpacity onPress={nav}>
      <Text>{children}</Text>
    </TouchableOpacity>
  )
}
