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
  const [imageUrl, setImageUrl] = useState('');
    
      useEffect(() => {
        const fetchImage = async () => {
          const response = await fetch('http://localhost:3000/uploads/writtenCover/3c8a77810a3d753604b245423e9653a3');
          if (!response.ok) {
            throw new Error('Failed to fetch image');
          }
          const imageBlob = await response.blob();
          const imageUrl = URL.createObjectURL(imageBlob);
          setImageUrl(imageUrl);
        };
    
        fetchImage().catch(console.error);
      }, []);
  return (
    <div>
      <WrittenWorksPage written={written} image={imageUrl}/>
    </div>
  )
}

export default WrittenWorks
