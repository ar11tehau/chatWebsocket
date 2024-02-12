import { useState } from 'react'

import Input from "./input";
import Socket from "../socket"

function containsOnlyLetters(inputString) {
   return /^[a-zA-Z0-9]+$/.test(inputString);
 }

 
const Login = ({ setUserName }) => {
   const [showWarning, setShowWarning] = useState(false)

   const sendUserName = (userName) => { 
      if ( containsOnlyLetters(userName) ) {
         setShowWarning(false)
         setUserName(userName)
         Socket.emit("newuser", userName);
      }
      else {
         setShowWarning(true)
      }
   };

   return (
      <div className="h-full w-fit flex flex-col justify-center items-center">
         <Input sendText={ sendUserName } placeHolder="User name"/>
         <p className={`text-red-500 ${showWarning ? "" : "hidden"} `}>Only numbers and letters, no space</p>
      </div>
   );
}


export default Login 