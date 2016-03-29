import React from 'react';
import { render } from 'react-dom';
import ListBox from './listbox/listbox.jsx';
import 'bootstrap/dist/css/bootstrap.css';

render(
  <div>
    <ListBox />
  </div>,
  document.getElementById('app')
)