import React from 'react'

export default function Message({ name, messageContent }) {

  return (
    <div>
      <p>{name} says...</p>
      <p>{messageContent}</p>
    </div>
  )
}
