import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormStudentComponent} from "./Students/form-create-student/form-student.component";
import {FormEditStudentComponent} from "./Students/form-edit-student/form-edit-student.component";
import {FormSubjectComponent} from "./subject/form-create-subject/form-subject.component";
import {FormEditSubjectComponent} from "./subject/form-edit-subject/form-edit-subject.component";
import {ShowSubjectsComponent} from "./subject/show-subjects/show-subjects.component";
import {CreateInscriptionsComponent} from "./inscriptions/form-create-inscriptions/create-inscriptions.component";
import {FormEditInscriptionsComponent} from "./inscriptions/form-edit-inscriptions/form-edit-inscriptions.component";
import {ViewInscriptionComponent} from "./inscriptions/view-inscription/view-inscription.component";
import {StudentsComponent} from "./Students/students/students.component";
import {HomeComponent} from './home/home.component';
import {DetailsSudentComponent} from "./Students/details-sudent/details-sudent.component";
import {LogingComponent} from "./loging/loging.component";
import {MenuComponent} from "./menu/menu.component";
import {GuardGuard} from "./loging/guard.guard";


const routes: Routes = [
  {path: "", component: LogingComponent},
  {
    path: 'home', component: MenuComponent,children: [
      {path: '', component: HomeComponent},
      {path: 'welcome', component: HomeComponent},
      {path: 'create-student', component: FormStudentComponent},
      {path: 'edit-student/:id', component: FormEditStudentComponent},
      {path: 'edit-inscription', component: FormEditInscriptionsComponent},
      {path: 'edit-inscriptions/:id', component: FormEditInscriptionsComponent},
      {path: 'edit-subject', component: FormEditSubjectComponent},
      {path: 'edit-subject/:id', component: FormEditSubjectComponent},
      {path: 'details-student/:id', component: DetailsSudentComponent},
      {path: 'view-student', component: StudentsComponent},
      {path: 'create-subject', component: FormSubjectComponent},
      {path: 'view-subject', component: ShowSubjectsComponent},
      {path: 'create-inscription', component: CreateInscriptionsComponent},
      {path: 'view-inscription', component: ViewInscriptionComponent},
    ]
  },
  {path: 'login', component: LogingComponent},
  //{ path: 'home', component: MenuComponent, outlet: 'principal' },
  //{ path: 'create-student', component: FormStudentComponent, outlet: 'menu' },
  /*{ path: 'edit-student/:id', component: FormEditStudentComponent, outlet: 'menu'  },
  {path:'create-subject',component:FormSubjectComponent, outlet: 'menu' },
  {path:'edit-subject',component: FormEditSubjectComponent, outlet: 'menu' },
  {path:'view-subject',component: ShowSubjectsComponent, outlet: 'menu' },
  {path:'create-inscription',component:CreateInscriptionsComponent, outlet: 'menu' },
  {path:'edit-inscription',component: FormEditInscriptionsComponent, outlet: 'menu' },
  {path:'view-inscription',component: ViewInscriptionComponent, outlet: 'menu' },
//  {path:'view-student', component: StudentsComponent, outlet: 'menu' },*/
  // {path: 'home-component', component: HomeComponent},
  /* { path: 'edit-subject/:id', component: FormEditSubjectComponent, outlet: 'menu'  },
   { path: 'details-student/:id', component: DetailsSudentComponent, outlet: 'menu' },
   { path: 'edit-inscriptions/:id', component: FormEditInscriptionsComponent, outlet: 'menu'  },*/
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
