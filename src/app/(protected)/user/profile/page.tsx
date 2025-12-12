"use client"

import { useAuth } from "@/app/lib/AuthContext";
import { updateProfile } from "firebase/auth";
import { useState } from "react";

export default function Profile() {
  const { user } = useAuth();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const formData = new FormData(e.currentTarget);
    const displayName = formData.get("displayName") as string;
    const photoURL = formData.get("photoURL") as string;

    if (user) {
      updateProfile(user, {
        displayName: displayName,
        photoURL: photoURL,
      })
        .then(() => {
          setSuccess("Profile updated successfully!");
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center mb-6">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover mr-4"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center mr-4">
                <svg className="w-12 h-12 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {user?.displayName || 'User Profile'}
              </h1>
              <p className="text-gray-600">{user?.email}</p>
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{success}</span>
              </div>
            )}

            <div>
              <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-1">
                Display Name
              </label>
              <input
                type="text"
                id="displayName"
                name="displayName"
                defaultValue={user?.displayName || ''}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your display name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email (read-only)
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={user?.email || ''}
                readOnly
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-600 cursor-not-allowed sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="photoURL" className="block text-sm font-medium text-gray-700 mb-1">
                Photo URL
              </label>
              <input
                type="url"
                id="photoURL"
                name="photoURL"
                defaultValue={user?.photoURL || ''}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="https://example.com/photo.jpg"
              />
              <p className="mt-1 text-sm text-gray-500">Enter a URL to your profile photo</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">User ID</label>
                <p className="mt-1 text-sm text-gray-600 font-mono">{user?.uid}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email Verified</label>
                <p className="mt-1 text-lg">
                  {user?.emailVerified ? (
                    <span className="text-green-600">✓ Verified</span>
                  ) : (
                    <span className="text-yellow-600">Not verified</span>
                  )}
                </p>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
