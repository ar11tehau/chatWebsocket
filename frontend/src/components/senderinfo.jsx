import React from 'react';

const SenderInfo = ({ contactImgUrl, contactName }) => {
   return (
      <div className='flex items-center w-fit space-x-3 p-2'>
         <img className='w-12 h-12 rounded-full border' src={`${contactImgUrl}`} alt="" />
         <p className='w-fit text-xl font-bold text-black'>
            { contactName }
         </p> 
      </div>
   );
}

export default SenderInfo 

