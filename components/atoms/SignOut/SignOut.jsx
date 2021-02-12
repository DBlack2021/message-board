import React from 'react'
import { auth } from '../../../utils/db'

export default function SignOut() {
  return (
    <button style={{cursor: 'pointer'}} onClick={() => auth.signOut()}>Sign Out</button>
  )
}
