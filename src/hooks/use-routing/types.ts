export type Route<
	/**
	 * Route string path
	 */
	R extends string
> = {
	routeName: R
	params?: object
}

type GenericRoute = {
	routeName: string
	params?: object
	web?: {
		path?: string
		as?: string
	}
}

export type NavigateTo = GenericRoute

export type Params<P> = { params: P }

export type WebRoute<
	Path extends string | undefined = '',
	As extends string = ''
> = {
	web: {
		path?: Path
		as?: As
	}
}

// export type NavigateTo<R extends string, P, Web> = Route<R> &
// 	P extends undefined
// 	? {}
// 	: Params<P> & Web extends undefined
// 	? {}
// 	: WebRoute<Web>

export type NavigateFunction<NavigateTo> = (route: NavigateTo) => void
export type PushFunction<NavigateTo> = (route: NavigateTo) => void
export type GetParam<Param extends unknown = undefined> = (
	param: string
) => Param

export type ReturnNav = {
	navigate: NavigateFunction<GenericRoute>
	push: PushFunction<GenericRoute>
	getParam: GetParam
}
