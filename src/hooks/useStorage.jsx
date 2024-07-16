import React, { useState } from "react";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebase";
import { v4 as uuidv4 } from "uuid";
import { db } from "../config/firebase";
import { useAuth } from "../context/AuthContext";

function useStorage() {
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState(null);
  const { user } = useAuth();

  const startUpload = (file) => {
    if (!file) {
      return;
    }
    const fileId = uuidv4();
    const formatFile = file.type.split("/")[1];
    const storageRef = ref(storage, `images/${fileId}.${formatFile}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        // Handle unsuccessful uploads
        toast.error(error.message);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

        setUrl(downloadURL);
        setProgress(progress);

        // Storing Data into the Firestore database
        if (user) {
          const userRef = doc(db, "users", user.uid);

          // Add the image URL to the "images" subcollection

          const imagesCollectionRef = collection(userRef, "images");
          await addDoc(imagesCollectionRef, {
            imageUrl: downloadURL,
            createdAt: new Date(),
            userEmail: user.email,
          });
        }
      }
    );
  };

  return {
    progress,
    url,
    startUpload,
  };
}

export default useStorage;
