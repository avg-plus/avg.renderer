import AxiosDefault from "axios";

export const axios = AxiosDefault.create({
  validateStatus: status => {
    return true;
  }
});
