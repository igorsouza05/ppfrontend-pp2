import { useEffect, useState } from "react";
import type { Comentario } from "./tipos";

export default function ComentariosPost() {
  const [postId, setPostId] = useState(1);
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  // refaz a busca sempre que o postId mudar
  useEffect(() => {
    const controller = new AbortController();

    async function carregar() {
      setCarregando(true);
      setErro(null);
      try {
        const resposta = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
          { signal: controller.signal }
        );
        if (!resposta.ok) {
          throw new Error(`Erro HTTP ${resposta.status}`);
        }
        const dados: Comentario[] = await resposta.json();
        setComentarios(dados);
        setCarregando(false);
      } catch (e) {
        // cancelar de propósito (AbortError) não é erro
        if ((e as Error).name === "AbortError") return;
        setErro(e instanceof Error ? e.message : "Erro desconhecido");
        setCarregando(false);
      }
    }

    carregar();
    // cleanup: cancela a requisição antiga quando o postId muda
    return () => controller.abort();
  }, [postId]);

  return (
    <div className="space-y-3">
      <label className="flex items-center gap-2">
        Post (1 a 100):
        <input
          type="number"
          min={1}
          max={100}
          value={postId}
          onChange={(e) => setPostId(Number(e.target.value))}
          className="border rounded px-2 py-1 w-24"
        />
      </label>

      {carregando ? (
        <p>Carregando...</p>
      ) : erro ? (
        <p className="text-red-600">Erro: {erro}</p>
      ) : comentarios.length === 0 ? (
        <p>Nenhum comentário para este post.</p>
      ) : (
        <>
          <p className="text-sm text-gray-600">
            {comentarios.length} comentários
          </p>
          <ul className="space-y-3">
            {comentarios.map((c) => (
              <li key={c.id} className="border rounded p-3">
                <p className="font-medium">{c.name}</p>
                <p className="text-sm text-blue-600">{c.email}</p>
                <p className="text-sm text-gray-700 mt-1">{c.body}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
