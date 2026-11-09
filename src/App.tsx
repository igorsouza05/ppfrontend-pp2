import Botao from "./Botao";
import Contador from "./Contador";
import CartaoProduto from "./CartaoProduto";
import TarefaCard from "./TarefaCard";
import ConversorMoeda from "./ConversorMoeda";
import Enquete from "./Enquete";
import ListaPosts from "./ListaPosts";
import TabelaUsuarios from "./TabelaUsuarios";
import TarefasFiltro from "./TarefasFiltro";
import BuscaPosts from "./BuscaPosts";
import ComentariosPost from "./ComentariosPost";
import ListaApi from "./ListaApi";
import AppBiblioteca from "./biblioteca/App";

const produtos = [
  { nome: "Teclado", preco: 149.9 },
  { nome: "Mouse", preco: 79.5 },
  { nome: "Monitor", preco: 899 },
];

export default function App() {
  return (
    <div className="p-6 space-y-8">
      {/* Exercício 1 */}
      <section className="space-y-2">
        <h2 className="text-xl font-bold">1. Botão reutilizável</h2>
        <div className="flex gap-2">
          <Botao texto="Salvar" variante="primario" onClick={() => alert("Salvo!")} />
          <Botao texto="Excluir" variante="perigo" onClick={() => alert("Excluído!")} />
          <Botao texto="Confirmar" variante="primario" onClick={() => alert("Confirmado!")} />
        </div>
      </section>

      {/* Exercício 2 */}
      <section className="space-y-2">
        <h2 className="text-xl font-bold">2. Contador com passo</h2>
        <Contador passo={1} />
        <Contador passo={5} />
      </section>

      {/* Exercício 3 (usando .map do bônus) */}
      <section className="space-y-2">
        <h2 className="text-xl font-bold">3. Cartão de produto</h2>
        <div className="flex gap-4 flex-wrap">
          {produtos.map((p) => (
            <CartaoProduto key={p.nome} nome={p.nome} preco={p.preco} />
          ))}
        </div>
      </section>

      {/* Exercício 4 */}
      <section className="space-y-2">
        <h2 className="text-xl font-bold">4. Cartão de tarefa</h2>
        <div className="flex gap-4 flex-wrap">
          <TarefaCard titulo="Estudar React" />
          <TarefaCard titulo="Fazer exercícios" />
          <TarefaCard titulo="Revisar props" />
        </div>
      </section>

      {/* Exercício 5 */}
      <section className="space-y-2">
        <h2 className="text-xl font-bold">5. Conversor de moeda</h2>
        <div className="flex gap-4 flex-wrap">
          <ConversorMoeda moeda="USD" taxa={0.18} />
          <ConversorMoeda moeda="EUR" taxa={0.16} />
        </div>
      </section>

      {/* Exercício 6 */}
      <section className="space-y-2">
        <h2 className="text-xl font-bold">6. Enquete</h2>
        <div className="flex gap-4 flex-wrap">
          <Enquete pergunta="Melhor linguagem?" opcaoA="TypeScript" opcaoB="Python" />
          <Enquete pergunta="Melhor editor?" opcaoA="VS Code" opcaoB="WebStorm" />
        </div>
      </section>

      <hr />
      <h1 className="text-2xl font-bold">Listas, useEffect e fetch</h1>

      {/* Listas e fetch · Exercício 1 */}
      <section className="space-y-2">
        <h2 className="text-xl font-bold">1. Lista de posts</h2>
        <ListaPosts />
      </section>

      {/* Listas e fetch · Exercício 2 */}
      <section className="space-y-2">
        <h2 className="text-xl font-bold">2. Tabela de usuários</h2>
        <TabelaUsuarios />
      </section>

      {/* Listas e fetch · Exercício 3 */}
      <section className="space-y-2">
        <h2 className="text-xl font-bold">3. Tarefas com filtro de status</h2>
        <TarefasFiltro />
      </section>

      {/* Listas e fetch · Exercício 4 */}
      <section className="space-y-2">
        <h2 className="text-xl font-bold">4. Busca por título</h2>
        <BuscaPosts />
      </section>

      {/* Listas e fetch · Exercício 5 */}
      <section className="space-y-2">
        <h2 className="text-xl font-bold">5. Comentários de um post</h2>
        <ComentariosPost />
      </section>

      {/* Listas e fetch · Exercício 6 */}
      <section className="space-y-2">
        <h2 className="text-xl font-bold">6. Botão recarregar</h2>
        <ListaApi />
      </section>

      <hr />
      <h1 className="text-2xl font-bold">Lista da Biblioteca (livros e gêneros)</h1>
      <AppBiblioteca />
    </div>
  );
}
