import { useRouter } from "next/router";
import React from "react";
import { PizzaFragment } from "../generated/graphql";

type Props = {
  pizza: PizzaFragment;
};

export default function Pizza({ pizza }: Props) {
  const router = useRouter();
  const { pizza_topping_pizzas, title, id } = pizza;
  return (
    <div
      className="cursor-pointer"
      onClick={() => {
        if (router.query.choose) {
          router.push(
            {
              pathname: "/dashboard",
              query: {
                choose: "",
              },
            },
            undefined,
            {
              shallow: true,
            }
          );
        } else {
          router.push(
            {
              pathname: "/dashboard",
              query: {
                choose: id,
              },
            },
            undefined,
            {
              shallow: true,
            }
          );
        }
      }}
    >
      <div
        className={`aspect-square bg-orange-200 rounded-full p-10 flex flex-wrap items-center justify-center`}
      >
        {pizza_topping_pizzas.map((topping) => {
          return (
            <span
              key={topping.pizza_topping.title}
              className="text-5xl text-center w-1/2"
            >
              {topping.pizza_topping.emoji}
            </span>
          );
        })}
      </div>
      <div className="font-bold transform -translate-y-8 w-full flex justify-center">
        <p className="text-center p-2 bg-gray-900 text-white rounded-md">
          {title}
        </p>
      </div>
    </div>
  );
}
