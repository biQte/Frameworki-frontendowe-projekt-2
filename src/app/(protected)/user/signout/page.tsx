"use client"

import { signOut } from "firebase/auth";
import { getAuth } from 'firebase/auth';
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignOut() {
  const auth = getAuth();
  const router = useRouter();

  useEffect(() => {
    signOut(auth).then(() => {
      router.push('/');
    });
  }, [auth, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Signing out...</h2>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      </div>
    </div>
  );
}
