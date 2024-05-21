import React, { useEffect, useState } from 'react'
import { WrittenWorksPage } from './pages/WrittenWorksPage'

const WrittenWorks = () => {
  const [written,setWritten] =  useState([])
  useEffect(()=>{
    const fetchWritten = async () => {
      const res = await fetch('http://localhost:3000/writtenWorks')
      const data = await res.json()
      setWritten(data)
    }
    fetchWritten()
  },[])
  return (
    <div>
      <WrittenWorksPage written={written}/>
    </div>
  )
}

export default WrittenWorks
