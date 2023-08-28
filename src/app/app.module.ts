import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatMenuModule} from '@angular/material/menu';
import {AppRoutingModule} from "./app-routing.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {NgxPaginationModule} from "ngx-pagination";
import {FormsModule} from "@angular/forms";
import {StudentComponent} from "./Students/student.component";
import {FormSubjectComponent} from './subject/form-create-subject/form-subject.component';
import {FormEditSubjectComponent} from "./subject/form-edit-subject/form-edit-subject.component";
import {FormEditStudentComponent} from "./Students/form-edit-student/form-edit-student.component";
import {SubjectComponent} from "./subject/subject.component";
import { InscriptionsComponent } from './inscriptions/inscriptions.component';
import { CreateInscriptionsComponent } from './inscriptions/form-create-inscriptions/create-inscriptions.component';
import { ViewInscriptionComponent } from './inscriptions/view-inscription/view-inscription.component';
import {ShowSubjectsComponent} from "./subject/show-subjects/show-subjects.component";
import {FormStudentComponent} from "./Students/form-create-student/form-student.component";
import {FormEditInscriptionsComponent} from "./inscriptions/form-edit-inscriptions/form-edit-inscriptions.component";
import {ToastrModule} from "ngx-toastr";
import {StudentsComponent} from "./Students/students/students.component";
import {DetailsSudentComponent} from "./Students/details-sudent/details-sudent.component";
import {LogingComponent} from "./loging/loging.component";
import {RegisterComponent} from "./register/register.component";
import {Menu} from "@angular/cdk/menu";
import {MenuComponent} from "./menu/menu.component";
import {RouterModule} from "@angular/router";
import {GuardGuard} from "./loging/guard.guard";


@NgModule({
  declarations: [AppComponent,
    SubjectComponent,
    StudentComponent,
    FormEditStudentComponent,
    FormSubjectComponent,
    FormEditSubjectComponent,
    InscriptionsComponent,
    CreateInscriptionsComponent,
    FormEditInscriptionsComponent,
    ViewInscriptionComponent,
    ShowSubjectsComponent,
    FormStudentComponent,
    StudentsComponent,
    DetailsSudentComponent,
    RegisterComponent,
    LogingComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: LogingComponent, multi: true }, GuardGuard],
  bootstrap: [AppComponent],
})
export class AppModule {
}
