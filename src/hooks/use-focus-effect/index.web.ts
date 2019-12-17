import { useEffect } from 'react'

export default function useFocusEffect(callback: (...args: any) => any) {
  return useEffect(callback, [callback])
}
