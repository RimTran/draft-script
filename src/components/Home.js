import React, { PureComponent } from 'react';

import { customFetch } from '../simpleCache';

class Home extends PureComponent {
  
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    customFetch(
      'http://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&sensor=false',
      { method: 'GET' },
    ).then((response) => {
      console.log('response: ', response);
    });
  }
  
  render() {
    return (
      <div>
        <span>This is Home page</span>
      </div>
    );
  }
}

export default Home;
