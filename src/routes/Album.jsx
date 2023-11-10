import React, { useEffect, useState } from "react";
import { Await, useLoaderData, Link } from "react-router-dom";
import { Suspense } from "react";
import classes from "./Users.module.css";
import NotFoundPage from "./NotFoundPage";

export const loader = ({ params: { id } }) => {
  const albumPromise = fetch(
    `https://jsonplaceholder.typicode.com/albums/${id}`
  ).then((r) => r.json());
  const photosPromise = fetch(
    `https://jsonplaceholder.typicode.com/photos?albumId=${id}`
  ).then((r) => r.json());
  return { albumPromise, photosPromise };
};

export default function Album() {
  const { albumPromise, photosPromise } = useLoaderData();
  const [albumError, setAlbumError] = useState(false);
  const [photosError, setPhotosError] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    albumPromise.catch((error) => {
      console.error("Error:", error);
      setAlbumError(true);
    });

    albumPromise
      .then((album) => {
        fetch(`https://jsonplaceholder.typicode.com/users/${album.userId}`)
          .then((response) => response.json())
          .then((userData) => {
            setUser(userData);
          })
          .catch((error) => {
            console.error("Error:", error);
            setUser(null);
          });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [albumPromise]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Await
        resolve={albumPromise}
        errorElement={<NotFoundPage />}
        error={albumError}
      >
        {(album) => {
          return (
            <div>
              <div className={classes.wrapper_descr}>
                <div className={classes.album_title}>{album.title}</div>
                {user && user.name && (
                  <div className={classes.create_by}>
                    Created by:{" "}
                    <Link
                      to={`/users/${album.userId}`}
                      className={classes.albumLink}
                    >
                      {user.name}
                    </Link>
                  </div>
                )}
              </div>
              <Await
                resolve={photosPromise}
                errorElement={<NotFoundPage />}
                error={photosError}
              >
                {(photos) => {
                  return (
                    <div className={classes.photos}>
                      {photos && photos.length > 0 ? (
                        photos.map((photo) => (
                          <img
                            key={photo.id}
                            src={photo.url}
                            alt={photo.title}
                          />
                        ))
                      ) : (
                        <NotFoundPage />
                      )}
                    </div>
                  );
                }}
              </Await>
            </div>
          );
        }}
      </Await>
    </Suspense>
  );
}
