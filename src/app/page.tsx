import LineChart from '@/components/LineChart';

export default function Home() {
  const sampleData = [1, 5, 2, 4, 3, 8, 7, 9, 3, 5, 7, 6];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50 text-gray-900">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex mb-10">
        <h1 className="text-4xl font-bold text-center w-full">Laboratorium 6 - Zadanie 1</h1>
      </div>

      <div className="flex flex-col items-center gap-8">
        <div className="text-center">
          <h2 className="text-2xl mb-4 font-semibold">Line Chart Component</h2>
          <p className="mb-6 text-gray-600">SVG Data Visualization</p>

          <LineChart
            data={sampleData}
            stroke="blue"
            background="#f0f9ff"
          />
        </div>

        <div className="text-center mt-12">
          <p className="max-w-md text-gray-500">
            Topic Selected: <strong>Temat 4 (Quiz)</strong><br />
            Next steps will involve building the Quiz components.
          </p>
        </div>
      </div>
    </main>
  );
}
