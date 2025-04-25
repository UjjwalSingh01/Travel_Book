// import React from 'react'
// import { motion } from "framer-motion"
// import { Link } from 'react-router-dom'
// import { Page } from '../CreateBookPage'

// interface PageProps {
//   page: Page
// }

// const PageComponent: React.FC<PageProps> = ({ page }) => (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="p-6 mb-8 bg-white rounded-xl shadow-lg"
//     >
//       <h2 className="text-2xl font-bold mb-4 text-gray-800">{page.title}</h2>
  
//       {page.itineraries?.length > 0 && (
//         <div className="mb-6">
//           <h3 className="text-lg font-semibold mb-4 text-gray-700">Itineraries</h3>
//           <div className="flex overflow-x-auto pb-4 gap-4">
//             {page.itineraries.map((itinerary) => (
//               <Link
//                 to={`/itinerary/${itinerary.id}`}
//                 key={itinerary.id}
//                 className="flex-shrink-0 w-64"
//               >
//                 <motion.div
//                   whileHover={{ scale: 1.02 }}
//                   className="p-4 bg-gray-50 rounded-lg border border-gray-200"
//                 >
//                   <h4 className="font-medium text-gray-800">{itinerary.title}</h4>
//                   <p className="text-sm text-gray-500 mt-2">{itinerary.category}</p>
//                 </motion.div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       )}
      
//     </motion.div>
//   )

// export default PageComponent