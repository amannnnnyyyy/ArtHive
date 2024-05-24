import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import NavBar from './components/NavBar.jsx'
import Footer from './components/Footer.jsx'
import ViewAuthors from './components/ViewAuthors.jsx'
import WrittenWorks from './components/WrittenWorks.jsx'
import NotFoundPage from './components/pages/NotFoundPage.jsx'
import ViewAuthor from './components/ViewAuthor.jsx'
import CreateAuthorPage from './components/pages/CreateAuthorPage.jsx'
import Pages from './components/Pages.jsx'

const router = createBrowserRouter([{
  path:'/authors',
  element:<><NavBar/><ViewAuthors/></>,
},{
  path:'/',
  element:<><NavBar/><WrittenWorks/></>,
  errorElement: <NotFoundPage/>
},{
  path:'/author/:authorId', 
  element:<><NavBar/><ViewAuthor/></>
},{
  path:'/author/new', 
  element:<><NavBar/><CreateAuthorPage/></>
}])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   
    <RouterProvider router={router} />
    <Footer/>
    {/* <App /> */}
  </React.StrictMode>,
)
