import React, { useState, useEffect } from 'react'
import ContactGridCard from './ContactGridCard';
import ContactList from './ContactList'
import Loader from './Loader'
import '../styles/Client.scss'
import Axios from 'axios'
import {FormatListNumbered,Apps, Add, Sync} from '@mui/icons-material/';
import AddNewContact from './AddNewContact';

const Contact = ({handleOverlay,handleNotificationDialog,handleNotiType,handleMsg}) => {
  const [layout, setLayout]= useState("list");
  const [isnotOpenDialog, setIsNotOpenDialog]= useState(false);
  const [isLoading, setIsLoading]= useState(false);
  const [isContactAddBtnLoading, setIsContactAddBtnLoading]= useState(false);
  const [isContactListBtnLoading, setIsContactListBtnLoading]= useState(false);
  const [isContactGridBtnLoading, setIsContactGridBtnLoading]= useState(false);
  
  //const [notType, setNotType] = useState("");
  //const [notMsg, setNotMsg] = useState("");
  const [contacts, setContacts]= useState([]);
  useEffect(()=>{
    Axios.get(`http://localhost:3001/readcontact`).then((response)=>{
      console.log(response);
      setContacts(response.data);
    });
  }, []);
    
    /*
    const contacts=[{
        id:1,
        name:"Kudzai",
        surname:"KUD001",
        email:"kudziemadziva@gmail.com",
        linked_no:3,
    },
    {
        id:2,
        name:"Java",
        surname:"JAV002",
        email:"java@gmail.com",
        linked_no:3,
    },
    {
        id:3,
        name:"React",
        surname:"REA003",
        email:"react@react.co.za",
        linked_no:3,
    },
    {
        id:5,
        name:"Php",
        surname:"PHP004",
        email:"php@yahoo.com",
        linked_no:5,
    },
    {
        id:6,
        name:"Fluter",
        surname:"FLU006",
        email:"fluter@gmail.com",
        linked_no:13,
    }
]  */
const contacts_no=contacts.length;
const handleOpenDialog=event=>{
  setIsContactAddBtnLoading(!isContactAddBtnLoading);
  setTimeout(()=>{
    setIsNotOpenDialog(!isnotOpenDialog);
  handleOverlay(true);
  setIsContactAddBtnLoading(isContactAddBtnLoading);
    }, 2000);
  
}



const handleListLayoutAction=event=>{
  setLayout("list");
  setIsLoading(true);
  setIsContactListBtnLoading(!isContactListBtnLoading);
  console.log("Loading"+isLoading);
  setTimeout(()=>{
    setIsLoading(false);
    setIsContactListBtnLoading(isContactListBtnLoading);
    }, 3000);
}
const handleGridLayoutAction=event=>{
  setLayout("grid");
  setIsLoading(true);
  setIsContactGridBtnLoading(!isContactGridBtnLoading);
  console.log("Loading"+isLoading);
setTimeout(()=>{
    setIsLoading(false);
    setIsContactGridBtnLoading(isContactGridBtnLoading);
    }, 3000);
    
  
}
  return (
    <div className='client-container'>
      { isnotOpenDialog && <AddNewContact  handleCloseDialog={setIsNotOpenDialog} handleOverlay={handleOverlay} handleNotificationDialog={handleNotificationDialog} handleNotiType={handleNotiType} handleMsg={handleMsg} /> }
<div className='client-action-container'>
  
{/*<ActionBtn data={client}/>*/}
<div className='action-btn-container'>
      <div className="section-heading">
    <h3>{contacts_no} Contact{contacts_no>2? 's':''}</h3>
  </div>
  <div className='section-action'>
    <span className={layout==='list' ? (isContactListBtnLoading ? 'loading action-btn active' :'action-btn active') : 'action-btn'} onClick={handleListLayoutAction}>
    {isContactListBtnLoading && <Sync /> }
{!isContactListBtnLoading && <FormatListNumbered /> }
      
    </span>
    {/*
    {"action-btn" + (layout==='list' ? 'active':'')}
     {"action-btn" + (layout==='grid' ? 'active':'')}
    */}
    <span className={layout==='grid' ? (isContactGridBtnLoading ? 'loading action-btn active' :'action-btn active') : 'action-btn'} onClick={handleGridLayoutAction}>
    {isContactGridBtnLoading && <Sync /> }
{!isContactGridBtnLoading && <Apps />}
      
    </span>
    <span className={isContactAddBtnLoading ? 'loading action-btn': 'action-btn'} onClick={handleOpenDialog}>
    {isContactAddBtnLoading && <Sync /> }
{!isContactAddBtnLoading && <Add /> }
      
    </span>
    </div>
    </div>

</div>
<div className="client-content">
<div  className={"client-content-item" + (layout==='list' ? 'active':'')}>
{isLoading && <Loader />}
{!isLoading && contacts_no>0 ? <table className="tb-content">
<tbody>
<tr>
<th>Name</th>
<th>Surname</th>
<th>Email</th>
<th>Linked Contacts</th>
<th>Actions</th>
</tr>
{contacts.map((client)=>{
        return (
  <ContactList key={client._id} {...client} />
)})}
</tbody>
  </table>
    : ''}
    {!isLoading && contacts_no<1 ? 
    <p>No client(s) yet. Please add new client(s).</p>:''
     }
    </div>
    <div  className={"client-content-item" + (layout==='grid' ? 'active':'')}>
    {isLoading && <Loader />}
    {contacts_no>0 ? <div className="grid-wrapper">
    {contacts.map((client)=>{
        return (
  <ContactGridCard key={client._id} {...client} />
)})}
      </div>:''}
      {!isLoading && contacts_no<1 ? 
    <p>No client(s) yet. Please add new client(s).</p>:''
     }
    </div>
</div>
    </div>
  )
}

export default Contact