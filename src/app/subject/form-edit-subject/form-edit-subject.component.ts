import {Component, OnInit} from '@angular/core';
import {AppService} from "src/app/service-app.service";
import {ToastrService} from "ngx-toastr";
import {NgForm} from "@angular/forms";
import {SubjectModel} from "../subject.model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'form-edit-subject',
  templateUrl: './form-edit-subject.component.html',
  styleUrls: ['./form-edit-subject.component.css']
})
export class FormEditSubjectComponent implements OnInit {
  public subjectId: number;
  public subject: SubjectModel;

  constructor(
    private toastr: ToastrService,
    public service: AppService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.subjectId = params['id'];
      this.getSubject(this.subjectId);
    });
  }

  getSubject(id: number): void {
    this.service.getSubjectById(id).subscribe(
      (res: any) => {
        this.subject = res;
        this.toastr.success("Materia cargada", "Inscripciones UPTC");
      },
      (err: any) => {
        this.toastr.error(err);
        console.log(err);
      }
    );
  }

  editSubject(form: NgForm) {
    this.service.putSubject().subscribe(
      res => {
        this.toastr.success('Materia modificada con exito', 'Inscripciones UPTC');
        this.resetForm(form);
      },
      err => {
        this.toastr.error(err);
        console.log(err);
      }
    );
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formDataSubject = new SubjectModel();
    window.history.back();
  }
}
