import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { from, Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-hello';

  pocForm: FormGroup;
  submitting: boolean;
  saved: Object | undefined = undefined;

  ngOnInit() {
    // Specific rules applied to form
    this.pocForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      liked: new FormControl('', [Validators.required]),
    });
  }

  // Validate liked
  validatorLiked(value) {
    return (control) => {
      console.log(control);
      return true;
    }
  }

  // Function to sendInfo
  submitForm(): void {
    this.submitting = true;

    if (this.pocForm.valid) {
      const obj = {
        ...this.pocForm.value,
        liked: this.pocForm.value.liked === "Yes",
      };

      this.checkEmail(obj.email)
        .subscribe(
          () => this.saved = obj,
          error => {
            this.submitting = false;
            setTimeout(() => this.pocForm.get('email').setErrors({ 'exists': true }), 1);
          },
          () => this.submitting = false
        );

    } else {
      this.pocForm.markAllAsTouched();
      this.submitting = false;
    }
  }

  // Function to check email
  checkEmail(email) {
    return from(new Promise((resolve, reject) => {
      setTimeout(
        () => (email === "john@mail.com" ? reject() : resolve()),
        2000
      );
    }));
  }
}
