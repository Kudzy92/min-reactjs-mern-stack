import React from 'react'
import '../styles/NotificationCard.scss'

const NotificationCard = ({handleNotiType,handleMsg}) => {
  const name="notification-card "+handleNotiType;
  return (
    <div classsName={name}>
        <div className='noti-inner-wrapper'>
            <p>{handleMsg}</p>
        </div>
    </div>
  )
}

export default NotificationCard