//封装的公用fetch方法
import axios from 'axios';
import loadingMask from './loadingMask';

const fetchApi = {
    //get方法
    async get(url, params, mask) {
        let _url = APP_MODE == 'DEVELOPMENT' ? url + `?ts=${new Date().getTime()}` : PROXY_URL + url + `?ts=${new Date().getTime()}`;
        if (mask == true)  makeMask();
        let res = await axios.get(_url, { params: params });  //url加上时间戳，防止缓存
        if (mask == true) destroyMask();
        return new Promise((resolve) => {
            resolve(res.data);
        })
    },
    //post方法
    async post(url, params, mask) {
        let _url = APP_MODE == 'DEVELOPMENT' ? url + `?ts=${new Date().getTime()}` : PROXY_URL + url + `?ts=${new Date().getTime()}`;
        if (mask == true) loadingMask.makeMask('circle');
        // let res = await axios.post(_url, params);  //url加上时间戳，防止缓存
        // if (mask == true) destroyMask();
        // return new Promise((resolve) => {
        //     resolve(res.data);
        // })
    }
}

export default (url, method, params, mask) => {
    return (fetchApi[method] || fetchApi.get)(url, params, mask);
}
