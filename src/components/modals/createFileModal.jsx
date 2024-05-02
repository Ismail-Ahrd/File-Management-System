import React, { useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";
import { FiFilePlus } from "react-icons/fi"
import { useAuth } from "../../contexts/AuthContext";
import { useFileFolder } from "../../contexts/FileFolderContext";
import { addDocument } from "../../firebase/db";

export default function CreateFileModal() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [fileName, setFileName] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const isInvalid = isFocused && fileName.split('.')[0].length < 3;
  const { currentFolder, setDocuments, documents } = useFileFolder()
  const { currentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let extension;
    const fileNameList = fileName.split('.')
    if (fileNameList[0].length >= 3) {
      if (fileNameList.length == 1 || fileNameList[1] == '') {
        extension = "txt";
      } else {
        extension = fileNameList[fileNameList.length - 1]
      }
    }

    const path = [...currentFolder.path];
    path.push({
      name: currentFolder.name,
      id: currentFolder.id
    })

    const data = {
      name: fileNameList[0],
      parent: currentFolder.id,
      createdAt: new Date(),
      createdBy: currentUser.displayName,
      userId: currentUser.uid,
      path: path,
      updatedAt: new Date(),
      lastAccessed: null,
      data: "",
      //url: "",
      extension: extension,
      documentType: "file"
    }

    console.log(data)
    const res = await addDocument(data);
    setDocuments([...documents, res])
    
    setFileName("");
  }

  return (
    <>
      <Button 
        className='border border-gray-500 bg-transparent text-gray-900'
        onPress={onOpen}
        radius='sm' 
        startContent={<FiFilePlus className='text-xl text-gray-900'/>}
      >
        Create file
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
                <ModalHeader className="flex flex-col gap-1">Create file</ModalHeader>
                <ModalBody>
                  <Input
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Enter file name"
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
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" type="submit" isDisabled={fileName.split('.')[0].length < 3}>
                    Create file
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
