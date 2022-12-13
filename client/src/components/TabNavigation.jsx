import  React, { useState } from 'react'
import Client from './Client'
import Contact from './Contact'
import Loader from './Loader'
import { Group, Contacts, Sync } from '@mui/icons-material'
import '../styles/TabNavigation.scss'
const TabNavigation = () => {
    const [activeTab, setActiveTab] = useState("client");
    const [isLoading, setIsLoading]= useState(false);
    const [isOverlay, setOverlay]= useState(false);
    const [isClientsBtnLoading,setIsClientsBtnLoading]=useState(false);
    const [isContactsBtnLoading,setIsContactsBtnLoading]=useState(false);
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
    <div className="tabs">
     
      <ul className="nav">
        <li className={activeTab === "client" && isClientsBtnLoading ? "active loading" : !isClientsBtnLoading && !isContactsBtnLoading && activeTab === 'client' ? "active" : ''} onClick={handleClientTab}>
          {isClientsBtnLoading && <Sync />}
          {isClientsBtnLoading && 'Clients Loading..'}
          {!isClientsBtnLoading && <Group />}
          {!isClientsBtnLoading && 'Clients'}
          </li>
        <li className={activeTab === "contact" && isContactsBtnLoading ? "active loading" : activeTab === "contact" && !isContactsBtnLoading && !isClientsBtnLoading ? "active" : ''} onClick={handleContactTab}>
        {isContactsBtnLoading && <Sync />}
          {isContactsBtnLoading && 'Contacts Loading..'}
          {!isContactsBtnLoading && <Contacts />}
          {!isContactsBtnLoading && 'Contacts'}
        </li>
      </ul>
      <div className="outlet">
      {isLoading && <Loader />}
      {!isLoading && activeTab === "client" ? <Client handleOverlay={setOverlay} /> : ''}
      {!isLoading && activeTab === "contact" ? <Contact handleOverlay={setOverlay}/> : ''}
      </div>
    </div>
    </>
  )
}

export default TabNavigation