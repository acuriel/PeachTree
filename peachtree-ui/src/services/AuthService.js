import {baseService} from "./AxiosApiServiceBase";


class AuthService {
  API_LOGIN_URL = "token";

  constructor(baseService) {
    this.baseService = baseService
  }

  login(username, password){
    return this.baseService.post(this.API_LOGIN_URL, {
      username,
      password
    })
  }
}

export default new AuthService(baseService);
