import React, { useCallback } from 'react'
import { LinkProps } from './types'
import { TouchableOpacity, Text, TextStyle } from 'react-native'
import useRouting from '../../hooks/use-routing'
import empty from '../../utils/empty'

/**
 * Link component for react-navigation and nextjs.
 *
 * @param props
 *  - routeName: string
 *  - params?: object
 *  - web?: `{ path?: string; as?: string }`
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
 ...
 * +<Link routeName="home">
 * +  Press me!
 * +</Link>
 *```
 *
 */
export default function Link(props: LinkProps) {
  const { navigate } = useRouting()
  const {
    children,
    nextLinkProps,
    touchableOpacityProps = empty.object,
    style,
    ...navigation
  } = props
  const nav = useCallback(() => navigate(navigation), [navigate, navigation])

  return (
    <TouchableOpacity {...touchableOpacityProps} onPress={nav}>
      <Text style={style as TextStyle} accessibilityRole="link">{children}</Text>
    </TouchableOpacity>
  )
}
