import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Experience } from "../ItineraryDescription";
import axios from "axios";
import Alert from "../../../common_components/Alert";

interface Props {
  experiences: Experience[];
  itineraryId: string;
}

const ExperienceSection: React.FC<Props> = ({ experiences, itineraryId }) => {
  const [newExperience, setNewExperience] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAllExperiences, setShowAllExperiences] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const handleSubmit = async () => {
    if (!newExperience.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_API}/itinerary/${itineraryId}/newExperience`,
        { comment: newExperience },
        { withCredentials: true }
      );

      if(response.data.success){
        setSuccess(true)
        setMessage(response.data.message)
        setNewExperience('');
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
      setIsSubmitting(false);
    }
  };

  const toggleUpVote = async() => {
    try {
      setIsSubmitting(true);
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_API}/itinerary/${itineraryId}/toggleUpvote`, {
        withCredentials: true,
      })

      if(response.data.succes){
        setSuccess(true),
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
      setIsSubmitting(false);
    }
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {(error || success) && (
        <Alert
          message={message} 
          success={success} 
          onClose={() => {
            setError(false)
            setSuccess(false);
          }}
        />
      )}

      <h2 className="text-3xl font-bold text-slate-800 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
        Travel Experiences
      </h2>

      <div className="mb-8">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Share your travel experience..."
            className="flex-1 px-6 py-4 rounded-full border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newExperience}
            onChange={(e) => setNewExperience(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
          />
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`px-8 py-4 rounded-full font-semibold transition-all ${
              isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-md'
            }`}
          >
            {isSubmitting ? 'Sharing...' : 'Share'}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {(showAllExperiences ? experiences : experiences.slice(0, 3)).map((exp) => (
          <div key={exp.id} className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <img 
                src={exp.user.avatar} 
                alt={exp.user.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="font-bold text-slate-800">{exp.user.name}</h3>
                <p className="mt-2 text-slate-600">{exp.experience}</p>
                <div className="mt-3 flex items-center gap-4 text-slate-500">
                  <span>{exp.upVotes} likes</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {experiences.length > 3 && (
        <button
          onClick={() => setShowAllExperiences(!showAllExperiences)}
          className="mt-6 w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-md flex items-center justify-center gap-2"
        >
          {showAllExperiences ? (
            <>
              <FaChevronUp className="text-sm" /> Show Less
            </>
          ) : (
            <>
              <FaChevronDown className="text-sm" /> Show All Experiences
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default ExperienceSection;