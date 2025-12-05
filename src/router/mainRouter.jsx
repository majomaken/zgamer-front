import { createBrowserRouter, Navigate } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { HomePage } from "../modules/home/pages/HomePage";
import { AuthPage } from "../modules/auth/pages/AuthPage";
import { ProtectedRoute } from "./ProtectedRoute";
import { PostPrivatePage } from "../modules/post/pages/PostPrivatePage"
import { PostPublicPage } from "../modules/post/pages/PostPublicPage";

export const mainRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'auth', element: <AuthPage />},
      { path: 'post', element: <PostPublicPage />},
      {
        element: <ProtectedRoute />,
        children: [
          { 
            path: 'posts/create', 
            element: <PostPrivatePage />},
          { 
            path: 'dashboard',
            element: <h2>Dashboard, Esto es una ruta Privada</h2>}
        ]

      }
    ]
  },
  {  path: '*', element: <Navigate to="/" replace />}
])