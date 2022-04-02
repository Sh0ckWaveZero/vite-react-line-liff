import liff from '@line/liff'
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'


liff.init({ liffId: import.meta.env.YADOM_APP_LIFF_ID as string })
  .then(() => {
    if (!liff.isLoggedIn()) {
      liff.login({})
    }
    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      document.getElementById('root')
    )
  })
  .catch((e) => {
    alert(`LIFF error: ${e.message}`)
  })