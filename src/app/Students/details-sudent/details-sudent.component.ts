import { Component } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {AppService} from "../../service-app.service";
import {ActivatedRoute} from "@angular/router";
import {NgForm} from "@angular/forms";
import {StudentModel} from "./details-student.model";

@Component({
  selector: 'details-student',
  templateUrl: './details-sudent.component.html',
  styleUrls: ['./details-sudent.component.css']
})
export class DetailsSudentComponent {
  public studentId: number;
  public student: StudentModel;

  constructor(
    private toastr: ToastrService,
    public service: AppService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.studentId = params['id'];
      this.getStudent(this.studentId);
    });
  }

  getStudent(id: number): void {
    this.service.getStudentId(id).subscribe(
      (res: any) => {
        this.student = res;
        console.log(res);
        this.toastr.success("Estudiante cargado", "Inscripciones UPTC");
      },
      (err: any) => {
        this.toastr.error(err);
        console.log(err);
      }
    );
  }

  resetForm(form: NgForm) {
    this.service.formDataStudent = new StudentModel();
  }
}
