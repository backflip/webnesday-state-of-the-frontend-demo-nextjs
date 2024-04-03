import Head from "next/head";
import Pizzas from "../components/Pizzas";

export default function Home() {
  return (
    <>
      <Head>
        <title>Pizze</title>
      </Head>
      <h1>Pizze</h1>
      <Pizzas />
    </>
  );
}
