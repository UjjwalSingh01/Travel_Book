import { Book } from "../CreateBookPage";

export const dummyBook: Book = {
  _id: '1',
  title: 'European Adventure',
  status: 'Planning',
  pages: [
    {
      _id: 'p1',
      title: 'Paris Exploration',
      status: 'Planning',
      itineraries: [
        {
          _id: 'i1',
          title: 'Eiffel Tower Visit',
          category: 'Attraction',
          location: { latitude: 48.8584, longitude: 2.2945 },
          description: 'Iconic Parisian landmark with stunning city views',
          images: ['https://example.com/eiffel1.jpg', 'https://example.com/eiffel2.jpg'],
          tips: 'Visit at night for the light show'
        },
        {
          _id: 'i2',
          title: 'Louvre Museum Tour',
          category: 'Attraction',
          location: { latitude: 48.8606, longitude: 2.3376 },
          description: 'World\'s largest art museum and historic monument',
          images: ['https://example.com/louvre1.jpg'],
          tips: 'Buy tickets online to skip the queue'
        },
        {
          _id: 'i3',
          title: 'Seine River Cruise',
          category: 'Activity',
          location: { latitude: 48.8566, longitude: 2.3522 },
          description: 'Evening cruise with dinner and live music',
          images: ['https://example.com/seine1.jpg'],
          tips: 'Book the 8 PM cruise for best views'
        }
      ]
    },
    {
      _id: 'p2',
      title: 'Rome Discovery',
      status: 'Explored',
      itineraries: [
        {
          _id: 'i4',
          title: 'Colosseum Tour',
          category: 'Attraction',
          location: { latitude: 41.8902, longitude: 12.4922 },
          description: 'Ancient amphitheater with guided history tour',
          images: ['https://example.com/colosseum1.jpg'],
          tips: 'Wear comfortable shoes for the uneven terrain'
        },
        {
          _id: 'i5',
          title: 'Vatican Museums',
          category: 'Attraction',
          location: { latitude: 41.9062, longitude: 12.4533 },
          description: 'Art and Christian museum complex',
          images: ['https://example.com/vatican1.jpg'],
          tips: 'Dress modestly as it\'s a religious site'
        },
        {
          _id: 'i6',
          title: 'Trastevere Food Tour',
          category: 'Restaurant',
          location: { latitude: 41.8897, longitude: 12.4695 },
          description: 'Evening food and wine tasting tour',
          images: ['https://example.com/trastevere1.jpg'],
          tips: 'Come hungry - lots of food samples!'
        }
      ]
    }
  ]
}