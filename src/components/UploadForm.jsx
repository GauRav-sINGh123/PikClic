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
    <div className="text-center mt-10 ">
      <form onSubmit={handleSubmit} className=" flex items-center flex-col">
        <input
          onChange={handleFileChange}
          type="file"
          className="file-input file-input-bordered file-input-primary hover:transition-all hover:scale-105 ease-in-out w-full max-w-xs"
        />
        <button
          disabled={!user}
          type="submit"
          className={`btn btn-primary mt-7 ${
            progress > 0
              ? "loading loading-dots loading-md"
              : "hover:transition-all hover:scale-105 ease-in-out"
          }`}
        >
          {progress > 0 ? "Loading..." : "Upload 🔥"}
        </button>
      </form>
    </div>
  );
}

export default UploadForm;
