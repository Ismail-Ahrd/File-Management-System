import { Button } from '@nextui-org/react'
import { MdOutlineUploadFile } from "react-icons/md";
import React from 'react'
import CreateFileModal from '../modals/createFileModal';
import CreateFolderModal from '../modals/createFolderModal';
import { createFile, createFolder, getDocuments, getFile, loadLists } from '../../firebase/storage';
import { useAuth } from '../../contexts/AuthContext';
import UploadFileModal from '../modals/uploadFileModal';

export default function FileOperations({setChanged}) {
  const { currentUser } = useAuth()


  return (
    <div className='flex gap-4 justify-end'>
        {/* <Button 
            className='border border-gray-500 bg-transparent text-gray-900'
            radius='sm' 
            startContent={<MdOutlineUploadFile className='text-xl text-gray-900'/>}
            onPress={() => {
              const myString = "This is the content of my file.";
              const myFileName = "example.txt";
              const myContentType = "text/plain";

              // Convert string to File
              const myFile = stringToFile(myString, myFileName, myContentType);
              //loadLists()
              console.log(currentUser.uid)
              //createFile(currentUser.uid + `/${myFile.name}`, myFile)
              //getDocuments(currentUser.uid + "/")
              getFile(currentUser.uid + `/${myFile.name}`)
            }}
        >
            Upload file
        </Button> */}
        <UploadFileModal 
          setChanged={setChanged}
        />
        <CreateFileModal setChanged={setChanged} />
        <CreateFolderModal setChanged={setChanged}/>
    </div>
  )
}
