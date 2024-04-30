import { createContext, useContext, useEffect, useState } from "react";
import { getFolders, getRootFolder } from "../firebase/db";
import { useAuth } from "./AuthContext";

const FileFolderContext = createContext()

export function useFileFolder() {
    return useContext(FileFolderContext);
}


export function FileFolderProvider({children}) {
  const { currentUser } = useAuth()  
  const [currentFolder, setCurrentFolder] = useState();
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]); 
  const [loading, setLoading] = useState(true);

  /* useEffect(() => {
    getRootfolder()
    .then(() => getfolders())
    .catch(error => console.error("Error fetching root folder:", error));
  }, [])

  async function getfolders() {
    if (!currentFolder) return;
    console.log(currentFolder)
    const res = await getFolders(currentUser.uid, currentFolder.name)
    const data = res.map(doc => doc.data())
    //console.log(data)
    setFolders(data)
    //setFolders(prevFolders => [...prevFolders, ...res.map(doc => doc.data())]);
  }

  async function getRootfolder() {
    const rootFolder = await getRootFolder();
    setCurrentFolder(rootFolder)
    setLoading(false)
  } */

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rootFolder = await getRootFolder();
        setCurrentFolder(rootFolder);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching root folder:", error);
        setLoading(false);
      }
    };
  
    fetchData();
  
  }, []);
  
  useEffect(() => {
    if (currentFolder) {
      const fetchData = async () => {
        try {
          //console.log(currentFolder);
          const res = await getFolders(currentUser.uid, currentFolder.id);
          const data = res.map(doc => {
            const folder = {
                id: doc.id,
                ...doc.data()
            }
            return folder
          });
          //console.log(data)
          setFolders(data);
        } catch (error) {
          console.error("Error fetching folders:", error);
        }
      };
  
      fetchData();
    }
  }, [currentFolder]); 
  

  const value = {
    currentFolder,
    folders,
    files,
    setFolders,
    setFiles,
    setCurrentFolder
  }

  return (
    <FileFolderContext.Provider value={value}>
     {!loading && children}
    </FileFolderContext.Provider>
  )
}

