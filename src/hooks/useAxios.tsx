import React from "react";
import axios from "axios";
import useEncrypt from "./useEncrypt";

const useAxios = () => {
  const { encrypt } = useEncrypt();
  axios.defaults.headers.post["Content-Type"] =
    "application/json; charset=utf-8";
  const service = axios.create({
    baseURL: "http://2o6465101l.wicp.vip/",
    timeout: 10000,
  });

  service.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("xc-token");
      if (token) {
        config.headers["xc-token"] = token;
      }
      return config;
    },
    (error) => {
      console.log(error);
      return Promise.reject();
    }
  );

  service.interceptors.response.use(
    (response) => {
      if (response.status === 200) {
        if (typeof response.data == "string") {
          // response.data = RSA.DecryptData(response.data);
          console.log(response.data);
        }
        if (response.data.code == 1) {
          // token
          if (response.headers["xc-token"]) {
            localStorage.setItem("xc-token", response.headers["xc-token"]); // 获取header的token
          }
          // 正常data
          if (response.data.data) {
            return response.data.data;
          } else {
            return {};
          }
        } else {
          Message({
            message: response.data.desc,
            type: "error",
          });
          return;
          // Promise.reject();
        }
      } else {
        Promise.reject();
      }
    },
    (error) => {
      console.log(error);
      return Promise.reject();
    }
  );

  return service;
};
export default useAxios;
