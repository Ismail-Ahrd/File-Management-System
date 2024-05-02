import { createContext, useContext, useEffect, useState } from "react";
import { getRootFolder } from "../firebase/db";
import { useAuth } from "./AuthContext";

const FileFolderContext = createContext()

export function useFileFolder() {
    return useContext(FileFolderContext);
}


export function FileFolderProvider({children}) {
  const { currentUser } = useAuth()  
  const [currentFolder, setCurrentFolder] = useState();
/*   const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);  */
  const [loading, setLoading] = useState(true);

  const [documents, setDocuments] = useState([])

  useEffect(() => {
    /* const fetchData = async () => {
      try {
        const rootFolder = await getRootFolder();
        setCurrentFolder(rootFolder);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching root folder:", error);
        setLoading(false);
      }
    };
  
    fetchData(); */
    initialize()
  }, []);

  const initialize = async () => {
    const folder = localStorage.getItem("currentFolder")
    if (folder != "undefined" && folder != null) {
      setCurrentFolder(JSON.parse(folder))
      setLoading(false)
    } else {
      console.log("Hello3")
      try {
        const rootFolder = await getRootFolder();
        localStorage.setItem("currentFolder", JSON.stringify(rootFolder));
        setCurrentFolder(rootFolder);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching root folder:", error);
        setLoading(false);
      }
    }
    
  };
  
  /* useEffect(() => {
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
  }, [currentFolder]);  */
  

  const value = {
    currentFolder,
/*     folders,
    files, */
    documents,
/*     setFolders,
    setFiles, */
    setCurrentFolder,
    setDocuments
  }

  return (
    <FileFolderContext.Provider value={value}>
     {!loading && children}
    </FileFolderContext.Provider>
  )
}

