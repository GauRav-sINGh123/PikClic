import Navbar from "../components/Navbar";
import ImageGallery from "../components/ImageGallery";
import UploadForm from "../components/UploadForm";
 

function Gallery() {
  return (
    <div className="w-full h-full">
      <UploadForm />
      <ImageGallery />
    </div>
  );
}

export default Gallery;
