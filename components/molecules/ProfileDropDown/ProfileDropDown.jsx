import React from 'react'
import { auth } from '../../../utils/db/index'
import { useAuthState } from 'react-firebase-hooks/auth'
import styles from '../../../styles/ProfileDropDown.module.css'
import Link from 'next/link'
import SignIn from '../../atoms/SignIn/SignIn';
import SignOut from '../../atoms/SignOut/SignOut';
import Dropdown from '../../atoms/Dropdown/Dropdown';


//This component will be housed in the navbar as either a "Log In" button that pops up a log in with google page
//or a dropdown menu to either log out or check out their profile

export default function ProfileDropDown() {

  const [user] = useAuthState(auth);

  return (
    <div>
      {user ?
        <div className={styles.container}>
          <Dropdown className={styles.dropdown}>
            <h3 style={{ margin: '0px 10px'}}>{user.displayName}</h3>
            <SignOut />
            <button>
              <Link href={`/${user.uid}`}>
                My Profile
              </Link>
            </button>
          </Dropdown>
        </div>
        :
        <SignIn />
      }
    </div>
  )
}
