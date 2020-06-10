import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './../@core/data/login/login.service';
import { Router } from '@angular/router';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  submitted = false;
  //check if already logged
  public isLogged;
  public response;
  public user_id;
  // public submit = 0;
  public flag = false;
  public loaded = false;
  public loading = false;
  public ldata;
  public lopdata;
  public orgs:any;
  public projects:any;
  public set_val:any;

  private alive = true;

  constructor(private formBuilder: FormBuilder, public loginService : LoginService, public router : Router, private themeService: NbThemeService) {
 
    this.flag = false;
   
    //var isLogged = sessionStorage.Authorization;
    //if(isLogged != undefined && this.loginService.user_id!=undefined)

    let isLogged = JSON.parse(localStorage.getItem('user_obj'));
    this.set_val = this.loginService.glb_obj;    
    console.log(this.loginService.glb_obj);
    // get org and project data
    this.loginService.getLoginOpt().subscribe((lopt)=>{
      this.lopdata = lopt['data'];
      //this.orgs = lopt['data'].org;
      var tarr = Array();
      lopt['data'].org.forEach(elem => {
        var nw = {};
        if(elem == 'Nokia'){
          nw = {'key':elem,val:'NorthernTrust'};
        }
        else{
          nw = {'key':elem,val:elem};
        }
        console.log(nw);
        tarr.push(nw);
      });
      this.orgs = tarr;
      console.log(this.orgs);
      
    });
    
    if(isLogged != undefined)
    {
     
      this.router.navigate(['/pages/dashboard']);
      return;
    }
    else
    {
      console.log(isLogged);
      this.router.navigateByUrl('/login');

      //get login userdata
      this.loginService.getLoginData().subscribe((ldata)=>{
        
      this.ldata = ldata['data'];
      
      });
      
      return;

    }

  }

  ngOnInit() {
    // this.submit = 0;
    this.loginForm = this.formBuilder.group({
            userName: ['', Validators.required],
            passWord: ['', [Validators.required]],
        });

  }

  // convenience getter for easy access to form fields
  get f()
  {
    return this.loginForm.controls; 
  }

  onBlur(event){
    console.log("event: ",event)
  }
  onSubmit() {

        this.loaded = true;
        this.submitted = true;
       
        let username = this.loginForm.value.userName;
        let password = this.loginForm.value.passWord;

        let login_object = {"username": username, "password": password};
        
        // stop here if form is invalid
        if (this.loginForm.invalid) {
          // this.submit = 0;
          this.loaded = false;
          console.log("invalid");
            return;
        }
        else{

          //console.log("Login ", login_object);
          console.log(this.ldata);
          
          // find username and password in data list
          let is_usnm_match = Object.keys(this.ldata).find(k => this.ldata[k].username == login_object.username );
          let is_pass_match = Object.keys(this.ldata).find(k => this.ldata[k].password === login_object.password );
          
          if(is_pass_match === is_usnm_match && is_pass_match != undefined  )
          {
            this.flag = false;
            this.loginService.setToken(this.ldata[is_usnm_match]);

            //set project to local storage
            this.loginService.setProjLoc(this.set_val);
            this.loaded = false;
            this.router.navigateByUrl('/pages/dashboard');
            
          }
          else if(is_pass_match != is_usnm_match && is_usnm_match != undefined &&  is_pass_match != undefined )
          {
            this.loaded = false;
           this.flag = true;
          }
          else if(is_usnm_match == undefined || is_pass_match == undefined ){
           this.loaded = false;
           this.flag = true;
          }        
          
          
        }
       
      
    }

    //set org val
    setOrg(event){

      console.log(this.set_val);

      this.set_val['organisation'] = event.target.value;
      this.projects = this.lopdata.projects[event.target.value];
    }

    //set project val
    setProj(event){      

      this.set_val['project']= event.target.value;
     
    }

    ngOnDestroy() {
      this.alive = false;
    }

}
