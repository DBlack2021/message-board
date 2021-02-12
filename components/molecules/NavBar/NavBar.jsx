import React from 'react'
import Link from 'next/link'
import styles from '../../../styles/NavBar.module.css'
import ProfileDropDown from '../ProfileDropDown/ProfileDropDown'
//this component is the main component for the top bar including the login component and navigation
export default function NavBar() {
  return (
    <div className={styles.container}>
      <Link href="/">
        <h1>Message Board</h1>
      </Link>
      <ProfileDropDown />
    </div>
  )
}
