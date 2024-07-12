import Script from "next/script";

const Home = () => {
  return (
    <main>
      <div
        id="container"
        style={{
          borderRadius: "1rem",
          overflow: "hidden",
        }}
      >
        <Script src="/my-script.js" />
      </div>
    </main>
  );
}

export default Home;
