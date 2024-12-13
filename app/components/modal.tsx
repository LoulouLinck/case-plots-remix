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
      className="fixed inset-0 bg-green-900 bg-opacity-30 dark:bg-darkGreen-800 dark:bg-opacity-90 flex items-center justify-center z-50"
      onClick={onClose} // Close the modal when the backdrop is clicked
    >
      {/* Modal container for content */}
      <div
        className="bg-white dark:bg-darkGreen-600 p-6 rounded-lg shadow-lg w-full max-w-md relative"
        onClick={(e) => e.stopPropagation()} // Prevent click events from bubbling to the backdrop
      >
        {/* Close button */}
        <button
          className="absolute top-2 right-2 text-green-600 dark:text-darkGreen-100 hover:text-black dark:hover:text-darkGreen-200"
          onClick={onClose} // Calls the onClose function to close the modal
          style={{
            fontSize: "30px", // Increases the size of the cross symbol
            lineHeight: "1", // Ensures the button doesn't stretch vertically
          }}
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
