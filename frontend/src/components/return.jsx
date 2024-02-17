import { useChat } from "../hooks/useProvider";

const Return = () => {
   const setContactName = useChat().setContactName;
   const setListMessage = useChat().setListMessage;

   const handleClick = () => {
      setListMessage([]);
      setContactName(false);
   };

   return (
      <button
         className="bg-blue-200 py-px px-2 mx-1 rounded-md border border-blue-300"
         onClick={handleClick}
      >
         Return
      </button>
   );
};

export default Return;
