import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {AppService} from "src/app/service-app.service";
import {ToastrService} from "ngx-toastr";
import {NgForm} from "@angular/forms";
import {SubjectModel} from "../subject.model";


@Component({
  selector: 'app-form-subject',
  templateUrl: './form-subject.component.html',
  styleUrls: ['./form-subject.component.css']
})
export class FormSubjectComponent {
  constructor( public service:AppService, private toastr: ToastrService) {
  }

  addSubject(form: NgForm) {
    this.service.postSubject().subscribe(
      (res: any) => {
        this.toastr.success('Materia agregada con exito', 'Inscripciones UPTC');
        this.resetForm(form);
      },
      (err: any) => {
        this.toastr.error(err);
      }
    );
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formDataSubject = new SubjectModel();
  };
  ngOnInit(): void {
  }



}






