import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { UiState } from '../../core/services/ui-state';

@Component({
  selector: 'app-topbar',
  imports: [RouterLink, ButtonModule],
  templateUrl: './topbar.html',
  styleUrl: './topbar.css',
})
export class Topbar {
  constructor(public ui: UiState){}
}
