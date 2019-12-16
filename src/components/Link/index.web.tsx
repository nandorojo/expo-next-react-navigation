import React, { useMemo } from 'react'
import NextLink from 'next/link'
import empty from '../../utils/empty'
import { LinkProps } from './types'

export default function Link(props: LinkProps) {
  const { nextLinkProps = empty.object } = props
  const query = useMemo(() => ({ ...(props.params || empty.object) }), [
    props.params,
  ])
  const href = useMemo(
    () => ({
      query,
      pathname: `/${props.web.path ?? props.routeName}`,
    }),
    [props.web.path, props.routeName, query]
  )
  return (
    <NextLink passHref {...nextLinkProps} href={href} as={props.web.as}>
      <a>{props.children}</a>
    </NextLink>
  )
}
