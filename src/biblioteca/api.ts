import type {
  AtualizaGenero,
  AtualizaLivro,
  Book,
  Genre,
  NovoGenero,
  NovoLivro,
} from "./types";

export const BASE = "http://localhost:3001";
export const JSON_HEADERS = { "Content-Type": "application/json" };

// Função genérica: todas as outras passam por ela.
async function requisicao<T>(path: string, opcoes?: RequestInit): Promise<T> {
  const resposta = await fetch(`${BASE}${path}`, opcoes);

  // fetch NÃO lança erro em 400/404/500: conferimos o .ok e lançamos nós
  if (!resposta.ok) {
    let mensagem = `Erro HTTP ${resposta.status}`;
    try {
      const corpo = await resposta.json();
      if (corpo && typeof corpo.message === "string") {
        mensagem = corpo.message; // mensagem enviada pelo backend
      }
    } catch {
      // resposta de erro sem JSON: fica a mensagem genérica
    }
    throw new Error(mensagem);
  }

  // 204 = sem corpo: chamar .json() aqui daria "Unexpected end of JSON input"
  if (resposta.status === 204) {
    return undefined as T;
  }

  return resposta.json();
}

// Livros ----------------------------------------------------------------------

export function listarLivros() {
  return requisicao<Book[]>("/books");
}

export function criarLivro(dados: NovoLivro) {
  return requisicao<Book>("/books", {
    method: "POST",
    headers: JSON_HEADERS,
    body: JSON.stringify(dados),
  });
}

export function atualizarLivro(id: number, dados: AtualizaLivro) {
  return requisicao<Book>(`/books/${id}`, {
    method: "PUT",
    headers: JSON_HEADERS,
    body: JSON.stringify(dados),
  });
}

export function removerLivro(id: number) {
  return requisicao<void>(`/books/${id}`, { method: "DELETE" });
}

// Gêneros ---------------------------------------------------------------------

export function listarGeneros() {
  return requisicao<Genre[]>("/genres");
}

export function criarGenero(dados: NovoGenero) {
  return requisicao<Genre>("/genres", {
    method: "POST",
    headers: JSON_HEADERS,
    body: JSON.stringify(dados),
  });
}

export function atualizarGenero(id: number, dados: AtualizaGenero) {
  return requisicao<Genre>(`/genres/${id}`, {
    method: "PUT",
    headers: JSON_HEADERS,
    body: JSON.stringify(dados),
  });
}

export function removerGenero(id: number) {
  return requisicao<void>(`/genres/${id}`, { method: "DELETE" });
}
