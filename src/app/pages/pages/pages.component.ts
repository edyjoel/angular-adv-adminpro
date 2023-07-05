import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';
import { SidebarService } from '../../services/sidebar.service';
import { CargarUsuario } from '../../interfaces/cargar-usuarios.interface';

declare function customInitFunctions(): void;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css'],
})
export class PagesComponent implements OnInit {
  constructor(
    private settingsService: SettingsService,
    private sidebarService: SidebarService
  ) {}

  ngOnInit(): void {
    customInitFunctions();
    this.sidebarService.cargarMenu();
  }
}
