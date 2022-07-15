import { useRouter } from "next/router";
import React from "react";
import Toppings from "./Toppings";
import {
  GetToppingsQuery,
  GetToppingsQueryVariables,
  useGetToppingsQuery,
  useCreatePizzaMutation,
  Pizza_Topping_Insert_Input,
  Pizza_Topping_Pizza_Insert_Input,
} from "../generated/graphql";

type Props = {};

export default function BuildPizza({}: Props) {
  const [{ data }] = useGetToppingsQuery({
    requestPolicy: "cache-first",
  });
  const [result, insertPizza] = useCreatePizzaMutation();
  const [name, setName] = React.useState("");
  const router = useRouter();
  const queryToppings = router.query.build;
  const selectedToppings = Array.isArray(queryToppings)
    ? queryToppings
    : queryToppings?.length
    ? [queryToppings]
    : [];

  const handleClick = () => {
    const toppingMap = data?.pizza_topping.reduce(
      (collector: Record<string, number>, curr) => {
        collector[curr.title] = curr.id;
        return collector;
      },
      {}
    );
    const toppingIds: Partial<Pizza_Topping_Pizza_Insert_Input>[] =
      selectedToppings.map((st) => ({
        pizza_topping_id: toppingMap![st],
      }));

    insertPizza({
      pizza_toppings: toppingIds,
      title: name,
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

  return (
    <div>
      <article className="prose mb-12">
        <h2>Choose your toppings!</h2>
      </article>
      <div className="form-control w-full max-w-xs mb-6">
        <label className="label">
          <span className="label-text">What is your pizza called?</span>
        </label>
        <input
          type="text"
          placeholder="Name your pizza"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
      </div>
      <Toppings />
      <button
        onClick={handleClick}
        className="btn btn-wide"
        disabled={!selectedToppings.length}
      >
        Order!
      </button>
    </div>
  );
}
