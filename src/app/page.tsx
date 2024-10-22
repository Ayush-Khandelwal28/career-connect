import HomePage from "../components/Homepage";
import LandingPage from "../components/LandingPage";

export default function Home() {
  let isSignedIn = true;

  return (
    <div>
      {isSignedIn ? (
        <HomePage />
      ) : (
        <LandingPage />
      )}
    </div>
  );
}
