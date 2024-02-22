import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { environment } from 'projects/host-app/src/environments/environment';
import { first } from 'rxjs/operators';
import { AuthServiceService } from '../core/services/auth.service.service';
import { AuthStateService } from '../core/services/auth-state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: any;
  isOtpPage: boolean = false;
  otpForm!: FormGroup;
  validOtp: any;
  submitted: boolean = false;
  showLoader = false;
  enableResendOTP: boolean = false;

  public loading = false;
  public twoFactorAuthRequired: boolean = false;
  public returnUrl!: string;
  public authenticationFlag: boolean;
  public ipAddress!: string;
  hide = false;
  fieldTextType!: boolean;
  hideEyeSrc: string = 'assets/svg/DashboardIcons/eye.svg';
  showEyeSrc: string = 'assets/svg/DashboardIcons/eye-off.svg';
  signInSrc: string = 'assets/svg/SignIn.svg';
  static loginForm: any;
  display: any;
  public timerInterval: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthServiceService,
    private stateService: AuthStateService
  ) {
    this.authenticationFlag = environment.authentication_flag;
  }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ])
      ),
      password: new FormControl('', Validators.compose([Validators.required])),
      osType: ['Win64'],
      osVersion: ['10'],
    });
    const userString = localStorage.getItem('auth');
    let user: any;

    if (userString) {
      user = JSON.parse(userString);
    }

    if (
      (this.router.routerState?.snapshot?.url === 'login' ||
        this.router.routerState?.snapshot?.url === '') &&
      user &&
      user?.userDetails?.sessionId
    ) {
      let roles = ['RPM_ADMIN', 'FACILITY_USER', 'HOSPITAL_USER'];
      const currentUrl = localStorage.getItem('current-url');
      if (localStorage.getItem('role') === 'CAREPROVIDER') {
        this.router.navigate(['/careProviderDashboard']);
      } else if (localStorage.getItem('role') === 'CARECOORDINATOR') {
        this.router.navigate(['/careProviderDashboard']);
      } else if (
        localStorage.getItem('role') === 'RPM_ADMIN' ||
        localStorage.getItem('role') === 'FACILITY_USER' ||
        localStorage.getItem('role') === 'HOSPITAL_USER'
      ) {
        if (localStorage.getItem('current-url')) {
          this.router.navigate([`/home/${currentUrl}`]);
          localStorage.setItem('current-url', 'dashboard');
        } else {
          localStorage.clear();
          sessionStorage.clear();
          localStorage.setItem('current-url', 'dashboard');
        }
        this.router.navigate(['/home/dashboard']);
      }
    } else {
      localStorage.clear();
    }
  }

  getErrorMessage() {
    if (this.loginForm.get('email')?.hasError('required')) {
      return 'You must enter a value';
    }

    return this.loginForm.get('email')?.hasError('email')
      ? 'Not a valid email'
      : '';
  }

  otp(e: any) {
    this.validOtp = e;
  }
  goToLogin() {
    this.isOtpPage = false;
  }

  onLogin(event: any): void {
    event.preventDefault();
    console.log(
      this.loginForm.controls.username.value,
      this.loginForm.get('username').value
    );
    const currentUrl = localStorage.getItem('current-url');
    this.submitted = true;
    if (
      !this.loginForm.controls.username.value ||
      !this.loginForm.controls.password.value
    ) {
      // this.snackBarService.error('Enter proper email and password');
      this.submitted = false;
      return;
    }
    this.showLoader = true;
    const fcmToken = localStorage.getItem('fcmToken');
    if (this.authenticationFlag) {
      this.loginForm.addControl(
        'flag',
        this.fb.control(true, Validators.compose([Validators.required]))
      );
    } else {
      this.loginForm.addControl(
        'flag',
        this.fb.control(false, Validators.compose([Validators.required]))
      );
    }

    this.loginForm.addControl(
      'uid',
      this.fb.control(fcmToken, Validators.compose([Validators.required]))
    );

    this.authService
      .login(
        this.loginForm.controls.username.value,
        this.loginForm.controls.password.value,
        this.loginForm.controls.flag.value,
        this.loginForm.controls.uid.value
      )
      .subscribe(
        (data) => {
          this.enableResendOTP = false;
          this.display = '';
          this.stop();
          this.timer(data['duration']);
          setTimeout(() => {
            this.isOtpPage = true;
            this.showLoader = false;
          }, 1000);
          // this.sharedService.changeLoggedIn(true);
        },
        (error) => {
          this.isOtpPage = false;
          this.submitted = false;
          this.showLoader = false;
        }
      );
  }

  onLoginValidOtp(event: any) {
    event.preventDefault();
    let roles = ['RPM_ADMIN', 'FACILITY_USER', 'HOSPITAL_USER'];
    const currentUrl = localStorage.getItem('current-url');
    this.submitted = true;
    // if (
    //   !this.loginForm.controls.username.value ||
    //   !this.loginForm.controls.password.value
    // ) {
    //   this.snackBarService.error('Enter proper email and password');
    //   this.submitted = false;
    //   return;
    // }
    this.showLoader = true;
    const fcmToken = localStorage.getItem('fcmToken');
    if (this.authenticationFlag) {
      this.loginForm.addControl(
        'flag',
        this.fb.control(true, Validators.compose([Validators.required]))
      );
    } else {
      this.loginForm.addControl(
        'flag',
        this.fb.control(false, Validators.compose([Validators.required]))
      );
    }

    this.loginForm.addControl(
      'uid',
      this.fb.control(fcmToken, Validators.compose([Validators.required]))
    );

    this.authService
      .OtpAuthenticate(
        this.fields.username.value.toLowerCase(),
        this.validOtp ? this.validOtp : null,
        this.fields.flag.value,
        this.fields.uid.value
        // this.fields.osType.value,
        // this.fields.osVersion.value
      )
      .pipe(first())
      .subscribe(
        (data: any) => {
          // debugger;
          const sessionId = data?.userDetails['sessionId'].toString();
          localStorage.setItem('sessionId', sessionId);
          this.isOtpPage = true;
          this.showLoader = false;
          // this.sharedService.changeLoggedIn(true);
          const userRole = data.userDetails.userRole;
          localStorage.setItem('s3BaseUrl', data['s3BaseUrl']);
          localStorage.setItem('username', data.userDetails.username);

          localStorage.setItem(
            'currentUserName',
            data.userDetails['firstName'] + ' ' + data.userDetails['lastName']
          );
          localStorage.setItem('currentUserId', data.userDetails['scopeId']);

          // if (userRole === UserRoles.CAREPROVIDER) {
          //   data.userDetails.permissions =
          //     UserPermissionGroups[userRole].permissions;
          // }

          if (userRole === 'CAREPROVIDER') {
            this.router.navigate(['/careProviderDashboard']);
          } else if (userRole === 'CARECOORDINATOR') {
            this.router.navigate([
              '/careProviderDashboard/careprovider-patient-list',
            ]);
          } else if (roles.includes(userRole)) {
            // data.userDetails.permissions =
            //   UserPermissionGroups[userRole].permissions;
            if (currentUrl) {
              // this.router.navigate([`/home/${currentUrl}`]);
              this.router.navigate([`/forgot-password`]);
            } else {
              localStorage.clear();
              sessionStorage.clear();
              localStorage.setItem('current-url', 'dashboard');
            }
            // this.router.navigate(['/home/dashboard']);
            this.router.navigate([`/forgot-password`]);
          }

          localStorage.setItem('auth', JSON.stringify(data));
          let inputString = data.baseResourcePath;
          if (inputString.startsWith('/')) {
            inputString = inputString.substring(1);
            this.stateService.setBaseResource(inputString);
          }
          localStorage.setItem('baseResource', inputString);
          this.stateService.setUserLoggedIn(true);
          this.stateService.setRole(userRole);
          this.authService.authSubject.next(data);
          this.submitted = false;
          this.stop();
          this.updateUID(
            this.fields.username.value.toLowerCase(),
            this.fields.uid.value
          );
        },
        (error: any) => {
          this.submitted = false;
          this.showLoader = false;
        }
      );
  }

  updateUID(email: any, uid: any) {
    // if (uid) {
    //   this.authService.updateUID(email, uid).subscribe((res: any) => {});
    // }
  }

  get fields() {
    return this.loginForm.controls;
  }

  stop() {
    clearInterval(this.timerInterval);
  }

  timer(minute: any) {
    // let minute = 1;

    this.display = '';
    let seconds: number = minute;
    let textSec: any = '0';
    let statSec: number = 60;

    const prefix = minute < 10 ? '0' : '';

    this.timerInterval = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;

      if (statSec < 10) {
        textSec = '0' + statSec;
      } else textSec = statSec;

      this.display = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;

      if (seconds == 0) {
        this.enableResendOTP = true;
        // this.snackBarService.error('OTP is expired! Please resend OTP.');
        this.stop();
        clearInterval(this.timerInterval);
      }
    }, 1000);
  }
}
