import React from 'react';
import logo from './logo.svg';
import './App.css';
import BubbleMain from './components/BubbleMainComponent.js';
import SelectionMain from './components/SelectionMainComponent.js';
import Main from './components/MainComponent';
import { HashRouter } from 'react-router-dom';
function App() {
    return (
        <HashRouter>
            <Main />
        </HashRouter>
  );
}

export default App;
