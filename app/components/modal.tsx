import React from "react";

// Define the props expected by the Modal component
interface ModalProps {
  isOpen: boolean; // Determines whether the modal is open or closed
  onClose: () => void; // Function to handle closing the modal
  children: React.ReactNode; // The content to display inside the modal
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  // If the modal is not open, render nothing (return null)
  if (!isOpen) return null;

  return (
    // Backdrop for the modal: covers the entire screen
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose} // Close the modal when the backdrop is clicked
    >
      {/* Modal container for content */}
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative"
        onClick={(e) => e.stopPropagation()} // Prevent click events from bubbling to the backdrop
      >
        {/* Close button */}
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
          onClick={onClose} // Calls the onClose function to close the modal
        >
          ✖ {/* Cross symbol to indicate "close" */}
        </button>

        {/* Render the children passed to the Modal component */}
        {children}
      </div>
    </div>
  );
};

export default Modal;
