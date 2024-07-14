import { useState } from "react"
import useStorage from "../hooks/useStorage";

function UploadForm() {
  const [selectedFile,setSelectedFile]=useState(null);
  const {startUpload}=useStorage();
  const handleFileChange=(e)=>{
    if(e.target.files && e.target.files[0]){
      setSelectedFile(e.target.files[0]);
    }
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    if(selectedFile){
      startUpload(selectedFile);
     
    }
    setSelectedFile(null);
  }
  return (
    <div className='text-center mt-10 '>
      <form 
      onSubmit={handleSubmit}
      className=' flex items-center flex-col'>
      <input 
      onChange={handleFileChange}
      type="file" className="file-input file-input-bordered file-input-primary hover:transition-all hover:scale-105 ease-in-out w-full max-w-xs" />
      <button type="submit"className="btn btn-primary mt-7 hover:transition-all hover:scale-105 ease-in-out">Upload <span>🔥</span></button>
      </form>
    </div>
  )
}

export default UploadForm