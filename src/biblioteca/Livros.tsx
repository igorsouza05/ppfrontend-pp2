import { useEffect, useState } from "react";
import {
  atualizarLivro,
  criarLivro,
  listarGeneros,
  listarLivros,
  removerLivro,
} from "./api";
import FormLivro from "./FormLivro";
import ItemLivro from "./ItemLivro";
import type { AtualizaLivro, Book, Genre, NovoLivro } from "./types";

type Ordem = "id" | "titulo" | "autor" | "paginas";

export default function Livros() {
  const [livros, setLivros] = useState<Book[]>([]);
  const [generos, setGeneros] = useState<Genre[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null); // erro ao carregar
  const [erroAcao, setErroAcao] = useState<string | null>(null); // erro de PUT/DELETE
  const [aviso, setAviso] = useState<string | null>(null); // D6

  // filtros dos desafios: só guardamos o critério, a lista visível é calculada
  const [filtroGenero, setFiltroGenero] = useState("todos"); // D1
  const [busca, setBusca] = useState(""); // D2
  const [ordem, setOrdem] = useState<Ordem>("id"); // D4

  // carrega livros e gêneros ao mesmo tempo
  useEffect(() => {
    async function carregar() {
      try {
        const [listaLivros, listaGeneros] = await Promise.all([
          listarLivros(),
          listarGeneros(),
        ]);
        setLivros(listaLivros);
        setGeneros(listaGeneros);
      } catch (e) {
        setErro(e instanceof Error ? e.message : "Erro desconhecido");
      } finally {
        setCarregando(false);
      }
    }

    carregar();
  }, []);

  // D6: a mensagem "Livro removido" some sozinha depois de 3 segundos
  useEffect(() => {
    if (!aviso) return;
    const timer = setTimeout(() => setAviso(null), 3000);
    return () => clearTimeout(timer);
  }, [aviso]);

  // POST e PUT devolvem só genreId: montamos o objeto genre pela lista de gêneros
  function comGenero(livro: Book): Book {
    const genero = generos.find((g) => g.id === livro.genreId) ?? null;
    return { ...livro, genre: genero };
  }

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

  // O erro aqui NÃO é capturado: o FormLivro mostra a mensagem abaixo do formulário
  async function criar(dados: NovoLivro) {
    const novo = await criarLivro(dados);
    setLivros((atual) => [...atual, comGenero(novo)]);
  }

  function alternarLido(livro: Book) {
    return executar(async () => {
      const atualizado = await atualizarLivro(livro.id, { read: !livro.read });
      setLivros((atual) =>
        atual.map((l) => (l.id === atualizado.id ? comGenero(atualizado) : l))
      );
    });
  }

  function salvar(id: number, dados: AtualizaLivro) {
    return executar(async () => {
      const atualizado = await atualizarLivro(id, dados);
      setLivros((atual) =>
        atual.map((l) => (l.id === atualizado.id ? comGenero(atualizado) : l))
      );
    });
  }

  function remover(id: number) {
    return executar(async () => {
      await removerLivro(id);
      setLivros((atual) => atual.filter((l) => l.id !== id));
      setAviso("Livro removido");
    });
  }

  if (carregando) return <p>Carregando...</p>;
  if (erro) return <p className="text-red-600">Erro: {erro}</p>;

  // Estado derivado (D1, D2, D4): nada disso vira state
  const filtrados = livros
    .filter((l) => {
      if (filtroGenero === "todos") return true;
      if (filtroGenero === "sem") return l.genreId === null;
      return l.genreId === Number(filtroGenero);
    })
    .filter((l) => l.title.toLowerCase().includes(busca.toLowerCase()));

  // [...filtrados] cria uma cópia: nunca ordenamos o array do state diretamente
  const visiveis = [...filtrados].sort((a, b) => {
    if (ordem === "titulo") return a.title.localeCompare(b.title, "pt-BR");
    if (ordem === "autor") return a.author.localeCompare(b.author, "pt-BR");
    if (ordem === "paginas") {
      // livros sem número de páginas vão para o fim
      if (a.pages === null && b.pages === null) return 0;
      if (a.pages === null) return 1;
      if (b.pages === null) return -1;
      return a.pages - b.pages;
    }
    return a.id - b.id;
  });

  // D3: progresso de leitura calculado a partir da lista
  const lidos = livros.filter((l) => l.read).length;
  const percentual = livros.length > 0 ? (lidos / livros.length) * 100 : 0;

  return (
    <div className="space-y-4">
      <FormLivro generos={generos} onCriar={criar} />

      {erroAcao && <p className="text-red-600">{erroAcao}</p>}
      {aviso && <p className="text-teal-700">{aviso}</p>}

      {livros.length === 0 ? (
        <p>Nenhum livro.</p>
      ) : (
        <>
          <div className="space-y-1">
            <p className="text-sm text-gray-600">
              {lidos} lidos de {livros.length}
            </p>
            <div className="h-2 w-72 bg-gray-200 rounded overflow-hidden">
              <div
                className="h-full bg-teal-600"
                style={{ width: `${percentual}%` }}
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-2">
              Gênero:
              <select
                value={filtroGenero}
                onChange={(e) => setFiltroGenero(e.target.value)}
                className="border rounded px-2 py-1"
              >
                <option value="todos">Todos</option>
                <option value="sem">Sem gênero</option>
                {generos.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.name}
                  </option>
                ))}
              </select>
            </label>

            <input
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar por título..."
              className="border rounded px-2 py-1"
            />

            <label className="flex items-center gap-2">
              Ordenar por:
              <select
                value={ordem}
                onChange={(e) => setOrdem(e.target.value as Ordem)}
                className="border rounded px-2 py-1"
              >
                <option value="id">Mais antigos</option>
                <option value="titulo">Título</option>
                <option value="autor">Autor</option>
                <option value="paginas">Páginas</option>
              </select>
            </label>
          </div>

          <p className="text-sm text-gray-600">
            {visiveis.length} de {livros.length} livros
          </p>

          {visiveis.length === 0 ? (
            <p>Nenhum livro encontrado.</p>
          ) : (
            <ul className="space-y-2">
              {visiveis.map((l) => (
                <ItemLivro
                  key={l.id}
                  livro={l}
                  generos={generos}
                  onAlternarLido={alternarLido}
                  onSalvar={salvar}
                  onRemover={remover}
                />
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
