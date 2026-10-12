type Variante = "primario" | "perigo";

type BotaoProps = {
  texto: string;
  variante: Variante;
  onClick: () => void;
};

export default function Botao({ texto, variante, onClick }: BotaoProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded text-white font-medium ${
        variante === "primario" ? "bg-teal-600" : "bg-red-600"
      }`}
    >
      {texto}
    </button>
  );
}
