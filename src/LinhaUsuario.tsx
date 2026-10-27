import type { Usuario } from "./tipos";

type LinhaUsuarioProps = {
  usuario: Usuario;
};

export default function LinhaUsuario({ usuario }: LinhaUsuarioProps) {
  return (
    <tr className="border-t">
      <td className="px-3 py-2">{usuario.name}</td>
      <td className="px-3 py-2">
        <a
          href={`mailto:${usuario.email}`}
          className="text-blue-600 underline"
        >
          {usuario.email}
        </a>
      </td>
      <td className="px-3 py-2">{usuario.address.city}</td>
      <td className="px-3 py-2">{usuario.company.name}</td>
    </tr>
  );
}
