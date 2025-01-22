import Header from "./header"
import Footer from "./footer"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header component */}
      <Header />
      {/* Main content area */}
      <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
      {/* Footer component */}
      <Footer />
    </div>
  )
}

