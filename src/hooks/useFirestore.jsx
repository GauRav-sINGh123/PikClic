import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";

const useFirestore = (collectionName) => {
  const [docs, setDocs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let unsubscribe = () => {};

    const getData = async () => {
      try {
        const q = query(collection(db, collectionName), orderBy("createdAt", "desc"));
        unsubscribe = onSnapshot(q, (querySnapshot) => {
          const images = [];
          querySnapshot.forEach((doc) => {
            const imageUrl = doc.data().imageUrl;
            const createdAt = doc.data().createdAt.toDate();
            const userEmail = doc.data().userEmail;
            images.push({ imageUrl, createdAt, userEmail });
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
  }, [collectionName]);

  return { docs, isLoading };
};

export default useFirestore;