import {useEffect, useRef} from 'react'

export const useUpdateEffect = (effect: () => void, deps: any[]) => {
    const isMounted = useRef(false)

    useEffect(() => {
        if (isMounted.current) {
            return effect()
        }

        isMounted.current = true
    }, deps)
}
