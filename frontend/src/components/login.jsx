import { useContext, useState } from 'react'

import Input from "./input";
import Socket from "../socket"

import { useChat } from "../hooks/useProvider";

function containsOnlyLetters(inputString) {
   return /^[a-zA-Z0-9]+$/.test(inputString);
 }

const Login = () => {
   const [showWarning, setShowWarning] = useState(false)
   const setUserName = useChat().setUserName
   const userName = useChat().userName

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

   if (!userName) {
      return (
         <div className="h-full w-fit flex flex-col justify-center items-center">
            <Input sendText={ sendUserName } placeHolder="User name"/>
            <p className={`text-red-500 ${showWarning ? "" : "hidden"} `}>Only numbers and letters, no space</p>
         </div>
      );
   } else {
      return (null)
   }

   
}


export default Login 