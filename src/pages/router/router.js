import { createBrowserRouter } from "react-router-dom";
import Home from "../../pages/Home";
import ErrorPage from "../../pages/error/errorPage";
import EditorPage from "../../pages/EditorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/editor/:roomId",
    element: <EditorPage />,
    errorElement: <ErrorPage />,
  },
]);
