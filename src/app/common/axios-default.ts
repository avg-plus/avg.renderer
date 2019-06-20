import AxiosDefault from "axios";

export const Axios = AxiosDefault.create({
  validateStatus: (status) => {
    console.log(status);
    
    return true;
  }
});
