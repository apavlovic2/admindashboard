import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-error403',
  imports: [RouterLink, ButtonModule, CardModule],
  templateUrl: './error403.html',
  styleUrl: './error403.css',
})
export class Error403 {

}
