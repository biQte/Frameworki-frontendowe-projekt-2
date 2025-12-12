"use client"

import Link from 'next/link';
import { useAuth } from '@/app/lib/AuthContext';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const { user } = useAuth();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="w-64 bg-gray-900 text-white p-6 flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">Quiz App</h1>
        {user && (
          <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">
                {user.displayName || 'User'}
              </p>
              <p className="text-xs text-gray-400 truncate">{user.email}</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1">
        <ul className="space-y-2">
          <li>
            <Link
              href="/"
              className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition ${isActive('/') ? 'bg-gray-800' : ''}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Home
            </Link>
          </li>

          {user && (
            <>
              <li>
                <Link
                  href="/quiz"
                  className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition ${isActive('/quiz') ? 'bg-gray-800' : ''}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Quiz Demo
                </Link>
              </li>
              <li>
                <Link
                  href="/myquizzes"
                  className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition ${isActive('/myquizzes') ? 'bg-gray-800' : ''}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  My Quizzes
                </Link>
              </li>
              <li>
                <Link
                  href="/user/profile"
                  className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition ${isActive('/user/profile') ? 'bg-gray-800' : ''}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  href="/user/changepassword"
                  className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition ${isActive('/user/changepassword') ? 'bg-gray-800' : ''}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                  Change Password
                </Link>
              </li>
              <li>
                <Link
                  href="/user/signout"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Sign Out
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      {!user && (
        <div className="mt-auto pt-6 border-t border-gray-700">
          <div className="space-y-2">
            <Link
              href="/user/signin"
              className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              Sign In
            </Link>
            <Link
              href="/user/register"
              className="block w-full text-center bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
