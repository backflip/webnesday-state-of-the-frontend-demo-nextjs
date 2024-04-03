"use client";

import { useEffect, useState } from "react";
import type { ApiPizzeResponse } from "../api/pizze/route";
import useSWR from "swr";
import Pizza from "./Pizza";

type Pizzas = {
  [key: string]: string[];
};

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

export default function Pizzas() {
  const [pizzas, setPizzas] = useState<Pizzas>();
  const { data, isLoading } = useSWR<ApiPizzeResponse>(`/api/pizze`, fetcher);

  useEffect(() => {
    const pizzas: Pizzas | undefined = data?.data.reduce(
      (acc: Pizzas, item) => {
        const pizza = item.pizzas;
        const topping = item.toppings;

        if (pizza?.name && topping?.name) {
          acc[pizza.name] = acc[pizza.name] || [];

          acc[pizza.name].push(topping.name);
        }

        return acc;
      },
      {}
    );

    setPizzas(pizzas);
  }, [data]);

  return isLoading ? (
    `Pizze werden geladen...`
  ) : pizzas ? (
    <ul>
      {Object.entries(pizzas).map(([name, toppings]) => (
        <li key={name}>
          <Pizza name={name} toppings={toppings} />
        </li>
      ))}
    </ul>
  ) : (
    `Keine Pizze gefunden.`
  );
}
