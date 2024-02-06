import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import { Dispatch, SetStateAction, useState } from 'react';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/Store';

interface UserInfo {
  user_id: string | null;
  name: string | null;
}

interface ContextProps {
  userInfo: UserInfo;
  handleLogin: Dispatch<SetStateAction<UserInfo | null>>;
}


function App() {

  const [userInfo, setUserInfo] = useState({
    user_id: "",
    name: ""
  });

  // const handleLogin = (userInfo: UserInfo) => {
  //   setUserInfo(userInfo);
  // }

  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />}/>
            <Route path="login" element={<Login />} />
            <Route path="signUp" element={<SignUp />} />
            <Route path="dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
