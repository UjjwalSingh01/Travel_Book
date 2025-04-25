// ItineraryPage.tsx
import { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import axios from 'axios';
import TravelFilterBar from '../Itinerary/components/FilterSection';
import { SearchBar } from '../../common_components/SearchBar';
import { AddToBookModal } from './components/AddToBookModal';
import BookCard from '../../common_components/BookCard';
import ItineraryCard from '../../common_components/ItineraryCard';
import Alert from '../../common_components/Alert';
import Loading from '../../common_components/Loading';

interface Itinerary {
  id: string;
  title: string;
  category: string;
  location: {
    latitude: number;
    longitude: number;
  };
  images: string;
  rating: number;
  views: number;
  addedBy: {
    firstName: string;
    lastName: string;
  };
}

interface Book {
  id: string;
  title: string;
  imageUrl: string;
  addedBy: {
    firstName: string;
    lastName: string;
  };
}

const dummyData = {
  books: [
    {
      id: 'b1',
      title: 'European Adventure',
      imageUrl: 'https://example.com/europe.jpg',
      addedBy: {
        firstName: 'John',
        lastName: 'Doe'
      },
    },
    {
      id: 'b2',
      title: 'Asian Discovery',
      imageUrl: 'https://example.com/asia.jpg',
      addedBy: {
        firstName: 'Jane',
        lastName: 'Smith'
      },
    },
    {
      id: 'b3',
      title: 'My Travel Plans',
      imageUrl: 'https://example.com/plan1.jpg',
      addedBy: {
        firstName: 'Alice',
        lastName: 'Johnson'
      },
    },
    {
      id: 'b4',
      title: 'Dream Vacation',
      imageUrl: 'https://example.com/plan2.jpg',
      addedBy: {
        firstName: 'Bob',
        lastName: 'Williams'
      },
    }
  ],
  itineraries: [
    {
      id: 'i1',
      title: 'Eiffel Tower Visit',
      category: 'Attraction',
      location: {
        latitude: 48.8584,
        longitude: 2.2945
      },
      images: 'https://example.com/eiffel1.jpg',
      rating: 4.8,
      views: 1200,
      addedBy: {
        firstName: 'John',
        lastName: 'Doe'
      }
    },
    {
      id: 'i2',
      title: 'Louvre Museum Tour',
      category: 'Attraction',
      location: {
        latitude: 48.8606,
        longitude: 2.3376
      },
      images: 'https://example.com/louvre1.jpg',
      rating: 4.7,
      views: 950,
      addedBy: {
        firstName: 'Jane',
        lastName: 'Smith'
      }
    },
    {
      id: 'i3',
      title: 'Sushi Making Class',
      category: 'Activity',
      location: {
        latitude: 35.6762,
        longitude: 139.6503
      },
      images: 'https://example.com/sushi1.jpg',
      rating: 4.9,
      views: 800,
      addedBy: {
        firstName: 'Alice',
        lastName: 'Johnson'
      }
    },
    {
      id: 'i4',
      title: 'Beachfront Villa Stay',
      category: 'Hotel',
      location: {
        latitude: -8.4095,
        longitude: 115.1889
      },
      images: 'https://example.com/bali1.jpg',
      rating: 4.6,
      views: 1500,
      addedBy: {
        firstName: 'Bob',
        lastName: 'Williams'
      }
    }
  ]
}

export const ItineraryPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>(dummyData.books);
  const [itineraries, setItineraries] = useState<Itinerary[]>(dummyData.itineraries);
  const [selectedItinerary, setSelectedItinerary] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentFilter, setCurrentFilter] = useState<"Books" | "Itinerary">("Books");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const handleFilterChange = (filter: "Books" | "Itinerary") => {
    setCurrentFilter(filter);
    // console.log(filter);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/itinerary/getItinerary`);
        
        if (response.data.success) {
          setBooks(response.data.data.books);
          setItineraries(response.data.data.itineraries);
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
    fetchData();
  }, []);

  const handleAddToBook = (itineraryId: string) => {
    setSelectedItinerary(itineraryId);
    setShowAddModal(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-50 min-h-screen relative"
    >
      {(error || success) && (
        <Alert
          message={message} 
          success={success} 
          onClose={() => setError(false)}
        />
      )}

      {isLoading ? (
        <Loading />
      ) : (
        <>
          <SearchBar />
          <TravelFilterBar onFilterChange={handleFilterChange} />

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className={`grid gap-6 pb-20 px-6 md:px-24 lg:px-32 xl:px-56 ${
              currentFilter === "Books" 
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
                : "grid-cols-1 md:grid-cols-2"
            }`}
          >
            {/* Books Section */}
            {currentFilter === "Books" && books.map((book) => (
              <BookCard
                key={book.id}
                id={book.id}
                title={book.title}
                status={'Explored'}
                image={book.imageUrl}
              />
            ))}

            {/* Itineraries Section */}
            {currentFilter === "Itinerary" && itineraries.map((itinerary) => (
              <ItineraryCard
                key={itinerary.id}
                id={itinerary.id}
                title={itinerary.title}
                image={itinerary.images[0]}
                category={itinerary.category}
                location={itinerary.location}
                rating={itinerary.rating} 
                views={itinerary.views}
                addedBy={`${itinerary.addedBy.firstName} ${itinerary.addedBy.lastName}`}
                onAddToWishlist={() => {/* API call */}}
                onAddToBook={() => handleAddToBook(itinerary.id)}
              />
            ))}
          </motion.div>

          <AddToBookModal
            isOpen={showAddModal}
            onClose={() => setShowAddModal(false)}
            itineraryId={selectedItinerary}
          />
        </>
      )}
    </motion.div>
  );
};