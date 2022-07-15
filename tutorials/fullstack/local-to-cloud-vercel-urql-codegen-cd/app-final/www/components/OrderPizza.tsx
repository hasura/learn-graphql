import { useRouter } from "next/router";
import React from "react";
import ChooseOrBuild from "./ChooseOrBuild";

type Props = {};

export default function OrderPizza({}: Props) {
  const router = useRouter();

  return router.query.choose === undefined &&
    router.query.build === undefined ? (
    <button
      onClick={() => {
        router.replace(`/dashboard?choose=`, undefined, {
          shallow: true,
        });
      }}
      className="btn btn-wide"
    >
      Order
    </button>
  ) : (
    <div className="space-y-6 border border-gray-300 p-4 rounded-lg">
      <article className="prose">
        <h1>Let&apos;s get cooking!</h1>
        <p>Build a new pizza or choose a popular one!</p>
      </article>
      <ChooseOrBuild />
      <button
        onClick={() => {
          router.replace(`/dashboard`, undefined, {
            shallow: true,
          });
        }}
        className="btn btn-outline btn-wide"
      >
        Cancel
      </button>
    </div>
  );

  return <div>Something went wrong</div>;
}
