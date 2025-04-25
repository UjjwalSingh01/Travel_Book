import React, { useEffect } from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';

interface AlertProps {
  message: string;
  success: boolean;
  onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ message, success, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // Automatically close the alert after 5 seconds
    }, 5000);

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ type: 'spring', stiffness: 100, damping: 15 }}
        className={`
          fixed bottom-4 right-4 z-50 p-4 rounded-lg shadow-lg
          ${success ? 'bg-green-50 border-green-400' : 'bg-red-50 border-red-400'}
          border-l-4
        `}
        style={{ maxWidth: '320px' }}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <p className={`font-semibold text-lg ${success ? 'text-green-800' : 'text-red-800'}`}>
              {success ? 'Success' : 'Error'}
            </p>
            <p className={`mt-1 text-sm ${success ? 'text-green-700' : 'text-red-700'}`}>
              {message}
            </p>
          </div>
          <button
            onClick={onClose}
            className={`
              hover:opacity-75 transition-opacity focus:outline-none
              ${success ? 'text-green-800' : 'text-red-800'}
            `}
            aria-label="Close alert"
          >
            <MdOutlineCancel size={22} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Alert;