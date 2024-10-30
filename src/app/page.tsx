"use client";
import { useSession } from "next-auth/react";
import HomePage from "../components/Homepage";
import LandingPage from "../components/LandingPage";
import Loading from "../components/Loading";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Loading />; 
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
