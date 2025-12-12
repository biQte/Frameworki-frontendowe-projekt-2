"use client"

import { signOut } from "firebase/auth";
import { getAuth } from 'firebase/auth';
import { useRouter } from "next/navigation";

export default function SignOut() {
  const auth = getAuth();
  const router = useRouter();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signOut(auth).then(() => {
      router.push('/');
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Sign Out</h2>
        <p className="text-gray-600 mb-6 text-center">
          Are you sure you want to sign out?
        </p>
        <form onSubmit={onSubmit}>
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition"
          >
            Sign Out
          </button>
        </form>
      </div>
    </div>
  );
}
