import axios from 'axios';

const fetchCurrentUser = async () => {
    if (typeof window === 'undefined') {
    console.log(`+-- Server`)
    const { data } = await axios.get(
      'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser', {
        headers: {
          Host: 'microservice-nodejs-2-dev.com'
      }
    });
    return data;
  }
  else {
    console.log(`+-- Client`)
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