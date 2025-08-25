"use client";

import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function ConfirmDialog({
    open,
    onClose,
    onConfirm,
    message = "Are you sure you want to proceed?",
}) {
    return (
        <Modal show={open} size="md" onClose={onClose} popup>
            <ModalHeader />
            <ModalBody>
                <div className="text-center">
                    <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        {message}
                    </h3>
                    <div className="flex justify-center gap-4">
                        <Button
                            color="red"
                            onClick={() => {
                                onConfirm?.(); // ✅ Run the custom confirm function
                                onClose(); // ✅ Close after confirm
                            }}
                        >
                            Yes, I'm sure
                        </Button>
                        <Button color="alternative" onClick={onClose}>
                            No, cancel
                        </Button>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    );
}
