import React, { useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";
import { FiFilePlus } from "react-icons/fi"
import { useAuth } from "../../contexts/AuthContext";
import { createFileEmpty } from "../../firebase/storage";
import { decrypt } from "../../utils/crypto";
import { useParams } from "react-router-dom";

export default function CreateFileModal({setChanged}) {
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
  const [fileName, setFileName] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const isInvalid = isFocused && fileName.split('.')[0].length < 3;
  const { currentUser } = useAuth();
  const {documentId} = useParams()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const file = new Uint8Array([])
    await createFileEmpty(decrypt(documentId) + `/${fileName}`, file)
    onClose()
    setFileName("");
    setChanged(true)
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
