import React from "react";
import { Toast, ToastToggle } from "flowbite-react";
import { HiCheck, HiX, HiExclamation } from "react-icons/hi";

const typeStyles = {
  success: {
    icon: <HiCheck className='h-5 w-5' />,
    iconClass: "bg-green-100 text-green-500",
  },
  error: {
    icon: <HiX className='h-5 w-5' />,
    iconClass: "bg-red-100 text-red-500",
  },
  warning: {
    icon: <HiExclamation className='h-5 w-5' />,
    iconClass: "bg-yellow-100 text-yellow-500",
  },
  info: {
    icon: <HiExclamation className='h-5 w-5' />,
    iconClass: "bg-blue-100 text-blue-500",
  },
};

export default function ToastNotification({
  show,
  message,
  type = "success",
  onClose,
}) {
  if (!show) return null;
  const { icon, iconClass } = typeStyles[type] || typeStyles.success;
  return (
    <div className='fixed top-18 right-0 z-[9999] max-w-md px-2 pointer-events-none'>
      <div className='pointer-events-auto'>
        <Toast>
          <div
            className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${iconClass}`}>
            {icon}
          </div>
          <div className='ml-3 text-sm font-normal'>{message}</div>
          <ToastToggle onClick={onClose} />
        </Toast>
      </div>
    </div>
  );
}
