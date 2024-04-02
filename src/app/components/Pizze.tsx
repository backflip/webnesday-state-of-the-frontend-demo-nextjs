"use client";

import { useEffect, useState } from "react";
import Modal from "react-modal";
import type { ApiPizzeResponse } from "../api/pizze/route";

type Pizze = {
  [key: string]: string[];
};

function Pizza({
  name,
  toppings,
}: {
  name: keyof Pizze;
  toppings: Pizze[string];
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <h2>{name}</h2>
      <button onClick={() => setIsOpen(true)}>Details</button>
      <Modal isOpen={isOpen} contentLabel={String(name)}>
        <h1>{name}</h1>
        <button onClick={() => setIsOpen(false)}>close</button>

        <ul>
          {toppings.map((topping) => (
            <li key={topping}>{topping}</li>
          ))}
        </ul>
      </Modal>
    </>
  );
}

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
          <Pizza name={name} toppings={toppings} />
        </li>
      ))}
    </ul>
  ) : (
    `Loading...`
  );
}
