import React, { useEffect, useState, useMemo } from 'react';
import BreadCrumbs from '../breadcrumbs/BreadCrumbs';
import FileOperations from '../file-operations/FileOperations';
import Folder from '../folder/Folder';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Spinner } from '@nextui-org/react';
import File from '../file/File';
import { getDocuments, getDownloadURLFile } from '../../firebase/storage';
import { decrypt, encrypt } from '../../utils/crypto';
import { FaFileAlt } from 'react-icons/fa';
import { FaImage } from "react-icons/fa6";
import { RiFolderVideoFill } from "react-icons/ri";
import { MdAudioFile } from "react-icons/md";
import { FaFilePdf } from "react-icons/fa";
import Header from '../header/Header';
import StorageProgress from '../progress/StorageProgress';

export default function Dashboard() {
  const { currentUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { documentId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [changed, setChanged] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [documents, setDocuments] = useState([]);

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
    if (contentType.includes("octet-stream") || contentType.includes("text")) {
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
    fetchData();
    console.log(currentUser)
  }, [changed, documentId]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await getDocuments(decrypt(documentId) + "/");
      setDocuments(res);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching folders:", error);
      setIsLoading(false);
    }
  };

  const filteredDocuments = useMemo(() => {
    if (!searchValue) return documents;
    return documents.filter(doc => doc.name.toLowerCase().includes(searchValue.toLowerCase()));
  }, [searchValue, documents]);

  return (
    <div className='w-[90%] mt-5 m-auto flex flex-col gap-4'>
      <Header setSearchValue={setSearchValue} searchText={searchValue} />
      <BreadCrumbs />
      <StorageProgress/>
      <FileOperations setChanged={setChanged}/>
      <div className='flex flex-wrap gap-10 min-h-72'>
        {isLoading ? (
          <div className='m-auto'>
            <Spinner label="Loading..." size='lg' classNames={{
              circle1: 'w-20 h-20',
              circle2: 'w-20 h-20',
              wrapper: 'w-20 h-20',
              label: 'text-xl'
            }}/>
          </div>
        ) : (
          filteredDocuments.map((doc, index) => {
            return (
              doc.documentType === "folder" ? (
                <Folder 
                  name={doc.name} 
                  key={doc.name} 
                  onClick={() => onClickFolder(doc)}
                  setChanged={setChanged}
                  documentType={doc.documentType}
                />
              ) : (
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
            );
          })
        )}
      </div>
    </div>
  );
}
