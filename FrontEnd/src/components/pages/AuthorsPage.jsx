import React, { useEffect, useState } from 'react'
import { IoPersonCircleOutline } from "react-icons/io5";


const AuthorsPage = (props) => {
    const [author,setAuthor] = useState([])
    useEffect(() => {
        if (props.name) {
          
          setAuthor(props.name.map((auth) => auth.name)); // Extract names using map
        }
      }, [props.name]);
    
  return (
    <div>
    {author.length > 0 ? ( // Only render authors if there are any
        <ul className='text-surface dark:text-white'>
            <li>Name</li>
          {author.map((author, index) => (
            <li className='w-full cursor-default border-b-2 border-neutral-100 py-4 text-surface/50 dark:border-white/10 dark:text-white/50 dark:md:hover:bg-sky-900' key={index}><a className='bg-sky-1000' href=""><IoPersonCircleOutline />
            {author}</a></li>
          ))}
          
          {console.log(author)}
        </ul>
      ) : (
        <p>No authors found.</p> // Display message if no authors
      )}
    </div>
  )
}

export default AuthorsPage
