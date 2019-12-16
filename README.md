# Next.js + React Navigation 🥳

_still need help testing!_

This library was inspired by 1) the awesome integration between `expo`/`next-js` and 2) the challenges of managing navigation across a native and web project.

The idea here is to copy the `react-navigation` api that you're already using with an Expo app, and make it work with `next/router`.

The only thing you'll need to "change" about your workflow from a pure RN project is setting up a `pages/` folder with files that match your react-navigation routes.

## Usage

Replace the following instances in your code after installation and setup:

```diff
-import { useNavigation } from 'react-navigation-hooks'
+import { useRouting } from 'expo-next-react-navigation'
```

```diff
-import { useLayoutEffect } from 'react-navigation-hooks'
+import { useLayoutEffect } from 'expo-next-react-navigation'
```

```diff
-import { TouchableOpacity } from 'react-native'
+import { Link } from 'expo-next-react-navigation'

-<TouchableOpacity onPress={() => navigate({ routeName: 'chat' })}>
-  <Text>Go</Text>
- </TouchableOpacity>
+<Link routeName="chat" params={{ roomId: 'hey!' }}>
+  <Text>Go</Text>
+</Link>
```

## Installation

```es6
yarn add expo-next-react-navigation
```

or

```es6
npm i expo-next-react-navigation
```

## Set up

**1. Install next with expo:** Follow [@evanbacon](https://github.com/EvanBacon)'s guide on the [Expo docs](https://docs.expo.io/versions/latest/guides/using-nextjs/). Become familiar with next's general architecture with expo before continuting.

**2. Edit/create next.config.js**

First, install these dependencies:

```bash
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

- Hooks
  - `useRouting`
  - `useFocusEffect`
- Components
  - `Link`

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
  const onPress = () => navigate({ routeName: 'user', params: { id: 'chris' } })

  // goes to `yourdomain.com/user/chris`
  const navigateCleanLink = () =>
    navigate({
      routeName: 'user',
      params: { id: 'chris' },
      web: { as: `/user/chris` },
    })

  // 'profile' path overrides 'user' on web, so it uses the pages/profile.js file
  // shows up as yourdomain.com/@chris
  // ...even though it navigates to yourdomain.com/profile?id=chris?color=blue`
  const navigateCleanLinkWithParam = () =>
    navigate({
      routeName: 'user',
      params: { id: 'chris', color: 'blue' }, // accessed with getParam in the next screen
      web: { as: `/@chris`, path: 'profile' },
    })
}
```

This follows the next pattern of [dynamic routing](https://nextjs.org/learn/basics/clean-urls-with-dynamic-routing). You'll need to create a `pages/user/[id].tsx` file.

**Thoughts on the `web` field:**

`web` can help provide cleaner urls (`user/mike` instead of `user?id=mike`).

Also, navigation patterns on mobile can be different than web.

For instance, imagine you have a tab navigator, and one tab has a nested stack navigator with an inbox screen and a chat room screen. If you navigate from a notifications tab to this tab, and a chat room is already open, you probably want that chat room to stay open on mobile. Only if you press the tab button a second time will it pop back to the inbox screen.

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
    web: { dynamic: `chat/:roomId` },
  })

// goes to yourdomain.com/chat?roomId=chris
const onPress = () =>
  navigate({
    routeName: 'chat',
    params: { roomId: 'chris' },
  })
```

But that's not added yet. For now, the same is achieved by doing this:

```es6
const roomId = 'chris'
const navigateCleanLink = () =>
  navigate({
    routeName: 'chat',
    params: { roomId },
    web: { path: `chat/${roomId}` },
  })
```

#### `getParam`

[Same API](https://reactnavigation.org/docs/en/navigation-prop.html#getparam-get-a-specific-param-value-with-a-fallback) as `getParam` from react-navigation.

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

However, it will use the `pages/room.tsx` file for nextjs. Also, it will show up as `domain.com/messages` in the address bar.

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
      <Text>Chat in room 12</Text>
    </Link>
  )
}
```

**Required props**:

- `routeName`: string, see `useRouting().navigate` docs.

**Optional props**

- `web`: dictionary, see `useRouting().navigate` docs.

- `touchableOpacityProps`: extends React Native's `TouchableOpacity` props.

- `nextLinkProps`: extends `next/router`'s [Link props](https://nextjs.org/docs#with-link).
