import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-error401',
  imports: [RouterLink, ButtonModule, CardModule],
  templateUrl: './error401.html',
  styleUrl: './error401.css',
})
export class Error401 {

}
