import React from "react";
import Profile from "./Profile";
import dynamic from "next/dynamic";
import Link from "next/link";

const DynaProfile = dynamic(() => import("./Profile"), { ssr: false });

type Props = {};

export default function Header({}: Props) {
  return (
    <div className="navbar bg-base-100">
      <>
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link href="/dashboard">
                  <a className="btn btn-ghost normal-case text-xl">Dashboard</a>
                </Link>
              </li>
              <li>
                <Link href="/kitchen">
                  <a className="btn btn-ghost normal-case text-xl">Kitchen</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <Link href="/">
            <a className="btn btn-ghost normal-case text-xl">
              BYP | Pizza with Friends
            </a>
          </Link>
        </div>
      </>

      <div className="navbar-end">
        <DynaProfile />
      </div>
    </div>
  );
}
