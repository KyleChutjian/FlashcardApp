import React from "react";

type ConfirmationModalProps = {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  message,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p>{message}</p>
        <div className="mt-4 flex justify-end">
          <button className="bg-red-500 text-white px-4 py-2 mr-2 rounded" onClick={onConfirm}>
            Confirm
          </button>
          <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;