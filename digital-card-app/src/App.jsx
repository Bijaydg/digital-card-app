import React, { useState, useEffect } from 'react';
import Card from './Card';
import CardForm from './CardForm';
import PaymentIntegration from './PaymentIntegration';
import { getCardData, saveCardData, deleteCardData, testFirebaseConnection } from './firebase';

function App() {
  const [cardData, setCardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch card data on component mount
  useEffect(() => {
    fetchCardData();
  }, []);

  const fetchCardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Add timeout to prevent infinite loading
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout')), 10000)
      );
      
      const dataPromise = getCardData();
      const data = await Promise.race([dataPromise, timeoutPromise]);
      
      setCardData(data);
    } catch (err) {
      console.error('❌ Error fetching card data:', err);
      setError('❌ Failed to fetch card data: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log("📝 Form submitted with data:", formData);
      
      const success = await saveCardData(formData);
      if (success) {
        console.log("✅ Card saved successfully, updating UI...");
        setCardData(formData);
        setShowForm(false);
        setIsEditing(false);
        setError('✅ Card saved successfully!');
        
        // Refresh data to get the updated timestamp
        await fetchCardData();
      } else {
        setError('❌ Failed to save card data. Check your Firebase configuration and console for errors.');
      }
    } catch (err) {
      console.error('❌ Form submission error:', err);
      setError('❌ Failed to save card data: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this card? This action cannot be undone.')) {
      try {
        setLoading(true);
        setError(null);
        
        const success = await deleteCardData();
        if (success) {
          setCardData(null);
          setShowForm(false);
          setIsEditing(false);
        } else {
          setError('Failed to delete card data. Check your Firebase configuration and console for errors.');
        }
      } catch (err) {
        setError('Failed to delete card data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setShowForm(true);
  };

  const handleCreate = () => {
    setIsEditing(false);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setIsEditing(false);
  };

  const handleTestConnection = async () => {
    try {
      setLoading(true);
      setError(null);
      const success = await testFirebaseConnection();
      if (success) {
        setError('✅ Firebase connection test successful! Check console for details.');
      } else {
        setError('❌ Firebase connection test failed! Check console for details.');
      }
    } catch (err) {
      setError('❌ Firebase connection test error: ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg font-medium">Loading your digital card...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">Digital Business Card</h1>
            <p className="text-xl text-blue-100">Create, manage, and share your professional identity</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8 shadow-sm">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-red-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-red-800 text-lg">{error}</p>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Left Column - Card Display */}
          <div className="space-y-6">
            <div className="text-center lg:text-left">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Digital Card</h2>
              <p className="text-gray-600">Preview and manage your business card</p>
            </div>
            
            <Card 
              cardData={cardData} 
              onEdit={handleEdit}
            />
          </div>

          {/* Right Column - Actions and Form */}
          <div className="space-y-6">
            <div className="text-center lg:text-left">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Card Management</h2>
              <p className="text-gray-600">Create, edit, or delete your card</p>
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="space-y-4">
                <button
                  onClick={handleCreate}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  <svg className="w-6 h-6 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Create New Card
                </button>
                
                {cardData && (
                  <>
                    <button
                      onClick={handleEdit}
                      className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
                    >
                      <svg className="w-6 h-6 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit Card
                    </button>
                    
                    <button
                      onClick={handleDelete}
                      className="w-full bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
                    >
                      <svg className="w-6 h-6 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete Card
                    </button>
                  </>
                )}

                {/* Test Connection Button */}
                <button
                  onClick={handleTestConnection}
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Test Firebase Connection
                </button>
              </div>
            </div>

            {/* Form Display */}
            {showForm && (
              <CardForm
                initialData={isEditing ? cardData : null}
                onSubmit={handleFormSubmit}
                onCancel={handleCancel}
                isEditing={isEditing}
              />
            )}
          </div>

          {/* Right Column - Payment Integration */}
          {cardData && (
            <div className="space-y-6">
              <div className="text-center lg:text-left">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Services</h2>
                <p className="text-gray-600">Add funds to your card balance</p>
              </div>
              
              <PaymentIntegration 
                cardData={cardData}
                onPaymentComplete={handleFormSubmit}
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">Powered by React + Vite + Tailwind CSS + Firebase</p>
        </div>
      </div>
    </div>
  );
}

export default App;


