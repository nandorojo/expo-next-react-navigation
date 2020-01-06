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
}
