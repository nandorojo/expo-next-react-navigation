import { useCallback } from 'react'
import _ from 'lodash'
import Router, { useRouter } from 'next/router'
import { NavigateTo } from './types'
import empty from '../../utils/empty'

const goBack = () => Router.back()

export default function useRouting() {
	const { query } = useRouter()

	const getParam = <Param>(
		param: Parameters<typeof _.get>['1'],
		fallback?: string
	): Param => {
		const val: Param = _.get(query, param, fallback)
		if (val === undefined) {
			console.warn('Tried to get param', param, 'but it does not exist')
		}
		return val
	}

	const navigate = useCallback(
		<To extends NavigateTo = NavigateTo>(route: To) => {
			Router.push(`/${route.webRoute ?? route.routeName}`, {
				query: { ...(route.params ?? empty.object) },
			})
		},
		[]
	)

	return {
		getParam,
		navigate,
		push: navigate,
		goBack,
	}
}
