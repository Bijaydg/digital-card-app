import React from 'react';

const Card = ({ cardData, onEdit }) => {
  if (!cardData) {
    return (
      <div className="max-w-sm mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="p-8 text-center">
          <div className="text-gray-400 mb-6">
            <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">No Card Created Yet</h3>
          <p className="text-gray-500 mb-6">Create your first digital business card to get started</p>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
            <p className="text-sm text-blue-700 font-medium">Click "Create New Card" to begin</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-sm mx-auto bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
      {/* Card Header with Logo */}
      <div className="p-6 text-white relative">
        <div className="absolute top-4 right-4">
          <div className="w-12 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg opacity-90"></div>
        </div>
        
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {cardData.cardType}
              </h2>
              <p className="text-slate-300 text-sm font-medium">{cardData.company}</p>
            </div>
          </div>
        </div>

        {/* Card Number with enhanced styling */}
        <div className="mb-6">
          <p className="text-slate-300 text-xs font-medium uppercase tracking-wider mb-2">Card Number</p>
          <p className="text-2xl font-mono tracking-widest text-white font-bold">
            {cardData.cardNumber}
          </p>
        </div>

        {/* Card Details Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-slate-700/50 rounded-lg p-3">
            <p className="text-slate-300 text-xs font-medium uppercase tracking-wider mb-1">Expires</p>
            <p className="font-semibold text-white">{cardData.expiryDate}</p>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-3">
            <p className="text-slate-300 text-xs font-medium uppercase tracking-wider mb-1">Balance</p>
            <p className="font-semibold text-white">
              {cardData.currency} {cardData.balance.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Cardholder Name */}
        <div className="mb-6">
          <p className="text-slate-300 text-xs font-medium uppercase tracking-wider mb-2">Cardholder</p>
          <p className="font-bold text-xl text-white">{cardData.fullName}</p>
        </div>

        {/* Email */}
        <div className="pt-4 border-t border-slate-600">
          <p className="text-slate-300 text-xs font-medium uppercase tracking-wider mb-2">Email</p>
          <p className="font-medium text-slate-200 text-sm break-all">{cardData.email}</p>
        </div>

        {/* Last Updated */}
        {cardData.lastUpdated && (
          <div className="pt-4 border-t border-slate-600">
            <p className="text-slate-300 text-xs font-medium uppercase tracking-wider mb-2">Last Updated</p>
            <p className="text-slate-200 text-sm">
              {new Date(cardData.lastUpdated).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="p-4 bg-slate-700/80 backdrop-blur-sm">
        <button
          onClick={onEdit}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
        >
          <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Edit Card
        </button>
      </div>
    </div>
  );
};

export default Card;

