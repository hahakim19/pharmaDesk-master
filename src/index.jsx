import * as React from 'react';
import { createRoot } from 'react-dom/client';
import App from './Views/App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './Redux/store.jsx';
import { ContextProvider } from './Context/ContextProvider.jsx';
import { AuthProvider } from './Context/AuthProvider.jsx';


const root = createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <ContextProvider>
            <AuthProvider>
                 <App /> 
            </AuthProvider>
           
              
          
            
        </ContextProvider>

    </Provider>
);