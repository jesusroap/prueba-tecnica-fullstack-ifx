import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/auth-provider";
import { ProtectedRoute } from "./protected-route";
import LoginPage from "../pages/login";
import HomePage from "../pages/home";
import UserPage from "../pages/user";
import ProductsPage from "../pages/products";
import IndexPage from '../pages/app';
import NotFoundPage from "../pages/page-not-found";

const Routes = () => {
  const { token } = useAuth();

  // Define public routes accessible to all users
  const routesForPublic = [
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/404",
      element: <NotFoundPage />
    },
    {
      path: "*",
      element: <Navigate to='/404' replace />
    }
  ];

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: "/admin",
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        {
          path: "users",
          element: <UserPage />,
        },
        {
          path: "products",
          element: <ProductsPage />,
        },
        {
          path: "dashboard",
          element: <IndexPage />,
        },
      ],
    },
  ];

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/404",
      element: <NotFoundPage />
    },
    {
      path: "*",
      element: <Navigate to='/404' replace />
    }
  ];

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;