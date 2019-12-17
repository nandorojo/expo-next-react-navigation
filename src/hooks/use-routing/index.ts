import { useNavigation } from 'react-navigation-hooks'
import { useCallback } from 'react'
import { NavigateTo } from './types'

export default function useRouting() {
  const {
    navigate: nav,
    getParam: grabParam,
    push: pushTo,
    goBack,
  } = useNavigation()

  const navigate = useCallback(
    <To extends NavigateTo = NavigateTo>(route: To) => {
      nav({
        routeName: route.routeName,
        params: route.params,
      })
    },
    [nav]
  )
  const push = useCallback(
    (route: NavigateTo) => {
      pushTo(route)
    },
    [pushTo]
  )
  const getParam = <Param>(param: string, fallback?: unknown): Param => {
    const value: Param = grabParam(param, fallback)
    return value
  }

  return { navigate, getParam, push, goBack: () => goBack() }
}
