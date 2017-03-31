import * as axios from 'axios';
import {Alert} from 'react-native';

const API_ROOT = 'http://10.0.2.2:3003/';
const TIMEOUT = 3000;

const instance = axios.create({
  baseURL: API_ROOT,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

export async function get(path, options) {
  return wrapResponse(instance.get(path, config(options)));
}
export async function del(path, options) {
  return wrapResponse(instance.delete(path, config(options)));
}
export async function head(path, options) {
  return wrapResponse(instance.head(path, config(options)));
}
export async function post(path, data, options) {
  return wrapResponse(instance.post(path, data, config(options)));
}
export async function put(path, data, options) {
  return wrapResponse(instance.put(path, data, config(options)));
}
export async function patch(path, data, options) {
  return wrapResponse(instance.patch(path, data, config(options)));
}

export function wrapResponse(response) {
  return timeout(response)
    .catch(err => {
      handleNetworkError(err);
      throw err;
    })
    .then(res => {
      tryProcessBizInfo(res);
      return res.data;
    });
}

function BizError(message) {
  this.name = 'Business Error';
  this.message = message || 'Message';
  this.stack = new Error().stack;
}

BizError.prototype = Object.create(Error.prototype);
BizError.prototype.constructor = BizError;

function handleNetworkError(error, title) {
  Alert.alert(title || 'Network Error', error.message);
}

function tryProcessBizInfo(response) {
  if (response.data && response.data.Message && response.data.Message.Type) {
    Alert.alert(response.data.Message.Type, response.data.Message.Value);
  }
  if (response.data && response.data.Message && response.data.Message.Type === 'Error') {
    throw new BizError(response.data.Message.Value);
  }
  return response;
}

function timeout(promise) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(
      () => reject(new Error('Request timeout, please contact the administrator')),
      TIMEOUT
    );
    promise
      .then(response => {
        clearTimeout(timer);
        resolve(response);
      })
      .catch(reject);
  });
}

function config(options) {
  return {
    ...options,
    headers: {
    },
    timeout: TIMEOUT
  };
}
