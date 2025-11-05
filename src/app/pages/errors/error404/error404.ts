import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-error404',
  imports: [RouterLink, ButtonModule, CardModule],
  templateUrl: './error404.html',
  styleUrl: './error404.css',
})
export class Error404 {

}
