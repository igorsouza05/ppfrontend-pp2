import { useEffect, useState } from "react";
import type { Todo } from "./tipos";

const API_URL = "https://jsonplaceholder.typicode.com/todos?userId=1";

type Filtro = "todas" | "pendentes" | "concluidas";

const filtros: { valor: Filtro; rotulo: string }[] = [
  { valor: "todas", rotulo: "Todas" },
  { valor: "pendentes", rotulo: "Pendentes" },
  { valor: "concluidas", rotulo: "Concluídas" },
];

export default function TarefasFiltro() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [filtro, setFiltro] = useState<Filtro>("todas");

  useEffect(() => {
    async function carregar() {
      try {
        const resposta = await fetch(API_URL);
        if (!resposta.ok) {
          throw new Error(`Erro HTTP ${resposta.status}`);
        }
        const dados: Todo[] = await resposta.json();
        setTodos(dados);
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
  if (todos.length === 0) return <p>Nenhuma tarefa.</p>;

  // estado derivado: a lista visível é calculada, não guardada em state
  const visiveis = todos.filter((t) => {
    if (filtro === "pendentes") return !t.completed;
    if (filtro === "concluidas") return t.completed;
    return true;
  });

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        {filtros.map((f) => (
          <button
            key={f.valor}
            onClick={() => setFiltro(f.valor)}
            className={
              filtro === f.valor
                ? "px-3 py-1 rounded bg-teal-600 text-white"
                : "px-3 py-1 rounded bg-gray-200 text-gray-800"
            }
          >
            {f.rotulo}
          </button>
        ))}
      </div>

      <p className="text-sm text-gray-600">{visiveis.length} tarefas</p>

      {visiveis.length === 0 ? (
        <p>Nenhuma tarefa neste filtro.</p>
      ) : (
        <ul className="space-y-1">
          {visiveis.map((t) => (
            <li
              key={t.id}
              className={t.completed ? "line-through text-slate-400" : ""}
            >
              {t.completed ? "[x]" : "[ ]"} {t.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
