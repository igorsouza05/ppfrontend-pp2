import { useEffect, useState } from "react";
import LinhaUsuario from "./LinhaUsuario";
import type { Usuario } from "./tipos";

const API_URL = "https://jsonplaceholder.typicode.com/users";

export default function TabelaUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function carregar() {
      try {
        const resposta = await fetch(API_URL);
        if (!resposta.ok) {
          throw new Error(`Erro HTTP ${resposta.status}`);
        }
        const dados: Usuario[] = await resposta.json();
        setUsuarios(dados);
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
  if (usuarios.length === 0) return <p>Nenhum usuário.</p>;

  return (
    <table className="text-left border border-gray-300">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-3 py-2">Nome</th>
          <th className="px-3 py-2">E-mail</th>
          <th className="px-3 py-2">Cidade</th>
          <th className="px-3 py-2">Empresa</th>
        </tr>
      </thead>
      <tbody>
        {usuarios.map((u) => (
          <LinhaUsuario key={u.id} usuario={u} />
        ))}
      </tbody>
    </table>
  );
}
