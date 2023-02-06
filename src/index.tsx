import React from 'react';
import { render } from 'react-dom';
import App from './App';
import './index.module.scss';
const rootElement = document.getElementById('root');
console.log('运行', process.env.TEAA);

render(<App />, rootElement);
