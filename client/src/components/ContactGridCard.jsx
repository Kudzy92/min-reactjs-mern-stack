import React, {useState} from 'react'
import {Edit, DeleteForever, Sync} from '@mui/icons-material'
import Axios from 'axios'

const ContactGridCard = (props) => {
  const [isContactEditBtnLoading, setIsContactEditBtnLoading]= useState(false);
  const [isContactDeleteBtnLoading, setIsContactDeleteBtnLoading]= useState(false);

  const deleteHandler =(id)=>{
    console.log("UPDATE ID"+id);
    setIsContactDeleteBtnLoading(!isContactDeleteBtnLoading);
    //useEffect(()=>{}, []);
    Axios.delete(`http://localhost:3001/deletecontact/${id}`).then(res =>{
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
      setIsContactDeleteBtnLoading(isContactDeleteBtnLoading);
      props.handleNotificationDialog(false);
      }, 3000);
    
  }
  const editHandler =(id)=>{
    console.log("UPDATE ID"+id);
    setIsContactEditBtnLoading(!isContactEditBtnLoading);
    //editDialogId(id);
   // handleOverlay(true);
   //handleCloseDialog(true);
    setTimeout(()=>{
      setIsContactDeleteBtnLoading(isContactDeleteBtnLoading);
      }, 3000);
  }
  return (
    <div className="client-item">
<div className="row"><span>Code :</span><span>{props.name}</span></div>
<div className="row"><span>Name :</span><span>{props.surname}</span></div>
<div className="row email"><span>Email :</span><span>{props.email.length<20 ? props.email : props.email.substring(0,20)+"..."}</span></div>
<div className="row"><span>linked to :</span><span>{props.linked_no}</span></div>
<div className="grid-btn-container">


            <button data-client-id={props.id} onClick={()=>editHandler(props._id)
            } className={isContactEditBtnLoading ? 'loading btn edit': 'btn edit'}>
              
              {isContactEditBtnLoading && <Sync /> }
{!isContactEditBtnLoading && <Edit /> }
              </button>
            <button className={isContactDeleteBtnLoading ? 'loading btn delete': 'btn delete'} onClick={()=> deleteHandler(props._id)} data-client-id={props.id}>
              
              {isContactDeleteBtnLoading && <Sync /> }
{!isContactDeleteBtnLoading && <DeleteForever /> }
              </button>
</div>
</div>
  )
}

export default ContactGridCard