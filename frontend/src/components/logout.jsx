import { useChat } from "../hooks/useProvider";

const Logout = () => {
   const setUserName = useChat().setUserName
   const setContactName = useChat().setContactName
   const handleClick = () => {
     setUserName(false)
     setContactName(false)
   }

   return (
      <button className='bg-red-200 py-px px-2 mx-1 rounded-md border border-red-300' onClick={handleClick}>Log Out</button>
   );
}


export default Logout 