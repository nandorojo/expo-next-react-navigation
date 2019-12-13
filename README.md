# Next.js + React Navigation 🥳

_still need help testing!_

This library was inspired by 1) the awesome integration between `expo`/`next-js` and 2) the challenges of managing navigation across a native and web project.

The idea here is to copy the `react-navigation` api that you're already using with an Expo app, and make it work with `next/router`.

The only thing you'll need to "change" about your workflow from a pure RN project is setting up a `pages/` folder with files that match your react-navigation routes.

## Installation

```
npm i expo-next-react-navigation

// or

yarn add expo-next-react-navigation
```

## Set up

**1. Install next with expo:** Follow [@evanbacon](https://github.com/EvanBacon)'s guide on the [Expo docs](https://docs.expo.io/versions/latest/guides/using-nextjs/). Become familiar with next's general architecture with expo before continuting.

**2. Edit/create next.config.js**

First, install these dependencies:

```
yarn add next-compose-plugins next-fonts next-images next-transpile-modules
```

Next, edit `next.config.js` to look something like this:

```es6
const { withExpo } = require('@expo/next-adapter')
const withFonts = require('next-fonts')
const withImages = require('next-images')
const withTM = require('next-transpile-modules')
const withPlugins = require('next-compose-plugins')

module.exports = withPlugins(
	[
		[
			withTM,
			{
				transpileModules: ['expo-next-react-navigation'],
			},
		],
		withFonts,
		withImages,
		[withExpo, { projectRoot: __dirname }],
	],
	{
		// ...
	}
)
```

_You can add other packages that need transpiling to the `transpileModules` array. See [this post](https://forums.expo.io/t/next-js-expo-web-syntaxerror-unexpected-token-export-with-npm-module/31127) for details._

## Table of contents

-   Hooks
    -   `useRouting`
    -   `useFocusEffect`
-   Components
    -   `Link`

## `useRouting`

React hook that wraps `useNavigation` (from react-navigation) hook and `useRouter` (from next-router).

It follows the [same API](https://reactnavigation.org/docs/en/next/use-navigation.html) as `useNavigation`.

### Dynamic routing

```
import { useRouting } from 'expo-next-react-navigation`

export default () => {
  const { navigation, push, getParam, goBack } = useRouting()

  // ...
}
```

#### `navigate`

Only argument is a dictionary with these values

-   `routeName`: string, required
-   `params`: optional dictionary
-   `webRoute`: custom `routeName` that only gets used on web.

**Example:** Navigate to a user

```
export default function Home() {
  const { navigate } = useRouting()

  // goes to yourdomain.com/user?id=chris
  const onPress = () => navigate({ routeName: 'user', params: { id: 'chris' } })

  // goes to `yourdomain.com/user/chris`
  const navigateCleanLink = () => navigate({ routeName: 'user', params: { id: 'chris' }, webRoute: `user/chris` })
}

  // goes to `yourdomain.com/user/chris?color=blue`
  const navigateCleanLinkWithParam = () => navigate({ routeName: 'user', params: { id: 'chris', color: 'blue' }, webRoute: `user/chris` })
}
```

This follows the next pattern of [dynamic routing](https://nextjs.org/learn/basics/clean-urls-with-dynamic-routing). You'll need to create a `pages/user/[id].tsx` file.

**Thoughts on the `webRoute` field:**

`webRoute` can provide cleaner urls (`user/mike` instead of `user?id=mike`).

Alos, navigation patterns on mobile can be different than web. For instance, if one tab has a stack navigator of an inbox and a chat room, and you navigate to that tab when a chat room is open, you might not want it to pop back to the inbox screen until you tap that tab twice. On web, however, the pattern might favor going back to the inbox every time you click the inbox item from the header at the top.

I've also considered letting the `webRoute` field take a dynamic field like this `route/:param`:

```
  // goes to `yourdomain.com/user/chris`
  const navigateCleanLink = () => navigate({ routeName: 'user', params: { id: 'chris' }, webRoute: `user/:id` })

  // goes to yourdomain.com/user?id=chris
  const onPress = () => navigate({ routeName: 'user', params: { id: 'chris' } })
```

But that's not added yet.

#### `getParam`

Same API as `getParam` from react-navigation.

Similar to `query` from `next/router`, except that it's a function to grab the values.

**pages/user/[id].tsx**

Imagine you navigated to `yourdomain.com/user/chris` on web using the example above.

```es6
export default function User() {
	const { getParam } = useRouting()

	const id = getParam('id') // chris

	// do something with the id
}
```

## `useFocusEffect`

See [react navigation docs](https://reactnavigation.org/docs/en/next/use-focus-effect.html#docsNav). On web, it simply replaces the focus effect with a normal effect hook.

Make sure to use `useCallback` for the function you pass it, as seen in the example.

```es6
import { useFocusEffect } from 'expo-next-react-navigation'

export default ({ userId }) => {
	useFocusEffect(
		useCallback(() => {
			const unsubscribe = API.subscribe(userId, user => setUser(user))

			return () => unsubscribe()
		}, [userId])
	)

	return <Profile userId={userId} />
}
```
