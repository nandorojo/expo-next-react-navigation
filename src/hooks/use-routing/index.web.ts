import { useCallback, useEffect, useRef } from 'react'
import get from 'lodash.get'
import Router, { useRouter } from 'next/router'
import { NavigateTo } from './types'
import empty from '../../utils/empty'
import {
  DefaultRouteProp,
  DefaultNavigationProp,
} from 'expo-navigation-core/build/hooks/use-routing/types'

const goBack = () => Router.back()
const popToTop = () => {}
const setParams = <R = {}>(a: R) => {}

export default function useRouting<
  RProp extends DefaultRouteProp = DefaultRouteProp,
  NProp extends DefaultNavigationProp = DefaultNavigationProp
>() {
  const router = useRouter()

  // implement a pseudo "can go back" by tracking if we've navigated
  // TODO add it to a global provider to share it everywhere.
  const hasNavigated = useRef(false)
  const canGoBack = useRef(() => {
    return hasNavigated.current
  }).current

  useEffect(() => {
    const onRouteChange = () => {
      hasNavigated.current = true
    }
    Router.events.on('routeChangeComplete', onRouteChange)
    return () => {
      Router.events.off('routeChangeComplete', onRouteChange)
    }
  }, [])

  const getParam = <Param>(
    param: Parameters<typeof get>['1'],
    fallback?: unknown
  ): Param | undefined => {
    if (!router) {
      return undefined
    }

    const val: Param = get(router.query, param) ?? fallback
    // if (val === undefined) {
    //   console.warn('Tried to get param', param, 'but it does not exist')
    // }
    return val
  }

  const navigate = useCallback(
    <To extends NavigateTo = NavigateTo>({
      routeName,
      web,
      params = empty.object,
    }: To) => {
      const webPath = web?.path?.[0] === '/' ? web?.path?.slice(1) : web?.path
      const pathname = `/${webPath ?? routeName}`

      Router.push(
        {
          pathname,
          query: { ...params },
        },
        web?.as,
        {
          shallow: web?.shallow,
        }
      )
    },
    []
  )
  const replace = useCallback(
    <To extends NavigateTo = NavigateTo>({
      routeName,
      web,
      params = empty.object,
    }: To) => {
      const webPath = web?.path?.[0] === '/' ? web?.path?.slice(1) : web?.path
      const pathname = `/${webPath ?? routeName}`

      Router.replace(
        {
          pathname,
          query: { ...params },
        },
        web?.as
      )
    },
    []
  )

  return {
    getParam,
    navigate,
    push: navigate,
    goBack,
    popToTop,
    prefetch: router?.prefetch,
    replace,
    setParams,
    canGoBack,
    pathname: router?.pathname,
  }
}
