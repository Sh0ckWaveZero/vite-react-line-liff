import { useEffect, useState } from 'react'
import './App.css'
import logo from './logo.svg';
import liff from '@line/liff'

function App() {
  const [pictureUrl, setPictureUrl] = useState(logo);
  const [idToken, setIdToken] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [userId, setUserId] = useState("");
  let isLoggedIn = false

  const initLine = () => {
    isLoggedIn = liff.isLoggedIn()
    if (!isLoggedIn) {
      liff.login({});
    } else {
      runApp();
    }
  }

  const runApp = () => {
    const idToken = liff.getIDToken() ?? '';
    setIdToken(idToken);
    liff.getProfile().then(profile => {
      console.log(profile);
      setDisplayName(profile.displayName);
      setPictureUrl(profile.pictureUrl ?? '');
      setStatusMessage(profile.statusMessage ?? '');
      setUserId(profile.userId);
    }).catch(err => console.error(err));
  }

  const logout = () => {
    liff.logout();
    window.location.reload();
  }

  useEffect(() => {
    initLine()
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ textAlign: "center" }}>
          <h1>Vite React app with LINE Login and LIFF</h1>
          <hr />
          <img src={pictureUrl} alt={displayName} style={{ width: "300px", height: '300px', borderRadius: '100%' }} />
          <p style={{ textAlign: "left", marginLeft: "20%", marginRight: "20%", wordBreak: "break-all" }}><b>id token: </b> {idToken}</p>
          <p style={{ textAlign: "left", marginLeft: "20%", marginRight: "20%", wordBreak: "break-all" }}><b>display name: </b> {displayName}</p>
          <p style={{ textAlign: "left", marginLeft: "20%", marginRight: "20%", wordBreak: "break-all" }}><b>status message: </b> {statusMessage}</p>
          <p style={{ textAlign: "left", marginLeft: "20%", marginRight: "20%", wordBreak: "break-all" }}><b>user id: </b> {userId}</p>

          <button onClick={() => logout()} style={{ width: "50%", height: '50px', padding: '10px', borderRadius: '30px' }}>Logout</button>
        </div>
      </header>
    </div>
  );
}

export default App;


