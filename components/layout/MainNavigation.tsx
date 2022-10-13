import classes from "./MainNavigation.module.css";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";

function MainNavigation() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  return (
    <header className={classes.header}>
      <div className={classes.logo}>React Meetups</div>
      <nav>
        <ul>
          <li>
            <Link href="/">All Meetups</Link>
          </li>
          <li>
            <Link href="/new-meetup">Add New Meetup</Link>
          </li>
          <li>
            {!user && <Link href="/api/auth/login">Login</Link>}
          </li>
          <li>
            {user && <Link href="/api/auth/logout">Logout</Link>}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
