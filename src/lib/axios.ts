import axios, { AxiosError, AxiosResponse } from "axios";
import Swal from "sweetalert2";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});

let isAlertShown = false;

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (
      typeof window !== "undefined" &&
      !isAlertShown &&
      (error.response?.status === 401 || error.response?.status === 403)
    ) {
      isAlertShown = true;

      Swal.fire({
        icon: "warning",
        title: "Authentication Error",
        text: "Please log in again",
        confirmButtonText: "Go to Home Page",
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then(() => {
        window.location.href = "/";
        isAlertShown = false;
      });
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
