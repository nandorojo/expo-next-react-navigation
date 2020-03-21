import { NavigateTo } from '../../hooks/use-routing/types'
import { ComponentPropsWithoutRef, CSSProperties } from 'react'
import Link from 'next/link'
import { TouchableOpacity, TextStyle } from 'react-native'

export type LinkProps<To extends NavigateTo = NavigateTo> = To & {
  /**
   * Required: child component/text
   */
  children: React.ReactNode
  /**
   * Optional: props passed to next/router Link Component.
   */
  nextLinkProps?: ComponentPropsWithoutRef<typeof Link>
  /**
   * Optional: props passed to TouchableOpacity component on native.
   */
  touchableOpacityProps?: ComponentPropsWithoutRef<typeof TouchableOpacity>
  style?: TextStyle
  /**
   * If false, it will not automatically wrap the children with a `Text` node. This is useful if you want to use a link around something other than text.
   *
   * Default: `true`
   */
  isText?: boolean
}
