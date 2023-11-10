import { useLoaderData, Link } from "react-router-dom";
import classes from "./Users.module.css";

export const loader = async () => {
  const albums = await fetch(
    "https://jsonplaceholder.typicode.com/albums"
  ).then((r) => r.json());

  return { albums };
};

export default function Albums() {
  const { albums } = useLoaderData();
  return (
    <div>
      {albums.map((album) => (
        <Link key={album.id} to={`/albums/${album.id}`}>
          <div className={classes.albumLink}>
            <img src="/icon.png" alt="icon" /> {album.title}
          </div>
        </Link>
      ))}
    </div>
  );
}
