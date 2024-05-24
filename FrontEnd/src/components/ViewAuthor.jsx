import React, { useEffect, useState } from 'react'
import AuthorPage from './pages/AuthorPage'
import { useParams } from 'react-router-dom'
const ViewAuthor = () => {
    const {authorId} = useParams()
    const [author,setAuthor] =  useState()
    console.log("going forward...",authorId)
    console.log("author from out",author)
    useEffect(()=>{
      const fetchAuthor = async () => {
        const res = await fetch(`http://localhost:3000/authors/${authorId}`)
        const data = await res.json()
        setAuthor(data)
      }
      fetchAuthor()
      console.log("author before ",author)
    },[])

    if(!author){
      return <h1>Loading...</h1>
    }
    return (
      <div>
        <AuthorPage name={author}/>
      </div>
    )}
export default ViewAuthor
