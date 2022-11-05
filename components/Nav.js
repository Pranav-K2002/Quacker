/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Image from "next/image";
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {AiFillCode} from "react-icons/ai"

export default function Nav() {
    const [user, loading] = useAuthState(auth);

  return (
    <nav className="flex justify-between items-center py-10">
      <Link href="/">
        <button className="text-lg font-bold text-cyan-500 align-items-center"><AiFillCode/>React.io</button>
      </Link>
      <ul className="flex items-center gap-10">
        {!user && (
          <Link href={"/auth/login"}>
            <div className="py-2 px-4 text-sm bg-cyan-500 text-white rounded-lg font-medium ml-8">
              Join Now
            </div>
          </Link>
        )}

        {user && (
          <div className="flex items-center gap-6">
            <Link href="/post">
              <button className="font-medium bg-cyan-500 text-white py-2 px-4 rounded-lg textx-sm">
                Post
              </button>
            </Link>
            <Link href="/dashboard">
              <img
                className="w-12 rounded-full cursor-pointer"
                src={user.photoURL}
                alt="Dashboard"
              />
            </Link>
          </div>
        )}
      </ul>
    </nav>
  );
}