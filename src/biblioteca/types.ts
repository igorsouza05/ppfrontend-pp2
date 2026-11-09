// O que a API devolve ------------------------------------------------------

export interface Genre {
  id: number;
  name: string;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  pages: number | null; // opcional no banco: pode vir null
  read: boolean;
  createdAt: string; // a data chega como texto ISO
  genreId: number | null; // livro sem gênero
  genre?: Genre | null; // só vem no GET (POST e PUT devolvem sem este objeto)
}

// O que o frontend envia ---------------------------------------------------

// POST /books: só título e autor são obrigatórios
export interface NovoLivro {
  title: string;
  author: string;
  pages?: number;
  genreId?: number;
}

// PUT /books/:id: tudo opcional; pages e genreId aceitam null (apagam o valor)
export interface AtualizaLivro {
  title?: string;
  author?: string;
  pages?: number | null;
  read?: boolean;
  genreId?: number | null;
}

// POST e PUT /genres
export interface NovoGenero {
  name: string;
}

export interface AtualizaGenero {
  name?: string;
}
