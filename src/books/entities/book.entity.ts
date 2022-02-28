export class Book {
  constructor(Book: Partial<Book>) {
    this.id = Book.id;
    this.titulo = Book.titulo;
    this.autor = Book.autor;
    this.genero = Book.genero;
    this.anoDeLancamento = Book.anoDeLancamento;
  }
  id: string;
  titulo: string;
  autor: string;
  user: string;
  genero: string;
  anoDeLancamento: string;
}
