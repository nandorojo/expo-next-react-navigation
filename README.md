# Expo + Next.js Router + React Navigation 🥳

A set of hooks that wrap the `react-navigation` API that you're used to, and make it work with `next/router`.

This library helps me use the [Expo + Next.js integration](https://docs.expo.io/versions/latest/guides/using-nextjs/) without stressing about navigation.

_This is a new library, PRs are very welcome!_

## Example

👾 [Github Repo](https://github.com/nandorojo/expo-next-react-navigation/tree/master/examples/next-nav) | 💻 [Website](https://next-nav.fernandorojo.now.sh) | 📱 [Open expo app directly](https://exp.host/@kellycup8/next-nav) | ☎️ [Expo app website](https://expo.io/@kellycup8/next-nav)

## Install

```sh
yarn add expo-next-react-navigation
```

React navigation v4 is supported up to v0.0.25.

**For `react-navigation` v5:**

Version 1.x supports v5.

```sh
yarn add expo-next-react-navigation@v5
```

I'm probably going to stop releasing new versions for `v4`, and `v5` will soon be upgraded to the `latest` tag.

## Table of contents

- [Set up](#set-up)
- [Usage](#usage)
- Hooks
  - [`useRouting`](#userouting)
  - [`useFocusEffect`](#useFocusEffect)
- Components
  - [`Link`](#link)

## Set up

**Step 0. Install next with expo:**

- Init: `expo init` (or `npx create-next-app`)

- Install: `yarn add @expo/next-adapter`

- Install next: `yarn add next`

- Configure: `yarn next-expo`

- Start: `yarn next dev`

_I recommend becoming familiar `next`'s architecture with `expo`. Follow the [Expo docs](https://docs.expo.io/versions/latest/guides/using-nextjs/) or see [this article](https://dev.to/evanbacon/next-js-expo-and-react-native-for-web-3kd9) by Evan Bacon if you're curious._

**Step 1. Edit/create next.config.js**

```bash
yarn add next-compose-plugins next-fonts next-images next-transpile-modules
```

**Step 2: edit `next.config.js` to look something like this:**

```es6
/* eslint-disable @typescript-eslint/no-var-requires */
const { withExpo } = require('@expo/next-adapter')
const withFonts = require('next-fonts')
const withImages = require('next-images')
const withPlugins = require('next-compose-plugins')

const withTM = require('next-transpile-modules')([
  'expo-next-react-navigation',
  // you can add other modules that need traspiling here
])

module.exports = withPlugins(
  [withTM, withFonts, withImages, [withExpo, { projectRoot: __dirname }]],
  {
    // ...
  }
)
```

**All done! Run `yarn next dev` & open [http://localhost:3000](http://localhost:3000)** 👻

- Take a look at the [next tutorial](https://nextjs.org/learn/basics/create-dynamic-pages) for creating pages.

_You can add other packages that need transpiling to the `transpileModules` array. See [this post](https://forums.expo.io/t/next-js-expo-web-syntaxerror-unexpected-token-export-with-npm-module/31127) for details._

## Usage

Replace the following instances in your code after installation and setup:

### `useNavigation` 👉 `useRouting`

```diff
-import { useNavigation } from 'react-navigation-hooks'
+import { useRouting } from 'expo-next-react-navigation'
```

### `useLayoutEffect`

```diff
-import { useLayoutEffect } from 'react-navigation-hooks'
+import { useLayoutEffect } from 'expo-next-react-navigation'
```

### `<TouchableOpacity />` 👉 `<Link />`

```diff
-import { TouchableOpacity } from 'react-native'
+import { Link } from 'expo-next-react-navigation'

-<TouchableOpacity onPress={() => navigate({ routeName: 'chat' })}>
-  <Text>Go</Text>
- </TouchableOpacity>
+<Link routeName="chat" params={{ roomId: 'hey!' }}>
+  Go
+</Link>
```

All set ⚡️

# API

## `useRouting`

React hook that wraps `useNavigation` (from react-navigation) hook and `useRouter` (from next-router).

It follows the [same API](https://reactnavigation.org/docs/en/next/use-navigation.html) as `useNavigation`.

```es6
import { useRouting } from 'expo-next-react-navigation`

export default function App() {
  const { navigate, push, getParam, goBack } = useRouting()


}
```

### `navigate`

Only argument is a dictionary with these values. Unlike `react-navigation`, this doesn't currently support a string as argument.

- `routeName`: string, required
- `params`: optional dictionary
- `web`: Optional dictionary with added values for web, following the API from `next/router`'s `Router.push` [function](https://nextjs.org/docs#with-url-object-1).
  - `path`: (optional) Fulfills the same value as `pathname` from `next/router`, overriding the `routeName` field. If you set this to `/cars`, it will navigate to `/cars` instead of the `routeName` field. As a result, it will load the file located at `pages/cars.js`.
  - `as`: (optional) If set, the browser will show this value in the address bar. Useful if you want to show a pretty/custom URL in the address bar that doesn't match the actual path. Unlike the `path` field, this does not affect which route you actually go to.

**Example:** Navigate to a user

```es6
export default function Home() {
  const { navigate } = useRouting()

  // goes to yourdomain.com/user?id=chris
  const onPress = () =>
    navigate({
      routeName: 'user',
      params: { id: 'chris' },
    })

  // 👇or this👇
  // goes to `yourdomain.com/user/chris`
  const navigateCleanLink = () =>
    navigate({
      routeName: 'user',
      params: { id: 'chris' },
      web: { as: `/user/chris` },
    })

  // 👇or this👇
  // 'profile' path overrides 'user' on web, so it uses the pages/profile.js file
  // even though it navigates to yourdomain.com/profile?id=chris?color=blue`
  // ...it actually shows up as yourdomain.com/@chris in the URL bar.
  const navigateCleanLinkWithParam = () =>
    navigate({
      routeName: 'user',
      params: { id: 'chris', color: 'blue' }, // accessed with getParam in the next screen
      web: { as: `/@chris`, path: 'profile' },
    })
}
```

This follows the next pattern of [dynamic routing](https://nextjs.org/learn/basics/clean-urls-with-dynamic-routing). You'll need to create a `pages/user/[id].js` file.

For more thoughts on how and when you should use the `web` field, see [Web Thoughts](#web-thoughts).

### `getParam`

[Same API](https://reactnavigation.org/docs/en/navigation-prop.html#getparam-get-a-specific-param-value-with-a-fallback) as `getParam` from react-navigation.

Similar to `query` from `next/router`, except that it's a function to grab the values.

**pages/user/[id].js**

Imagine you navigated to `yourdomain.com/user/chris` on web using the example above.

```es6
export default function User() {
  const { getParam } = useRouting()

  const id = getParam('id') // chris

  // do something with the id
}
```

## `useFocusEffect`

See [react navigation docs](https://reactnavigation.org/docs/en/next/use-focus-effect.html#docsNav). On web, it simply replaces the focus effect with a normal effect hook. On mobile, it is the exact react navigation hook.

Make sure to use [useCallback](https://reactjs.org/docs/hooks-reference.html#usecallback) as seen in the example.

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

## `Link`

The following will use the `chat` route in react navigation.

However, it will use the `pages/room.js` file for nextjs. Also, it will show up as `domain.com/messages` in the address bar.

Optionally accepts a `nextLinkProps` prop dictionary and `touchableOpacityProps` dictionary as well.

```es6
export default function Button() {
  return (
    <Link
      routeName="chat"
      params={{ roomId: '12' }}
      web={{
        path: '/room',
        as: 'messages',
      }}
    >
      Chat in room 12
    </Link>
  )
}
```

**Required props**:

- `routeName`: string, see [`useRouting().navigate`](https://github.com/nandorojo/expo-next-react-navigation#navigate) docs.
- `children`: string

**Optional props**

- `web`: dictionary, see [`useRouting().navigate`](#navigate) docs. On `v1.0.5`+, you can also pass the `prefetch`, `replace`, and `scroll` booleans here, from the `next/link` [component](https://nextjs.org/docs/api-reference/next/link).

- `touchableOpacityProps`: extends React Native's `TouchableOpacity` props.

- `nextLinkProps`: extends `next/router`'s [Link props](https://nextjs.org/docs#with-link).
- `isText`: if false, you can set the children to be non-Text nodes. Defaults to `true`. If `true`, the children can be a string **or** a `Text` node.

## Other shout outs

### `nextjs-progressbar`

I think this is an awesome package for adding a loading progress bar to your `next` pages. It's super easy. Check it out.

Link: [https://www.npmjs.com/package/nextjs-progressbar](https://www.npmjs.com/package/nextjs-progressbar)

```es6
yarn add nextjs-progressbar

or

npm i nextjs-progressbar
```

**pages/\_app.js**

```es6
import React from 'react'
import App from 'next/app'
import NextNprogress from 'nextjs-progressbar'

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <>
        <NextNProgress
          color="#29D"
          startPosition="0.3"
          stopDelayMs="200"
          height="3"
        />
        <Component {...pageProps} />
      </>
    )
  }
}

export default MyApp
```

## Web Thoughts

The `web` prop in the `navigate` function and `Link` component can help provide cleaner urls (`user/mike` instead of `user?id=mike`) on web.

Also, navigation patterns on mobile can be different than web, and this field can help you account for those situations.

For instance, imagine you have a tab navigator. Say the first tab has a nested stack navigator with an inbox screen and a chat room screen. If you navigate from a notifications tab to this tab, and a chat room screen was already open, you probably want that chat room to stay open on mobile. Only if you press the tab button a second time should it pop back to the inbox screen.

This may not be the case on `web`. Web navigation patterns on web may lead you to want to open the inbox directly, instead of the open chat screen. This example could look something like this:

```es6
navigate({
  routeName: 'inboxStack',
  web: {
    path: 'inbox',
  },
})
```

I've also considered letting the `web` field take a `dynamic` parameter like this `chat/:roomId`:

```es6
// goes to `yourdomain.com/chat/chris` and still passes `chris` as a `roomId` param
const navigateCleanLink = () =>
  navigate({
    routeName: 'chat',
    params: { roomId: 'chris' },
    web: { dynamic: `chat/[roomId]` },
  })

// goes to yourdomain.com/chat?roomId=chris
const onPress = () =>
  navigate({
    routeName: 'chat',
    params: { roomId: 'chris' },
  })
```

But that's not added. For now, the same is achieved by doing this:

```es6
const roomId = 'chris'

const navigateToChatRoom = () =>
  navigate({
    routeName: 'chat',
    params: { roomId },
    web: { path: `chat/${roomId}` },
  })
```

This would open the `pages/chat/[roomId].js` file, with `roomId` as a param.
