import { useRouter } from "next/router";
import React from "react";
import { useAllPizzasQuery, useOrderPizzaMutation } from "../generated/graphql";

import Pizza from "./Pizza";

type Props = {};

export default function ChoosePizza({}: Props) {
  const router = useRouter();
  const [{ data }] = useAllPizzasQuery();
  const { choose } = router.query;

  const [, choosePizza] = useOrderPizzaMutation();

  const handleClick = () => {
    choosePizza({
      pizza_id: +choose!,
    }).then((d) => {
      if (!d.error) {
        router.push(
          {
            pathname: "/dashboard",
          },
          undefined,
          {
            shallow: true,
          }
        );
      }
    });
  };

  const pizzas = choose
    ? data?.pizza.filter((pizza) => pizza.id === +choose)
    : data?.pizza;
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {pizzas &&
          pizzas.map((pizza) => <Pizza key={pizza.id} pizza={pizza} />)}
      </div>
      <button
        onClick={handleClick}
        className="btn btn-wide"
        disabled={pizzas && pizzas.length > 1}
      >
        Order!
      </button>
    </div>
  );
}
