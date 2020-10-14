import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
})
export class FormInputComponent {

  constructor() { }

  @Input() label;
  @Input() type = 'text';
  @Input() placeholder = "";
}
