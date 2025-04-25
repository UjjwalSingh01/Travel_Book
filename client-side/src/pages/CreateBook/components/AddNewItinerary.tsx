// AddItineraryModal.tsx
import axios from "axios";
import { motion } from "framer-motion";
import { useState } from "react";
import Alert from "../../../common_components/Alert";
import Loading from "../../../common_components/Loading";

interface AddItineraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPage: string | null;
}

const AddNewItineraryModal = ({ isOpen, onClose, selectedPage }: AddItineraryModalProps) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Attraction",
    latitude: "",
    longitude: "",
    images: [''],
    tips: "",
    rating: 0,
    experience: {
      comment: '',
      upVotes: 0,
    }
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const handleSubmit = async() => {
    try {
      setIsLoading(true);
      // add a new itinerary and coonect it to the selectd page
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_API}/itineraries/${selectedPage}/addNewItinerary`, formData, {
        withCredentials: true
      })

      if (response.data.success) {
        // setBook(response.data.data);
        setSuccess(true);
        setMessage(response.data.message);
      } else {
        setError(true);
        setMessage(response.data.message || 'Failed to fetch itinerary');
      }

      onClose();
    } catch (error) {
      if (axios.isAxiosError(error)) {
          console.error('Backend error:', error.response?.data);
          setMessage(error.response?.data?.message || 'Failed to Fetch Your Books. Please try again.');
        } else {
          console.error('Unexpected error:', error);
          setMessage('An unexpected error occurred');
        }
        setError(true);
      } finally {
        setIsLoading(false);
      }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden max-h-[80vh] overflow-y-auto"
      >
        {(error || success) && (
          <Alert
            message={message}
            success={success}
            onClose={() => {
              setError(false)
              setSuccess(false)
            }}
          />
        )}

        {isLoading && (
          <Loading />
        )}

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
          <h2 className="text-2xl font-bold text-white">Create New Itinerary</h2>
          <p className="text-blue-100 mt-1">Fill in the details for your new destination</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Title *</label>
              <input
                required
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Eiffel Tower Visit"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Category *</label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Restaurant">Restaurant</option>
                <option value="Hotel">Hotel</option>
                <option value="Attraction">Attraction</option>
                <option value="Activity">Activity</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 h-32"
              placeholder="Describe the itinerary..."
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Latitude *</label>
              <input
                required
                type="number"
                step="any"
                value={formData.latitude}
                onChange={(e) => setFormData({...formData, latitude: e.target.value})}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="48.8584"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Longitude *</label>
              <input
                required
                type="number"
                step="any"
                value={formData.longitude}
                onChange={(e) => setFormData({...formData, longitude: e.target.value})}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="2.2945"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Image URLs (one per line) <span className="text-gray-400">(optional)</span>
            </label>
            <textarea
              value={formData.images.join("\n")}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  images: e.target.value
                    .split("\n")
                    .map((url) => url.trim())
                    .filter((url) => url),
                })
              }
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 h-24 font-mono text-sm"
              placeholder="https://example.com/image1.jpg\nhttps://example.com/image2.jpg"
            />
          </div>


          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Travel Tips
              <span className="text-gray-400 ml-1">(optional)</span>
            </label>
            <textarea
              value={formData.tips}
              onChange={(e) => setFormData({...formData, tips: e.target.value})}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 h-24"
              placeholder="Share your pro tips..."
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Rating *</label>
            <input
              required
              type="number"
              min={0}
              max={5}
              step={0.1}
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="0 - 5"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Experience Comment</label>
            <textarea
              value={formData.experience.comment}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  experience: {
                    ...formData.experience,
                    comment: e.target.value,
                  },
                })
              }
              rows={3} // You can change this based on how big you want the textarea
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>


          <div className="flex justify-end gap-3 border-t pt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-gray-100 text-gray-600 hover:bg-gray-50 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-colors flex items-center gap-2"
            >
              Create Itinerary
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AddNewItineraryModal;