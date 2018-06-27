import store from "@/store/index";
export default {
  showError(error) {
    store.dispatch("notification", {
      message: error,
      dangerous: true,
      time: 2000
    });
  },
  showSuccessful(message) {
    store.dispatch("notification", {
      message: message,
      dangerous: false,
      time: 2000
    });
  }
};
