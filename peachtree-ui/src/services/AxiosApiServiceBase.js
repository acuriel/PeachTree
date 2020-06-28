import axios from "axios";
import {history} from '../App';


export const baseService = axios.create({baseURL: "http://localhost:8000/api/"})

baseService.interceptors.request.use(
  config => {
    const savedToken = localStorage.getItem('peachTreeToken');
    if(savedToken){
      const token = JSON.parse(savedToken)
      config.headers['Authorization'] = 'Bearer ' + token.access
    }
    else if(config.url !== "token") {
      console.log("reject")
      Promise.reject({response:{status:401}});
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

baseService.interceptors.response.use(
  res => res,
  error => {
    if(error.response?.status === 401){
      history.push('/auth');
    }
  }
)

export default class AxiosApiService {
  constructor(modelUrl, baseService) {
    this.modelUrl = modelUrl;
    this.baseService = baseService;
  }

  _getUrl(...urls){
    var paths = []
    urls.forEach(url => {
      paths = paths.concat(url.toString().split('/'))
    });
    return this.modelUrl + paths.join('/') + '/';
  }

  getItem(id) {
    return this.baseService.get(this._getUrl(id))
  }
  getAll() {
    return this.baseService.get(this.modelUrl)
  }
  create(elem) {
    return this.baseService.post(this.modelUrl, elem);
  }
  update(id, elem) {
    return this.baseService.put(this._getUrl(id), elem);
  }
  partialUpdate(id, elem) {
    return this.baseService.patch(this._getUrl(id), elem);
  }
  remove(id) {
    return this.baseService.delete(this._getUrl(id));
  }
}
