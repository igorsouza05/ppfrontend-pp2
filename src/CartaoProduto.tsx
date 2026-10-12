import { useState } from "react";

type CartaoProdutoProps = {
  nome: string;
  preco: number;
};

export default function CartaoProduto({ nome, preco }: CartaoProdutoProps) {
  const [curtidas, setCurtidas] = useState(0);

  return (
    <div className="p-4 border rounded w-56">
      <h3 className="text-lg font-bold">{nome}</h3>
      <p className="text-slate-600">R$ {preco.toFixed(2)}</p>
      <button
        onClick={() => setCurtidas(curtidas + 1)}
        className="mt-2 px-3 py-1 bg-teal-600 text-white rounded"
      >
        Curtir
      </button>
      <p className="mt-2">Curtidas: {curtidas}</p>
    </div>
  );
}
