import clientAxios from './axios'

const TokenAuth = token => {
    if (token) {
        clientAxios.defaults.headers.common['x-auth-token'] = token
    } else {
        delete clientAxios.defaults.headers.common['x-auth-token']
    }
}

export default TokenAuth;