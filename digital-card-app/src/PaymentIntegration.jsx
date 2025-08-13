import React, { useState } from 'react';

const PaymentIntegration = ({ cardData, onPaymentComplete }) => {
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('esewa');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('');

  const handlePayment = async (e) => {
    e.preventDefault();
    
    if (!paymentAmount || isNaN(paymentAmount) || parseFloat(paymentAmount) <= 0) {
      setPaymentStatus('Please enter a valid amount');
      return;
    }

    setIsProcessing(true);
    setPaymentStatus('Processing payment...');

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real implementation, you would integrate with eSewa API here
      if (paymentMethod === 'esewa') {
        // Simulate eSewa payment
        console.log('Processing eSewa payment for:', paymentAmount);
        
        // Mock successful payment
        setPaymentStatus('Payment successful! Transaction ID: ES' + Date.now());
        
        // Call the callback to update the card balance
        if (onPaymentComplete) {
          const newBalance = (cardData.balance || 0) + parseFloat(paymentAmount);
          onPaymentComplete({
            ...cardData,
            balance: newBalance,
            lastUpdated: new Date().toISOString()
          });
        }
      } else if (paymentMethod === 'khalti') {
        setPaymentStatus('Khalti payment processed successfully!');
      } else if (paymentMethod === 'connectips') {
        setPaymentStatus('ConnectIPS payment processed successfully!');
      }
    } catch (error) {
      setPaymentStatus('Payment failed. Please try again.');
      console.error('Payment error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const resetPayment = () => {
    setPaymentAmount('');
    setPaymentStatus('');
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6">
        <h2 className="text-2xl font-bold">Payment Integration</h2>
        <p className="text-green-100 mt-2">Process payments through your digital business card</p>
      </div>
      
      <div className="p-6">
        <div className="mb-6">
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-2">Current Balance</h3>
            <p className="text-2xl font-bold text-blue-700">
              {cardData?.currency || 'USD'} {cardData?.balance?.toLocaleString() || '0.00'}
            </p>
          </div>
        </div>

        <form onSubmit={handlePayment} className="space-y-6">
          {/* Payment Method Selection */}
          <div>
            <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 mb-2">
              Payment Method
            </label>
            <select
              id="paymentMethod"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors hover:border-gray-400"
            >
              <option value="esewa">eSewa - Digital Wallet</option>
              <option value="khalti">Khalti - Digital Wallet</option>
              <option value="connectips">ConnectIPS - Bank Transfer</option>
            </select>
          </div>

          {/* Payment Amount */}
          <div>
            <label htmlFor="paymentAmount" className="block text-sm font-medium text-gray-700 mb-2">
              Payment Amount ({cardData?.currency || 'USD'})
            </label>
            <input
              type="number"
              id="paymentAmount"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
              step="0.01"
              min="0.01"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors hover:border-gray-400"
              placeholder="Enter amount"
              disabled={isProcessing}
            />
          </div>

          {/* Payment Method Info */}
          {paymentMethod === 'esewa' && (
            <div className="bg-green-50 rounded-xl p-4 border border-green-200">
              <div className="flex items-center mb-2">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-2">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="font-semibold text-green-900">eSewa Payment</h4>
              </div>
              <p className="text-sm text-green-700">
                eSewa is Nepal's leading digital wallet. Payments are processed securely and instantly.
              </p>
            </div>
          )}

          {paymentMethod === 'khalti' && (
            <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
              <div className="flex items-center mb-2">
                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mr-2">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="font-semibold text-purple-900">Khalti Payment</h4>
              </div>
              <p className="text-sm text-purple-700">
                Khalti is a popular digital wallet in Nepal for quick and secure payments.
              </p>
            </div>
          )}

          {paymentMethod === 'connectips' && (
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <div className="flex items-center mb-2">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-2">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="font-semibold text-blue-900">ConnectIPS Payment</h4>
              </div>
              <p className="text-sm text-blue-700">
                ConnectIPS enables secure bank-to-bank transfers across Nepal.
              </p>
            </div>
          )}

          {/* Payment Status */}
          {paymentStatus && (
            <div className={`rounded-xl p-4 ${
              paymentStatus.includes('successful') || paymentStatus.includes('success')
                ? 'bg-green-50 border border-green-200 text-green-800'
                : paymentStatus.includes('failed') || paymentStatus.includes('failed')
                ? 'bg-red-50 border border-red-200 text-red-800'
                : 'bg-blue-50 border border-blue-200 text-blue-800'
            }`}>
              <p className="font-medium">{paymentStatus}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={resetPayment}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-4 px-6 rounded-xl transition-colors duration-200"
              disabled={isProcessing}
            >
              Reset
            </button>
            <button
              type="submit"
              disabled={isProcessing || !paymentAmount}
              className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg disabled:transform-none"
            >
              {isProcessing ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing...
                </div>
              ) : (
                `Pay with ${paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1)}`
              )}
            </button>
          </div>
        </form>

        {/* Payment Instructions */}
        <div className="mt-8 bg-gray-50 rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-3">Payment Instructions</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• Enter the amount you want to add to your card balance</p>
            <p>• Select your preferred payment method</p>
            <p>• Click the payment button to process your transaction</p>
            <p>• Your card balance will be updated automatically</p>
            <p>• All payments are processed securely and instantly</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentIntegration;
