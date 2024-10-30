"use client";
import { useSession } from "next-auth/react";
import HomePage from "../components/Homepage";
import LandingPage from "../components/LandingPage";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>; 
  }

  return (
    <div>
      {session ? (
        <HomePage />
      ) : (
        <LandingPage />
      )}
    </div>
  );
}
