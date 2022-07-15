import React from "react";
import { useStore } from "../store/store";
import {
  MyOpenOrdersSubscription,
  useMyOpenOrdersSubscription,
  useUpdateOrderMutation,
  Order_Status_Enum,
} from "../generated/graphql";

type ActiveOrdersProps = {
  orders: MyOpenOrdersSubscription["pizza_order"];
};

export const statusTypes = {
  baking: { value: "baking", emoji: "🔥", color: "bg-blue-300" },
  gone: { value: "gone", emoji: "", color: "" },
  open: { value: "open", emoji: "🍽️", color: "bg-gray-300" },
  ready: { value: "ready", emoji: "🎉", color: "bg-green-300" },
};

const ActiveOrders = ({ orders }: ActiveOrdersProps) => {
  const [, updateOrder] = useUpdateOrderMutation();
  return (
    <div>
      {orders.map((order, index) => {
        return (
          <div
            key={index}
            className="border-t py-4 border-gray-300 grid grid-cols-2"
          >
            <div>{order.pizza.title}</div>
            <div className="flex items-center align-baseline">
              <p>
                <span
                  className={`px-4 py-2 ${
                    statusTypes[order.order_status].color
                  } rounded-full`}
                >
                  {order.order_status}
                </span>
              </p>
              <div className="ml-2 w-2 h-2 relative">
                <span
                  className={`block animate-ping absolute h-full w-full rounded-full bg-sky-400 opacity-75 ${
                    statusTypes[order.order_status].color
                  }`}
                ></span>
              </div>
              {order.order_status === "ready" && (
                <div className="ml-auto">
                  <button
                    onClick={() => {
                      updateOrder({
                        id: order.id,
                        status: "gone" as Order_Status_Enum,
                      });
                    }}
                    className="btn btn-sm"
                  >
                    Pickup!
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

type Props = {};

export default function ActiveOrder({}: Props) {
  const { id } = useStore((store) => store.user);
  const [{ data }] = useMyOpenOrdersSubscription({ variables: { id: +id! } });
  return (
    <div>
      {!data?.pizza_order.length ? (
        <div className="border border-gray-200 p-4 rounded-xl text-gray-300">
          <p>No active orders</p>
        </div>
      ) : (
        <div className="border border-gray-600 p-4 rounded-xl">
          <article className="prose mb-6">
            <h2>Active Orders</h2>
          </article>
          <ActiveOrders orders={data.pizza_order} />
        </div>
      )}
    </div>
  );
}
