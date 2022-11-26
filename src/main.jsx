import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from "./routes/ErrorPage"
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Root, { rootLoader } from './routes/Root'
import Topic, { topicLoader } from './routes/Topic'
import TopicErrorPage from './routes/TopicErrorPage'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage/>,
    loader: rootLoader,
    children: [
      {
        path: "topic/:topicName",
        errorElement: <TopicErrorPage/>,
        loader: topicLoader,
        element: <Topic/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
