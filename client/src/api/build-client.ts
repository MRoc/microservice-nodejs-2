import axios, { AxiosInstance } from "axios";
import { headers } from "next/headers";

const buildClient = (): AxiosInstance => {
  if (typeof window === "undefined") {
    return axios.create({
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      headers: {
        Host: headers().get("Host"),
        Cookie: headers().get("Cookie"),
      },
    });
  } else {
    return axios.create({ baseURL: "/" });
  }
};

export default buildClient;
