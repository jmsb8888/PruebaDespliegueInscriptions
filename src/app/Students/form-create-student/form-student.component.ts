import {Component, OnInit} from '@angular/core';
import {AppService} from "../../service-app.service";
import {NgForm} from '@angular/forms';
import {StudentModel} from "../student.model";
import {ToastrService} from "ngx-toastr";
import {DomSanitizer} from '@angular/platform-browser';

interface UploadResponse {
  blobUrl: string;
}

@Component({
  selector: 'app-form-student',
  templateUrl: './form-student.component.html',
  styleUrls: ['./form-student.component.css']
})
export class FormStudentComponent implements OnInit {
  constructor(public service: AppService, private toastr: ToastrService, public sanitizer: DomSanitizer) {
    this.sanitizer = sanitizer;
  }

  imageUrl: string | null = null;
  imageFile: File | null = null;

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
  }

  addStudent(form: NgForm) {
    if (this.imageUrl != null && this.imageFile != null) {
      this.service.formDataStudent.studentPhoto = this.imageUrl;
      console.log(this.service.formDataStudent);
      this.service.uploadImg(this.imageFile).subscribe(
        (res: any) => { // actualización del tipo de dato de la respuesta
          this.toastr.success('Imagen subida con exito', 'Inscripciones UPTC');
          const imageUrl = res.blobUrl;
          this.service.formDataStudent.studentPhoto = imageUrl.toString();
          console.log(this.service.formDataStudent);
          this.service.postStudent().subscribe(
            (res: any) => {
              this.toastr.success('Agregado con exito foto', 'Inscripciones UPTC');
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
      this.service.postStudent().subscribe(
        (res: any) => {
          this.toastr.success('Agregado con exito sin foto', 'Inscripciones UPTC');
          this.resetForm(form);
        },
        (err: any) => {
          this.toastr.error(err);
        }
      );
    }
  }
  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formDataStudent = new StudentModel();
    this.imageUrl = null;
  }
}
