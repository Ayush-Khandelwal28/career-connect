"use client";
import { useSession, signIn } from "next-auth/react";
import { Session } from "next-auth";
import HomePage from "../components/Homepage";
import LandingPage from "../components/LandingPage";
import Loading from "../components/Loading";
import { useRouter } from "next/navigation";


export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (session && session.user && session.role === "RECRUITER") router.push("/admin");

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
