import  React, { useState, useEffect } from 'react'
import Client from './Client'
import Contact from './Contact'
import Loader from './Loader'
import Axios from 'axios'
import { Group, Contacts, Sync } from '@mui/icons-material'
import '../styles/TabNavigation.scss'

const TabNavigation = () => {
 /* const [isShowNotificationDialog,setIsShowNotificationDialog]=useState(false);
  const [notType, setNotType] = useState("");
  const [notMsg, setNotMsg] = useState("");*/
    const [activeTab, setActiveTab] = useState("client");
    const [isLoading, setIsLoading]= useState(false);
    const [isOverlay, setOverlay]= useState(false);
    const [isClientsBtnLoading,setIsClientsBtnLoading]=useState(false);
    const [isContactsBtnLoading,setIsContactsBtnLoading]=useState(false);
    const [clients, setClients]= useState([]);
    const [contacts, setContacts]= useState([]);
  useEffect(()=>{
    Axios.get(`http://localhost:3001/read`).then((response)=>{
      console.log(response);
      setClients(response.data);
    });
    Axios.get(`http://localhost:3001/readcontact`).then((response)=>{
      console.log(response);
      setContacts(response.data);
    });
  }, []);
    const handleClientTab = () => {
        setActiveTab("client");
        setIsLoading(true);
        setIsClientsBtnLoading(!isClientsBtnLoading);
        console.log("Loading"+isLoading);
        setTimeout(()=>{
          setIsLoading(false);
          setIsClientsBtnLoading(isClientsBtnLoading);
          }, 3000);
      };
      const handleContactTab = () => {
        setActiveTab("contact");
        setIsLoading(true);
        setIsContactsBtnLoading(!isClientsBtnLoading);
        console.log("Loading"+isLoading);
      setTimeout(()=>{
          setIsLoading(false);
          setIsContactsBtnLoading(isClientsBtnLoading);
          }, 3000);
      };
    
     
     
  return (
    <>
    { isOverlay && <div className="overlay active"></div>}
    { /*isShowNotificationDialog && <NotificationCard handleNotiType={setNotType} handleMsg={setNotType} />*/}
    <div className="tabs">
     
      <ul className="nav">
        <li className={activeTab === "client" && isClientsBtnLoading ? "active loading" : !isClientsBtnLoading && !isContactsBtnLoading && activeTab === 'client' ? "active" : ''} onClick={handleClientTab}>
          {isClientsBtnLoading && <Sync />}
          {isClientsBtnLoading && 'Client'+((clients.length>2)? 's' :'')+' Loading..'}
          {!isClientsBtnLoading && <Group />}
          {!isClientsBtnLoading && 'Client'+((clients.length>2)? 's' :'')}
          </li>
        <li className={activeTab === "contact" && isContactsBtnLoading ? "active loading" : activeTab === "contact" && !isContactsBtnLoading && !isClientsBtnLoading ? "active" : ''} onClick={handleContactTab}>
        {isContactsBtnLoading && <Sync />}
          {isContactsBtnLoading && 'Contact'+((contacts.length>2)? 's' :'')+' Loading..' }
          {!isContactsBtnLoading && <Contacts />}
          {!isContactsBtnLoading && 'Contact'+((contacts.length>2)? 's' :'')}
        </li>
      </ul>
      <div className="outlet">
      {isLoading && <Loader />}
      {!isLoading && activeTab === "client" ? <Client handleOverlay={setOverlay}  /> : ''}
      {!isLoading && activeTab === "contact" ? <Contact handleOverlay={setOverlay} /> : ''}
      </div>
    </div>
    </>
  )
}

export default TabNavigation