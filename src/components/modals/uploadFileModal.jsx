import React, { useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { MdOutlineUploadFile } from "react-icons/md";
import FileDropzone from "./fileDropZone";
import { decrypt } from "../../utils/crypto";
import { createFile } from "../../firebase/storage";
import { useParams } from "react-router-dom";

export default function UploadFileModal({setChanged}) {
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] =  useState(false)
  const {documentId} = useParams()

  const handleUploadFile = async () => {
    setIsLoading(true)
    try {
      await createFile(decrypt(documentId) + `/${selectedFile.name}`, selectedFile)
    } catch (error) {
      const a = document.createElement('a');
      a.href = "https://buy.stripe.com/test_3cs7tR3ON9sR3oAcMM";
      //a.setAttribute('download', name);
      a.setAttribute('target', '_blank');
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
    setIsLoading(false)
    setChanged(true)
    onClose()
  }

  return (
    <>
      <Button 
            className='border border-gray-500 bg-transparent text-gray-900'
            radius='sm' 
            startContent={<MdOutlineUploadFile className='text-xl text-gray-900'/>}
            onPress={onOpen}
        >Upload file</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Upload file</ModalHeader>
              <ModalBody>
                <FileDropzone setSelectedFile={setSelectedFile} selectedFile={selectedFile}/>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleUploadFile} isLoading={isLoading}>
                  Upload
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
