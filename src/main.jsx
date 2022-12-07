import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from "./routes/ErrorPage"
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Root, { rootLoader } from './routes/Root'
import Topic, { topicLoader } from './routes/Topic'
import TopicErrorPage from './routes/TopicErrorPage'
import Index from "./routes/Index"
import Login from "./routes/Login"
import TeacherPage, {CreateTeacher, AddTopic, ChangePass} from "./routes/TeacherPage"
import facade from "./fetchers/apiFacade"

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
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "teacherPage",
        element: <TeacherPage />
        // children: [
        //   {
        //     path: "/changepw",
        //     element: <ChangePass/>
        //   },
        //   {
        //     path: "/addTopic",
        //     element: <AddTopic/>
        //   },
        //   {
        //     path: "/addTeacher",
        //     element: <CreateTeacher/>
        //   }
        // ]
        // element: {facade.getLog() ? <TeacherPage /> : <Navigate replace to={"/"} />}
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
