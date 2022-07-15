import React from "react";
import { useMyPizzasQuery } from "../generated/graphql";
import { useStore } from "../store/store";
import Pizza from "./Pizza";

type Props = {};

export default function PizzaOrders({}: Props) {
  const { id } = useStore((store) => store.user);
  const [{ data }] = useMyPizzasQuery({ variables: { id: +id! } });
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {data?.pizza_order.map((order, index) => {
        const { pizza } = order;
        return <Pizza key={index} pizza={pizza} />;
      })}
    </div>
  );
}
