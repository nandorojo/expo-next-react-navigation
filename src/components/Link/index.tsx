import React, { useCallback } from 'react'
import { LinkProps } from './types'
import { TouchableOpacity } from 'react-native'
import useRouting from '../../hooks/use-routing'

export default function Link(props: LinkProps) {
	const { navigate } = useRouting()
	const { children, ...navigation } = props
	const nav = useCallback(() => navigate(navigation), [navigate, navigation])

	return <TouchableOpacity onPress={nav}>{children}</TouchableOpacity>
}
