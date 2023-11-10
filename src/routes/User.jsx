import React, { useEffect, useState } from "react";
import { Await, useLoaderData, Link } from "react-router-dom";
import { Suspense } from "react";
import classes from "./Users.module.css";
import NotFoundPage from "./NotFoundPage";

export const loader = ({ params: { id } }) => {
  const userPromise = fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`
  ).then((r) => r.json());
  const albumPromise = fetch(
    `https://jsonplaceholder.typicode.com/users/${id}/albums`
  ).then((r) => r.json());
  return { userPromise, albumPromise };
};

export default function User() {
  const { userPromise, albumPromise } = useLoaderData();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([userPromise, albumPromise])
      .then(([userData, albumData]) => {
        setUser(userData);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userPromise, albumPromise]);

  if (loading) {
    return <div>Loading...</div>;
  }


  const isAddressValid = user && user.id;

  if (error || !isAddressValid) {
    return <NotFoundPage />;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <div className={classes.wrapper}>
            <div className={classes.name}>
              <div className={classes.in_info}>{user.name}</div>
            </div>
            {!error && (
              <>
                <div className={classes.info}>
                  <div className={classes.in_info}>
                    Username: {user.username}
                  </div>
                </div>
                <div className={classes.info}>
                  <div className={classes.in_info}>Email: {user.email}</div>
                </div>
                <div className={classes.info}>
                  <div className={classes.in_info}>Phone: {user.phone}</div>
                </div>
                <div className={classes.info}>
                  <div className={classes.in_info}>Site: {user.website}</div>
                </div>
                <p>Albums</p>
                <div className={classes.description}>
                  <Await
                    resolve={albumPromise}
                    errorElement={<NotFoundPage />}
                    error={error}
                  >
                    {(albums) => (
                      <div>
                        {albums && albums.length > 0 ? (
                          albums.map((album) => (
                            <Link
                              key={album.id}
                              to={`/albums/${album.id}`}
                              className={classes.albumLink}
                            >
                              <div>
                                <img src="/icon.png" alt="icon" />
                                {album.title.charAt(0).toUpperCase() +
                                  album.title.slice(1)}
                              </div>
                            </Link>
                          ))
                        ) : (
                          <NotFoundPage />
                        )}
                      </div>
                    )}
                  </Await>
                </div>
              </>
            )}
          </div>
        
      </div>
    </Suspense>
  );
}