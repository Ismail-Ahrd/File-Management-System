import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getDocumentById, updateDocument } from '../../firebase/db';
import { useAuth } from '../../contexts/AuthContext';
import BreadCrumbs from '../breadcrumbs/BreadCrumbs';
import { Button, Spinner } from '@nextui-org/react';
import { FaArrowLeft } from 'react-icons/fa';
import { IoSaveSharp } from 'react-icons/io5';
import CodeEditor from './CodeEditor';
import { createFile, getFile } from '../../firebase/storage';
import { decrypt } from '../../utils/crypto';
import Header from '../header/Header';



export default function CreatedFileComponent() {
  const navigate = useNavigate()
  const { documentId } = useParams();
  const [fileName, setFileName] = useState("")
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState("")
  const [initialData, setInitialData] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  function stringToFile(stringContent, fileName, contentType) {
    const blob = new Blob([stringContent], { type: contentType });
    const file = new File([blob], fileName);
    return file;
  }

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setIsLoading(true)
    try {
      //const res = await getDocumentById(documentId);
      const res = await getFile(decrypt(documentId))
      //console.log(decrypt(documentId).split("/"))
      const list = decrypt(documentId).split("/")
      setFileName(list[list.length - 1])
      //setFile()
      setData(res)
      setInitialData(res)
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching folders:", error);
      setIsLoading(false)
    }
  };


  const onSave = async () => {
    //console.log(data)
    setIsSaving(true)
    const file = stringToFile(data, fileName, "text/plain")
    await createFile(decrypt(documentId), file)
    setIsSaving(false)
    setInitialData(data)
  }
  

  return (
    <div className='w-[90%] mt-5 m-auto flex flex-col gap-5'>
      <Header hasInput={false}/>
        {
            isLoading ?
              <BreadCrumbs/>
            :
              <>
                {/* <BreadCrumbs fileName={file.name+"."+file.extension}/> */}
                <BreadCrumbs/>
                <div className='flex justify-between'>
                  <p className='text-2xl font-semibold whitespace-nowrap'> 
                    { fileName }
                     {data!==initialData && <span className='text-red-600 text-sm ml-1'> [* . Modified]</span>}
                  </p>
                  <div className='flex gap-4'>
                    {
                      isSaving ?
                      <Button
                        className='text-white'
                        radius='sm'
                        color='success' 
                        startContent={<IoSaveSharp className='text-xl text-white'/>}
                        isLoading
                      >
                        Saving..
                      </Button>
                      :
                      <Button 
                        className='text-white'
                        radius='sm'
                        color='success' 
                        startContent={<IoSaveSharp className='text-xl text-white'/>}
                        onPress={onSave}
                        isDisabled={data===initialData}
                      >
                        Save
                      </Button>
                    }
                    <Button 
                        className='border border-gray-500 bg-transparent text-gray-900'
                        radius='sm' 
                        startContent={<FaArrowLeft className='text-xl text-gray-900'/>}
                        onPress={() => {navigate(-1)}}
                    >
                        Go back
                    </Button>
                  </div>
                </div>
              </>
        }
        <div className='flex min-h-72 '>
            {
                isLoading ?
                <>
                <div className='m-auto'>
                    <Spinner label="Loading..." size='lg' classNames={{
                        circle1: 'w-20 h-20',
                        circle2: 'w-20 h-20',
                        wrapper: 'w-20 h-20',
                        label: 'text-xl'
                    }}/>
                </div>
                </>
                :
                <>
                  <div className='w-full'>
                    <CodeEditor data={data} setData={setData} fileName={fileName} extension={fileName.split(".")[1]}/>
                    {/* <Code /> */}
                  </div>
                </>
            }
        </div>
        
    </div>
  )
}
