import {getDownloadURL, listAll, ref, uploadBytes, uploadString, getMetadata, deleteObject, getBlob } from "firebase/storage";
import { storage } from "./firebase";

export const createRootFolder = async (userId) => {
    const newDir = ref(storage, userId)
    const ghostFile = ref(newDir, '.ghostfile')
    await uploadString(ghostFile, '')
}

export const getDocuments = async (path) => {
    const { prefixes, items } = await listAll(ref(storage, path));

    const folderPromises = prefixes.map(async (pre) => {
        return {
            documentType: "folder",
            name: pre.name,
            path: pre.fullPath,
        };
    });

    const filePromises = items
        .filter(file => file.name !== '.ghostfile')
        .map(async (item) => {
            const metadata = await getMetadata(ref(storage, path + item.name));
            //console.log(metadata)
            return {
                documentType: "file",
                name: item.name,
                path: item.fullPath,
                size: metadata.size,
                contentType: metadata.contentType
            };
        });

    const folders = await Promise.all(folderPromises);
    const files = await Promise.all(filePromises);

    const combinedList = [...folders, ...files];
    combinedList.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
        }
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
        }
        return 0;
    });

    return combinedList;
};


export const getFile = async (path) => {
    const refFile = ref(storage, path)
    const url = await getDownloadURL(refFile)
    const res = await fetch(url)
    return await res.text();
}


export const createFile = async (path, file) => {
    const fileRef = ref(storage, path)
    //const file = ref(newDir, file.name)
    await uploadBytes(fileRef, file)
}


export const createFolder = async (path) => {
    //const storageRef = ref(storage, path)
    const newDir = ref(storage, path)
    const ghostFile = ref(newDir, '.ghostfile')
    await uploadString(ghostFile, '')
}

export const deleteDocument = async (path) => {
    const docRef = ref(storage, path)
    await deleteObject(docRef)
}

export async function deleteFolder(path) {
    const folderRef = ref(storage, path)
    const listResult = await listAll(folderRef);
    const deletePromises = [];

    // Delete all files in the folder
    listResult.items.forEach((itemRef) => {
        deletePromises.push(deleteObject(itemRef));
    });

    // Recursively delete all subfolders
    listResult.prefixes.forEach((subfolderRef) => {
        deletePromises.push(deleteFolder(subfolderRef));
    });

    await Promise.all(deletePromises);
}

export const downloadFolderAsZip = async (folderPath, zip) => {
    const folderRef = ref(storage, folderPath);
    const folderContents = await listAll(folderRef);
  
    for (const itemRef of folderContents.items) {
      if (itemRef.contentType === 'application/octet-stream') {
        const blob = await getBlob(itemRef);
        const filePath = itemRef.fullPath.replace(folderPath, '');
        zip.file(filePath, blob);
      } else {
        const subFolderPath = itemRef.fullPath.replace(folderPath, '');
        const subFolderZip = zip.folder(subFolderPath);
        await downloadFolderAsZip(itemRef.fullPath, subFolderZip);
      }
    }
};

export const getDownloadURLFile = async (path) => {
    const refFile = ref(storage, path)
    const url = await getDownloadURL(refFile)
    return url;
}

export const downloadFile = async (path) => {
    const refFile = ref(storage, path);
    const blob = await getBlob(refFile);
    return blob;
}

export async function loadLists () {
    const { prefixes, items } = await listAll(ref(storage, "/testFolder/testFolder5"))
    prefixes.forEach((pre) => {
        console.log("name prefixes", pre.name)
        console.log("fullPath prefixes", pre.fullPath)
        console.log("parent prefixes", pre.parent.name)
        console.log("root prefixes", pre.root.name)
        console.log("storage prefixes", pre.storage)
        console.log("_______________________________")
    })
    
    console.log("items", items)
    const test =  {
        directories: prefixes,
        files: items.filter(file => file.name !== '.ghostfile')
    }

    console.log(test)
}
