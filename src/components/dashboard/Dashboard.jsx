import React, { useEffect, useState } from 'react'
import BreadCrumbs from '../breadcrumbs/BreadCrumbs'
import FileOperations from '../file-operations/FileOperations'
import { useFileFolder } from '../../contexts/FileFolderContext'
import Folder from '../folder/Folder'
import { useNavigate, useParams } from 'react-router-dom'
import { getDocuments } from '../../firebase/db'
import { useAuth } from '../../contexts/AuthContext'
import { Spinner } from '@nextui-org/react'
import File from '../file/File'

export default function Dashboard() {
  const { setCurrentFolder, currentFolder, documents, setDocuments } = useFileFolder()
  const { currentUser } = useAuth()
  const { folderId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true)
  

  const onClickFolder = (folder) => {
    localStorage.setItem("currentFolder", JSON.stringify(folder));
    setCurrentFolder(folder)
    navigate(`/dashboard/${folder.id}`)
  }

  const onClickFile = (file) => {
    navigate(`/dashboard/file/${file.id}`)
  }

  useEffect(() => {
    fetchData()
  }, [currentFolder])

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const res = await getDocuments(currentUser.uid, folderId);
      const data = res.map(doc => {
        const folder = {
            id: doc.id,
            ...doc.data()
        }
        return folder
      });
      setDocuments(data);
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching folders:", error);
      setIsLoading(false)
    }
  };

  return (
    <div className='w-[90%] mt-5 m-auto flex flex-col gap-4'>
      <BreadCrumbs />
      <FileOperations />
      <div className='flex flex-wrap gap-10 min-h-72'>
      {
        isLoading ?
        <div className='m-auto'>
          <Spinner label="Loading..." size='lg' classNames={{
              circle1: 'w-20 h-20',
              circle2: 'w-20 h-20',
              wrapper: 'w-20 h-20',
              label: 'text-xl'
          }}/>
        </div>
        :
        documents.map((doc) => {
          return (
              doc.documentType === "folder" ?
              <Folder name={doc.name} key={doc.name} onClick={() => onClickFolder(doc)}>
                {doc.name}
              </Folder>
              :
              <File name={doc.name + "." + doc.extension} key={doc.id} onClick={() => onClickFile(doc)}/>
          )
        })
      }
      {/* <File name={"test.txt"} /> */}
      </div> 
    </div>
  )
}
