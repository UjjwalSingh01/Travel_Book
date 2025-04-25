import React from 'react'
import { motion } from "framer-motion"
import { Page } from '../BookDescription'
import { Link } from 'react-router-dom'

interface PageComponentProps {
  page: Page;
}

const PageComponent: React.FC<PageComponentProps> = ({ page }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 mb-8 bg-white rounded-xl shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-800">{page.title}</h2>
      
      {page.description && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">Description</h3>
          <p className="text-gray-600">{page.description}</p>
        </div>
      )}
  
      {page.images.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Images</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {page.images.map((img, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="aspect-square rounded-lg overflow-hidden"
              >
                <img
                  src={img}
                  alt={`Page ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
      )}
  
      {page.itineraries?.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Itineraries</h3>
          <div className="flex overflow-x-auto pb-4 gap-4">
            {page.itineraries.map((itinerary) => (
              <Link
                to={`/itinerary/${itinerary._id}`}
                key={itinerary._id}
                className="flex-shrink-0 w-64"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <h4 className="font-medium text-gray-800">{itinerary.title}</h4>
                  <p className="text-sm text-gray-500 mt-2">{itinerary.category}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      )}
  
      {page.tips && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 text-blue-800">Travel Tips</h3>
          <p className="text-blue-700">{page.tips}</p>
        </div>
      )}
    </motion.div>
  )

export default PageComponent