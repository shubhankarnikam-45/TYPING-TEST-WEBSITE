import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'
import { TestModeContextProvider } from './Constext/TestModeContext';
import { ThemeContextProivider } from './Constext/themeContext';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeContextProivider>
      <TestModeContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </TestModeContextProvider>
    </ThemeContextProivider>


  </React.StrictMode>
);


