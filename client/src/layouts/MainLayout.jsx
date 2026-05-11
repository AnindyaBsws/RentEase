import Navbar from "../components/Navbar";

function MainLayout({ children }) {
  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />

      <main>
        {children}
      </main>
    </div>
  );
}

export default MainLayout;