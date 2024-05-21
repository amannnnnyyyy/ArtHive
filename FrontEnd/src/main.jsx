import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import HomePage from './components/pages/HomePage.jsx'
import NavBar from './components/NavBar.jsx'
import Footer from './components/Footer.jsx'
import ViewAuthors from './components/ViewAuthors.jsx'
import WrittenWorks from './components/WrittenWorks.jsx'
import NotFoundPage from './components/pages/NotFoundPage.jsx'

const router = createBrowserRouter([{
  path:'/authors',
  element:<ViewAuthors/>,
},
{
  path:'/',
  element:<WrittenWorks/>,
  errorElement: <NotFoundPage/>
}])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NavBar/>
    <RouterProvider router={router} />
    <Footer/>
    {/* <App /> */}
  </React.StrictMode>,
)
