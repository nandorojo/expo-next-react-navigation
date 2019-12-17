import React, { useMemo, CSSProperties } from 'react'
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
 * +<Link routeName="Link">
 * +  Press me!
 * +</Link>
 *```
 *
 */
export default function Link(props: LinkProps) {
  const { nextLinkProps = empty.object } = props
  const query = useMemo(() => ({ ...(props.params || empty.object) }), [
    props.params,
  ])
  const pathname = `/${props.web?.path ?? props.routeName}`
  const href = useMemo(
    () => ({
      query,
      pathname,
    }),
    [pathname, query]
  )
  return (
    <NextLink passHref {...nextLinkProps} href={href} as={props.web?.as}>
      <a
        style={{
          font: 'inherit',
          ...((props.style as CSSProperties) || empty.object),
        }}
      >
        {props.children}
      </a>
    </NextLink>
  )
}
