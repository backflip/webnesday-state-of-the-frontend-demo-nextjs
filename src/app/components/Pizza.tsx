"use client";

import { useState } from "react";
import Modal from "react-modal";

type Pizzas = {
  [key: string]: string[];
};

export default function Pizza({
  name,
  toppings,
}: {
  name: keyof Pizzas;
  toppings: Pizzas[string];
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
