import { useRouter } from "next/router";
import React from "react";
import { GetToppings, GetToppingsQuery } from "../generated/graphql";
import { client } from "../utils/client";

type Props = {};

export default function Toppings({}: Props) {
  const router = useRouter();

  const [toppings, setToppings] = React.useState<
    GetToppingsQuery["pizza_topping"] | undefined
  >([]);

  const queryToppings = router.query.build;
  const selectedToppings = Array.isArray(queryToppings)
    ? queryToppings
    : queryToppings?.length
    ? [queryToppings]
    : [];

  React.useEffect(() => {
    client
      .query<GetToppingsQuery>(GetToppings)
      .toPromise()
      .then((d) => {
        setToppings(d.data?.pizza_topping);
      });
  }, [client, setToppings]);

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {toppings?.map((topping, index) => {
        const isActive =
          router.query.build === topping.title ||
          router.query.build?.includes(topping.title);
        return (
          <button
            onClick={() => {
              let toppings;
              if (isActive) {
                toppings = selectedToppings.filter(
                  (selected) => selected !== topping.title
                );
              } else {
                toppings = [...selectedToppings, topping.title];
              }
              if (!toppings.length) toppings = [""];
              router.push(
                {
                  pathname: "/dashboard",
                  query: {
                    build: toppings,
                  },
                },
                undefined,
                {
                  shallow: true,
                }
              );
            }}
            key={index}
            className={`${
              isActive ? "bg-orange-400" : "bg-orange-200"
            } rounded-md flex aspect-square text-7xl items-center justify-center`}
          >
            <p>{topping.emoji}</p>
          </button>
        );
      })}
    </div>
  );
}
