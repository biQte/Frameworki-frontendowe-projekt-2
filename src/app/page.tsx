import LineChart from '@/components/LineChart';
import Link from 'next/link';

export default function Home() {
  const sampleData = [1, 5, 2, 4, 3, 8, 7, 9, 3, 5, 7, 6];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50 text-gray-900">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex mb-10">
        <h1 className="text-4xl font-bold text-center w-full">Frontend Labs 6 & 7</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-6xl w-full">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl mb-4 font-semibold">Lab 6: SVG Line Chart</h2>
          <p className="mb-6 text-gray-600">Custom SVG data visualization component</p>

          <LineChart
            data={sampleData}
            stroke="blue"
            background="#f0f9ff"
          />
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl mb-4 font-semibold">Lab 7: Quiz Application</h2>
          <p className="mb-6 text-gray-600">Theme 4 - Interactive Quiz Components</p>

          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold mb-2">Features:</h3>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Firebase Authentication</li>
                <li>Protected Routes</li>
                <li>Single Choice Questions</li>
                <li>Multiple Choice Questions</li>
                <li>Fill in the Blanks</li>
                <li>Match Pairs</li>
              </ul>
            </div>

            <Link
              href="/user/signin"
              className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition"
            >
              Sign In to Try Quiz
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
