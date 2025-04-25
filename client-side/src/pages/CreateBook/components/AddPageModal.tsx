// // AddPageModal.tsx
// import { motion } from 'framer-motion';

// export const AddPageModal = ({ onClose, onSave, title, setTitle }) => (
//   <motion.div
//     initial={{ opacity: 0 }}
//     animate={{ opacity: 1 }}
//     exit={{ opacity: 0 }}
//     className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4"
//     onClick={onClose}
//   >
//     <motion.div
//       initial={{ scale: 0.95 }}
//       animate={{ scale: 1 }}
//       onClick={(e) => e.stopPropagation()}
//       className="bg-white rounded-2xl p-6 w-full max-w-md"
//     >
//       <h3 className="text-2xl font-bold mb-4">Create New Page</h3>
//       <input
//         type="text"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-500"
//         placeholder="Enter page title"
//       />
//       <div className="flex justify-end gap-3">
//         <button
//           onClick={onClose}
//           className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
//         >
//           Cancel
//         </button>
//         <button
//           onClick={onSave}
//           className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//         >
//           Create Page
//         </button>
//       </div>
//     </motion.div>
//   </motion.div>
// );