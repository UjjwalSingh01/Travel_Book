import { useEffect, useState } from 'react'
import PageComponent from './components/PageComponent'
import axios from 'axios'
import Loading from '../../common_components/Loading'
import Alert from '../../common_components/Alert'
import { useParams } from 'react-router-dom'

export interface Itinerary {
  id: string
  title: string
  category: string
  location: {
    latitude: number
    longitude: number
  }
}

export interface Page {
  id: string
  title: string
  description?: string
  tips?: string
  images: string[]
  itineraries: Itinerary[]
}

export interface Book {
  id: string
  title: string
  description: string
  tags: string[]
  imageUrl: string
  pages: Page[]
}

// Dummy Data
const dummyBook: Book = {
  id: '1',
  title: 'European Adventure',
  description: 'A comprehensive guide to exploring Europe\'s hidden gems',
  tags: ['Europe', 'Culture', 'History'],
  imageUrl: 'https://example.com/europe.jpg',
  pages: [
    {
      id: 'p1',
      title: 'Paris Exploration',
      description: 'Discovering the heart of French culture',
      tips: 'Visit early morning to avoid crowds',
      images: ['https://example.com/paris1.jpg', 'https://example.com/paris2.jpg'],
      itineraries: [
        {
          id: 'i1',
          title: 'Eiffel Tower Visit',
          category: 'Attraction',
          location: { latitude: 48.8584, longitude: 2.2945 }
        },
        {
          id: 'i2',
          title: 'Louvre Museum Tour',
          category: 'Attraction',
          location: { latitude: 48.8606, longitude: 2.3376 }
        }
      ]
    },
    {
      id: 'p1',
      title: 'Paris Exploration',
      description: 'Discovering the heart of French culture',
      tips: 'Visit early morning to avoid crowds',
      images: ['https://example.com/paris1.jpg', 'https://example.com/paris2.jpg'],
      itineraries: [
        {
          id: 'i1',
          title: 'Eiffel Tower Visit',
          category: 'Attraction',
          location: { latitude: 48.8584, longitude: 2.2945 }
        },
        {
          id: 'i2',
          title: 'Louvre Museum Tour',
          category: 'Attraction',
          location: { latitude: 48.8606, longitude: 2.3376 }
        }
      ]
    }
  ]
}

const BookDescription = () => {
  const { id } = useParams();
  const [book, setBook] = useState<Book>(dummyBook)
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const fetchBookDescription = async() => {
      try {
        const response = await axios.get(`${process.env.BACKEND_URL}/book/getBookDescription/${id}`, {
          withCredentials: true
        })

        if (response.data.success) {
          setBook(response.data.data);
          setSuccess(true);
          setMessage(response.data.message);
        } else {
          setError(true);
          setMessage(response.data.message);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Backend error:', error.response?.data);
          setMessage(error.response?.data?.message || 'Failed to fetch Book Description. Please try again later.');
        } else {
          console.error('Unexpected error:', error);
          setMessage('An unexpected error occurred');
        }
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchBookDescription();
  },[id])

  return (
    <div className="relative min-h-screen overflow-y-auto scrollbar-hide bg-gray-50">
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
      ) : book ? (
      <>
        <div className="relative h-96">
          <img
            src={book.imageUrl}
            alt={book.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h1 className="text-4xl font-bold mb-4">{book.title}</h1>
            <div className="flex gap-2">
              {book.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-white/20 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-8">
          <p className="text-lg text-gray-700 mb-8">{book.description}</p>

          {book.pages.map((page) => (
            <PageComponent key={page.id} page={page} />
          ))}
        </div>
      </>
      ) : (
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-500 text-lg">No book data available</p>
        </div>
      )}
    </div>
  )
}

export default BookDescription;