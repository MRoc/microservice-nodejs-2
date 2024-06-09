import buildClient from '../api/build-client';

const Page = async () => {
  const client = buildClient();
  const { data } = await client.get('/api/users/currentuser');

  console.log(data)

  return <h1>Page</h1>
};
 
export default Page;