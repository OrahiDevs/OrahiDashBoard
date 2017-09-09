import { Component, OnInit } from '@angular/core';

import { Router } from "@angular/router";
import { MdSnackBar } from "@angular/material";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ServiceProviderModel } from "../../../models/service-provider.model";
import { RegxService } from "../../../services/regx.service";
import { WebapiService } from "../../../services/webapi.service";
import { AuthService } from "../../../services/auth.service";
import { StructureValidator } from "../../../services/structure.validator";



@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;
  active:boolean = true;
  serviceProvider: ServiceProviderModel = new ServiceProviderModel();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private regExpService: RegxService,
    private webApiPathService: WebapiService,
    private authService: AuthService,
    private snackBar: MdSnackBar
  ) { }

  ngOnInit() {
    this.buildForm();
  }
  navRegister(){
    this.router.navigate(['/signup']);
}

buildForm(): void {
     this.loginForm = this.fb.group({
        'email':[null,[
            Validators.required,
            StructureValidator([this.regExpService.getRegExp('email').regExp])
        ]],
        'password': [null, Validators.required]
    });

    this.loginForm.valueChanges
        .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();

}

onValueChanged(data?: any){
    if(!this.loginForm) { return; }
    const form = this.loginForm;
    
    for(const field in this.formErrors){
        //Clear previous error messages (if any)
        this.formErrors[field] = '';
        const control = form.get(field);          
        if(control && control.dirty && !control.valid){
            const messages = this.validationMessages[field];
            for(const key in control.errors){
                this.formErrors[field] = messages[key];
            }
        }
    }
}

formErrors = {
    'email': ''
};

validationMessages = {
    'email': {
        'required': '',
        'forbiddenStructure': 'Email format should be "john@doe.com".'
    }
}

onSubmitForm(){
    this.serviceProvider = this.loginForm.value;
    this.authService.authenticate(this.serviceProvider, this.webApiPathService.getWebApiPath('login-sp').path)
        .subscribe(responseSp => {
            if (responseSp.status === "success") { 
                console.log(responseSp.message);
                this.snackBar.open(responseSp.message, '', {
                    duration: 2000,
                });
                this.router.navigate(['/dashboard', 'receipts']);
            }else{
                this.snackBar.open(responseSp.message, '', {
                    duration: 2000,
                });
                // console.log(responseSp.message);
                console.log(responseSp);
            }
        }, 
        errMsg => {
            this.snackBar.open(errMsg, '', {
                    duration: 2000,
            });
            console.log(errMsg);
        });
}

}
