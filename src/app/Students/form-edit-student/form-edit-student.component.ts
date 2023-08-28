import {Component} from '@angular/core';
import {StudentModel} from "../student.model";
import {ToastrService} from "ngx-toastr";
import {AppService} from "../../service-app.service";
import {ActivatedRoute} from "@angular/router";
import {NgForm} from "@angular/forms";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-form-edit-student',
  templateUrl: './form-edit-student.component.html',
  styleUrls: ['./form-edit-student.component.css']
})
export class FormEditStudentComponent {
  public studentId: number;
  public student: StudentModel;
  imageUrl: string | null = null;
  imageFile: File | null = null;

  constructor(public service: AppService, private toastr: ToastrService, public sanitizer: DomSanitizer, private route: ActivatedRoute) {
    this.sanitizer = sanitizer;
  }

  handleDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  handleDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    // @ts-ignore
    const file = event.dataTransfer.files[0];
    const blob = file.slice(0, file.size, file.type.replace(/\/(jpeg|png|gif)$/, '/jpg'));
    this.imageFile = new File([blob], file.name, {type: 'image/jpeg'});

    const imageUrl = URL.createObjectURL(blob);
    this.imageUrl = imageUrl;
  }

  handleFileInput(event: Event) {
    const target = event.target as HTMLInputElement;
    // @ts-ignore
    const file = target.files[0];
    const blob = file.slice(0, file.size, file.type.replace(/\/(jpeg|png|gif)$/, '/jpg'));
    this.imageFile = new File([blob], file.name, {type: 'image/jpeg'});
    this.imageUrl = URL.createObjectURL(blob);
  }

  clearPreview() {
    this.imageUrl = null;
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
        this.imageUrl = this.service.formDataStudent.studentPhoto;
        this.toastr.success("Estudiante cargado", "Inscripciones UPTC");
      },
      (err: any) => {
        this.toastr.error(err);
        console.log(err);
      }
    );
  }

  editStudent(form: NgForm) {
    if (!this.imageUrl?.includes("https://almacenamientoproyectos.blob.core.windows.net")) {
      if (this.imageUrl != null && this.imageFile != null && this.imageUrl?.includes("blob:http")) {
        this.service.formDataStudent.studentPhoto = this.imageUrl;
        this.service.uploadImg(this.imageFile).subscribe(
          (res: any) => { // actualización del tipo de dato de la respuesta
            this.toastr.success('Imagen subida con exito', 'Inscripciones UPTC');
            const imageUrl = res.blobUrl;
            this.service.formDataStudent.studentPhoto = imageUrl.toString();
            this.service.putStudent().subscribe(
              (res: any) => {
                this.toastr.success('Estudiante actualizado con exito', 'Inscripciones UPTC');
                this.resetForm(form);
              },
              (err: any) => {
                this.toastr.error(err.toString());
              }
            );
          },
          (err: any) => {
            this.toastr.error(err.toString());
          }
        );
      } else {
        this.editWithoutPhoto(form);
      }
    } else {
      this.editWithoutPhoto(form);
    }
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formDataStudent = new StudentModel();
    this.imageUrl = null;
  }

  goBack(form: NgForm) {
    this.resetForm(form);
    window.history.back();
  }

  private editWithoutPhoto(form: NgForm) {
    this.service.putStudent().subscribe(
      (res: any) => {
        console.log("ENTRE:", this.service.formDataStudent);
        this.toastr.success('Estudiante actualizado con exito', 'Inscripciones UPTC');
        this.resetForm(form);
        window.history.back();
      },
      (err: any) => {
        this.toastr.error(err);
      }
    );
  }
}
