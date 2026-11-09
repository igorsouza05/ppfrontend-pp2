import { useState } from "react";
import type { Genre } from "./types";

// Cada função devolve true (deu certo) ou false (a API recusou)
type ItemGeneroProps = {
  genero: Genre;
  onRenomear: (id: number, nome: string) => Promise<boolean>;
  onRemover: (id: number) => Promise<boolean>;
};

export default function ItemGenero({
  genero,
  onRenomear,
  onRemover,
}: ItemGeneroProps) {
  const [editando, setEditando] = useState(false);
  const [nome, setNome] = useState(genero.name);

  async function salvar() {
    const ok = await onRenomear(genero.id, nome);
    // se o nome for vazio (400), continua em modo de edição
    if (ok) setEditando(false);
  }

  if (editando) {
    return (
      <li className="flex items-center gap-2">
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="border rounded px-2 py-1"
        />
        <button
          onClick={salvar}
          className="px-2 py-1 bg-teal-600 text-white rounded"
        >
          Salvar
        </button>
        <button
          onClick={() => {
            setNome(genero.name);
            setEditando(false);
          }}
          className="px-2 py-1 bg-gray-200 rounded"
        >
          Cancelar
        </button>
      </li>
    );
  }

  return (
    <li className="flex items-center gap-2">
      <span>{genero.name}</span>
      <button
        onClick={() => {
          setNome(genero.name);
          setEditando(true);
        }}
        className="px-2 py-0.5 text-sm bg-gray-200 rounded"
      >
        Renomear
      </button>
      <button
        onClick={() => onRemover(genero.id)}
        className="px-2 py-0.5 text-sm bg-red-600 text-white rounded"
      >
        Remover
      </button>
    </li>
  );
}
