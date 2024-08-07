import Navbar from "../components/Navbar";
import ImageGallery from "../components/ImageGallery";
import UploadForm from "../components/UploadForm";
 

function Home() {
  return (
    <div className="w-full h-full">
     
      <UploadForm />
      <ImageGallery />
    </div>
  );
}

export default Home;
