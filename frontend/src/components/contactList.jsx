import { useChat } from "../hooks/useProvider";

const ContactList = () => {
   const listContacts = useChat().listContacts
   const userName = useChat().userName
   const setContactName = useChat().setContactName
   const contactName = useChat().contactName

   const handleClick = (event) => {
      setContactName(event.target.textContent)
   }

   if (userName && !contactName){
      return (
         <div className="w-full flex flex-col items-center">
            <p className="p-4">List of contacts</p>
            { listContacts.map( (contact, id) => (
               <p className='max-w-md w-full cursor-pointer border  m-1 rounded-md bg-blue-200 border-blue-300' onClick={handleClick} key={ id }>{ contact }</p>
            ) ) }
         </div>
      );
   } else {
      return (null)
   }
};

export default ContactList;
