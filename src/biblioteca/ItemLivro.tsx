import { useState } from "react";
import type { AtualizaLivro, Book, Genre } from "./types";

// O item NÃO chama a API: ele avisa o pai pelas props.
// Cada função devolve true (deu certo) ou false (a API recusou).
type ItemLivroProps = {
  livro: Book;
  generos: Genre[];
  onAlternarLido: (livro: Book) => Promise<boolean>;
  onSalvar: (id: number, dados: AtualizaLivro) => Promise<boolean>;
  onRemover: (id: number) => Promise<boolean>;
};

export default function ItemLivro({
  livro,
  generos,
  onAlternarLido,
  onSalvar,
  onRemover,
}: ItemLivroProps) {
  const [editando, setEditando] = useState(false);
  const [titulo, setTitulo] = useState(livro.title);
  const [autor, setAutor] = useState(livro.author);
  const [paginas, setPaginas] = useState(String(livro.pages ?? ""));
  const [generoId, setGeneroId] = useState(String(livro.genreId ?? ""));

  function comecarEdicao() {
    // sempre parte dos valores atuais do livro
    setTitulo(livro.title);
    setAutor(livro.author);
    setPaginas(String(livro.pages ?? ""));
    setGeneroId(String(livro.genreId ?? ""));
    setEditando(true);
  }

  async function salvar() {
    const ok = await onSalvar(livro.id, {
      title: titulo,
      author: autor,
      // campo vazio apaga o valor (null); senão converte o texto em número
      pages: paginas === "" ? null : Number(paginas),
      genreId: generoId === "" ? null : Number(generoId),
    });
    // só sai do modo de edição se a API aceitou
    if (ok) setEditando(false);
  }

  async function remover() {
    if (!window.confirm(`Remover "${livro.title}"?`)) return;
    await onRemover(livro.id);
  }

  if (editando) {
    return (
      <li className="flex flex-wrap items-center gap-2">
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
          onClick={salvar}
          className="px-2 py-1 bg-teal-600 text-white rounded"
        >
          Salvar
        </button>
        <button
          onClick={() => setEditando(false)}
          className="px-2 py-1 bg-gray-200 rounded"
        >
          Cancelar
        </button>
      </li>
    );
  }

  return (
    <li className="flex flex-wrap items-center gap-2">
      <input
        type="checkbox"
        checked={livro.read}
        onChange={() => onAlternarLido(livro)}
      />
      <span className={livro.read ? "line-through text-slate-400" : ""}>
        {livro.title} — {livro.author}
        {livro.pages != null && ` · ${livro.pages} págs.`}
      </span>
      {livro.genre && (
        <span className="text-sm text-gray-500">({livro.genre.name})</span>
      )}
      <button
        onClick={comecarEdicao}
        className="px-2 py-0.5 text-sm bg-gray-200 rounded"
      >
        Editar
      </button>
      <button
        onClick={remover}
        className="px-2 py-0.5 text-sm bg-red-600 text-white rounded"
      >
        Remover
      </button>
    </li>
  );
}
