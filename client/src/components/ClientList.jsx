import React, { useState} from 'react'
import Axios from 'axios'
import '../styles/ClientList.scss'
import {Edit, DeleteForever, Sync} from '@mui/icons-material'
const ClientList = (props) => {

  const [isClientEditBtnLoading, setIsClientEditBtnLoading]= useState(false);
  const [isClientDeleteBtnLoading, setIsClientDeleteBtnLoading]= useState(false);

 
  
  const deleteHandler =(id)=>{
    console.log("UPDATE ID"+id);
    setIsClientDeleteBtnLoading(!isClientDeleteBtnLoading);
    //useEffect(()=>{}, []);
    Axios.delete(`http://localhost:3001/delete/${id}`).then(res =>{
      console.log(res.data);
      props.handleNotificationDialog(true);
      if(res.data==='deleted'){
        console.log("DELETE : Client not deleted. Refresh and try again!");
        //props.handleMsg("Client sucessfully deleted");
        //props.handleNotiType("sucess");
        
      }else{
        console.log("DELETE : Client not deleted. Refresh and try again!");
        //props.handleMsg("Client not deleted. Refresh and try again!");
        //props.handleNotiType("error");
      }
    });
    setTimeout(()=>{
      setIsClientDeleteBtnLoading(isClientDeleteBtnLoading);
      props.handleNotificationDialog(false);
      }, 3000);
    
  }
  const updateHandler =(id)=>{
    console.log("UPDATE ID"+id);
    setIsClientEditBtnLoading(!isClientEditBtnLoading);
    //editDialogId(id);
   // handleOverlay(true);
   //handleCloseDialog(true);
    setTimeout(()=>{
      setIsClientDeleteBtnLoading(isClientDeleteBtnLoading);
      }, 3000);
  }
  
  return (
    
   
            <tr>
            <td>{props.code}</td>
            <td>{props.fullname}</td>
            <td>{props.email.length<20 ? props.email : props.email.substring(0,20)+"..."}</td>
            <td>{props.linkedcount}</td>
            <td>
            <button data-client-id={props.id} onClick={()=>updateHandler(props._id)
            } className={isClientEditBtnLoading ? 'loading btn edit': 'btn edit'}>
              
              {isClientEditBtnLoading && <Sync /> }
{!isClientEditBtnLoading && <Edit /> }
              </button>
            <button className={isClientDeleteBtnLoading ? 'loading btn delete': 'btn delete'} onClick={()=> deleteHandler(props._id)} data-client-id={props.id}>
              
              {isClientDeleteBtnLoading && <Sync /> }
{!isClientDeleteBtnLoading && <DeleteForever /> }
              </button>
            </td>
            </tr>
        )
    
}

export default ClientList