import {useEffect, useRef, useCallback} from 'react'

export const useTimeOut = (callback: () => void, delay: number) => {
    const callBackRef = useRef(callback)
    const timeOutRef = useRef<NodeJS.Timeout>()

    useEffect(() => {
        callBackRef.current = callback
    }, [callback])

    const set = useCallback(() => {
        timeOutRef.current = setTimeout(() => {
            callBackRef.current()
        }, delay)
    }, [])

    const clear = useCallback(() => {
        if (timeOutRef.current) {
            clearTimeout(timeOutRef.current)
        }
    }, [])

    useEffect(() => {
        set()
        return clear
    }, [delay, set, clear])

    const reset = useCallback(() => {
        clear()
        set()
    }, [])

    return {reset, clear}
}
