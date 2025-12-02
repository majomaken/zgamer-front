import { createBrowserRouter, Navigate } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { HomePage } from "../modules/home/pages/HomePage";
import { AuthPage } from "../modules/auth/pages/AuthPage";
import { ProtectedRoute } from "./ProtectedRoute";

export const mainRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'auth', element: <AuthPage />},
      {
        element: <ProtectedRoute />,
        children: [
          { 
            path: 'posts/create', 
            element: <h2>Crear Post, Esto es una ruta Privada</h2>},
          { 
            path: 'dashboard',
            element: <h2>Dashboard, Esto es una ruta Privada</h2>}
        ]

      }
    ]
  },
  {  path: '*', element: <Navigate to="/" replace />}
])