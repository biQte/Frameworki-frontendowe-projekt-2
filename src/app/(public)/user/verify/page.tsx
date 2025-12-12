"use client"

import { useAuth } from "@/app/lib/AuthContext";
import { signOut, getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function VerifyEmail() {
  const { user } = useAuth();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      setUserEmail(user.email);
      const auth = getAuth();
      signOut(auth).then(() => {
        console.log("User signed out after registration");
      });
    }
  }, [user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <div className="text-center">
          <svg className="mx-auto h-16 w-16 text-blue-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>

          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Verify Your Email
          </h1>

          <p className="text-gray-600 mb-6">
            A verification email has been sent to:
          </p>

          <p className="text-lg font-semibold text-blue-600 mb-6">
            {userEmail || 'your email address'}
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-700">
              Please check your inbox and click the verification link to activate your account.
            </p>
          </div>

          <button
            onClick={() => router.push('/user/signin')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition"
          >
            Go to Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
