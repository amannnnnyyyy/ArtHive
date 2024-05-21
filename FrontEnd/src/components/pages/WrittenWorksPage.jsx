import React, { useState } from "react";
import WrittenWorks from "../WrittenWorks";
import Imagess from "../image";
import { TERipple } from 'tw-elements-react';

export function WrittenWorksPage(props) {
  const [date,setDate] =useState()
  console.log("---------",props.written)
  return (
    <>
    {/* <div>
      {console.log(props.written!=null)}
    {props.written !=null ? ( // Only render authors if there are any
        <ul className='text-surface dark:text-white'>
            <li>Written Works</li>
            
          {Object.values(props.written).map((written, index) => (
            console.log("--asks--",written.coverImage,"../../../../public/uploads/writtenCover/0881f2f53b378057c2cee687251a082b"),
            <li className='w-full cursor-default border-b-2 border-neutral-100 py-4 text-surface/50 dark:border-white/10 dark:text-white/50 dark:md:hover:bg-sky-900' key={index}>
              <a className='bg-sky-1000' href=""><h1>Title: </h1>{written.title}</a>
              <a className='bg-sky-1000' href=""><h1>Author: </h1>{written.author}</a>
              <a className='bg-sky-1000' href=""><h1>Cover Image: </h1><img src="../../../../public/uploads/writtenCover/0881f2f53b378057c2cee687251a082b" alt="" />image</a>
              <a className='bg-sky-1000' href=""><h1>Description: </h1>{written.description}</a>
              <a className='bg-sky-1000' href=""><h1>Pages: </h1>{written.pageCount}</a>
              <a className='bg-sky-1000' href=""><h1>Publish Date: </h1>{written.publishDate}</a>
              </li>
                 ))}
          
          {console.log("++++",props.written)}
        </ul>
      ) : (
        <p>No written work found.</p> // Display message if no authors
      )}
    </div> */}
    
      {props.written ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.values(props.written).map((written, index) => (
            console.log("Image path",written.coverImagePath),
            <div
              key={index}
              className="flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 md:max-w-xl md:flex-row"
            >
              <a href=""><img
                className="h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                src={written.coverImagePath}
                alt={written.title}
              /></a>
              <div className="flex flex-col justify-start p-6">
                <h5 className="mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-50">
                  {written.title}
                </h5>
                <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                  {written.description}
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-300">
                  {new Date(written.publishDate).toLocaleDateString()}
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-300">
                  {written.pageCount} pages
                </p>
                <br />
                <TERipple>
                  <button
                    type="button"
                    className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  >
                    View Author
                  </button>
                </TERipple>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No written work found.</p>
      )}
    </>
  );
}