import React, { useState } from 'react'
import styles from '../../../styles/ProfileDropDown.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons'

export default function Dropdown({ children }) {

  const [openMenu, setOpenMenu] = useState(false);
  
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {children[0]}
        <button style={{ height: '30px', cursor: 'pointer', background: 'transparent', border: 'none' }} onClick={() => setOpenMenu(!openMenu)}>
          {openMenu ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />}
        </button>
      </div>
      
      
      <div styles={{ visibility: !openMenu ? 'hidden' : '' }} className={styles.menu}>
        {
          openMenu &&
          children.slice(1, children.length).map(child => (
            <span className={styles.child}> {child} </span>
          ))
        }
      </div>
    </div>
  )
}
