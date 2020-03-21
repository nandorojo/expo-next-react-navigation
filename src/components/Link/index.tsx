import React, { useCallback, RefObject, ClassAttributes } from 'react'
import { LinkProps } from './types'
import { TouchableOpacity, Text } from 'react-native'
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
const Link = React.forwardRef(
  (props: LinkProps, ref?: ClassAttributes<Text>['ref']) => {
    const { navigate } = useRouting()
    const {
      children,
      nextLinkProps,
      touchableOpacityProps = empty.object,
      style,
      isText = true,
      ...navigation
    } = props
    const nav = useCallback(
      () => navigate({ ...navigation, routeName: navigation.routeName || '/' }),
      [navigate, navigation]
    )
    const renderTextOrChildren = () => {
      if (isText) {
        return (
          <Text ref={ref} accessibilityRole="link" style={style}>
            {children}
          </Text>
        )
      }
      return children
    }

    return (
      <TouchableOpacity {...touchableOpacityProps} onPress={nav}>
        {renderTextOrChildren()}
      </TouchableOpacity>
    )
  }
)

export default Link
