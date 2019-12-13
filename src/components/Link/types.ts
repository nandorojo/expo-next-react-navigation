import { NavigateTo } from '../../hooks/use-routing/types'
import { ComponentPropsWithoutRef } from 'react'
import Link from 'next/link'

export type LinkProps<To extends NavigateTo = NavigateTo> = To & {
	children: React.ReactNode
	nextLinkProps?: ComponentPropsWithoutRef<typeof Link>
}
