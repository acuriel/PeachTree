import AxiosApiService, {baseService} from "./AxiosApiServiceBase";


class ContractorsService extends AxiosApiService{
  constructor(baseService) {
    super ("contractors/", baseService);
  }
}

export default new ContractorsService(baseService);
