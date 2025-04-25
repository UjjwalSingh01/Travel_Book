import React, { useState, useEffect } from 'react'
import BookCard from '../../common_components/BookCard'
import { SearchBar } from '../../common_components/SearchBar'
import { bookCardsData } from './constants/constant';
import { FilterComponents } from './components/FilterComponents';
import axios from 'axios';
import Alert from '../../common_components/Alert';
import Loading from '../../common_components/Loading';

export interface Book {
  id: string;
  title: string;
  imageUrl: string;
  visibility: "Public" | "Private";
  status: "Explored" | "Planning";
}

export const MyTravelBook: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState<"Explored" | "Planning">("Explored")
  const [books, setBooks] = useState<Book[]>(bookCardsData)
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/book/myBooks`, {
          withCredentials: true,
        });

        if (response.data.success) {
          setBooks(response.data.data);
          setSuccess(true);
          setMessage(response.data.message);
        } else {
          setError(true);
          setMessage(response.data.message);
        }
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
    }

    fetchBooks()
  }, [])

  return (
    <div className="px-5 pt-8 min-h-screen">
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
          <SearchBar />
          
          {/* Pass props to FilterComponents */}
          <FilterComponents selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} />
          
          <div className="flex justify-center pb-8 max-h-screen overflow-x-hidden scrollbar-hide">
            <div className="w-full mx-32 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
              {books
                .filter((book) => book.status === selectedStatus) 
                .map((book, index) => (
                <BookCard key={index} id={book.id} title={book.title} image={book.imageUrl} status={book.status} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}