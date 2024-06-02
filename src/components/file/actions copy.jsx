import { Button, Card, CardBody, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Link } from '@nextui-org/react';
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { MdDownload } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import React, { useState } from 'react'
import UpdateNameModal from '../modals/updateNameModal';
import { deleteDocument, deleteFolder, downloadFile, downloadFolderAsZip } from '../../firebase/storage';
import { useParams } from 'react-router-dom';
import { decrypt } from '../../utils/crypto';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { ref } from 'firebase/storage';
import { storage } from '../../firebase/firebase';

export default function Actions({setHidden, name, setChanged, type}) {
  const [open,setOpen]=useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [isFocused, setIsFocused] = useState(true);
  const [fileName, setFileName] = useState("");
  const isInvalid = isFocused && fileName.split('.')[0].length < 3;



  const {documentId} = useParams()

  
  
  const handleDownloadFolder = async () => {
    try {
      const path=decrypt(documentId) + `/${name}`;
      await downloadFolderAsZip(path,path.length);
    } catch (error) {
      console.error('Error downloading folder as zip', error);
    }
  };

    
  
  const handleDownload = async () => {
    try {
      await downloadFolderAsZip(decrypt(documentId) + `/${name}`);
    } catch (error) {
      console.error('Error downloading folder as zip', error);
    }
  };
  

  // const handleDownload = async () => {
  //   try {
  //     const url = await downloadFile(decrypt(documentId) + `/${name}`);
  //     const a = document.createElement('a');
  //     a.href = url;
  //     // a.download = name;
  //     a.setAttribute('download', name); // Specify the file name
  //     a.setAttribute('target', '_blank');
  //     document.body.appendChild(a);
  //     a.click();
  //     document.body.removeChild(a);
  //   } catch (error) {
  //     console.error('Error downloading file', error);
  //   }
  // };


  return (
    <div className="absolute bottom-0 right-0 gap-2">
      {showModal ? (
        <form className='z-50'>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-sm">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Rename
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <Input
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Enter new file name"
                    variant="bordered"
                    classNames={{
                      inputWrapper: "h-[50px]"
                    }}
                    value={fileName}
                    onValueChange={setFileName}
                    isInvalid={isInvalid}
                    color={isInvalid ? "danger" : ""}
                    errorMessage={isInvalid && "File name must be at least 3 charechters"}
                  />
                  
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                 <Button color="danger" variant="flat" >
                    Close
                  </Button>
                  <Button color="primary" type="submit" isDisabled={fileName.split('.')[0].length < 3}>
                    Create file
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </form>
      ) : null}

   <Dropdown onClose={() => setHidden(false)}>
      <DropdownTrigger>
        <Button isIconOnly size="sm" variant="light" onClick={()=>setHidden(true)}>
          <BsThreeDotsVertical className="text-default-600 text-lg z-10" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem startContent={<MdModeEdit size={20} color="blue"/>} className='text-blue-600 font-bold' onPress={() => {setShowModal(true)}} >
            Rename
        </DropdownItem>
        <DropdownItem 
            startContent={<MdDownload size={20} color="green"/>} 
            className='text-green-700 font-bold'
            onPress={async () => {
                if(type == "file") {
                    await handleDownload()
                } else {
                    await handleDownloadFolder()
                }
            }}
        >
            Download
        </DropdownItem>
        <DropdownItem 
            startContent={<MdDelete size={20} color="red" />} 
            className='text-red-600 font-bold'
            onPress={async () => {
                //console.log(decrypt(documentId)+ `/${name}`)
                if(type == "file") {
                    await deleteDocument(decrypt(documentId)+ `/${name}`)
                } else {
                    await deleteFolder(decrypt(documentId)+ `/${name}`)
                }
                
                setChanged(true)
            }}   
        >
            Delete
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
  )
}
