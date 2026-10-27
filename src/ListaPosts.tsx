import { useEffect, useState } from "react";
import type { Post } from "./tipos";

const API_URL = "https://jsonplaceholder.typicode.com/posts?userId=1";

export default function ListaPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function carregar() {
      try {
        const resposta = await fetch(API_URL);
        if (!resposta.ok) {
          throw new Error(`Erro HTTP ${resposta.status}`);
        }
        const dados: Post[] = await resposta.json();
        setPosts(dados);
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
  if (posts.length === 0) return <p>Nenhum post.</p>;

  return (
    <ol className="list-decimal pl-6 space-y-2">
      {posts.map((p) => (
        <li key={p.id}>
          <span className="font-medium">{p.title}</span>
          <p className="text-sm text-gray-500">{p.body}</p>
        </li>
      ))}
    </ol>
  );
}
