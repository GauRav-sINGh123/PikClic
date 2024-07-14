import useFirestore from "../hooks/useFirestore";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

const ImageGallery = () => {
  const { docs: images, isLoading } = useFirestore("images");
  const [open, setOpen] = useState(false);
  const {user}=useAuth();
  const [selectedImage, setSelectedImage] = useState(null);

  const onOpenModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setOpen(true);
  };

  const onCloseModal = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  if (isLoading) {
    return (
      <div className="text-center mt-10">
        <progress className="progress w-56"></progress>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
      {images.map((image, index) => (
        <div
          key={index}
          className="relative cursor-pointer"
          onClick={() => onOpenModal(image.imageUrl)}
        >
          <figure className="h-full w-full">
            <img
              src={image.imageUrl}
              alt="image"
              className="w-full h-full object-cover rounded-md"
            />
          </figure>
          <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2">
             <span>Uploaded by: {user.displayName}</span>
             <br />
            <span>Uploaded on: {image.createdAt.toDateString()}</span>
          </div>
        </div>
      ))}
      <Modal open={open} onClose={onCloseModal} center>
        {selectedImage && (
         <div className="flex items-center justify-center">
           <img
            src={selectedImage}
            alt="Selected"
            className=" w-full h-full md:w-[70%] md:h-[50%] object-cover rounded-md"
          />
         </div>
        )}
      </Modal>
    </div>
  );
};

export default ImageGallery;