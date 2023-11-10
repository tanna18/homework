import { useLoaderData, Link } from "react-router-dom";
import classes from "./Users.module.css";

export const loader = async () => {
  const users = await fetch("https://jsonplaceholder.typicode.com/users").then(
    (r) => r.json()
  );

  return { users };
};

export default function Users() {
  const { users } = useLoaderData();
  return (
    <div>
      {users.map((user) => (
        <Link key={user.id} to={`/users/${user.id}`}>
          <div className={classes.us_name}>{user.name}</div>
        </Link>
      ))}
    </div>
  );
}
