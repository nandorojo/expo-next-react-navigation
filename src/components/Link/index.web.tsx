import React from 'react'
import Link from 'next/link'
import empty from '../../utils/empty'
import { LinkProps } from './types'

export default function Links(props: LinkProps) {
	return (
		<Link
			href={{
				pathname: `/${props.routeName}`,
				query: { ...(props.params || empty.object) },
			}}
			passHref
		>
			{props.children}
		</Link>
	)
}
