import Navbar from "../components/Navbar"
import ImageGallery from "../components/ImageGallery"
import UploadForm from "../components/UploadForm"

function Home() {
  return (
    <div className="max-w-4xl mx-auto">
     <Navbar/>
     <UploadForm/>
    <ImageGallery/>
   </div>
  )
}

export default Home