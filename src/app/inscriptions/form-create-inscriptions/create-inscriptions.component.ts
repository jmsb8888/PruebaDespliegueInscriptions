import {Component, OnInit} from '@angular/core';
import {AppService} from "../../service-app.service";
import {ToastrService} from "ngx-toastr";
import {NgForm} from "@angular/forms";
import {StudentModel} from "../../Students/student.model";
import {InscriptionsModel} from "../InscriptionsModel";
import {Observable} from "rxjs";


@Component({
  selector: 'app-form-create-inscriptions',
  templateUrl: './create-inscriptions.component.html',
  styleUrls: ['./create-inscriptions.component.css']
})
export class CreateInscriptionsComponent  implements OnInit{

  inspectionList$!:Observable<any[]>;
  inspectionList: any[]=[];
  fechaActual: string;

  constructor(public service: AppService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.inspectionList$ = this.service.getInspectionList();
    this.inspectionList$.subscribe((inspectionList) => {
      const inspection = JSON.parse(JSON.stringify(inspectionList));
      this.inspectionList = inspection.$values;
    });
  }

  addInscription(form: NgForm) {
    this.service.postInscription().subscribe(
      (res: any) => {
        this.toastr.success('Agregado con exito', 'Inscripciones UPTC');
        this.resetForm(form);
      },
      (err: any) => {
        this.toastr.error(err);
      }
    );
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formDataInscription = new InscriptionsModel();
  };

}
