export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-auto">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-400">
              © 2024 Quiz Application. Lab 7 Project.
            </p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-white transition">
              About
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              Contact
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              Privacy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
