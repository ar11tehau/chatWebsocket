import React from 'react';

const Body = ({children}) => {
   return (
      <div className="h-screen w-full flex flex-col items-center bg-[url(/src/assets/bg.png)] bg-[#efeae2]">{ children }</div> 
   );
}

export default Body 

