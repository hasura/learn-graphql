import Link from "next/link";
import React from "react";
import { useStore, AUTH } from "../store/store";

type Props = {};

export default function Profile({}: Props) {
  const { authed, username } = useStore((store) => store.user);
  const logout = useStore((store) => store.logout);

  return authed === AUTH.AUTHED ? (
    <div className="dropdown dropdown-end">
      <label
        tabIndex={0}
        className="btn btn-ghost btn-circle mr-2 text-purple-800"
      >
        <div className="rounded-full bg-purple-200 p-4">
          <p className="font-bold text-center">{username}</p>
        </div>
      </label>
      <ul
        tabIndex={0}
        className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
      >
        <li>
          <Link href="/dashboard">
            <a className="justify-between">Profile</a>
          </Link>
        </li>
        <li>
          <button onClick={logout}>Logout</button>
        </li>
      </ul>
    </div>
  ) : (
    <Link href="/login">
      <a>Login</a>
    </Link>
  );
}
