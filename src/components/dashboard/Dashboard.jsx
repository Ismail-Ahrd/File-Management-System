import React from 'react'
import BreadCrumbs from '../breadcrumbs/BreadCrumbs'
import FileOperations from '../file-operations/FileOperations'
import { useFileFolder } from '../../contexts/FileFolderContext'
import Folder from '../folder/Folder'

export default function Dashboard() {
  const { folders, setCurrentFolder, } = useFileFolder()

  const onClick = (folder) => {
    //console.log(folder)
    setCurrentFolder(folder)
  }

  return (
    <div className='w-[90%] mt-5 m-auto flex flex-col gap-4'>
      <BreadCrumbs />
      <FileOperations />
      <div className='grid grid-cols-4 gap-4'>
      {folders.map((folder) => {
        return (
          <Folder name={folder.name} key={folder.name} onClick={() => onClick(folder)}>
            {folder.name}
          </Folder>
        )
      })}
      </div> 
    </div>
  )
}
