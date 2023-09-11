import { useState } from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Login from './pages/Home/Home.jsx'
import Workspace from './pages/Workspace/Workspace.jsx'
import './App.css'
import Main from './layout/Main/Main'
import PrivateRoute from './routes/PrivateRoute'

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
          path: "/",
          element: <Login></Login>
        },
        {
          path: "/workspace",
          element: <PrivateRoute><Workspace></Workspace></PrivateRoute>
        }
      ]
    }
  ])

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
