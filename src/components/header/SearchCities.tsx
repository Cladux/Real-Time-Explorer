"use client";
import { useStore } from "@/lib/store";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { FaSearch } from "react-icons/fa";
import { MdEditLocationAlt } from "react-icons/md";
import SearchCityModal from "./SearchCityModal";

const SearchCities = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { city, country } = useStore();

  return (
    <>
      <Button
        className="cursor-pointer bg-opacity-95"
        fullWidth
        onPress={onOpen}
        startContent={!country && !city ? <FaSearch /> : <MdEditLocationAlt />}
      >
        {country && city ? `${country}, ${city}` : "Search for the city"}
      </Button>
      <Modal size="2xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Find the city</ModalHeader>
              <ModalBody>
                <SearchCityModal />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default SearchCities;
