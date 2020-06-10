/* tslint:disable */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// import { Papa } from 'ngx-papaparse';


const loginUrl = environment.loginUrl;
const loginOpt = environment.LoginOptionUrl;
//const logOutUrl = environment.logOutUrl;
const httpOptions = {
   headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Accept': 'application/json'})
 };

interface login_obj {
  organisation:string;
  project: string;
  folder: string;
  folder_path: string;
  img_path: any;
  category: string;
  name: string;
  type: string;
  
}

const glob_obj=<login_obj>{};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public token = "UNKNOWN";
  public userData: any;
  public userDetails: any;
  public user_id : number;
  login_dt:{};
  public glb_obj = glob_obj;
  
  constructor(public router : Router, private http: HttpClient)
   { 
    
    this.glb_obj = (JSON.parse(localStorage.getItem('proj_obj')) != null )?JSON.parse(localStorage.getItem('proj_obj')):this.glb_obj;    
    this.getLoginData();
   }

  public redirect(){
    this.router.navigate(['/login']);
  }

  // to get login data from file
  getLoginData(){
    var headers = new HttpHeaders()
    .set("Content-Type","application/json");
    return this.http.get(loginUrl);
  }

  //get login form data
  getLoginOpt(){
    var headers = new HttpHeaders()
    .set("Content-Type","application/json");
    return this.http.get(loginOpt);
  }

  public logOut(){
    // to read stored object
    //let a = localStorage.getItem('user');
    //console.log(JSON.parse(a).username);
    localStorage.removeItem('user_obj');
    return 1;   
  }

  // set tokan to local storage
  setToken(uobj){
    
    localStorage.setItem('user_obj',JSON.stringify(uobj));
    return 1;
  }

  //set project to local
  setProjLoc(pobj){
    console.log(pobj);
    localStorage.setItem('proj_obj',JSON.stringify(pobj));
    return 1;
  }

  loginMethod(lobj){

    // let token = 'token';
    // sessionStorage.setItem(token,this.token);
    // this.router.navigateByUrl('/dashboard');
    //this.router.navgateURL(['/admin']);
     return this.http.post(loginUrl, lobj, httpOptions);
  }


  // public getUserData():Observable<userDetails>{

  //   this.token = sessionStorage.getItem('Authorization');
  //   var payload = {"token":this.token}
  //   var headers = new HttpHeaders()
  //   .set("Content-Type","application/json");
  //    return this.http.post(userSettingsUrl,payload,{headers}).pipe(
  //     map((response)=> {

  //       let result = this.extractData(response);
  //       return result;
  //     }));

  // }
  
}
