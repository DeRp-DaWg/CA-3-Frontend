import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from "./routes/ErrorPage"
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Root, { rootLoader } from './routes/Root'
import Topic from './routes/Topic'
import TopicErrorPage from './routes/TopicErrorPage'
import Index from "./routes/Index"
import Login from "./routes/Login"
import TeacherPage, {CreateTeacher, AddTopic, ChangePass} from "./routes/TeacherPage"
import CalculatorEditor from './routes/CalculatorEditor'
import TopicEditor from './routes/TopicEditor'
import loaders from './loaders'
import CalculatorList from "./routes/CalculatorList"

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Root/>,
//     errorElement: <ErrorPage/>,
//     loader: rootLoader,
//     children: [
//       {
//         path: "",
//         element: <Index/>
//       },
//       {
//         path: "topic/:topicName",
//         errorElement: <TopicErrorPage/>,
//         loader: topicLoader,
//         element: <Topic/>
//       },
//       {
//         path: "login",
//         element: <Login />
//       },
//       {
//         path: "teacherPage",
//         element: <TeacherPage />
//         // element: {facade.getLog() ? <TeacherPage /> : <Navigate replace to={"/"} />}
//       },
//       {
//         path: "teacherpage/createTopic",
//         loader: loaders.topicCreateLoader,
//         element: <TopicEditor/>
//       },
//       {
//         path: "teacherpage/editTopic/:topicName",
//         loader: loaders.topicEditLoader,
//         element: <TopicEditor/>
//       },
//       {
//         path: "teacherpage/createCalculator",
//         loader: loaders.calculatorCreateLoader,
//         element: <CalculatorEditor/>
//       },
//       {
//         path: "teacherpage/editCalculator/:calculatorName",
//         loader: loaders.calculatorEditLoader,
//         element: <CalculatorEditor/>
//       }
//     ]
//   }
// ])

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage/>,
    loader: rootLoader,
    children: [
      {
        path: "",
        element: <Index/>
      },
      {
        path: "topic/:subjectName/:topicName",
        errorElement: <TopicErrorPage/>,
        id: "topic",
        loader: loaders.topicLoader,
        children: [
          {
            path: "",
            element: <Topic/>
          },
          {
            path: "edit",
            loader: loaders.calculatorNamesLoader,
            element: <TopicEditor/>
          }
        ]
      },
      {
        path: "calculator",
        children: [
          {
            path: "",
            loader: loaders.calculatorNamesLoader,
            element: <CalculatorList/>
          },
          {
            path: ":calculatorName",
            id: "calculator",
            loader: loaders.calculatorLoader,
            children: [
              {
                path: "",
              },
              {
                path: "edit",
                element: <CalculatorEditor/>
              }
            ]
          }
        ]
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
      },
      {
        path: "teacherPage/createTopic",
        loader: loaders.calculatorNamesLoader,
        element: <TopicEditor/>
      },
      {
        path: "teacherPage/createCalculator",
        element: <CalculatorEditor/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
