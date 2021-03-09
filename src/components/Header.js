import React from 'react';
import { string, element } from 'prop-types';
import { Segment, Header } from 'semantic-ui-react';

const AppHeader = props => {
  return (
    <Segment clearing className="app-header">
      <Header floated="left" className="app-header-text-color">{props.title}</Header>
      <Header floated="right" className="app-header-text-color">{props.headerRightContent}</Header>
    </Segment>
  );
};

export default AppHeader;

AppHeader.defaultProps = {
  title: '',
  headerRightContent: null,
};

AppHeader.propTypes = {
  title: string,
  headerRightContent: element,
};
