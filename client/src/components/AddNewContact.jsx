import { SaveAs, Clear, Sync } from '@mui/icons-material'
import React, { useState } from 'react'
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
    const [linkedItem,setLinkedItem]=useState([]);
    const [contactlinkedcount,setContactlinkedcount]=useState(2);
    const [contacts, setContacts]= useState([]);
    
   
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
      /*const contacts=[{
        id:1,
        name:"Kudzai",
        surname:"Madziva",
        email:"kudziemadziva@gmail.com",
        linked_no:3,
    },
    {
        id:2,
        name:"Java",
        surname:"OOP",
        email:"java@gmail.com",
        linked_no:3,
    },
    {
        id:3,
        name:"React",
        surname:"JS",
        email:"react@react.co.za",
        linked_no:3,
    },
    {
        id:5,
        name:"Php",
        surname:"Python",
        email:"php@yahoo.com",
        linked_no:5,
    },
    {
        id:6,
        name:"Fluter",
        surname:"Google",
        email:"fluter@gmail.com",
        linked_no:13,
    }
]*/
const contacts_no=contacts.length;
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
<label>Link contacts</label>
{contacts_no>0 ? 
<ul className='link-contact-list'>

{contacts.map((contact)=>{
    return(
<li key={contact.id}><span className='link-item' onClick={handleLinkedItemClick} data-contact-id={contact.id}>{contact.name+' '+contact.surname}</span></li>
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












