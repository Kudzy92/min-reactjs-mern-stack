import React, { useState} from 'react'
import Axios from 'axios'
import '../styles/ClientList.scss'
import {Edit, DeleteForever} from '@mui/icons-material'
const ClientList = (props,editDialogId) => {
  const [updateById,setUpdateById]=useState('');
  const deleteHandler =(id)=>{
    Axios.delete(`https://localhost:3001/delete/${id}`);
  }
  const updateHandler =(id)=>{
    const newfullname='';
    Axios.put(`https://localhost:3001/udate`,{
      _id: id,
      fullname:newfullname,
    });
  }
  
  return (
    
   
            <tr>
            <td>{props.code}</td>
            <td>{props.fullname}</td>
            <td>{props.email.length<20 ? props.email : props.email.substring(0,20)+"..."}</td>
            <td>{props.linkedcount}</td>
            <td>
            <button data-client-id={props.id} onClick={()=>{
              editDialogId(props._id);
            }} className="btn edit"><Edit /></button>
            <button className="btn delete" onClick={deleteHandler(props._id)} data-client-id={props.id}><DeleteForever /></button>
            </td>
            </tr>
        )
    
}

export default ClientList