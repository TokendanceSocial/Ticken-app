import React from 'react';
import { render } from 'react-dom';
import App from './App';
import './index.css';
import './index.module.scss';
import '@rainbow-me/rainbowkit/styles.css';
const rootElement = document.getElementById('root');
console.log('运行', process.env.TEAA);

render(<App />, rootElement);
