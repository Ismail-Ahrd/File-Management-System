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

export default function Actions({setHidden, name, setChanged, type}) {
  const [open,setOpen]=useState(false);
  const {documentId} = useParams()

  
  
  const handleDownloadFolder = async () => {
    try {
      const zip = new JSZip();
      await downloadFolderAsZip(decrypt(documentId) + `/${name}`, zip);
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      saveAs(zipBlob, name+'.zip');
    } catch (error) {
      console.error('Error downloading folder as zip', error);
    }
  };

    
  
  const handleDownload = async () => {
    try {
        const blob = await downloadFile(decrypt(documentId) + `/${name}`);
        const url = URL.createObjectURL(blob);
        console.log(url)
        const a = document.createElement('a');
        a.href = url;
        a.download = name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error downloading file', error);
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

   <Dropdown onClose={() => setHidden(false)}>
      <DropdownTrigger>
        <Button isIconOnly size="sm" variant="light" onClick={()=>setHidden(true)}>
          <BsThreeDotsVertical className="text-default-600 text-lg z-10" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem startContent={<MdModeEdit size={20} color="blue"/>} className='text-blue-600 font-bold' onPress={() => setOpen(true)}>
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
