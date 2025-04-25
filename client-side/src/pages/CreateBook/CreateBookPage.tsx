import { useState, useEffect } from 'react'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import { useParams } from 'react-router-dom'
import { dummyBook } from './constants/constant'
import { ExploredPage, ExploredPageModal } from "./components/ExploredPageModal"
import { ExploredBook, ExploredBookModal } from './components/ExploredBookModal'
import AddItineraryModal from './components/AddNewItinerary'
import Alert from '../../common_components/Alert'
import Loading from '../../common_components/Loading'
import { RxCrossCircled } from 'react-icons/rx'


export interface Itinerary {
  id: string;
  title: string;
}

export interface Page {
  id: string;
  title: string;
  status: 'Planning' | 'Explored';
  // images: string[];
  // description?: string;
  // tips?: string;
  location: {
    latitude: number;
    longitude: number;
  }
  itineraries: Itinerary[];
}

export interface Book {
  id: string;
  title: string;
  status: 'Planning' | 'Explored';
  description?: string;
  tags: string[];
  addedById: string;
  // imageUrl: string;
  visibility: 'Private' | 'Public';
  pages: Page[];
}

const CreateBookPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState<Book>(dummyBook)
  const [showPageModal, setShowPageModal] = useState(false)
  const [newPageTitle, setNewPageTitle] = useState('')
  const [showBookStatusModal, setShowBookStatusModal] = useState(false)
  const [showPageStatusModal, setShowPageStatusModal] = useState<Page | null>(null)
  const [showItineraryModal, setShowItineraryModal] = useState(false)
  const [selectedPage, setSelectedPage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_API}/book/${id}`);

        if (response.data.success) {
          setBook(response.data.data);
          setSuccess(true);
        } else {
          setError(true);
          setMessage(response.data.message || 'Failed to fetch itinerary');
        }
      } catch (error) {
        setError(true);
        if (axios.isAxiosError(error)) {
          console.error('Backend error:', error.response?.data);
          setMessage(error.response?.data?.message);
        } else {
          console.error('Unexpected error:', error);
          setMessage('An unexpected error occurred');
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchBook();
  },[])

  const handleSaveBook = async (updatedBook: ExploredBook) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_API}/book/${book.id}`, updatedBook, {
        withCredentials: true,
      })
      
      if (response.data.success) {
        setBook(response.data.data);
        setSuccess(true);
      } else {
        setError(true);
        setMessage(response.data.message || 'Failed to Save Book');
      }
    } catch (error) {
      setError(true);
      if (axios.isAxiosError(error)) {
        console.error('Backend error:', error.response?.data);
        setMessage(error.response?.data?.message);
      } else {
        console.error('Unexpected error:', error);
        setMessage('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handleSavePage = async (pageId: string, updatedPage: ExploredPage) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_API}/page/${pageId}`, updatedPage)
      if (response.data.success) {
        setBook(prev => ({
          ...prev,
          pages: prev.pages.map(p => p.id === pageId ? response.data.data : p)
        }))
        setSuccess(true);
      } else {
        setError(true);
        setMessage(response.data.message || 'Failed to Save Book');
      }
    } catch (error) {
      setError(true);
      if (axios.isAxiosError(error)) {
        console.error('Backend error:', error.response?.data);
        setMessage(error.response?.data?.message);
      } else {
        console.error('Unexpected error:', error);
        setMessage('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  }

  // Add new page
  const handleAddPage = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_API}/book/${book.id}/addPageToBook`,
        { title: newPageTitle },
        { withCredentials: true }
      )
      
      if (response.data.success) {
        setBook(prev => ({
          ...prev,
          pages: [...prev.pages, response.data.data]
        }))
        setShowPageModal(false)
        setNewPageTitle('')
        setSuccess(true);
      } else {
        setError(true);
        setMessage(response.data.message || 'Failed to Adding Page');
      }
    } catch (error) {
      setError(true);
      if (axios.isAxiosError(error)) {
        console.error('Backend error:', error.response?.data);
        setMessage(error.response?.data?.message);
      } else {
        console.error('Unexpected error:', error);
        setMessage('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  }

  // Delete page
  const handleDeletePage = async (pageId: string) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_BACKEND_API}/book/${book.id}/deletePageFromBook/${pageId}`)
      if (response.data.success) {
        setBook(prev => ({
          ...prev,
          pages: prev.pages.filter(page => page.id !== pageId)
        }))
        setSuccess(true);
        setMessage(response.data.message);
      } else {
        setError(true);
        setMessage(response.data.message);
      }
    } catch (error) {
      setError(true);
      if (axios.isAxiosError(error)) {
        console.error('Backend error:', error.response?.data);
        setMessage(error.response?.data?.message);
      } else {
        console.error('Unexpected error:', error);
        setMessage('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  }

  // Delete itinerary
  const handleDeleteItinerary = async (pageId: string, itineraryId: string) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_BACKEND_API}/page/${pageId}/itineraries/${itineraryId}`, 
        { withCredentials: true }
      )
  
      if (response.data.success) {
        setBook(prev => ({
          ...prev,
          pages: prev.pages.map(p => 
            p.id === pageId ? {
              ...p,
              itineraries: p.itineraries.filter(i => i.id !== itineraryId)
            } : p
          )
        }))
        setSuccess(true);
        setMessage(response.data.message);
      } else {
        setError(true);
        setMessage(response.data.message);
      }
    } catch (error) {
      setError(true);
      if (axios.isAxiosError(error)) {
        console.error('Backend error:', error.response?.data);
        setMessage(error.response?.data?.message);
      } else {
        console.error('Unexpected error:', error);
        setMessage('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="relative overflow-y-auto scrollbar-hide min-h-screen bg-gray-50 p-8">
      {(error || success) && (
        <Alert 
          message={message} 
          success={success} 
          onClose={() => {
            setError(false);
            setSuccess(false);
          }}
        />
      )}

      {isLoading ? (
        <Loading />
      ) : (
      <>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">{book.title}</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowBookStatusModal(true)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              book.status === 'Explored' 
                ? 'bg-green-100 text-green-800 hover:bg-green-200'
                : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
            }`}
          >
            {book.status} {book.status === 'Planning' ? '✏️' : '✅'}
          </button>
          <button
            onClick={() => setShowPageModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
          >
            Add Page +
          </button>
        </div>
      </div>

      {/* Pages List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {book.pages.map(page => (
          <motion.div
            key={page.id}
            layout
            className="bg-white rounded-xl shadow-md p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-gray-800">{page.title}</h3>
              <button
                onClick={() => handleDeletePage(page.id)}
                // className="text-red-500 hover:text-red-700"
              >
                <RxCrossCircled />
              </button>
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setShowPageStatusModal(page)}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  page.status === 'Explored' 
                    ? 'bg-green-100 text-green-800 hover:bg-green-200'
                    : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                }`}
              >
                {page.status} {page.status === 'Planning' ? '✏️' : '✅'}
              </button>
              <button
                onClick={() => {
                  setSelectedPage(page.id)
                  setShowItineraryModal(true)
                }}
                className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full hover:bg-green-200"
              >
                Add New Itinerary
              </button>
            </div>

            {page.itineraries?.length > 0 && (
              <div className="mt-4 space-y-2">
                {page.itineraries.map((itinerary) => (
                  <div
                    key={itinerary.id}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded"
                  >
                    <span>{itinerary.title}</span>
                    <button
                      onClick={() => handleDeleteItinerary(page.id, itinerary.id)}
                      // className="text-red-400 hover:text-red-600"
                    >
                      <RxCrossCircled />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showPageModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-xl p-6 w-full max-w-md"
            >
              <h3 className="text-xl font-bold mb-4">Create New Page</h3>
              <input
                type="text"
                value={newPageTitle}
                onChange={(e) => setNewPageTitle(e.target.value)}
                className="w-full p-2 border rounded mb-4"
                placeholder="Page title"
              />
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => setShowPageModal(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddPage}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Create
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {showBookStatusModal && (
          <ExploredBookModal
            isOpen={showBookStatusModal}
            onClose={() => setShowBookStatusModal(false)}
            onSave={handleSaveBook}
          />
        )}

        {showPageStatusModal && (
          <ExploredPageModal
            isOpen={!!showPageStatusModal}
            onClose={() => setShowPageStatusModal(null)}
            // page={showPageStatusModal}
            onSave={(data) => handleSavePage(showPageStatusModal.id, data)}
          />
        )}

        {showItineraryModal && (
          <AddItineraryModal
            isOpen={showItineraryModal}
            onClose={() => setShowItineraryModal(false)}
            selectedPage={selectedPage}
          />
        )}
      </AnimatePresence>
      </>
      )}
    </div>
  )
}

export default CreateBookPage