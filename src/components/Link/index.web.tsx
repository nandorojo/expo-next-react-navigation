import React, { useMemo, ClassAttributes } from 'react'
import { Text } from 'react-native'
import NextLink from 'next/link'
import empty from '../../utils/empty'
import { LinkProps } from './types'

/**
 * Link component for react-navigation and nextjs.
 *
 * @param props
 * @param props.routeName: `string`
 * @param props.params?: `object`
 * @param props.web?: `{ path?: string; as?: string }`
 * @param props.isText?: `boolean`
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
 * +<Link routeName="home">
 * +  Press me!
 * +</Link>
 *```
 *
 */
const Link = React.forwardRef(
  (props: LinkProps, ref?: ClassAttributes<Text>['ref']) => {
    const {
      nextLinkProps = empty.object,
      style = empty.object,
      params = empty.object,
      children,
      isText = true,
    } = props
    const query = useMemo(() => ({ ...params }), [params])
    const webPath =
      props.web?.path?.[0] === '/' ? props.web?.path?.slice(1) : props.web?.path
    const pathname = `/${webPath ?? props.routeName}`

    const href = useMemo(
      () => ({
        query,
        pathname,
      }),
      [pathname, query]
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
      <NextLink passHref {...nextLinkProps} href={href} as={props.web?.as}>
        {renderTextOrChildren()}
      </NextLink>
    )
  }
)

export default Link
