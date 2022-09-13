import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MailService } from 'src/app/services/mail.service';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  loginForm: UntypedFormGroup;
  submitted = false;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router, 
    private mailService : MailService
  ) {}
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)]
      ]
    });
  }
  get f() {
    return this.loginForm.controls;
  }
  
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    } else {
      this.mailService.resetPassword(this.loginForm.getRawValue()['email']).subscribe(data =>{
        console.log('data====>', data)
      })
      // this.router.navigate(['/dashboard/main']);
    }
  }
}
