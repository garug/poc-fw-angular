import { Component, forwardRef, Host, Input, OnChanges, OnInit, Optional, Self, SkipSelf } from '@angular/core';
import { AbstractControl, ControlContainer, ControlValueAccessor, FormControl, FormGroupDirective, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  host: { '(blur)': 'onTouched($event)' },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormInputComponent),
      multi: true,
    },
  ],
})
export class FormInputComponent implements OnInit, OnChanges, ControlValueAccessor {

  constructor(
    @Optional()
    @Host()
    @SkipSelf()
    private controlContainer: ControlContainer,
  ) { }

  @Input() name: string;
  @Input() label;
  @Input() type = 'text';
  @Input() placeholder = "";
  
  @Input() formControlName: string;
  control: AbstractControl;
  val = '';
  onChange: any = () => { };
  onTouch: any = () => { };

  set value(val) {
    this.val = val;
    this.onChange(val);
    this.onTouch(val);
  }

  ngOnInit() {
    this.checkRequiredName();
    this.control = this.controlContainer.control.get(this.formControlName);
  }

  ngOnChanges() {
    this.checkRequiredName();
  }

  writeValue(value) {
    this.val = value;
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouch = fn;
  }

  checkRequiredName() {
    if (!this.name) {
      throw new Error("Attribute 'name' is required");
    }
  }
}
