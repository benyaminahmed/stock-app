import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.scss']
})
export class PropertyCardComponent {
  @Input() title: string;
  @Input() value: number;
  @Input() currency: string;
  @Input() colourClass: string;

}
