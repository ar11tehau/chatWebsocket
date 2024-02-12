const ContactList = ({ listContacts, setContactName }) => {


   const handleClick = (event) => {
      setContactName(event.target.textContent)
   }

   return (
      
      <div className="w-full flex flex-col items-center">
         <p className="p-4">List of contacts</p>
         { listContacts.map( (contact, id) => (
            <p className='max-w-md w-full cursor-pointer border  m-1 rounded-md bg-blue-200 border-blue-300' onClick={handleClick} key={ id }>{ contact }</p>
         ) ) }
      </div>
   );
};

export default ContactList;
