import React,{ createContext, useContext, useState, useEffect, useRef } from 'react'
import { io } from "socket.io-client";
import { useDispatch } from 'react-redux';
import { getUserData, userSuccess, userFail } from '../Redux/userActions.jsx';
import { userData } from '../Utils/Data/UserData.jsx';
import { toast } from 'react-toastify';
import { HOST } from "../Utils/Parameters.jsx";

const StateContext = createContext();



 
export const ContextProvider = ({ children }) => {

  
    const [connectedPharmacy, setConnectedPharmacy] = useState(null);

 
 
    
    
    useEffect(() => {

         // Initialize Socket.IO client and set it to state
         const socket = io(HOST);
       

        // Listen for the 'store_connected' event
        socket.emit('store_connected', {idpharma:1});
  

        socket.on('prescription_cancelled', (data) => {
            const { idprescription, message } = data;
            toast("un client a annulé sa commande");
            // Display the notification in the front
               console.log(`Notification: ${message,idprescription}`);
               
            /*
        
            new Notification('Prescription Cancelled', {
                body: message,
            });
         */
          
        });

        // Clean up the socket connection on component unmount
        return () => socket.close();
  
  
    },[]) 

   
    
  // Listen for the 'prescription_cancelled' event
  



 

  return (

    <StateContext.Provider value={{
      
      
    }}>

      {children}

    </StateContext.Provider>

  );

}


export const useStateContext = () => useContext(StateContext)