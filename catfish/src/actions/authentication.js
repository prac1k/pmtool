import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setAuthToken from '../setAuthToken';
import jwt_decode from 'jwt-decode';



export const registerUser = (user, history) => dispatch => {
    axios.post('/users/register', user)
        .then(res => history.push('/login'))
            .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}

export const loginUser = (user) => dispatch => {
    axios.post('/users/login', user)
        .then(res => {
            const { token, role } = res.data;
            localStorage.setItem('jwtToken', token);
            localStorage.setItem('role', role);
                                  setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));


        })

        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export const logoutUser = (history) => dispatch => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('role');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    history.push('/login');
}
