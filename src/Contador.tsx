import { useState } from "react";

type ContadorProps = {
  passo: number;
};

export default function Contador({ passo }: ContadorProps) {
  const [valor, setValor] = useState(0);

  return (
    <div className="flex items-center gap-3 p-4 border rounded">
      <button
        onClick={() => setValor(Math.max(0, valor - passo))}
        className="px-3 py-1 bg-slate-200 rounded"
      >
        −
      </button>
      <span className="text-xl font-bold w-12 text-center">{valor}</span>
      <button
        onClick={() => setValor(valor + passo)}
        className="px-3 py-1 bg-slate-200 rounded"
      >
        +
      </button>
      <button
        onClick={() => setValor(0)}
        className="px-3 py-1 bg-slate-200 rounded"
      >
        Zerar
      </button>
    </div>
  );
}

// Resposta da pergunta: cada <Contador /> tem seu próprio valor porque
// cada instância do componente tem seu próprio state (useState é criado
// separadamente para cada uma).
