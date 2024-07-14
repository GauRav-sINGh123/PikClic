import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import {AuthProvider} from './context/AuthContext'
import ProtectedRoute from './routes/ProtectedRoute'

function App() {
  return (
    <div>
      <AuthProvider>
      <Routes>
       <Route path='/' element={<Login/>}/>
       <Route path='/home' element={
        <ProtectedRoute>
          <Home/>
        </ProtectedRoute>
       }/>
      </Routes>
      </AuthProvider>
     
    </div>
  )
}

export default App