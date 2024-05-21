import React, { useEffect, useState } from 'react'
import AuthorsPage from './pages/AuthorsPage'

const ViewAuthors = () => {
    
    const [authors,setAuthors] =  useState([])
    useEffect(()=>{
      const fetchAuthors = async () => {
        const res = await fetch('http://localhost:3000/authors')
        const data = await res.json()
        setAuthors(data)
      }
      fetchAuthors()
    },[])
    return (
      <div>
        <AuthorsPage name={authors}/>
      </div>
    )}
export default ViewAuthors
