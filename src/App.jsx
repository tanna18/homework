import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Albums, { loader as albumsLoader } from "./routes/Albums";
import Album, { loader as albumLoader } from "./routes/Album";
import User, { loader as userLoader } from "./routes/User";
import Users, { loader as usersLoader } from "./routes/Users";
import Layout from "./routes/Layout";
import NotFoundPage from "./routes/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/albums",
        loader: albumsLoader,
        element: <Albums />,
      },
      {
        path: "/albums/:id",
        loader: albumLoader,
        element: <Album />,
      },
      {
        path: "/users",
        loader: usersLoader,
        element: <Users />,
      },
      {
        path: "/users/:id",
        loader: userLoader,
        element: <User />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
