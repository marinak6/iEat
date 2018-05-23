import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { PageHeader } from "react-bootstrap"
class App extends Component {
  render() {
    return (
      <div className="App">
        <PageHeader>
          iEat
        </PageHeader>
      </div>
    );
  }
}

export default App;
