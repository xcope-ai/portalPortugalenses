import React from 'react'
import Sidebar from '../components/Sidebar/Sidebar'
import Header from '../components/Header/Header'
import styles from './initial.module.css'

const page = () => {
  return (
    <div className={styles.container}>
      <Header />
      <Sidebar />
      <main className={styles.mainContent}>
        <div className={styles.content}>
          <h1>Welcome to the Portal</h1>
          <p>This is your initial page after login.</p>
        </div>
      </main>
    </div>
  )
}

export default page