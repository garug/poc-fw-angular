import { Component, forwardRef, Host, Input, OnChanges, OnInit, Optional, SkipSelf } from '@angular/core';
import { AbstractControl, ControlContainer, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-form-radio',
  templateUrl: './form-radio.component.html',
  host: { '(blur)': 'onTouched($event)' },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormRadioComponent),
      multi: true,
    },
  ],
})
export class FormRadioComponent implements OnInit, OnChanges, ControlValueAccessor {

  constructor(
    @Optional()
    @Host()
    @SkipSelf()
    private controlContainer: ControlContainer,
  ) { }

  @Input() label;
  @Input() value;
  @Input() name;

  @Input() formControlName: string;
  control: AbstractControl;
  val = '';
  onChange: any = () => { };
  onTouch: any = () => { };

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
