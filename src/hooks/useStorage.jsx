import React, { useState } from 'react'
import { addDoc, collection,  } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../config/firebase';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../config/firebase';
import   { useAuth }  from '../context/AuthContext';


function useStorage() {
    const [progress,setProgress]=useState(0)
    const [url,setUrl]=useState(null)
    const {user}=useAuth()

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
          async() => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
             
            setUrl(downloadURL);
            setProgress(progress);
    
          // Storing Data into the firestore database
              await addDoc(collection(db, "images"), {
                imageUrl: downloadURL,
                createdAt:new Date(),
                userEmail:user?.email,
                user:user?.displayName
              })
            });
    };
  
   
  return {
    progress,url,startUpload
  }
}

export default useStorage