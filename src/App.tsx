import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import React from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from './store/Store';
import { PersistGate } from 'redux-persist/integration/react';
import ViewCollection from './pages/ViewCollection';

function App() {

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/login" />}/>
              <Route path="login" element={<Login />} />
              <Route path="signUp" element={<SignUp />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="collection/view/:collection_id" element={<ViewCollection />} />
            </Routes>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
