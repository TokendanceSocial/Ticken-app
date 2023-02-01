import React from 'react';
import { render } from 'react-dom';
import styles from './index.module.scss';
const rootElement = document.getElementById('root');
console.log('运行', process.env.TEAA);

const App = () => {
  return <div className={styles.app}>Hello</div>;
};

render(<App />, rootElement);
