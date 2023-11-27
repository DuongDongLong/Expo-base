import React from 'react'
import {I18nextProvider} from 'react-i18next'
import {Provider} from 'react-redux'
import {i18n} from './configs'
import store from './stores'
import App from './App'

const AppProvider = () => {
    return (
        <Provider store={store}>
            <I18nextProvider i18n={i18n}>
                <App />
            </I18nextProvider>
        </Provider>
    )
}

export default AppProvider
