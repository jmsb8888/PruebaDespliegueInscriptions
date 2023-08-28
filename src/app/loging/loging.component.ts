import {Component} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AppService} from "src/app/service-app.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {UserModel} from "./UserModel";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {CookieService} from "ngx-cookie-service";
import {RouterModule} from "@angular/router";
import {AppRoutingModule} from "../app-routing.module";
import { DataService } from '../shared/data.service';
import {CharService} from "./char.service";

@Component({
  selector: 'app-loging',
  templateUrl: './loging.component.html',
  styleUrls: ['./loging.component.css']
})
export class LogingComponent implements HttpInterceptor{

  inputValue: string = '';
  public user: any;
  public pasword: any;
  public array: any[] = [];
  public remember: any = false;
  loggedIn: boolean = true;
  constructor(
    public dataService: DataService,
    private toastr: ToastrService,
    public service: AppService,
    private route: ActivatedRoute,
    public cookieService: CookieService,
    public router: Router,
    private sharedService:CharService
  ) {
    //this.getRedis();
    if (this.array !== null){
      this.user = this.array[0];
      this.pasword = this.array[1];
    }

  }
  updateInputValue() {
    this.dataService.setInputValue(this.inputValue);
  }
  putUser(form: NgForm) {
    if (this.remember){
      this.service.putUsers().subscribe(
        res => {
          this.toastr.success("exitoso");
          this.getLogin();
          this.resetForm(form);
        },
        err => {
          this.resetForm(form);
          this.toastr.error("error");
        }
      );
    }
    else {
      this.getLogin();
      this.resetForm(form);
    }
  }

  getLogin() {
    this.service.getLoging().subscribe(res => {
      this.toastr.success("INICIO DE SESION EXITOSO!");
      const tokenString = JSON.stringify(res);
      const token = JSON.parse(tokenString);
      console.log("token", token.token);
      this.cookieService.set('token', token.token);
      this.sharedService.myVariable=true;

      //this.loggedIn=true;
      this.router.navigate(['/','home']);

      //this.router.navigateByUrl("home");
    }, err => {
      this.toastr.error("ERROR AL INICIAR SESION");
    });
  }

  deleteToken(){
    this.cookieService.delete('token');
  }


  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formDataUser = new UserModel();
  }

  private getRedis() {
    this.service.getRedis().subscribe(
      res => {
        this.toastr.success(res.toString());
        const redisString = JSON.stringify(res);
        const redis = JSON.parse(redisString);
        this.array = redis;
      },
      err => {
        this.toastr.error(err);
        console.log(err);
      }
    );
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token= this.cookieService.get('token');
    if(token){
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(req);
  }

  islogingIn(loggedIn: boolean) {
    if(loggedIn){
      this.router.navigate(['/app-menu']);
    }
  }
}
