import { db } from "./firebase";
import { collection, addDoc, getDocs, where, query, doc, getDoc, updateDoc } from "firebase/firestore";

export const createRootFolder = async (userId) => {
    const rootData = {
        name: "root",
        parent: null,
        createdAt: new Date(),
        createdBy: "admin",
        userId: userId,
        path: [],
        updatedAt: new Date(),
        lastAccessed: null,
        documentType: "folder" 
    }

    try {
        //const docRef = await  addDoc(collection(db, "folders"), rootData)
        const docRef = await  addDoc(collection(db, "documents"), rootData)
        //console.log("docRef", docRef)
        console.log('Folder created successfully!');
        return rootData;
    } catch (error) {
        console.error('Error creating folder: ', error);
    }
}

export const getRootFolder = async () => {
    try {
        //const q = query(collection(db, "folders"), where("name", "==", "root"))
        const q = query(collection(db, "documents"), where("name", "==", "root"))
        const res = await getDocs(q);
        //console.log(res.docs[0].id)
        const data = {
            id: res.docs[0].id,
            ...res.docs[0].data()
        }
        return data;
    } catch (error) {
        console.error('Error getting root folder: ', error);
    }
}

/* export const addFolder = async (folderData) => {
    try {
      const docRef = await  addDoc(collection(db, "folders"), folderData)
      //console.log("docRef", docRef)
      console.log('Folder created successfully!');
      const res = {
        id: docRef.id,
        ...folderData
      }
      return res;
    } catch (error) {
      console.error('Error creating folder: ', error);
    }
};
 */
export const addDocument = async (documentData) => {
    try {
      const docRef = await  addDoc(collection(db, "documents"), documentData)
      //console.log("docRef", docRef)
      console.log('Document created successfully!');
      const res = {
        id: docRef.id,
        ...documentData
      }
      return res;
    } catch (error) {
      console.error('Error creating document: ', error);
    }
};



/* export const getFolders = async (userId, parentName) => {
    //const q = query(collection(db, "folders"), where("userId", "==", userId), where("parent", "==", parentName))
    const q = query(collection(db, "documents"), where("userId", "==", userId), where("parent", "==", parentName))
    //const res = await getDocs(collection(db, "folders"));
    const res = await getDocs(q);
    return res.docs;
} */

export const getDocuments = async (userId, parentName) => {
    //const q = query(collection(db, "folders"), where("userId", "==", userId), where("parent", "==", parentName))
    const q = query(collection(db, "documents"), where("userId", "==", userId), where("parent", "==", parentName))
    //const res = await getDocs(collection(db, "folders"));
    const res = await getDocs(q);
    return res.docs;
}

/* export const getFolderById = async (folderId) => {
    try {
        const docRef = doc(db, "folders", folderId)
        const docSnap = await getDoc(docRef);
        //console.log(docSnap)
        const data = {
            id: docSnap.id,
            ...docSnap.data()
        }
        return data
    } catch (error) {
        console.error('Error gettig folder: ', error);
    }
} */

export const getDocumentById = async (documentId) => {
    try {
        const docRef = doc(db, "documents", documentId)
        const docSnap = await getDoc(docRef);
        //console.log(docSnap)
        const data = {
            id: docSnap.id,
            ...docSnap.data()
        }
        return data
    } catch (error) {
        console.error('Error gettig document: ', error);
    }
}

export const updateDocument = async (documentId, data) => {
    try {
        const washingtonRef = doc(db, "documents", documentId);
        const res = await updateDoc(washingtonRef, data);
        console.log(res)
    } catch (error) {
        console.error('Error updating document: ', error);
    }
}