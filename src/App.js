import React from 'react';
import "./App.css";
import Login from "./Login/Login"
import HomeScreen from "./HomeScreen/HomeScreen";
import ProfileScreen from './ProfileScreen/ProfileScreen';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
import { auth } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';


function App() {

  const user = useSelector(selectUser);  /* get user info from the redux global store */
  const dispatch = useDispatch();  /* dispatch info to the redux global store */

  /* stay signed in after signing in once */
  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {  /* attach a listener so that when user logs in, firebase saves this info in the browser */
      if (userAuth) {
        // logged in
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        )
      }
      else {
        // logged out
        dispatch(logout());
      }
    });

    return unsubscribe;
  }, [dispatch])

  return (
    <div className="app">
      <BrowserRouter>
        {
          (!user)
          ? <Login />
          : (      
              <Routes>
                <Route path="/profile" element={<ProfileScreen />} />
                <Route exact path="/" element={<HomeScreen />} />
              </Routes>
            )
        }
      </BrowserRouter>
    </div>
  );
}

export default App;
