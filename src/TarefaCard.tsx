import { useState } from "react";

type TarefaCardProps = {
  titulo: string;
};

export default function TarefaCard({ titulo }: TarefaCardProps) {
  const [concluida, setConcluida] = useState(false);

  return (
    <div
      className={`p-4 border-2 rounded w-64 ${
        concluida ? "border-green-500" : "border-slate-300"
      }`}
    >
      <h3
        className={`text-lg ${
          concluida ? "line-through text-slate-400" : ""
        }`}
      >
        {titulo}
      </h3>
      <button
        onClick={() => setConcluida(!concluida)}
        className="mt-2 px-3 py-1 bg-teal-600 text-white rounded"
      >
        {concluida ? "Desfazer" : "Concluir"}
      </button>
    </div>
  );
}
