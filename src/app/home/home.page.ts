
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonButton,
  IonIcon,
  IonText
} from '@ionic/angular/standalone';

import { ApiService, Publicacion } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonButton,
    IonIcon,
    IonText
  ]
})
export class HomePage implements OnInit {
  private apiService = inject(ApiService);

  publicaciones: Publicacion[] = [];
  cargando = false;
  errorApi = '';
  mensaje = '';

  titulo = '';
  contenido = '';

  ngOnInit(): void {
    this.cargarPublicaciones();
  }

  cargarPublicaciones(): void {
    this.cargando = true;
    this.errorApi = '';

    this.apiService.obtenerPublicaciones().subscribe({
      next: (datos) => {
        this.publicaciones = datos;
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al consultar la API:', error);
        this.errorApi = 'No se pudieron cargar las publicaciones. Revisa tu conexión.';
        this.cargando = false;
      }
    });
  }

  enviarPublicacion(): void {
    if (!this.titulo.trim() || !this.contenido.trim()) {
      this.mensaje = 'Debes completar el título y el contenido.';
      return;
    }

    const nuevaPublicacion: Publicacion = {
      userId: 1,
      title: this.titulo.trim(),
      body: this.contenido.trim()
    };

    this.apiService.crearPublicacion(nuevaPublicacion).subscribe({
      next: (respuesta) => {
        this.mensaje =
          'Publicación enviada correctamente. ID de prueba: ' + respuesta.id;

        this.titulo = '';
        this.contenido = '';
      },
      error: (error) => {
        console.error('Error al enviar la publicación:', error);
        this.mensaje = 'No se pudo enviar la publicación.';
      }
    });
  }
}

