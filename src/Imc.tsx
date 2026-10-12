import { useState } from "react";

const campo = "border rounded px-3 py-2";

function Imc() {
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [imc, setImc] = useState<number | null>(null);

  function calcular() {
    const p = Number(peso);
    const a = Number(altura);

    if (p > 0 && a > 0) {
      setImc(p / (a * a));
    }
  }

  return (
    <div className="p-6 flex flex-col gap-3 w-64">
      <input
        type="number"
        placeholder="Peso (kg)"
        value={peso}
        onChange={(e) => setPeso(e.target.value)}
        className={campo}
      />
      <input
        type="number"
        step="0.01"
        placeholder="Altura (m)"
        value={altura}
        onChange={(e) => setAltura(e.target.value)}
        className={campo}
      />
      <button onClick={calcular} className="bg-teal-600 text-white rounded py-2">
        Calcular
      </button>

      {imc !== null && <p>IMC: {imc.toFixed(1)}</p>}
    </div>
  );
}

export default Imc;
