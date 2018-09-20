import { Component, OnInit } from '@angular/core';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular-6-social-login';
// import { AuthAPIService } from '../services/auth-api.service';
// import { UserService } from '../services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService, AuthAPIService } from '../services';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthAPIService,
    private alertService: AlertService) {}

ngOnInit() {
    this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });

    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
}

// convenience getter for easy access to form fields
get f() { return this.loginForm.controls; }

onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
        .pipe(first())
        .subscribe(
            data => {
                this.router.navigate([this.returnUrl]);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
}
  // public responseData: any;
  // public userPostData = {
  //   email: '',
  //   name: '',
  //   provider: '',
  //   provider_id: '',
  //   provider_pic: '',
  //   token: ''
  // };

  // constructor(
  //   private socialAuthService: AuthService,
  //   public authAPIService: AuthAPIService,
  //   public user: UserService) {
  //     this.user.sessionIn();
  //   }

  // ngOnInit() {}

  // model : any = {};
  // onSubmit() {
  //   alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.model))
  // }

  // public socialSignIn(socialPlatform: string) {
  //   let socialPlatformProvider;
  //   if (socialPlatform === 'facebook') {
  //     socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
  //   } else if (socialPlatform === 'google') {
  //     socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
  //   } 

  //   this.socialAuthService.signIn(socialPlatformProvider).then(userData => {
  //     console.log(socialPlatform + ' sign in data : ', userData);
  //     this.apiConnection(userData);
  //   });
  // }

  // apiConnection(data) {
  //   this.userPostData.email = data.email;
  //   this.userPostData.name = data.name;
  //   this.userPostData.provider = data.provider;
  //   this.userPostData.provider_id = data.id;
  //   this.userPostData.provider_pic = data.image;
  //   this.userPostData.token = data.token;

  //   this.authAPIService.postData(this.userPostData, 'signup').then(
  //     result => {
  //       this.responseData = result;
  //       if (this.responseData.userData) {
  //         this.user.storeData(this.responseData.userData);
  //       }
  //     },
  //     err => {
  //       console.log('error');
  //     }
  //   );
  // }
}
