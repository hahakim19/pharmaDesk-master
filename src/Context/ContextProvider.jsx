import React,{ createContext, useContext, useState, useEffect, useRef } from 'react'
import { io } from "socket.io-client";
import { useDispatch } from 'react-redux';
import { getUserData, userSuccess, userFail } from '../Redux/userActions.jsx';
import { userData } from '../Utils/Data/UserData.jsx';
import { toast } from 'react-toastify';
import { HOST } from "../Utils/Parameters.jsx";
import { useNavigate } from 'react-router-dom';

const StateContext = createContext();




 
export const ContextProvider = ({ children }) => {

 
  
  const [connectedPharmacy, setConnectedPharmacy] = useState(null);
  const [triggerNavigate, setTriggerNavigate] = useState(false);
  

    
  
 
    
    
  useEffect(() => {
      
    //get ID from localstorage when loading 
    const jsonId = localStorage.getItem('idpharma')
    const idpharma = JSON.parse(jsonId)
    // Initialize Socket.IO client and set it to state
    const socket = io(HOST);

    if (idpharma!=null) {
        // Listen for the 'store_connected' event
        socket.emit('store_connected', {idpharma});//// make the id dynamic 
  

        socket.on('prescription_cancelled', (data) => {
            const { idprescription, message } = data;
            toast("un client a annulé sa commande");
            // Display the notification in the front
               console.log(`Notification: ${message,idprescription}`);
               
          
        });
      
      socket.on('restoring_password', (data) => {
        console.log("i'm in the restoring socket out if  ",data);
        if (data.idpharma != null || undefined) {

          console.log("i'm in the restoring socket ", data.idpharma);// set useNavigate() to redirect to the changing page 
       
          localStorage.setItem('idpharma', data.idpharma)
          setTriggerNavigate(true)
        }
      })
    }

       
    
      
       

      

        // Clean up the socket connection on component unmount
        return () => socket.close();
  
  
    },[]) 

   
    
  // Listen for the 'prescription_cancelled' event
  



 

  return (

    <StateContext.Provider value={{
      triggerNavigate, setTriggerNavigate
      
    }}>

      {children}

    </StateContext.Provider>

  );

}


export const useStateContext = () => useContext(StateContext)