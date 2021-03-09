import React from 'react';
import { Dropdown } from 'semantic-ui-react';

const AccountDropdown = props => {
  return (
    <Dropdown text="Account" className="account-dropdown">
      <Dropdown.Menu>
        <Dropdown.Item text="Settings" />
        <Dropdown.Item text="Log Out" onClick={props.handleClick} />
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default AccountDropdown;
