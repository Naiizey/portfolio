import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';


const rootElem = document?.getElementById('root');

if(rootElem){
  const root = ReactDOM.createRoot(rootElem);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
else{
  console.error('No root element available');
}