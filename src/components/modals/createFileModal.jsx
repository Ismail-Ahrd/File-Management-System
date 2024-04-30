import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";
import { FiFilePlus } from "react-icons/fi"
/* import {MailIcon} from './MailIcon.jsx';
import {LockIcon} from './LockIcon.jsx'; */

export default function CreateFileModal() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      {/* <Button onPress={onOpen} color="primary">Open Modal</Button> */}
      <Button 
            className='border border-gray-500 bg-transparent text-gray-900'
            onPress={onOpen}
            radius='none' 
            startContent={<FiFilePlus className='text-xl text-gray-900'/>}
        >
            Create file
        </Button>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Create file</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  /* label="Email" */
                  placeholder="Enter file name"
                  variant="bordered"
                  classNames={{
                    inputWrapper: "h-[50px]"
                  }}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Create file
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
