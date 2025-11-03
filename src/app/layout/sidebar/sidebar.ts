import { Component } from '@angular/core';
import { RouterLinkActive, RouterLinkWithHref } from '@angular/router';
import { DrawerModule } from 'primeng/drawer';
import { UiState } from '../../core/services/ui-state';

@Component({
  selector: 'app-sidebar',
  imports: [ RouterLinkWithHref, RouterLinkActive, DrawerModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  constructor(private ui: UiState) {}

  get visible() {
    return this.ui.sidebarVisible.asReadonly();
  }

  closeSidebar(){
    this.ui.closeSidebar();
  }

}
