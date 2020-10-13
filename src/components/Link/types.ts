// import { NavigateTo } from '../../hooks/use-routing/types'
// import { ComponentPropsWithoutRef, CSSProperties } from 'react'
import Link from 'next/link'
// import { TouchableOpacity, TextStyle, ViewStyle } from 'react-native'

// export type LinkProps<To extends NavigateTo = NavigateTo> = To & {
//   /**
//    * Required: child component/text
//    */
//   children: React.ReactNode
//   /**
//    * Optional: props passed to next/router Link Component.
//    */
//   nextLinkProps?: ComponentPropsWithoutRef<typeof Link>
//   /**
//    * Optional: props passed to TouchableOpacity component on native.
//    */
//   touchableOpacityProps?: ComponentPropsWithoutRef<typeof TouchableOpacity>
//   style?: TextStyle | ViewStyle
// }

export type NextProps = {
  nextLinkProps?: React.ComponentPropsWithoutRef<typeof Link>
}
export type Web = {
  /**
   * Alternative path to override routeName on web.
   */
  path?: string
  /**
   * A custom URL ending to show in the browser address bar instead of the `web.path` or `routeName`.
   *
   * Should start with `/`.
   */
  as?: string
  /**
   * Prefetch the page in the background. Defaults to `true`
   */
  prefetch?: boolean
  /**
   * Scroll to the top of the page after a navigation. Defaults to `true`
   *
   */
  scroll?: boolean
  /**
   * Replace the current history state instead of adding a new url into the stack. Defaults to `false`
   */
  replace?: boolean
  /**
   * Update the path of the current page without rerunning getStaticProps, getServerSideProps or getInitialProps. Defaults to false
   */
  shallow?: boolean
}
