import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-radio',
  templateUrl: './form-radio.component.html',
})
export class FormRadioComponent {

  constructor() { }

  @Input() label;
}
