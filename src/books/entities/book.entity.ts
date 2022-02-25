export class Book {
  constructor(Book: Partial<Book>) {
    this.titulo = Book.titulo;
    this.autor = Book.autor;
    this.genero = Book.genero;
    this.anoDeLancamento = Book.anoDeLancamento;
  }
  titulo: string;
  autor: string;
  user: string;
  genero: string;
  anoDeLancamento: string;
}
