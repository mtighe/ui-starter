import { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/firestore";

function getUserId() {
  // TODO throw error if not logged in
  return firebase.auth().currentUser.uid;
}

const firestore = () => firebase.firestore();

function userStore() {
  return firestore().collection("users").doc(getUserId());
}

// const songCollection = () => userStore().collection("songs");

export async function addDoc(collection, doc) {
  return collection
    .add(doc)
    .then((docRef) => {
      return {
        id: docRef.id,
      };
    })
    .catch((error) => {
      return { error };
    })
    .then((val) => val);
}

export async function updateDoc(collection, id, doc) {
  return collection
    .doc(id)
    .update(doc)
    .then((docRef) => {
      return {};
    })
    .catch((error) => {
      return { error };
    })
    .then((val) => val);
}

export async function deleteDoc(collection, doc) {
  const { id } = doc;

  return collection
    .doc(id)
    .delete()
    .then(() => ({
      success: true,
    }))
    .catch((error) => {
      return { error };
    })
    .then((val) => val);
}

export function useCollection({
  collection,
  orderBy,
  orderDirection = "asc",
} = {}) {
  const [fetching, setFetching] = useState(true);
  const [fetched, setFetched] = useState(false);
  const [collectionData, setCollectionData] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      let query = collection;
      if (orderBy) query = query.orderBy(orderBy, orderDirection);
      const songs = await query
        .get()
        .then((querySnapshot) =>
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        )
        .catch((error) => setError(error));
      setFetched(true);
      setFetching(false);
      setCollectionData(songs);
    };
    fetchData();
  }, [collection, orderBy, orderDirection, setCollectionData]);

  return { fetching, fetched, collectionData, error };
}

export function useDoc(collection, id) {
  const [fetching, setFetching] = useState(true);
  const [fetched, setFetched] = useState(false);
  const [data, setData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const doc = await collection
        .doc(id)
        .get()
        .then((d) => ({ id: d.id, ...d.data() }))
        .catch((error) => setError(error));
      const contentDoc = await doc.contentRef.get();
      setData({ ...doc, content: contentDoc.data().content });
      setFetching(false);
      setFetched(true);
    };

    fetchData();
  }, [collection, id]);

  return { fetching, fetched, data, error };
}
