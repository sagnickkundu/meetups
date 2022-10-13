import Profile from "../../components/user/Profile";
import { useUser } from "@auth0/nextjs-auth0";
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(function ProfilePage({user}){
  const { error, isLoading } = useUser();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  return user && <Profile />;
});
