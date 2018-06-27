import axios from "axios";
import notificationApi from "@/utils/showNotification";
export default {
  serviceLogin(creds) {
    return axios.post("/login/auth", creds).catch(err => {
      notificationApi.showError("Error en el login");
      return err;
    });
  },
  serviceLogout() {
    return true;
  }
};
