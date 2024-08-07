import axios, { AxiosInstance } from "axios";

const buildClient = async (): Promise<AxiosInstance> => {
  if (typeof window === "undefined") {
    const { headers } = await import("next/headers");

    if (!process.env.CLUSTER_BASE_URL) {
      throw new Error("CLUSTER_BASE_URL is not defined!");
    }

    console.log(`Running buildClient on the server with base URL: '${process.env.CLUSTER_BASE_URL}'!`);

    
    return axios.create({
      baseURL: process.env.CLUSTER_BASE_URL,
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
