import buildClient from '../api/build-client';

const Page = async () => {
  const client = buildClient();
  const { data } = await client.get('/api/users/currentuser');

  if (data.currentUser) {
    return <h1>You are signed in</h1>
  }
  else {
    return <h1>You are not signed</h1>
  }
};
 
export default Page;