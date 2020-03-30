import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public userService: UserService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router, ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  onSubmit() {
    if (this.userService.authenticateUser(this.loginForm.value)) {
      this.toastr.success('Welcome ' + this.loginForm.value.username);
      this.router.navigate(['/dashboard']);
    }
    else
    this.toastr.error('Invalid Credentials');
  }

}
