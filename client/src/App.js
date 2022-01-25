import React, { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import {
  Chat,
  Channel,
} from 'stream-chat-react';
import MessagingContainer from './components/MessagingContainer';
import Auth from './components/Auth';
import Video from './components/Video';
import '@stream-io/stream-chat-css/dist/css/index.css';
import {useCookies } from 'react-cookie';


const client = StreamChat.getInstance('4vdv4j6mdtmt');

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  const[channel, setChannel] = useState(null);
  const [user, setUsers] =useState(null);

const authToken = cookies.AuthToken;

  // useEffect(() => {

  // }, []);

  const setupClient = async () => {
    try {
      await client.connectUser(
        {
          id: cookies.UserId,
          name: cookies.Name,
          hashedPassword: cookies.HashedPassword
        },
        authToken,
      );

      const channel = await client.channel('gaming', 'gaming-demo', {
        
        name: 'Gaming Demo',
        // option to add custom fields
      });
      setChannel(channel);

    } catch (err) {
      console.log(err);
    }
  };

  if(authToken) setupClient();


  return (
    <>
    {!authToken && <Auth/>}
    {authToken && <Chat client={client}>
    
      <Channel channel={channel}>
      <Video />
      <MessagingContainer />
      </Channel>
    </Chat>}
    </>
  );
};

export default App;