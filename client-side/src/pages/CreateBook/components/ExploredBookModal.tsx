import { motion } from 'framer-motion'
import { useState } from 'react'

export interface ExploredBook {
  title: string;
  description: string,
  tags: string[],
  imageUrl: string,
  visibility: string,
  status: string,
}

interface BookDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: ExploredBook) => void
}

export const ExploredBookModal = ({ isOpen, onClose, onSave }: BookDetailsModalProps) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
    imageUrl: "",
    visibility: "Public",
    status: "Planning",
  })


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const updatedBook = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()),
    }
    onSave(updatedBook)
    onClose()
  }

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
    
    {/* <div className="fixed inset-0 bg-opacity/50 flex items-center justify-center p-4"> */}
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">Edit Book Details</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full p-2 border rounded-lg h-32"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({...formData, tags: e.target.value})}
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Cover Image URL</label>
              <input
                type="url"
                value={formData.imageUrl}
                onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Visibility</label>
              <select
                value={formData.visibility}
                onChange={(e) => setFormData({...formData, visibility: e.target.value})}
                className="w-full p-2 border rounded-lg"
              >
                <option value="Public">Public</option>
                <option value="Private">Private</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="w-full p-2 border rounded-lg"
              >
                <option value="Planning">Planning</option>
                <option value="Explored">Explored</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    {/* </div> */}
    </motion.div>
    </motion.div>
  );
};