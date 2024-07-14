import { useNavigate} from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const {user}=useAuth();
  const Navigate=useNavigate();
   
    if(!user){
         return Navigate('/');
    }
    else{
      return children
    }
 
};

export default ProtectedRoute;