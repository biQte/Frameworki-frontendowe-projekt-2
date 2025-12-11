"use client"

import { useAuth } from "@/app/lib/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">User Profile</h1>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <p className="mt-1 text-lg text-gray-900">{user?.email}</p>
            </div>

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
        </div>
      </div>
    </div>
  );
}
