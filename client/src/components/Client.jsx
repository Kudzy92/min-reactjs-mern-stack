import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import ClientGridCard from './ClientGridCard';
import ClientList from './ClientList'
import Loader from './Loader'
import '../styles/Client.scss'
import {FormatListNumbered,Apps, Add, Sync} from '@mui/icons-material/';
import AddNewClient from './AddNewClient';
import EditClient from './EditClient'

const Client = ({handleOverlay}) => {
  const [editId, setEditId]= useState('');
  const [layout, setLayout]= useState("list");
  const [isnotOpenDialog, setIsNotOpenDialog]= useState(false);
  const [isnotOpenEditDialog, setIsNotOpenEditDialog]= useState(false);
  const [isLoading, setIsLoading]= useState(false);
  const [isClientAddBtnLoading, setIsClientAddBtnLoading]= useState(false);
  const [isClientListBtnLoading, setIsClientListBtnLoading]= useState(false);
  const [isClientGridBtnLoading, setIsClientGridBtnLoading]= useState(false);
  const [clients, setClients]= useState([]);
  useEffect(()=>{
    Axios.get(`http://localhost:3001/read`).then((response)=>{
      console.log(response);
      setClients(response.data);
    });
  }, []);
    
    /*const clients=[{
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
]*/
const clients_no=clients.length;
const handleOpenDialog=event=>{
  
  setIsClientAddBtnLoading(!isClientAddBtnLoading);
  setTimeout(()=>{
    handleOverlay(true);
  setIsNotOpenDialog(!isnotOpenDialog);
  setIsClientAddBtnLoading(isClientAddBtnLoading);
}, 2000);
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
  setIsClientListBtnLoading(!isClientListBtnLoading);
  setTimeout(()=>{
    setIsLoading(false);
    setIsClientListBtnLoading(isClientListBtnLoading);
    }, 3000);
    //clearTimeout(timer); 
}
const handleGridLayoutAction=event=>{
  setLayout("grid");
  setIsLoading(true);
  setIsClientGridBtnLoading(!isClientGridBtnLoading);
  console.log("Loading"+isLoading);
  setTimeout(()=>{
    setIsLoading(false);
    setIsClientGridBtnLoading(isClientGridBtnLoading);
    }, 3000);
    //clearTimeout(timer); 
  
}
  return (
    
    <div className='client-container'>
      
      { isnotOpenDialog && <AddNewClient  handleCloseDialog={setIsNotOpenDialog} handleOverlay={handleOverlay} /> }
      { isnotOpenEditDialog && <EditClient  handleCloseDialog={setIsNotOpenEditDialog} editDialogId={setEditId} handleOverlay={handleOverlay} /> }
<div className='client-action-container'>
  
{/*<ActionBtn data={client}/>*/}
<div className='action-btn-container'>
      <div className="section-heading">
    <h3>{clients_no} Client{clients_no>2? 's':''}</h3>
  </div>
  <div className='section-action'>
    <span className={layout==='list' ? (isClientListBtnLoading ? 'loading action-btn active' :'action-btn active') : 'action-btn'} onClick={handleListLayoutAction}>
    {isClientListBtnLoading && <Sync /> }
{!isClientListBtnLoading && <FormatListNumbered /> }
      
    </span>
    {/*
    {"action-btn" + (layout==='list' ? 'active':'')}
     {"action-btn" + (layout==='grid' ? 'active':'')}
    */}
    <span className={layout==='grid' ? (isClientGridBtnLoading ? 'loading action-btn active' :'action-btn active') : 'action-btn'} onClick={handleGridLayoutAction}>
    {isClientGridBtnLoading && <Sync /> }
{!isClientGridBtnLoading && <Apps />}
      
    </span>
    <span className={isClientAddBtnLoading ? 'loading action-btn': 'action-btn'} onClick={handleOpenDialog}>
    {isClientAddBtnLoading && <Sync /> }
{!isClientAddBtnLoading && <Add /> }
      
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
  <ClientList key={client._id} editDialogId={setEditId} {...client} />
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
  <ClientGridCard key={client._id} editDialogId={setEditId} {...client} />
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