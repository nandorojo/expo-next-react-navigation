import { useEffect } from 'react'

export default function useFocusEffect(callback: () => void) {
	return useEffect(callback, [callback])
}
