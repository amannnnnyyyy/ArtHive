import React, { useEffect, useState } from 'react'
import AuthorsPage from './pages/AuthorsPage'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

const ViewAuthors = () => {
    
    const [authors,setAuthors] =  useState([])
    const [pages,setPages] = useState(1);
    const [showLimit,setShowLimit] = useState(3);
    const limit = 4;
    useEffect(()=>{
      const fetchAuthors = async () => {
        const res = await fetch(`http://localhost:3000/authors?_limit=${showLimit}&page=${pages}`)
        const data = await res.json()
        setAuthors(data)
      }
      fetchAuthors()
    },[pages,showLimit])

    let totalPages = Math.ceil(authors.totalAuthors / showLimit)
    let page_no = totalPages>0?totalPages:0;
    const incrementPage = () => {
      if(pages < page_no) 
      setPages(pages+1)
    }
    const decrementPage=()=>{
      console.log("pages incremented : ",pages)
      if(pages !== 1)
      setPages(pages-1)
      console.log("pages = ",pages)
    }
    const handleLimitChange = (event) => {
      const newValue = parseInt(event.target.value); // Convert to a number
      if (!isNaN(newValue)) { // Check if valid number
          if(!newValue == 0 && newValue !== authors.totalAuthors+1)
              setShowLimit(newValue);
          else if(newValue > authors.totalAuthors+1){setShowLimit(5);}
      }
    };
    return (
      <div>
        <div className='bg-grey'>
        <span className="text-white-700 mr-2">showLimit</span>
          <input 
          value={showLimit}
          onChange={handleLimitChange}
          className="rounded-md px-2 py-1 text-gray-700 bg-white w-16 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50" 
          type="number" name="limit" id="" />
        </div>
        <div className="fixed bottom-20 items-center right-20 justify-between border-t border-gray-200 bg-grey px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
      <button  onClick={()=>decrementPage()}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            
            <button
              onClick={()=>incrementPage()}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
        
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between bg-grey">
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
          <button onClick={()=>decrementPage()}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </button>
        <button
          onClick={()=>incrementPage()}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </button>
          </nav>
        </div>
      </div>
    </div>
    
    <AuthorsPage name={authors} page={pages}/>
      </div>
    )}
export default ViewAuthors
