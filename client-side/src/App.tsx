import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/Home";
import Header from "./common_components/Header";
import { MyTravelBook } from "./pages/MyTravelBook/MyTravelBook";
import Map from "./pages/Map/Map";
import Footer from "./common_components/Footer";
import BookDescription from "./pages/BookDescription/BookDescription";
import { ItineraryPage } from "./pages/Itinerary/ItineraryPage";
import CreateBookPage from "./pages/CreateBook/CreateBookPage";
import Register from "./pages/Register/Register";
import ItineraryDescription from "./pages/ItineraryDescription/ItineraryDescription";
import { WishlistPage } from "./pages/Wishlist/WishlistPage";

const App: React.FC = () => {
  return (
    <>
      <Router>
        <div className="">
          <Header />
        </div>
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/itinerary" element={<ItineraryPage />} />
            <Route path="/register" element={<Register />} />
            {/* <Route path="/create book" element={<CreateBookPage />} /> */}
            <Route path="/bookplanning/:id" element={<CreateBookPage />} />
            <Route path="/my travel book" element={<MyTravelBook />} />
            <Route path="/itineraryDescription/:id" element={<ItineraryDescription /> } />
            <Route path="/bookdescription/:id" element={<BookDescription />} />
            <Route path="/map" element={<Map /> } />
            <Route path="/wishlist" element={<WishlistPage />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </>
  );
};

export default App;