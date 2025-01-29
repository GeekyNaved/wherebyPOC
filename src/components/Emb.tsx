import React from 'react';
import { WherebyEmbed } from '@whereby.com/react-native-sdk/embed';
import { ROOM_URL } from '../constants';

const Emb = () => {
  return (
    <WherebyEmbed
      // Room URL. (required)
      room={ROOM_URL}
      // Removes some UI elements. Useful for small screens. (optional)
      minimal
      // Skips the media permission prompt. (optional)
      skipMediaPermissionPrompt
      // Catch-all for any Whereby event (optional)
      onWherebyMessage={(event) => {
        console.log(event);
      }}
      // Specific callbacks for each Whereby event (optional)
      onReady={() => {
        console.log('ready');
      }}
    />
  );
};

export default Emb;