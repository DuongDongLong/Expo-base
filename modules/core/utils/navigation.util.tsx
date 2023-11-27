import React from 'react'
import { NavigationContainerRef, StackActions } from '@react-navigation/native'

export const navigationRef = React.createRef<NavigationContainerRef>()

export class NavigationUtil {
    static reset(name?: string) {
        if (navigationRef.current) {
            navigationRef.current.reset({ index: 0, routes: [{ name: name }] })
        }
    }

    static navigate(screen: string, params?: any) {
        if (navigationRef.current) {
            navigationRef.current.navigate(screen, params)
        }
    }

    static replace(screen: string, params?: any) {
        if (navigationRef.current) {
            navigationRef.current.dispatch(StackActions.replace(screen, params))
        }
    }

    static pop(count?: number) {
        if (navigationRef.current) {
            navigationRef.current.dispatch(StackActions.pop(count))
        }
    }

    static popToTop() {
        if (navigationRef.current) {
            navigationRef.current.dispatch(StackActions.popToTop())
        }
    }
}
