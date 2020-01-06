import React, { useMemo } from 'react'
import { Text } from 'react-native'
import NextLink from 'next/link'
import empty from '../../utils/empty'
import { LinkProps } from './types'

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
 * +<Link routeName="home">
 * +  Press me!
 * +</Link>
 *```
 *
 */
export default function Link(props: LinkProps) {
  const {
    nextLinkProps = empty.object,
    style = empty.object,
    params = empty.object,
    children,
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
  return (
    <NextLink passHref {...nextLinkProps} href={href} as={props.web?.as}>
      <Text
        accessibilityRole="link"
        style={style}
      >
        {children}
      </Text>
    </NextLink>
  )
}
