import Link from "next/link";
import Layout from "./components/layout";

export default function Home() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto text-center">
        {/* Main heading */}
        <h1 className="text-4xl font-bold mb-4">Welcome to KaamWala</h1>
        {/* Subheading */}
        <p className="text-xl mb-8">Choose your role:</p>
        {/* Container for action buttons */}
        <div className="flex justify-center space-x-4">
          {/* Button for users looking for a service */}
          <Link
            href="/find-service"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            I'm looking for a service
          </Link>

          {/* Button for users wanting to provide a service */}
          <Link
            href="/provide-service"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            I want to provide a service
          </Link>
        </div>
      </div>
    </Layout>
  );
}
