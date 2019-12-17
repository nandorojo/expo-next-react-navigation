import React, { useMemo } from 'react'
import NextLink from 'next/link'
import empty from '../../utils/empty'
import { LinkProps } from './types'

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
    <NextLink passHref {...nextLinkProps} href={href} as={props.web.as}>
      <a>{props.children}</a>
    </NextLink>
  )
}
