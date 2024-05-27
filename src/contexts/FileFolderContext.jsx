import { createContext, useContext, useEffect, useState } from "react";
import { getRootFolder } from "../firebase/db";
import { useAuth } from "./AuthContext";
import { useLocation } from "react-router-dom";

const FileFolderContext = createContext()

export function useFileFolder() {
    return useContext(FileFolderContext);
}


export function FileFolderProvider({children}) {
  const { currentUser } = useAuth()  
  const [path, setPath] = useState("");
  const location=useLocation();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    setLoading(true)
    let list = location.pathname.split("/")
    console.log(list)
    if (list.includes("file")) {
      setPath(location.pathname.substring(16))

    } else {
      setPath(location.pathname.substring(11))
    }
    setLoading(false)
  }, [location.pathname]);

  // const initialize = async () => {
  //   const folder = localStorage.getItem("currentFolder")
  //   if (folder != "undefined" && folder != null) {
  //     setCurrentFolder(JSON.parse(folder))
  //     setLoading(false)
  //   } else {
  //     try {
  //       const rootFolder = await getRootFolder();
  //       localStorage.setItem("currentFolder", JSON.stringify(rootFolder));
  //       setCurrentFolder(rootFolder);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching root folder:", error);
  //       setLoading(false);
  //     }
  //   }
    
  // };
  
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
    path,
  }

  return (
    <FileFolderContext.Provider value={value}>
     {!loading&&children}
    </FileFolderContext.Provider>
  )
}

