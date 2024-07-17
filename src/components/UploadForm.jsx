import { useState } from "react";
import useStorage from "../hooks/useStorage";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";

function UploadForm() {
  const [selectedFile, setSelectedFile] = useState(null);
  const { startUpload, progress } = useStorage();
  const { user } = useAuth();

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedFile) {
        await startUpload(selectedFile);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setSelectedFile(null);
  };

  return (
    <div className="text-center mt-10   ">
     <div className="flex justify-center items-center">
     <form onSubmit={handleSubmit}>
    <label className="block">
      <span className="sr-only">Choose profile photo</span>
      <input 
      onChange={handleFileChange}
      type="file" 
      className="block w-full text-sm text-gray-500
      outline-none border border-spacing-0 border-slate-500
      rounded-lg cursor-pointer
        file:me-4 file:py-2 file:px-4
        file:rounded-lg file:border-0
        file:text-sm file:font-semibold
        file:bg-blue-600 file:text-white
        hover:file:bg-blue-700
        file:disabled:opacity-50 file:disabled:pointer-events-none
        dark:text-neutral-500
        dark:file:bg-blue-500
        
        dark:hover:file:bg-blue-400
      "/>
    </label>
   
        {progress > 0 ? (
          <div className="animate-spin inline-block size-6 mt-4 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500" role="status" aria-label="loading">
          <span className="sr-only">Loading...</span>
        </div>
        ) : (
          <button
          disabled={!user}
          type="submit"
          className={`bg-blue-600 px-3 py-2 text-white rounded-md mt-7 "hover:transition-all hover:scale-105 ease-in-out"
          }`}
        >
         Upload 🔥
        </button>
          )
          
        }
      </form>
     </div>
    </div>
  );
}

export default UploadForm;
