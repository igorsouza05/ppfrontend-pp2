import { useEffect, useState } from "react";
import type { Post } from "./tipos";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

export default function BuscaPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [busca, setBusca] = useState("");

  // busca todos os posts uma única vez ([])
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

  // o filtro é feito no cliente: a busca NÃO dispara novo fetch
  const encontrados = posts.filter((p) =>
    p.title.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="space-y-3">
      <input
        type="text"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        placeholder="Buscar por título..."
        className="border rounded px-2 py-1 w-72"
      />

      <p className="text-sm text-gray-600">
        {encontrados.length} de {posts.length}
      </p>

      {encontrados.length === 0 ? (
        <p>Nenhum resultado</p>
      ) : (
        <ul className="space-y-1 list-disc pl-6">
          {encontrados.map((p) => (
            <li key={p.id}>{p.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
