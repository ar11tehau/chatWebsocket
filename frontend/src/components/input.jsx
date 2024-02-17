import { useRef } from 'react';

const Input = ( { sendText, placeHolder } ) => {
   const ref = useRef("")

   const send = () => {
      if (ref.current.value !== "") {
         sendText(ref.current.value)
         ref.current.value = ""
      }
   }
   const handleClick = () => {
      send()
   }

   const handleKeyUp = (event) => {
      if (event.key === "Enter") {
         send()
      }
   }
   return (
      <div className='w-full flex justify-evenly py-2 px-px'>
         <input className='w-full bg-white text-black px-2 mx-1 rounded-xl focus:outline-none min-w-10 border border-gray-300' ref={ref} placeholder={placeHolder} autoFocus onKeyUp={handleKeyUp} ></input>
         <button className='bg-blue-100 border border-blue-200 py-px px-2 mx-1 rounded-md' onClick={handleClick}>Send</button>
      </div>
   );
}


export default Input 
 
        