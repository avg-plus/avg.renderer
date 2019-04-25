import AxiosDefault from "axios";

export const Axios = AxiosDefault.create({
  validateStatus: (status) => {
    return true;
  }
});
