import React, { useEffect, useState } from 'react'
import BreadCrumbs from '../breadcrumbs/BreadCrumbs'
import FileOperations from '../file-operations/FileOperations'
import Folder from '../folder/Folder'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { Spinner } from '@nextui-org/react'
import File from '../file/File'
import { getDocuments, getDownloadURLFile } from '../../firebase/storage'
import { decrypt, encrypt } from '../../utils/crypto'
import { FaFileAlt } from 'react-icons/fa'
import { FaImage } from "react-icons/fa6";
import { RiFolderVideoFill } from "react-icons/ri";
import { MdAudioFile } from "react-icons/md";
import { FaFilePdf } from "react-icons/fa";

export default function Dashboard() {
  const [documents, setDocuments] = useState()
  const { currentUser } = useAuth()
  const location = useLocation()
  const navigate = useNavigate();
  const { documentId } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [changed, setChanged] = useState(false)

  const hoc = (contentType) => {
    const className="text-[#6B7280] text-7xl"
    if (contentType.includes("image")) {
      return <FaImage className={className} />
    } else if (contentType.includes("video")) {
      return <RiFolderVideoFill className={className}/>
    } else if (contentType.includes("audio")) {
      return <MdAudioFile className={className}/>
    }else if (contentType.includes("pdf")) {
      return <FaFilePdf className={className}/>
    }
    else {
      return <FaFileAlt className="text-[#6B7280] text-7xl"/>
    }
  }

  const onClickFolder = (folder) => {
    navigate(`/dashboard/${encrypt(folder.path)}`)
  }

  const onClickFile = (file) => {
    const contentType = file.contentType
    //console.log(contentType)
    if (contentType.includes("octet-stream")) {
      navigate(`/dashboard/file/${encrypt(file.path)}`)
    } else if (contentType.includes("text")) {
      navigate(`/dashboard/file/${encrypt(file.path)}`)
    } 
    else {
      openInBrowser(file.name)
    }
    
  }

  const openInBrowser = async (name) => {
    try {
      const url = await getDownloadURLFile(decrypt(documentId) + `/${name}`);
      const a = document.createElement('a');
      a.href = url;
      // a.download = name;
      a.setAttribute('download', name);
      a.setAttribute('target', '_blank');
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading file', error);
    }
  };


  useEffect(() => {
    setChanged(false)
    fetchData()
  }, [changed, documentId])

  const fetchData = async () => {
    setIsLoading(true)
    try {
      console.log(decrypt(documentId))
      const res = await getDocuments(decrypt(documentId) + "/")
      //console.log(res);
      setDocuments(res);
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching folders:", error);
      setIsLoading(false)
    }
  };

  return (
    <div className='w-[90%] mt-5 m-auto flex flex-col gap-4'>
      <BreadCrumbs />
      <FileOperations setChanged={setChanged}/>
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
        documents.map((doc, index) => {
          return (
              doc.documentType === "folder" ?
              <Folder 
                name={doc.name} 
                key={doc.name} 
                onClick={() => onClickFolder(doc)
                }
                setChanged={setChanged}
                documentType={doc.documentType}
              />
              :
              <File 
                name={doc.name} 
                key={doc.name} 
                onClick={() => onClickFile(doc)} 
                icon={hoc(doc.contentType)}
                size={doc.size}
                setChanged={setChanged}
                documentType={doc.documentType}
              />
          )
        })
      }
      {/* <File name={"test.txt"} /> */}
      </div> 
    </div>
  )
}
