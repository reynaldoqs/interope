//import axios from "axios";
import {
  AUTH_REQUEST,
  AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_LOGOUT
} from "../actions/auth";
import { serviceLogin } from "@/services/loginService";

const state = {
  user: localStorage.getItem("user") || "",
  status: "",
  hasLoadedOnce: false
};

const getters = {
  isUserAuthenticated: state => !!state.user,
  authStatus: state => state.status,
  user: state => state.user || "not found"
};
const mutations = {
  [AUTH_REQUEST]: state => {
    state.status = "loading";
  },
  [AUTH_SUCCESS]: (state, resp) => {
    state.status = "success";
    state.user = resp; //Mejorar esta parte
    state.hasLoadedOnce = true;
  },
  [AUTH_ERROR]: state => {
    state.status = "error";
    state.hasLoadedOnce = true;
  },
  [AUTH_LOGOUT]: state => {
    state.user = "";
  }
};

const actions = {
  login: (context, creds) => {
    context.commit(AUTH_REQUEST);
    return new Promise((resolve, reject) => {
      serviceLogin(creds)
        .then(data => {
          let user = data.data;
          context.commit(AUTH_SUCCESS, user);
          localStorage.setItem("user", JSON.stringify(user));
          resolve("Login Success");
        })
        .catch(err => {
          context.commit(AUTH_ERROR, err);
          reject(err);
        });
    });
  },
  logout: context => {
    localStorage.removeItem("user");
    context.commit(AUTH_LOGOUT);
  }

  // [AUTH_REQUEST]: ({ commit, dispatch }, user) => {
  //   return new Promise((resolve, reject) => {
  //     commit(AUTH_REQUEST);
  //     axios
  //       .post(BASE_URL, user)
  //       .then(data => {
  //         console.log("here is de user");
  //         console.log(data.data.accesos.token);
  //         localStorage.setItem("user-token", data.data.accesos.token);
  //         commit(AUTH_SUCCESS, data);
  //         dispatch(USER_REQUEST);
  //         resolve(data);
  //       })
  //       .catch(err => {
  //         commit(AUTH_ERROR, err);
  //         localStorage.removeItem("user-token");
  //         reject(err);
  //       });
  //   });
  // },
  // [AUTH_LOGOUT]: ({ commit, dispatch }) => {
  //   return new Promise((resolve, reject) => {
  //     commit(AUTH_LOGOUT);
  //     localStorage.removeItem("user-token");
  //     resolve();
  //   });
  // }
};

export default {
  state,
  getters,
  actions,
  mutations
};
