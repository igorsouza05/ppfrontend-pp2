import { useState } from "react";
import Generos from "./Generos";
import Livros from "./Livros";

type Aba = "livros" | "generos";

export default function App() {
  const [aba, setAba] = useState<Aba>("livros");

  // Os botões das abas: a ativa fica destacada
  function classeAba(nome: Aba) {
    return aba === nome
      ? "px-3 py-1 rounded bg-teal-600 text-white"
      : "px-3 py-1 rounded bg-gray-200 text-gray-800";
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button onClick={() => setAba("livros")} className={classeAba("livros")}>
          Livros
        </button>
        <button
          onClick={() => setAba("generos")}
          className={classeAba("generos")}
        >
          Gêneros
        </button>
      </div>

      {/* Renderização condicional: ao trocar de aba o componente é desmontado
          e, ao voltar, monta de novo e refaz o fetch. É por isso que o select
          de gêneros do formulário sempre aparece atualizado. */}
      {aba === "livros" ? <Livros /> : <Generos />}
    </div>
  );
}
