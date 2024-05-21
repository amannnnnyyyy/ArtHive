import React from 'react'
import { WrittenWorksPage } from './WrittenWorksPage'
import NavBar from '../NavBar'
import Footer from '../Footer'
import ViewAuthors from '../ViewAuthors'
import WrittenWorks from '../WrittenWorks'

const HomePage = () => {
  return (
    <div>
        <NavBar/>
      <WrittenWorks/>
      <ViewAuthors/>
      <Footer/>
    </div>
  )
}

export default HomePage
