import axios, { AxiosInstance } from "axios";

const buildClient = async (): Promise<AxiosInstance> => {
  if (typeof window === "undefined") {
    console.log(`Running buildClient on the server!`);
    const { headers } = await import("next/headers");
    return axios.create({
      baseURL:
        // "http://seqo.io/",
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      headers: {
        Host: headers().get("Host"),
        Cookie: headers().get("Cookie"),
      },
    });
  } else {
    console.log(`Running buildClient on the client!`);
    return axios.create({ baseURL: "/" });
  }
};

export default buildClient;
