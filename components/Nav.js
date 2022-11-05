/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Image from "next/image";
import Logo from "./Logo";
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {BsFillMoonFill} from "react-icons/bs";

export default function Nav() {
    const [user, loading] = useAuthState(auth);

  return (
    <nav className="px-4 flex justify-between items-center py-10 dark:bg-slate-900">
      <Link href="/">
      <button className="flex"><Logo/></button>
      </Link>
      <ul className="flex items-center gap-10 dark:text-slate-600">
      <div>
        <button>
        <BsFillMoonFill className=""/>
        </button>
      </div>
        {!user && (
          <Link href={"/auth/login"}>
            <div className="py-2 px-4 text-sm bg-cyan-500 text-white rounded-lg font-medium">
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