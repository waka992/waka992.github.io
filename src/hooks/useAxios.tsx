import React from "react";
import axios from "axios";
import useEncrypt from "./useEncrypt";
import toast from "react-hot-toast";
import qs from "qs";

const useAxios = () => {
  const { encrypt } = useEncrypt();

  axios.defaults.headers.post["Content-Type"] =
    "application/json; charset=utf-8";
  const service = axios.create({
    // baseURL: "http://localhost:8088",
    baseURL: "https://www.coin-dex.info/api",

    timeout: 10000,
  });

  service.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("best-bit-token");
      if (token) {
        config.headers["token"] = token;
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
      setTimeout(() => {
        sessionStorage.clear();
      }, 500);
      if (response.status === 200) {
        if (typeof response.data == "string") {
          // response.data = RSA.DecryptData(response.data);
          console.log(response.data);
        }
        if (response.data.code == 200) {
          // token
          // if (response.headers["xc-token"]) {
          //   localStorage.setItem("xc-token", response.headers["xc-token"]); // 获取header的token
          // }
          // 正常data
          if (response.data.data) {
            return response.data.data;
          } else {
            return {};
          }
        } else {
          toast.error(response.data.msg);
          return;
          // Promise.reject();
        }
      } else {
        // Promise.reject();
        return {};
      }
    },
    (error) => {
      console.log(error);
      setTimeout(() => {
        sessionStorage.clear();
      }, 500);
      return Promise.reject();
    }
  );

  const axiosPost = service.post;
  const axiosGet = service.get;

  const post = (name, query, limit = true, encode = false) => {
    try {
      if (sessionStorage.getItem(name) === "true" && limit) {
        // avoiding limit false
        setTimeout(() => {
          console.log("session clear!");
          sessionStorage.clear();
        }, 3000);
        const donothingPromise = new Promise((res, rej) => {
          rej();
        });
        return donothingPromise;
      }
      sessionStorage.setItem(name, "true");
      // encrypt
      if (encode === true) {
        console.log(query);
        query = encrypt(JSON.stringify(query));
      }
      return axiosPost(name, query);
    } catch (err) {
      console.log(err);
    }
  };

  const get = (path, query) => {
    let param = "";
    try {
      param = qs.stringify(query);
      return axiosGet(path + "?" + param);
    } catch (err) {
      param = "";
      return axiosGet(path + "?" + param);
    }
  };

  return { post, get };
};
export default useAxios;
