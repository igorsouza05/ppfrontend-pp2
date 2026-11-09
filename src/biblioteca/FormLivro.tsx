import { useState } from "react";
import type { FormEvent } from "react";
import type { Genre, NovoLivro } from "./types";

type FormLivroProps = {
  generos: Genre[];
  onCriar: (dados: NovoLivro) => Promise<void>;
};

export default function FormLivro({ generos, onCriar }: FormLivroProps) {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [paginas, setPaginas] = useState(""); // input devolve texto
  const [generoId, setGeneroId] = useState(""); // "" = Sem gênero
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  async function aoEnviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErro(null);
    setEnviando(true);

    // título e autor vão como estão: quem valida é o backend (400)
    const dados: NovoLivro = { title: titulo, author: autor };
    // páginas e gênero viram número; se estiverem vazios, nem são enviados
    if (paginas !== "") dados.pages = Number(paginas);
    if (generoId !== "") dados.genreId = Number(generoId);

    try {
      await onCriar(dados);
      // só limpa se deu certo
      setTitulo("");
      setAutor("");
      setPaginas("");
    } catch (e) {
      setErro(e instanceof Error ? e.message : "Erro desconhecido");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form onSubmit={aoEnviar} className="space-y-2">
      <fieldset disabled={enviando} className="flex flex-wrap gap-2">
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Título"
          className="border rounded px-2 py-1"
        />
        <input
          type="text"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
          placeholder="Autor"
          className="border rounded px-2 py-1"
        />
        <input
          type="number"
          value={paginas}
          onChange={(e) => setPaginas(e.target.value)}
          placeholder="Páginas"
          className="border rounded px-2 py-1 w-28"
        />
        <select
          value={generoId}
          onChange={(e) => setGeneroId(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="">Sem gênero</option>
          {generos.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="px-3 py-1 bg-teal-600 text-white rounded disabled:opacity-50"
        >
          {enviando ? "Enviando..." : "Adicionar"}
        </button>
      </fieldset>

      {erro && <p className="text-red-600">{erro}</p>}
    </form>
  );
}
