import {observable, action, runInAction, decorate} from 'mobx'
import BaseStore from './BaseStore';
import AuthService from '../services/AuthService';

export default class AuthStore extends BaseStore{
  signedUser = ""
  authenticated = false

  login = async (username, password) => {
    try{
      localStorage.removeItem('peachTreeToken')
      const res = await AuthService.login(username, password);
      localStorage.setItem('peachTreeToken', JSON.stringify(res.data));
      runInAction(() => {
        this.signedUser = username;
        this.authenticated = true;
        console.log(this.authenticated)
      })

    } catch (error) {
      console.log(error)
    }
  }
}

decorate(AuthStore, {
  signedUser: observable,
  authenticated: observable,
  login: action,
})
