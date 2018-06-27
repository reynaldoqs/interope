import Vue from "vue";

Vue.filter("normalDate", function(value) {
  if (!value) return "";
  let date = new Date(value);
  let month = date.getMonth();
  let day = date.getDay();
  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;
  return `${date.getFullYear()}/${month}/${day}`;
});
