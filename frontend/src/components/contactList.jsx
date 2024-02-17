import { useChat } from "../hooks/useProvider";

import Logout from "./logout"
import Header from "./header"

const ContactList = () => {
   const connectedUsers = useChat().connectedUsers
   const disconnectedUsers = useChat().disconnectedUsers
   const userName = useChat().userName
   const setContactName = useChat().setContactName
   const contactName = useChat().contactName
   const getConnectedUsers = useChat().getConnectedUsers
   
   
   const handleClick = (event) => {
      setContactName(event.target.textContent)
   }
   // const connectedUsersList = connectedUsers


   if (userName && !contactName){ 
      getConnectedUsers()     
      return (
         <div className="h-full w-full flex flex-col items-center grow">
            <Header className="flex justify-end">
                  <Logout />
            </Header>
            <p> { userName } </p>
            <p className="p-4">Connected</p>
            { connectedUsers.map( (contact, id) => (
               <p className='max-w-md min-w-52 w-fit cursor-pointer border m-1 rounded-md bg-green-200 border-green-300' onClick={ handleClick } key={ id }>{ contact }</p>
            ) ) }
            <p className="p-4">Disconnected</p>
            { disconnectedUsers.map( (contact, id) => (
               <p className='max-w-md min-w-52 w-fit cursor-pointer border m-1 rounded-md bg-red-200 border-red-300' onClick={ handleClick } key={ id }>{ contact }</p>
            ) ) }
         </div> 
      );
   } else {
      return (null)
   }
};

export default ContactList;
