import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './pages/HomePage';
//import App from './pages/App';
import registerServiceWorker from './registerServiceWorker';
import "./assets/vendor/bootstrap/bootstrap.css"
import "./css/style.css"

ReactDOM.render(<HomePage />, document.getElementById('root'));
//ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
