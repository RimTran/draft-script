import React, { Component } from 'react';
import lscache from 'lscache';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';
import { customFetch } from './simpleCache';
import Home from './components/Home';
import Detail from './components/Detail';

import queue from 'async/queue';

class App extends Component {
  
  onClick = (e) => {
    console.log('cache.get(\'data\'): ', lscache.get('data'));
  }
  
  constructor(props) {
    super(props);
    const q = queue((task, callback) => {
      console.log('hello ' + task.name);
      callback();
    }, 2);
  
    q.drain = () => {
      console.log('all items have been processed');
    };
  
    q.push({name: 'foo'}, (err) => {
      console.log('finished processing foo');
    });
  }
  
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div>
          <Router>
            <div>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/detail">Detail</Link>
                </li>
              </ul>
      
              <hr />
      
              {/*<Route exact path="/" component={Home} />*/}
              {/*<Route path="/detail" component={Detail} />*/}
            </div>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
