import { collection, onSnapshot, orderBy, query, deleteDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db, storage } from "../config/firebase";
import { useAuth } from "../context/AuthContext";
import { deleteObject, ref } from "firebase/storage";

const useFirestore = (subCollectionName) => {
  const [docs, setDocs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    let unsubscribe = () => {};

    const getData = async () => {
      if (!user) return;

      try {
        const userCollectionRef = collection(db, "users", user.uid, subCollectionName);
        const q = query(userCollectionRef, orderBy("createdAt", "desc"));
        unsubscribe = onSnapshot(q, (querySnapshot) => {
          const images = [];
          querySnapshot.forEach((doc) => {
            const id = doc.id; // Get the document ID
            const imageUrl = doc.data().imageUrl;
            const createdAt = doc.data().createdAt.toDate();
            const userEmail = doc.data().userEmail;
            images.push({ id, imageUrl, createdAt, userEmail });
          });
          setDocs(images);
          setIsLoading(false);
        });
      } catch (error) {
        console.error("Error fetching Firestore data: ", error);
        setIsLoading(false);
      }
    };

    getData();
    return () => unsubscribe && unsubscribe();
  }, [subCollectionName, user]);

  const deleteDocument = async (docId, imageUrl) => {
    if (!user) return;
    try {
      // Delete the image from Firebase Storage
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);

      // Delete the document from Firestore
      const docRef = doc(db, "users", user.uid, subCollectionName, docId);
      await deleteDoc(docRef);
      
      setDocs((prevDocs) => prevDocs.filter((doc) => doc.id !== docId));
    } catch (error) {
      console.error("Error deleting document and image: ", error);
    }
  };

  return { docs, isLoading, deleteDocument };
};

export default useFirestore;
