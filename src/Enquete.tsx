import { useState } from "react";

type EnqueteProps = {
  pergunta: string;
  opcaoA: string;
  opcaoB: string;
};

export default function Enquete({ pergunta, opcaoA, opcaoB }: EnqueteProps) {
  const [votosA, setVotosA] = useState(0);
  const [votosB, setVotosB] = useState(0);

  // valor calculado, sem state próprio
  let resultado = "Empate";
  if (votosA > votosB) resultado = `${opcaoA} está na frente`;
  else if (votosB > votosA) resultado = `${opcaoB} está na frente`;

  return (
    <div className="p-4 border rounded w-72">
      <h3 className="text-lg font-bold mb-2">{pergunta}</h3>
      <div className="flex gap-2">
        <button
          onClick={() => setVotosA(votosA + 1)}
          className="px-3 py-1 bg-teal-600 text-white rounded"
        >
          {opcaoA} ({votosA})
        </button>
        <button
          onClick={() => setVotosB(votosB + 1)}
          className="px-3 py-1 bg-teal-600 text-white rounded"
        >
          {opcaoB} ({votosB})
        </button>
      </div>
      <p className="mt-2">{resultado}</p>
      <button
        onClick={() => {
          setVotosA(0);
          setVotosB(0);
        }}
        className="mt-2 px-3 py-1 bg-red-600 text-white rounded"
      >
        Zerar votos
      </button>
    </div>
  );
}
