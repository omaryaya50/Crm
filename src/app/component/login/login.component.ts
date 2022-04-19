import { Component, OnInit, TemplateRef } from '@angular/core';
import { UserService } from 'src/app/api.service/security/users-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BsModalService } from 'ngx-bootstrap/modal';
import { TranslateService } from '@ngx-translate/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SetUpService } from 'src/app/api.service/security/set-up.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  rowData: any;
  ToMail: string = "";
  isSubmitted = true;
  hide: boolean = true;
  modalRef: any;
  public Rtl = localStorage.getItem('textDir') == 'ltr' ? false : true;
  constructor(public obuser: UserService, private spinner: NgxSpinnerService
    , private router: Router, public SetUpServ: SetUpService, private modalService: BsModalService
    , private translate: TranslateService) {
  }

  ngOnInit(): void {

    this.obuser.loginUse={
      userName:'',
      password:'',
    }
  }
  myFunction() {
    this.hide = !this.hide;
  }

  onLogin(f: NgForm) {

    this.spinner.show();
    this.isSubmitted = this.obuser.loginUse.userName === null || this.obuser.loginUse.userName === "" ?
      false : true;
    // console.log(this. obuser.Seruser);
    if (this.isSubmitted) {
      // this.obuser.Login(this.obuser.Seruser.userName, this.obuser.Seruser.password)
      //   .subscribe();

      this.obuser.loginuser().subscribe(res => {
        
        if (res != null && res.userName !== null && res.userName !== '') {
          this.isSubmitted = true;
          localStorage.setItem('jwt',res.xToken.toString())
          sessionStorage.setItem('login', res.userName);
          localStorage.setItem('id', res.id.toString());
          console.log( sessionStorage.setItem('id', res.id.toString()))

          localStorage.setItem('GroupID', res.groupId.toString());
         
          setTimeout(() => {
            this.spinner.hide();
          }, 1000);
         this.router.navigate(['']);
         
        }
        else {

          sessionStorage.setItem('login', '');
          this.isSubmitted = false;
          setTimeout(() => {
            this.isSubmitted = true;
          }, 2000);
        }
      }
        , err => {
          sessionStorage.setItem('login', '');
          this.isSubmitted = false;
          setTimeout(() => {
            this.isSubmitted = true;
          }, 2000);
        });
    }
    else {

      setTimeout(() => {
        this.isSubmitted = true;
      }, 2000);
    }
  }
  showModel(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);

  }
  resetPassword() {
    if (this.ToMail == "") {
      alert("Empty Mail !");
    }
    else {

      this.SetUpServ.SendMail(this.ToMail).subscribe();
      this.obuser.ResetPassword(this.obuser.Seruser.userName).subscribe();
      this.hidee();
      this.ToMail = "";
    }

  }

  hidee() {
    this.modalRef.hide();
  }
}
