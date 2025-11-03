import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { UiState } from '../../core/services/ui-state';

@Component({
  selector: 'app-topbar',
  imports: [ButtonModule],
  templateUrl: './topbar.html',
  styleUrl: './topbar.css',
})
export class Topbar {
  constructor(public ui: UiState){}
}
