import useFirestore from "../hooks/useFirestore";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

const ImageGallery = () => {
  const { docs: images, isLoading } = useFirestore("images");
  const [open, setOpen] = useState(false);
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
    <div className="container mx-auto px-4 md:px-0 mt-10 max-w-screen-lg">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {images.map((image, index) => (
        <div
          key={index}
          className="relative cursor-pointer"
          onClick={() => onOpenModal(image.imageUrl)}
        >
          <figure className="w-full h-60 md:h-full">
            <img
              src={image.imageUrl}
              alt="image"
              className="w-full h-full object-cover rounded-md"
            />
          </figure>
          <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2">
            <span>Uploaded by: {image.userEmail}</span>
            <br />
            <span>Uploaded on: {image.createdAt.toDateString()}</span>
          </div>
        </div>
      ))}
    </div>
    <Modal open={open} onClose={onCloseModal} center>
      {selectedImage && (
        <div className="flex items-center justify-center p-4 md:p-0">
          <img
            src={selectedImage}
            alt="Selected"
            className="w-full h-auto md:w-[70%] md:h-[50%] object-cover rounded-md"
          />
        </div>
      )}
    </Modal>
  </div>
  );
};

export default ImageGallery;