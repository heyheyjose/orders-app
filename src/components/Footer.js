import React from 'react';
import { Icon } from 'semantic-ui-react';

const Footer = () => {
  return (
    <div className="app-footer">
      <div className="about">
        <h4>About</h4>
        <p>The only orders dashboard you will ever need!</p>
      </div>
      <div className="social">
        <h4>Follow us around the web!</h4>
        <div className="icon-group">
          <Icon name="facebook" />
          <Icon name="instagram" />
          <Icon name="youtube" />
          <Icon name="linkedin" />
        </div>
      </div>
      <div className="contact">
        <h4>Contact Us</h4>
        <p>help@orders.com / 888-284-5773</p>
      </div>
    </div>
  );
};

export default Footer;
