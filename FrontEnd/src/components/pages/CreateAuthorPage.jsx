import React, { useState } from 'react'
import axios from 'axios';

const CreateAuthorPage = () => {
    // const [name, setName] = useState(''); 
  const [errorMessage, setErrorMessage] = useState(null); 

  const handleSubmit = async (event) => {
     event.preventDefault(); 

    const name = event.target.name.value
    console.log('creating author')
   

    try {
      const response = await axios.post('http://localhost:3000/authors', {
        name, 
      });

      console.log('Author created successfully:', response.data); 
      // setName('');
      setErrorMessage(null);

    } catch (error) {
      console.error('Error creating author:', error); 
      setErrorMessage('An error occurred while creating the author.');
    }
  };
  return (
    <div className='flex items-center justify-center h-96'>
    <form className="w-full max-w-sm" onSubmit={handleSubmit}>
  <div className="flex items-center border-b border-teal-500 py-2">
    <input className="appearance-none bg-transparent border-none w-full text-white-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" name='name' placeholder="Jane Doe" aria-label="Full name"/>
    <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="submit">
      Sign Up
    </button>
    <button className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded" type="button">
      Cancel
    </button>
  </div>
</form>
</div>
  )
}

export default CreateAuthorPage
