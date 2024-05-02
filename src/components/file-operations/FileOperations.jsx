import { Button } from '@nextui-org/react'
import { MdOutlineUploadFile } from "react-icons/md";
import React from 'react'
import CreateFileModal from '../modals/createFileModal';
import CreateFolderModal from '../modals/createFolderModal';

export default function FileOperations() {
  return (
    <div className='flex gap-4 justify-end'>
        <Button 
            className='border border-gray-500 bg-transparent text-gray-900'
            radius='sm' 
            startContent={<MdOutlineUploadFile className='text-xl text-gray-900'/>}
        >
            Upload file
        </Button>
        <CreateFileModal />
        <CreateFolderModal />
    </div>
  )
}
