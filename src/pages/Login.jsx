import { useNavigate } from 'react-router-dom'
import { signInWithPopup } from 'firebase/auth'
import { auth ,provider} from '../config/firebase'
import { toast } from 'sonner'

function Login() {
  const navigate=useNavigate()
  

  const handleSubmit = async() => {
   try {
       await signInWithPopup(auth,provider)
       navigate('/home')
       toast.success('Login successful')
   } catch (error) {
    toast.error(error.message)
    console.log(error)
   }
  }
  return (
    <div className="flex items-center justify-center h-screen dark:bg-gray-800">
   <div className="max-w-md p-20 bg-white rounded-xl shadow-lg dark:bg-gray-900">
   <button onClick={handleSubmit} className="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-black hover:shadow transition duration-150 hover:-translate-y-0.5 hover:bg-white  ">
      <img
        className="w-6 h-6"
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        loading="lazy"
        alt="google logo"
      />
      <span>Login with Google</span>
    </button>
   </div>
  </div>
  
  )
}

export default Login