import React from "react";

export function Button({text,onClick}){
  const styles = {
    align:'center',
    textAlign:'center',
    backgroundColor:'#0000EE',
    color:'#FFFFFF',
    width:100,
    height:30,
    display: 'inline-block',
    borderRadius:50,
    cursor:'pointer'
  }
  return(
    <div style={styles} onClick={onClick}>
      {text}
    </div>
  )
}