"use client";
import ListagemFavoritos from "../components/ListagemFavoritos/ListagemFavoritos";
import { useState } from "react";

export default function Favoritos() {
  return (
    <main>
      <div className="container p-5">
        <ListagemFavoritos/>
      </div>
    </main>
  );
}
