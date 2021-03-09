import React from 'react';
import { Image } from 'semantic-ui-react';
import user from './user.jpg';

const Avatar = () => {
  return (
    <Image src={user} className="user-avatar" />
  );
};

export default Avatar;
