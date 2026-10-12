import { useState } from "react";

type ConversorMoedaProps = {
  moeda: string;
  taxa: number;
};

export default function ConversorMoeda({ moeda, taxa }: ConversorMoedaProps) {
  const [reais, setReais] = useState("");
  const [resultado, setResultado] = useState<number | null>(null);

  function converter() {
    const valor = parseFloat(reais.replace(",", "."));
    if (isNaN(valor)) {
      setResultado(null);
      return;
    }
    setResultado(valor * taxa);
  }

  return (
    <div className="p-4 border rounded w-64">
      <label className="block mb-1">Valor em reais (R$)</label>
      <input
        type="number"
        value={reais}
        onChange={(e) => setReais(e.target.value)}
        className="border rounded px-2 py-1 w-full"
        placeholder="0,00"
      />
      <button
        onClick={converter}
        className="mt-2 px-3 py-1 bg-teal-600 text-white rounded"
      >
        Converter
      </button>
      {resultado !== null && (
        <p className="mt-2 font-bold">
          {resultado.toFixed(2)} {moeda}
        </p>
      )}
    </div>
  );
}
