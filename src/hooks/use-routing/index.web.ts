import { useCallback } from 'react'
import _ from 'lodash'
import Router, { useRouter } from 'next/router'
import { NavigateTo } from './types'
import empty from '../../utils/empty'

const goBack = () => Router.back()

export default function useRouting() {
  const router = useRouter()

  const getParam = <Param>(
    param: Parameters<typeof _.get>['1'],
    fallback?: unknown
  ): Param | undefined => {
    if (!router) {
      return undefined
    }

    const val: Param = _.get(router.query, param) ?? fallback
    if (val === undefined) {
      console.warn('Tried to get param', param, 'but it does not exist')
    }
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
  }
}
