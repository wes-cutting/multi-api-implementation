import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import Books from './components/Books'
import CreateBooks from './components/CreateBook'

const App = (
    <div>
        <CreateBooks/>
        <hr/>
        <Books/>
    </div>
)

ReactDOM.render(App, document.getElementById('root'));
