import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UiState {
  sidebarVisible = signal(false);

  toggleSidebar() {
    this.sidebarVisible.update((v) => !v);
  }

  closeSidebar() {
    this.sidebarVisible.set(false);
  }
}
