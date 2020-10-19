import clientAxios from '../config/axios';
import TokenAuth from '../config/tokenAuth';
import axios from 'axios';

export const getToken = async(user) => {

    try {
        const result = await clientAxios.post('/api/user/signIn', user);
        localStorage.setItem('token', result.data.token);
        return true;
    } catch (error) {
        return false;
    }
}

export const registerUser = async(user) => {
    try {
        await clientAxios.post('/api/user/signUp', user);
        return true;
    } catch (error) {
        return false;
    }
}

export const getUser = async() => {
    const token = localStorage.getItem('token');
    const result = {
        data: null,
        error: false
    }

    if (token) {
        TokenAuth(token);
    } else {
        result.error = true;
        return result;
    }

    try {
        result.data = await clientAxios.get('/api/user/user');
        return result;
    } catch (error) {
        result.error = true;
        return result;
    }


}