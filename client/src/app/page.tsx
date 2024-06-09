import axios from 'axios';
import { headers } from "next/headers";

const fetchCurrentUser = async () => {
  if (typeof window === 'undefined') {
    const { data } = await axios.get(
      'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser', {
        headers: {
          Host: headers().get('Host'),
          Cookie: headers().get('Cookie'),
      }
    });
    return data;
  }
  else {
    const { data } = await axios.get('/api/users/currentuser');
    return data;
  }
};

const Page = async () => {
  const data = await fetchCurrentUser();
  console.log(data)

  return <h1>Page</h1>
};
 
export default Page;