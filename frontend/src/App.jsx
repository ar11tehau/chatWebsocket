import "./App.css";

import Talk from "./components/talk";
import Body from "./components/body";
import Login from "./components/login";
import ContactList from "./components/contactList";
import { ChatProvider } from "./hooks/useProvider";

function App() {
   return (
      <ChatProvider>
         <Body>
            <Login />

            <ContactList />

            <Talk />
         </Body>
      </ChatProvider>
   );
}

export default App;
