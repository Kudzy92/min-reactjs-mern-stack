import { SaveAs, Clear, Sync } from '@mui/icons-material'
import React, { useState, useEffect } from 'react'
import Axios from 'axios'
/*import mongoose from  "mongose"*/


const AddNewContact = ({handleCloseDialog, handleOverlay}) => {
  
    const [isEmailValid,setIsEmailValid]=useState(false);
    const [isNameValid,setIsNameValid]=useState(false);
    const [isEmailFocus,setIsEmailFocus]=useState(false);
    const [isNameFocus,setIsNameFocus]=useState(false);
    const [isSaveBtnLoading,setIsSaveBtnLoading]=useState(false);
    const [isCancelBtnLoading,setIsCancelBtnLoading]=useState(false);
    const [contactname,setContactName]=useState('');
    const [contactsurname,setContactSurname]=useState('');
    const [contactemail,setContactEmail]=useState('');
 
    const [contactlinkedcount,setContactlinkedcount]=useState(2);
  
    const [clients, setClients]= useState([]);
   
    useEffect(()=>{
  
      Axios.get(`http://localhost:3001/read`).then((response)=>{
        console.log(response);
        setClients(response.data);
      });
    }, []);
    const handleFocusAndVadidationName = event => {
        console.log("Handle focus");
        setIsNameFocus(true);

      };
      const handleFocusAndVadidationEmail = event => {
        console.log("Handle focus"+isEmailFocus);
        setIsEmailFocus(true);
        console.log("Handle focus 2"+isEmailFocus);

      };
      const handleRemoveFocusAndValidateInputEmail = event => {
        const value=event.target.value;
        console.log("Handle focus lost value"+value);
            /*const isEmailValid = /@/.test(value); // use any validator you want*/
            const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const isEmailValid =regex.test(String(value).toLowerCase());
            if(isEmailValid){setIsEmailValid(true);}else{setIsEmailValid(false);}
      
      };
      const handleRemoveFocusAndValidateInputName = event => {
        const value=event.target.value;
        /*^[a-zA-Z]{2,40}( [a-zA-Z]{2,40}])+$/;*/
        const regex =
      /^[a-zA-Z ]{2,40}$/;
      const isNameValid =regex.test(String(value).toLowerCase());
            if(isNameValid){setIsNameValid(true);}else{setIsNameValid(false);}
      };
     
const clients_no=clients.length;
const handleLinkedItemClick=event=>{
    event.currentTarget.classList.toggle("active");
}
const handleCancelClick=event=>{
setIsCancelBtnLoading(!isCancelBtnLoading);
setTimeout(()=>{
  handleCloseDialog(false);
handleOverlay(false);
  setIsCancelBtnLoading(isCancelBtnLoading);
  }, 2000);

}
const handleSaveClick=event=>{
  setIsSaveBtnLoading(!isSaveBtnLoading);
  setContactlinkedcount(3);
  Axios.post(`http://localhost:3001/insertcontact`,{
    name: contactname,
    surname:contactsurname,
    email:contactemail,
    linkedcount:contactlinkedcount,
  });
  setTimeout(()=>{
    handleCloseDialog(false);
  handleOverlay(false);
    setIsSaveBtnLoading(isSaveBtnLoading);
    }, 3000);

}

  return (
    <div  className='crud-dialog active'>
        
  
    <div  className="crud-dialog-wrapper">
<div className="title"><h1>Add New Contact</h1></div>
<div className={isNameFocus ?(isNameValid ? 'form-control isvalid' : 'form-control isnotvalid') :'form-control' }>
<label>Your name</label>
<input type="text" id="name" onFocus={handleFocusAndVadidationName} onChange={(event)=>{setContactName(event.target.value);}} onBlur={handleRemoveFocusAndValidateInputName} className="input-box" />
</div>
<div className={isNameFocus ?(isNameValid ? 'form-control isvalid' : 'form-control isnotvalid') :'form-control' }>
<label>Your surname</label>
<input type="text" id="name" onFocus={handleFocusAndVadidationName}  onChange={(event)=>{setContactSurname(event.target.value);}} onBlur={handleRemoveFocusAndValidateInputName} className="input-box" />
</div>

<div className={isEmailFocus ?(isEmailValid ? 'form-control isvalid' : 'form-control isnotvalid') :'form-control' }>
<label>Your Email Address</label>
<input type="email" id="email" onFocus={handleFocusAndVadidationEmail} onChange={(event)=>{setContactEmail(event.target.value);}} onBlur={handleRemoveFocusAndValidateInputEmail} className="input-box"/>
</div>

<div className='link-contact-list-wrapper'>
<label>{clients_no>2 ? 'Link clients' :'Link client' }</label>
{clients_no>0 ? 
<ul className={'link-contact-list'+(clients_no<5 ? ' auto' :'')}>

{clients.map((client)=>{
    return(
<li key={client._id}><span className='link-item' onClick={handleLinkedItemClick} data-contact-id={client._id}>{client.fullname}</span></li>
    )
})}
</ul>
:
<div className="not-found-item">
<p>No contact yet. Please add new contact(s) to link.</p>
</div>
}

</div>
<div className="bottom-btn">

  <button  className={isCancelBtnLoading ? 'loading btn cancel': 'btn cancel'} onClick={handleCancelClick}>
{isCancelBtnLoading && <Sync /> }
{!isCancelBtnLoading && <Clear /> }
{!isCancelBtnLoading && 'Cancel' }
{isCancelBtnLoading && 'Cancelling ...' }
</button> 

<button  className={isSaveBtnLoading ? 'loading btn save': 'btn save'} onClick={handleSaveClick}>
  {isSaveBtnLoading && <Sync /> }
{!isSaveBtnLoading && <SaveAs /> }
{!isSaveBtnLoading && 'Save' }
{isSaveBtnLoading && 'Saving data ...' }
</button>
</div>
</div>
</div>
  )
}

export default AddNewContact












