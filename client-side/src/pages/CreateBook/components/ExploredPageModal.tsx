import { motion } from 'framer-motion'
import { useState } from 'react'

export interface ExploredPage {
  title: string;
  description: string;
  images: string[];
  tips?: string;
}

interface PageDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: ExploredPage) => void
}

export const ExploredPageModal = ({ isOpen, onClose, onSave }: PageDetailsModalProps) => {
  const [formData, setFormData] = useState({
    title: "",
    images: "",
    description: "",
    tips: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const updatedPage = {
      ...formData,
      images: formData.images.split('\n').filter(url => url.trim()),
    }
    onSave(updatedPage)
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
    {/* <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl"> */}
        <h2 className="text-2xl font-bold mb-4">Edit Page Details</h2>
        
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
            <label className="block text-sm font-medium mb-1">Image URLs (one per line)</label>
            <textarea
              value={formData.images}
              onChange={(e) => setFormData({...formData, images: e.target.value})}
              className="w-full p-2 border rounded-lg h-32 font-mono text-sm"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full p-2 border rounded-lg h-32"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Travel Tips</label>
            <textarea
              value={formData.tips}
              onChange={(e) => setFormData({...formData, tips: e.target.value})}
              className="w-full p-2 border rounded-lg h-32"
              rows={3}
            />
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
      {/* </div>
    </div> */}
    </motion.div>
    </motion.div>
  );
};