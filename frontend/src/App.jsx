import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CreateUser from './pages/CreateUser';
import AdminPage from './pages/AdminPage';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


const isAuthenticated = () => {
  const token = localStorage.getItem('accessToken');
  if(token){
    return true
  }
  else{
    return false
  }
};

function App() {
  return (

    <>
      <ToastContainer position="top-left" />
      <BrowserRouter>
        <Routes>
          <Route path="/CreateUser" element={<CreateUser />} />
          <Route path="/" element={!isAuthenticated() ? <Login /> : <Navigate to="/AdminPage/*" replace /> } />
          <Route
            path="/AdminPage/*"
            element={isAuthenticated() ? <AdminPage />  : <Navigate to="/" replace />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
