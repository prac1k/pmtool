// import config from 'config';
import { handleResponse } from '../_helpers/handle-response';
import {requestOptions } from '../_helpers/request-options'

export const userService = {
  getAll,
  getById
};

function getAll() {
  return fetch(`http://localhost:3000/users`, requestOptions.get())
    .then(handleResponse);
}

function getById(id) {
  return fetch(`http://localhost:3000/users/${id}`, requestOptions.get())
    .then(handleResponse);
}

export default userService
