import { useUser } from "@auth0/nextjs-auth0";
const Profile = () => {
    const {user} = useUser();
  return (
    <div>
      <h2>{user?.nickname}</h2>
      <p>{user?.email}</p>
    </div>
  );
};

export default Profile;
