import Script from "next/script";

const Home = () => {
  return (
    <main>
      <div
        id="container"
        className="rounded-xl overflow-hidden transition-all duration-300 ease-in-out">
        <Script src="/scripts/player.js" />
        <Script src="/scripts/obstacle.js" />
        <Script src="/scripts/scene.js" />
        <Script src="/scripts/score.js" />
        <Script src="/scripts/index.js" />
      </div>
    </main>
  );
}

export default Home;
