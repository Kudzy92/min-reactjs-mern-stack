import React, { useState } from 'react'
import ContactGridCard from './ContactGridCard';
import ContactList from './ContactList'
import Loader from './Loader'
import '../styles/Client.scss'
import {FormatListNumbered,Apps, Add} from '@mui/icons-material/';
import AddNewContact from './AddNewContact';

const Contact = ({handleOverlay}) => {
  const [layout, setLayout]= useState("list");
  const [isnotOpenDialog, setIsNotOpenDialog]= useState(false);
  const [isLoading, setIsLoading]= useState(false);

    
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
]
const contacts_no=contacts.length;
const handleOpenDialog=event=>{
  setIsNotOpenDialog(!isnotOpenDialog);
  handleOverlay(true);
}
/*const timer=setTimeout(()=>{
  setIsLoading(!isLoading);
  }, 3000);
   useEffect(()=>{
    const timer=setTimeout(()=>{
      setIsLoading(!isLoading);
      }, 3000);
      return ()=> {
      clearTimeout(timer);  
      setIsLoading(isLoading); 
      }
  },[]);
  */

const handleListLayoutAction=event=>{
  setLayout("list");
  setIsLoading(true);
  console.log("Loading"+isLoading);
  setTimeout(()=>{
    setIsLoading(false);
    }, 3000);
}
const handleGridLayoutAction=event=>{
  setLayout("grid");
  setIsLoading(true);
  console.log("Loading"+isLoading);
setTimeout(()=>{
    setIsLoading(false);
    }, 3000);
    
  
}
  return (
    <div className='client-container'>
      { isnotOpenDialog && <AddNewContact  handleCloseDialog={setIsNotOpenDialog} handleOverlay={handleOverlay} /> }
<div className='client-action-container'>
  
{/*<ActionBtn data={client}/>*/}
<div className='action-btn-container'>
      <div className="section-heading">
    <h3>14 Contact</h3>
  </div>
  <div className='section-action'>
    <span className={layout==='list' ? 'action-btn active':'action-btn'} onClick={handleListLayoutAction}>
      <FormatListNumbered />
    </span>
    {/*
    {"action-btn" + (layout==='list' ? 'active':'')}
     {"action-btn" + (layout==='grid' ? 'active':'')}
    */}
    <span className={layout==='grid' ? 'action-btn active':'action-btn'} onClick={handleGridLayoutAction}>
      <Apps />
    </span>
    <span className='action-btn' onClick={handleOpenDialog}>
      <Add />
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
  <ContactList key={client.id} {...client} />
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
  <ContactGridCard key={client.id} {...client} />
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