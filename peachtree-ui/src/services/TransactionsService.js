import AxiosApiService, {baseService} from "./AxiosApiServiceBase";


class TransactionsService extends AxiosApiService{
  constructor(baseService) {
    super ("transactions/", baseService);
  }
}

export default new TransactionsService(baseService);
