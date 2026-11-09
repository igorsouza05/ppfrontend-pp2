import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import {
  atualizarGenero,
  criarGenero,
  listarGeneros,
  removerGenero,
} from "./api";
import ItemGenero from "./ItemGenero";
import type { Genre } from "./types";

export default function Generos() {
  const [generos, setGeneros] = useState<Genre[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null); // erro ao carregar
  const [erroAcao, setErroAcao] = useState<string | null>(null); // erro de POST/PUT/DELETE
  const [nome, setNome] = useState("");
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    async function carregar() {
      try {
        setGeneros(await listarGeneros());
      } catch (e) {
        setErro(e instanceof Error ? e.message : "Erro desconhecido");
      } finally {
        setCarregando(false);
      }
    }

    carregar();
  }, []);

  // Roda uma ação, limpa/guarda o erro e diz se deu certo (true) ou não (false)
  async function executar(acao: () => Promise<void>): Promise<boolean> {
    setErroAcao(null);
    try {
      await acao();
      return true;
    } catch (e) {
      setErroAcao(e instanceof Error ? e.message : "Erro desconhecido");
      return false;
    }
  }

  async function criar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEnviando(true);
    const ok = await executar(async () => {
      const novo = await criarGenero({ name: nome });
      setGeneros((atual) => [...atual, novo]);
    });
    // limpa o campo só se a criação deu certo
    if (ok) setNome("");
    setEnviando(false);
  }

  function renomear(id: number, novoNome: string) {
    return executar(async () => {
      const atualizado = await atualizarGenero(id, { name: novoNome });
      setGeneros((atual) => atual.map((g) => (g.id === id ? atualizado : g)));
    });
  }

  function remover(id: number) {
    return executar(async () => {
      await removerGenero(id);
      setGeneros((atual) => atual.filter((g) => g.id !== id));
    });
  }

  if (carregando) return <p>Carregando...</p>;
  if (erro) return <p className="text-red-600">Erro: {erro}</p>;

  return (
    <div className="space-y-4">
      <form onSubmit={criar} className="flex gap-2">
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome do gênero"
          disabled={enviando}
          className="border rounded px-2 py-1"
        />
        <button
          type="submit"
          disabled={enviando}
          className="px-3 py-1 bg-teal-600 text-white rounded disabled:opacity-50"
        >
          {enviando ? "Enviando..." : "Adicionar"}
        </button>
      </form>

      {erroAcao && <p className="text-red-600">{erroAcao}</p>}

      {generos.length === 0 ? (
        <p>Nenhum gênero.</p>
      ) : (
        <ul className="space-y-2">
          {generos.map((g) => (
            <ItemGenero
              key={g.id}
              genero={g}
              onRenomear={renomear}
              onRemover={remover}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
