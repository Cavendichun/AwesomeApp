//封装的公用fetch方法
import axios from 'axios';

const fetchApi = {
    //get方法
    async get(url, params) {
        let _url = APP_MODE == 'DEVELOPMENT' ? url + `?ts=${new Date().getTime()}` : PROXY_URL + url + `?ts=${new Date().getTime()}`;
        let res = await axios.get(_url, { params: params });  //url加上时间戳，防止缓存
        return new Promise((resolve) => {
            resolve(res.data);
        })
    },
    //post方法
    async post(url, params) {
        let _url = PROXY_URL ? PROXY_URL + url + `?ts=${new Date().getTime()}` : url + `?ts=${new Date().getTime()}`;
        let res = await axios.post(_url, params);  //url加上时间戳，防止缓存
        return new Promise((resolve) => {
            resolve(res.data);
        })
    }
}

export default (url, method, params) => {
    return (fetchApi[method] || fetchApi.get)(url, params);
}
