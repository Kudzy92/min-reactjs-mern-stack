import React, { useState } from 'react'

import ClientGridCard from './ClientGridCard';
import ClientList from './ClientList'
import Loader from './Loader'
import '../styles/Client.scss'
import {FormatListNumbered,Apps, Add} from '@mui/icons-material/';
import AddNewClient from './AddNewClient';

const Client = ({handleOverlay}) => {
  
  const [layout, setLayout]= useState("list");
  const [isnotOpenDialog, setIsNotOpenDialog]= useState(false);
  const [isLoading, setIsLoading]= useState(false);

    
    const clients=[{
        id:1,
        code:"KUD001",
        name:"Kudzai",
        email:"kudziemadziva@gmail.com",
        linked_no:3,
    },
    {
        id:2,
        code:"JAV002",
        name:"Java",
        email:"java@gmail.com",
        linked_no:3,
    },
    {
        id:3,
        code:"REA003",
        name:"React",
        email:"react@react.co.za",
        linked_no:3,
    },
    {
        id:5,
        code:"PHP004",
        name:"Php",
        email:"php@yahoo.com",
        linked_no:5,
    },
    {
        id:6,
        code:"FLU006",
        name:"Fluter",
        email:"fluter@gmail.com",
        linked_no:13,
    }
]
const clients_no=clients.length;
const handleOpenDialog=event=>{
  handleOverlay(true);
  setIsNotOpenDialog(!isnotOpenDialog);
  
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
    //clearTimeout(timer); 
}
const handleGridLayoutAction=event=>{
  setLayout("grid");
  setIsLoading(true);
  console.log("Loading"+isLoading);
  setTimeout(()=>{
    setIsLoading(false);
    }, 3000);
    //clearTimeout(timer); 
  
}
  return (
    
    <div className='client-container'>
      
      { isnotOpenDialog && <AddNewClient  handleCloseDialog={setIsNotOpenDialog} handleOverlay={handleOverlay} /> }
<div className='client-action-container'>
  
{/*<ActionBtn data={client}/>*/}
<div className='action-btn-container'>
      <div className="section-heading">
    <h3>4 Clients</h3>
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
<div  className={"client-content-item" + (layout==='list' ? ' active':'')}>
{isLoading && <Loader />}
{!isLoading && clients_no>0 ? <table className="tb-content"> 
<tbody>
<tr>
<th>Client Code</th>
<th>Name</th>
<th>Email</th>
<th>Linked Contacts</th>
<th>Actions</th>
</tr>
{clients.map((client)=>{
        return (
  <ClientList key={client.id} {...client} />
)})}
</tbody>
  </table>
    : ''}
     {!isLoading && clients_no<1 ?
    <p>No client(s) yet. Please add new client(s).</p>:''
     }
    </div>
    <div  className={"client-content-item" + (layout==='grid' ? ' active':'')}>
    {isLoading && <Loader />}
    {!isLoading && clients_no>0 ? <div className="grid-wrapper">
    {clients.map((client)=>{
        return (
  <ClientGridCard key={client.id} {...client} />
)})}
      </div>: ''}
      {!isLoading && clients_no<1 ?
    <p>No client(s) yet. Please add new client(s).</p>: ''
     }
    </div>
</div>
    </div>
  )
}

export default Client