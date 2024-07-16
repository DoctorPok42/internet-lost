import Script from "next/script";

const Home = () => {
  return (
    <main>
      <div
        id="container"
        className="rounded-xl overflow-hidden transition-all duration-300 ease-in-out">
        <Script src="/my-script.js" />
      </div>
    </main>
  );
}

export default Home;
