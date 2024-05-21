
    import React, { useState, useEffect } from 'react';

    function MyComponent() {
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
      console.log("written3 ",imageUrl);
    
      return (
        <div>
          {imageUrl && <img src={imageUrl} alt="Written Work Cover" />}
        </div>
      );
    }
    


export default MyComponent
