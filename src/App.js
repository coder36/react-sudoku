import React, { Component } from 'react';
import logo from './logo.svg';
import Sudoku from './sudoku'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Sudoku/>
      </div>
    );
  }
}

export default App;
