import React from 'react'
import {Edit, DeleteForever} from '@mui/icons-material'

const ClientGridCard = (props) => {
  return (
    <div className="client-item">
<div className="row"><span>Code :</span><span>{props.code}</span></div>
<div className="row"><span>Name :</span><span>{props.name}</span></div>
<div className="row email"><span>Email :</span><span>{props.email.length<20 ? props.email : props.email.substring(0,20)+"..."}</span></div>
<div className="row"><span>linked to :</span><span>{props.linked_no}</span></div>
<div className="grid-btn-container">
<button data-client-id={props.id} className="btn edit"><Edit /></button>
            <button className="btn delete" data-client-id={props.id}><DeleteForever /></button>
</div>
</div>
  )
}

export default ClientGridCard