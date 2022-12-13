import React from 'react'
import '../styles/ClientList.scss'
import {Edit, DeleteForever} from '@mui/icons-material'
const ClientList = (props) => {
  return (
    
   
            <tr>
            <td>{props.code}</td>
            <td>{props.name}</td>
            <td>{props.email.length<20 ? props.email : props.email.substring(0,20)+"..."}</td>
            <td>{props.linked_no}</td>
            <td>
            <button data-client-id={props.id} className="btn edit"><Edit /></button>
            <button className="btn delete" data-client-id={props.id}><DeleteForever /></button>
            </td>
            </tr>
        )
    
}

export default ClientList