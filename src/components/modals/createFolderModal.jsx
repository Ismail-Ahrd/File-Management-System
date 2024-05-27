import React, { useRef, useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";
import { FiFilePlus, FiFolderPlus } from "react-icons/fi"
import { useAuth } from "../../contexts/AuthContext";
import { createFolder } from "../../firebase/storage";
import { useParams } from "react-router-dom";
import { decrypt } from "../../utils/crypto";


export default function CreateFolderModal({setChanged}) {
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
  const {documentId} = useParams()
  const [folderName, setFolderName] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const isInvalid = isFocused && folderName.length < 3;
  const { currentUser } = useAuth();


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (folderName.length >= 3) {
      await createFolder(decrypt(documentId)+ `/${folderName}`)
      setChanged(true)
    }
    setFolderName("")
    onClose()
  }

  

  return (
    <>
      <Button 
        className='border border-gray-500 bg-transparent text-gray-900'
        onPress={onOpen}
        radius='sm' 
        startContent={<FiFolderPlus className='text-xl text-gray-900'/>}
      >
        Create folder
      </Button>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top"
      >
        <form onSubmit={handleSubmit}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Create folder</ModalHeader>
                <ModalBody>
                  <Input
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Enter folder name"
                    variant="bordered"
                    classNames={{
                      inputWrapper: "h-[50px]"
                    }}
                    value={folderName}
                    onValueChange={setFolderName}
                    isInvalid={isInvalid}
                    color={isInvalid ? "danger" : ""}
                    errorMessage={isInvalid && "Folder name must be at least 3 charechters"}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" type="button" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" type="submit" isDisabled={folderName.length < 3}>
                    Create folder
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </form>
      </Modal> 
    </>
  );
}