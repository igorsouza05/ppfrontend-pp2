import { useEffect, useState } from "react";
import type { Book } from "./types";

// Exercício 4: o fetch fica escrito aqui mesmo, sem usar o api.ts
const API_URL = "http://localhost:3001/books";

export default function ListaLivros() {
  const [livros, setLivros] = useState<Book[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function carregar() {
      try {
        const resposta = await fetch(API_URL);
        if (!resposta.ok) {
          throw new Error(`Erro HTTP ${resposta.status}`);
        }
        const dados: Book[] = await resposta.json();
        setLivros(dados);
      } catch (e) {
        setErro(e instanceof Error ? e.message : "Erro desconhecido");
      } finally {
        setCarregando(false);
      }
    }

    carregar();
  }, []);

  if (carregando) return <p>Carregando...</p>;
  if (erro) return <p className="text-red-600">Erro: {erro}</p>;
  if (livros.length === 0) return <p>Nenhum livro.</p>;

  return (
    <ul className="space-y-1">
      {livros.map((l) => (
        <li key={l.id}>
          {l.read ? "[x]" : "[ ]"} {l.title} — {l.author}
          {l.genre && (
            <span className="text-sm text-gray-500"> ({l.genre.name})</span>
          )}
        </li>
      ))}
    </ul>
  );
}
