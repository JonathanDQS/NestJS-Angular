import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  host: { class: 'container d-flex justify-content-center align-items-center flex-column' },
})
export class HomeComponent { }
