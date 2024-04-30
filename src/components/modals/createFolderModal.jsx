import React, { useRef, useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";
import { FiFilePlus, FiFolderPlus } from "react-icons/fi"
import { useFileFolder } from "../../contexts/FileFolderContext";
import { useAuth } from "../../contexts/AuthContext";
import { addFolder } from "../../firebase/db";


export default function CreateFolderModal() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [folderName, setFolderName] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const isInvalid = isFocused && folderName.length < 3;
  const { currentUser } = useAuth();
  const { folders, setFolders, currentFolder, setCurrentFolder } = useFileFolder();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const path = [...currentFolder.path];
    path.push({
      name: currentFolder.name,
      id: currentFolder.id
    })
    
    if (folderName.length >= 3) {
      const data = {
        name: folderName,
        parent: currentFolder.id,
        createdAt: new Date(),
        createdBy: currentUser.displayName,
        userId: currentUser.uid,
        path: path,
        updatedAt: new Date(),
        lastAccessed: null 
      }
      const res = await addFolder(data);
      setFolders([...folders, res])
    }
    setFolderName("")
  }
  

  return (
    <>
      <Button 
            className='border border-gray-500 bg-transparent text-gray-900'
            onPress={onOpen}
            radius='none' 
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