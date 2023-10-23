import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "@/routes/Layout";
import { Suspense, lazy } from "react";
import Logo from "./components/Logo";
import { ActivityIndicator } from "./components/ui/ActivityIndicator";

const Home = lazy(() => import("@/routes/Home"));
const Notes = lazy(() => import("@/routes/Notes"));
const Note = lazy(() => import("@/routes/Note"));

const Account = lazy(() => import("@/routes/Account"));

const SignIn = lazy(() => import("@/routes/auth/SignIn"));
const SignUp = lazy(() => import("@/routes/auth/SignUp"));
const Auth = lazy(() => import("@/routes/auth"));

const NotFound = lazy(() => import("@/routes/NotFound"));

export const Router = () => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center flex-col bg-black h-screen w-screen">
          <Logo className="h-20 w-20 mb-10" />
          <ActivityIndicator className="h-6 w-6" />
        </div>
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  );
};

const router = createBrowserRouter([
  {
    Component: Layout,
    children: [
      {
        path: "",
        Component: Home,
      },
      {
        path: "notes",
        Component: Notes,
      },
      {
        path: "notes/:id",
        Component: Note,
      },

      {
        path: "account",
        Component: Account,
      },

      {
        path: "auth",
        Component: Auth,
        children: [
          {
            path: "sign-in",
            Component: SignIn,
          },
          {
            path: "sign-up",
            Component: SignUp,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);
