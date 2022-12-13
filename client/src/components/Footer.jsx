import React from 'react'
//import { Link } from "react-router-dom"

const Footer = () => {
    const getCurrentYear=()=>{
      return new Date().getFullYear();
    }
    //<Link to="#">Kudzy.me</Link>
  return (
    <section  className="footer">
<div className="container">
<p>Designed and developed by Kudzy.me. All copyrights reserved <span dangerouslySetInnerHTML={{ "__html":"&copy;" }}></span> { getCurrentYear()}. </p>
</div>
</section>
  )
}

export default Footer