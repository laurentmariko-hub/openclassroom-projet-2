import { Component, input } from '@angular/core';
import { Indicator } from '../models/indicator';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  title = input<string>();
  indicators = input<Indicator[]>();
}
