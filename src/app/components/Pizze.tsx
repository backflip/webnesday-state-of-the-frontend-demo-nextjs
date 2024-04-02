"use client";

import { useEffect, useState } from "react";
import type { ApiPizzeResponse } from "../api/pizze/route";

type Pizze = {
  [key: string]: string[];
};

export default function Pizze() {
  const [pizze, setPizze] = useState<Pizze>();

  useEffect(() => {
    async function fetchData() {
      const { data }: ApiPizzeResponse = await fetch(`/api/pizze`).then(
        (response) => response.json()
      );
      const pizze: Pizze = data.reduce((acc: Pizze, item) => {
        const pizza = item.pizzas;
        const topping = item.toppings;

        if (pizza?.name && topping?.name) {
          acc[pizza.name] = acc[pizza.name] || [];

          acc[pizza.name].push(topping.name);
        }

        return acc;
      }, {});

      setPizze(pizze);
    }

    fetchData();
  }, []);

  return pizze ? (
    <ul>
      {Object.entries(pizze).map(([name, toppings]) => (
        <li key={name}>
          <h2>{name}</h2>
        
          <ul>
            {toppings.map((topping) => (
              <li key={topping}>{topping}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  ) : (
    `Loading...`
  );
}
