import React, { useEffect, useState } from 'react'
import { IoPersonCircleOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';


const AuthorsPage = ({name,page}) => {
  const navigate = useNavigate();
    const [author,setAuthor] = useState([])
    useEffect(() => {
        if (name.authors) {  
          setAuthor(name.authors.map((auth) => auth.name)); // Extract names using map
        }
      }, [name]);

      const goToCreate = () => {
        navigate('/author/new')
      };
    
  return (
    <div>
    <div className='flex items-center justify-center'>
       <button onClick={goToCreate} className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="submit">
      Sign Up
    </button>
    </div>
    {author.length > 0 ? ( // Only render authors if there are any
        <ul className='text-surface dark:text-white'>
            <li>Name</li><li className='flex items-center justify-center'>Page: {page}</li>
          {author.map((author, index) => (
            <li className='w-full cursor-default border-b-2 border-neutral-100 py-4 text-surface/50 dark:border-white/10 dark:text-white/50 dark:md:hover:bg-sky-900' key={index}><a className='bg-sky-1000' href=""><IoPersonCircleOutline />
            {author}</a></li>
          ))}
        </ul>
      ) : (
        <p>No authors found.</p> // Display message if no authors
      )}
     
    </div>
  )
}

export default AuthorsPage
