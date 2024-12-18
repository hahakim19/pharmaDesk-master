import React, { createContext, useContext, useState, useEffect, useRef } from 'react'
import { io } from "socket.io-client";
import { useDispatch } from 'react-redux';
import { getUserData, userSuccess, userFail } from '../Redux/userActions.jsx';
import { userData } from '../Utils/Data/UserData.jsx';
import { toast } from 'react-toastify';
import { HOST,notification_load_limit } from "../Utils/Parameters.jsx";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StateContext = createContext();





export const ContextProvider = ({ children }) => {



  const [connectedPharmacy, setConnectedPharmacy] = useState(null);
  const [triggerNavigate, setTriggerNavigate] = useState(false);
  const [socket, setSocket] = useState(null)
  const [resetPasswordEmail, setResetPasswordEmail] = useState("") ///  email field for reset password

  const [notificationListeRequests, setNotificationListeRequest] = useState(null)
  const [isLoadingNotification,setIsLoadingNotifaction] =useState(true)

  const [notificationListeRequestsConfirmation, setNotificationListeRequestConfirmation] = useState(null)
  const [isLoadingNotificationConfirmation,setIsLoadingNotifactionConfirmation] =useState(true)

  const [isLoadingConfirmationPerscription, setIsLoadingConfirmationPerscription] = useState(false) // /to rechange 
  const [posioData,setPosiodata]=useState(null)



  useEffect(() => {

    //get ID from localstorage when loading 
    const jsonId = localStorage.getItem('idpharma')
    const idpharma = JSON.parse(jsonId)
    /* const idpharma = 1 */
    // Initialize Socket.IO client and set it to state
    const socket = io(HOST);
    setSocket(socket)

    if (idpharma != null) {
      console.log("hellllooooo from the socket ");

      // Listen for the 'store_connected' event
      socket.emit('store_connected', { idpharma });//// make the id dynamic 


      socket.on('prescription_cancelled', (data) => {
        const { idprescription, message } = data;
        toast("un client a annulé sa commande");
        // Display the notification in the front
        console.log(`Notification: ${message, idprescription}`);


      });




    }

    socket.on('restoring_password', (data) => {

      console.log("i'm in the restoring socket out if  ", data);
      if (data.idpharma != null || undefined) {

        console.log("i'm in the restoring socket ", data.idpharma);// set useNavigate() to redirect to the changing page 

        localStorage.setItem('idpharma', data.idpharma)
        setTriggerNavigate(true)
      }
    })












    // Clean up the socket connection on component unmount
    return () => socket.close();


  }, [])



  useEffect(() => {
    

  },[])


  // Listen for the 'prescription_cancelled' event


  const fetchNotif = async () => {
    const jsonId = localStorage.getItem('idpharma')
    const idpharma = JSON.parse(jsonId)
    if (idpharma == null) {
      return "id empty"
    }
    else {
      axios.get(`${HOST}/api/demande/${idpharma}`).then(res => {
      
        if (res.data != null) {
  
          //console.log(res.data);
          
          setNotificationListeRequest(prev => {
          
            setIsLoadingNotifaction(false)
            let array = res.data.data
            
            return array.reverse().slice(0, notification_load_limit)
         }   )
       
  
  
        }
  
       
        
      }).catch(e => {
        
  
      })
    }
   

  }


  const fetchCommingClients = async () => {
    const jsonId = localStorage.getItem('idpharma')
    const idpharma = JSON.parse(jsonId)
    if (idpharma == null) {
      return "id empty"
    }
    else {
      axios.get(`${HOST}/api/comming/${idpharma}`).then(res => {
      
        if (res.data != null) {
  
          
          
          setNotificationListeRequestConfirmation(prev => {
          
            setIsLoadingNotifactionConfirmation(false)
            let array = res.data.data
            
            return array.reverse().slice(0, notification_load_limit)
         } )
       
  
  
        }
  
       
        
      }).catch(e => {
        
  
      })
    }
   

  }


  const confirmePerscription =  (idclient) => {
    const jsonId = localStorage.getItem('idpharma')
    const idpharma = JSON.parse(jsonId)
    if (idpharma != null) {

      console.log("this is the form posio ",idclient,posioData);
      
    /*   axios.post(`${HOST}/api/Confirmation_prescription/${idpharma}/${perscriptionId}`)
        .then(res => { console.log(res.data);
        })
        
        .catch(e => console.log(e)
      )
 */
    }
    else alert('id incorrect please reconnect ')

  }




  return (

    <StateContext.Provider value={{
      triggerNavigate, setTriggerNavigate,
      resetPasswordEmail, setResetPasswordEmail, socket, fetchNotif,
      notificationListeRequests,setNotificationListeRequest,
      isLoadingNotification, setIsLoadingNotifaction,fetchCommingClients,
      notificationListeRequestsConfirmation, setNotificationListeRequestConfirmation
      , isLoadingNotificationConfirmation, setIsLoadingNotifactionConfirmation,
      confirmePerscription, isLoadingConfirmationPerscription, setIsLoadingConfirmationPerscription,
      posioData,setPosiodata,
    }}>

      {children}

    </StateContext.Provider>

  );

}


export const useStateContext = () => useContext(StateContext)