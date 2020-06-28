import AxiosApiService, {baseService} from "./AxiosApiServiceBase";


class AccountsService extends AxiosApiService{
  constructor(baseService) {
    super ("accounts/", baseService);
  }
}

export default new AccountsService(baseService);
