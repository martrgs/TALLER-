
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Publicacion {
  userId: number;
  id?: number;
  title: string;
  body: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);

  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  obtenerPublicaciones(): Observable<Publicacion[]> {
    return this.http.get<Publicacion[]>(this.apiUrl + '?_limit=5').pipe(
      map((datos) =>
        datos.map((publicacion) => ({
          ...publicacion,
          title: 'Publicación de ejemplo ' + publicacion.id,
          body: 'Este es un texto de prueba en español obtenido mediante el consumo de una API REST.'
        }))
      )
    );
  }

  crearPublicacion(datos: Publicacion): Observable<Publicacion> {
    return this.http.post<Publicacion>(this.apiUrl, datos);
  }
}
