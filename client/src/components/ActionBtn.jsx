import React, {useState} from 'react'
import '../styles/ActionBtn.scss'
import {FormatListNumbered,Apps, Add} from '@mui/icons-material/';

const ActionBtn = (props) => {
  const [layout, setLayout]= useState("list");
  const [isnotOpenDialog, setIsNotOpenDialog]= useState(false);
  return (
    <div className='action-btn-container'>
      <div className="section-heading">
    <h3>{props.data.count} {props.data.name}</h3>
  </div>
  <div className='section-action'>
    <span className='action-btn active' onclick={setLayout("list")}>
      <FormatListNumbered />
    </span>
    <span className='action-btn' onclick={setLayout({layout})}>
      <Apps />
    </span>
    <span className='action-btn' onclick={setIsNotOpenDialog(!isnotOpenDialog)}>
      <Add />
    </span>
    </div>
    </div>
  )
}


export default ActionBtn