import axios from 'axios'
// import { Message, Loading } from 'element-ui';
import errorMsg from './error-msg.js';

var requestCount = 0; // 请求次数
var loadingInstance = null;

// function message(msg) {
//   Message.error({ message: errorMsg.format(msg), offset: 200, duration: 1500 })
// }

// create an axios instance
// axios.create({
//   baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
//   timeout: 5000 // request timeout
// })

// request interceptor
axios.interceptors.request.use(
  config => {
    // if (store.getters.token) {
    //   config.headers['X-Token'] = getToken()
    // }

    // if (requestCount === 0) {
    //   loadingInstance = Loading.service({ fullscreen: true, background: 'rgba(0, 0, 0, 0.5)' });
    // }
    requestCount++;
    if (!config.url.match(RegExp(/http/))) {
      config.url = process.env.VUE_APP_BASE_API + config.url;
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response interceptor
axios.interceptors.response.use(
  response => {
    requestCount--;
    if (requestCount === 0) {
      // loadingInstance.close();
    }
    return response.data;
  },
  error => {
    requestCount--;
    if (requestCount === 0) {
      // loadingInstance.close();
    }
    return Promise.reject(error)
  }
)

const http = {
  get: (url, params, success, error) => {
    axios.get(url, { params: params }).then(res => {
      http.response(res, success, error);
    })
  },
  delete: (url, params, success, error) => {
    axios.delete(url, { params: params }).then(res => {
      http.response(res, success, error);
    })
  },
  post: (url, params, success, error) => {
    axios.post(url, params).then(res => {
      http.response(res, success, error);
    })
  },
  postFormData: (url, params, success, error) => {
    let formData = new FormData();
    for (let k in params) {
      formData.append(k, params[k]);
    }
    axios.post(url, formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(res => {
      http.response(res, success, error);
    })
  },
  put: (url, params, success, error) => {
    axios.put(url, params).then(res => {
      http.response(res, success, error);
    })
  },
  putFormData: (url, params, success, error) => {
    let formData = new FormData();
    for (let k in params) {
      formData.append(k, params[k]);
    }
    axios.put(url, formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(res => {
      http.response(res, success, error);
    })
  },
  response: (res, success, error) => {
    if (res.code === 200) {
      if (typeof success == 'function') {
        success(res);
      }
    } else {
      if (res.msg) {
        // message(res.msg);
      }
      if (typeof error == 'function') {
        error(res);
      }
    }
  }
}

export default http;
