import useFirestore from "../hooks/useFirestore";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../config/firebase";

const ImageGallery = () => {
  const { user } = useAuth();
  const { docs: images, isLoading, deleteDocument } = useFirestore("images");
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const onOpenModal = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const onCloseModal = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  const handleDelete = () => {
    if (selectedImage) {
      deleteDocument(selectedImage.id, selectedImage.imageUrl);
      onCloseModal();
    }
  };

  const handleDownload = async () => {
    if (selectedImage) {
      try {
        const storageRef = ref(storage, selectedImage.imageUrl);
        const downloadURL = await getDownloadURL(storageRef);
        window.open(downloadURL, "_blank");
      } catch (error) {
        console.error("Error downloading the image:", error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="text-center mt-10 h-screen">
        <progress className="progress w-56"></progress>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-0 mt-10 max-w-screen-lg h-full ">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative cursor-pointer"
            onClick={() => onOpenModal(image)}
          >
            <figure className="w-full h-60 md:h-80 ">
              <img
                src={image.imageUrl}
                alt="image"
                className="w-full h-full object-cover rounded-lg "
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
      <Modal open={open} onClose={onCloseModal} center classNames={{ modal: 'customModal' }}>
        {selectedImage && (
          <div className="flex flex-col items-center justify-center p-4 md:p-0 ">
            <img
              src={selectedImage.imageUrl}
              alt="Selected"
              className="w-full h-auto md:w-[70%] md:h-[50%] object-cover rounded-md "
            />
            <div className="mt-4 space-x-4">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                onClick={handleDownload}
              >
                Download
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ImageGallery;
