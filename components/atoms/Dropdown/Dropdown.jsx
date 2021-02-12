import React, { useState } from 'react'
import styles from '../../../styles/ProfileDropDown.module.css'

export default function Dropdown({ children }) {

  const [openMenu, setOpenMenu] = useState(false);
  
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {children[0]}
        <button style={{ height: '30px', cursor: 'pointer' }} onClick={() => setOpenMenu(!openMenu)}>
          {openMenu ? '˄' : '˅'}
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
