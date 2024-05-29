import React from 'react';
import MyNavbar from '../navbar/MyNavbar';

export default function HomePage() {
  return (
    <div>
      <MyNavbar />
      <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
        <div className="max-w-4xl w-full mx-auto text-center p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Welcome to My Service</h1>
          <p className="text-lg text-gray-600 mb-4">
            Our service provides seamless cloud storage and file management. Enjoy the benefits of secure storage,
            easy access, and sharing capabilities.
          </p>
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Pricing</h2>
            <ul className="text-left space-y-2">
              <li className="text-gray-700">Free Plan: 5GB storage, basic support</li>
              <li className="text-gray-700">Pro Plan: 100GB storage, priority support - $9.99/month</li>
              <li className="text-gray-700">Enterprise Plan: Unlimited storage, 24/7 support - Contact us for pricing</li>
            </ul>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Advantages</h2>
            <ul className="text-left space-y-2">
              <li className="text-gray-700">Secure and reliable cloud storage</li>
              <li className="text-gray-700">Easy file sharing and collaboration</li>
              <li className="text-gray-700">Access your files from anywhere, anytime</li>
              <li className="text-gray-700">Responsive design for all devices</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
