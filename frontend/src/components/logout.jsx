import { useChat } from "../hooks/useProvider";

const Logout = () => {
   const setUserName = useChat().setUserName;
   const setContactName = useChat().setContactName;
   const setListMessage = useChat().setListMessage;
   const disconnectUser = useChat().disconnectUser;

   const handleClick = () => {
      setListMessage([]);
      disconnectUser();
      setUserName(false);
      setContactName(false);
   };

   return (
      <button
         className="bg-red-200 py-px px-2 mx-1 rounded-md border border-red-300"
         onClick={handleClick}
      >
         Log Out
      </button>
   );
};

export default Logout;
