import React from 'react';

const Body = ({children}) => {
   return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-[url(/src/assets/bg.png)] bg-[#efeae2] bg-fixed text-center">{ children }</div> 
   );
}

export default Body 

//  