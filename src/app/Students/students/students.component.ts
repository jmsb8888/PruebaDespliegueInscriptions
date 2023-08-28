import {HttpClient} from '@angular/common/http';
import {Component, Inject, Injectable, OnInit, ViewChild, HostListener} from '@angular/core';
import {StudentsService} from './students.service';
import {AppService} from "../../service-app.service";
import {StudentModel} from "../student.model";
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})

export class StudentsComponent implements OnInit {
  imgWidth = '30%';
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  public nombre = "Jorge Martinez ";
  public array: any[] = [];
  pageSize: number = 10;
  backPage: number = 0;
  currentPage: number = 1;
  netxPage: number = 2;
  currentSortOrder: string = "0";
  curreentSortBy: string = "";
  currentNameFilter: string = "";
  tamanio: number = 0;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.imgWidth = (event.target.innerWidth <= 768) ? '100%' : '50%'; // Cambia las dimensiones de la imagen dependiendo del ancho de la ventana del navegador
  }
  myFunctionName(sort:string):void{
    this.sortBy(sort);
    this.changeIconName();
  }
  iconName = 'keyboard_arrow_down';
  clickedName : boolean = true;
  changeIconName() {
    if(this.clickedName==true){
      this.iconLn = 'keyboard_arrow_down'
      this.iconName = 'keyboard_arrow_up'
      this.iconId = 'keyboard_arrow_down'
      this.clickedName = false
    }else {
      this.clickedName = true
      this.iconName = 'keyboard_arrow_down'
      this.iconId = 'keyboard_arrow_down'
      this.iconLn = 'keyboard_arrow_down'
    }
  }
  myFunctionLn(studentLn:string):void{
    this.sortBy(studentLn);
    this.changeIconLn();
  }
  iconLn = 'keyboard_arrow_down';
  clickedLn : boolean = true;
  changeIconLn() {
    if(this.clickedLn==true){
      this.iconLn = 'keyboard_arrow_up'
      this.iconName = 'keyboard_arrow_down'
      this.iconId = 'keyboard_arrow_down'
      this.clickedLn = false
    }else {
      this.clickedLn = true
      this.iconLn = 'keyboard_arrow_down'
      this.iconName = 'keyboard_arrow_down'
      this.iconId = 'keyboard_arrow_down'
      this.iconLn = 'keyboard_arrow_down'
    }
  }
  myFunctionId(studentId:string):void{
    this.sortBy(studentId);
    this.changeIconId();
  }
  iconId = 'keyboard_arrow_down';
  clickedId : boolean = true;
  changeIconId() {
    if(this.clickedId==true){
      this.iconLn = 'keyboard_arrow_down'
      this.iconName = 'keyboard_arrow_down'
      this.iconId = 'keyboard_arrow_up'
      this.clickedId = false
    }else {
      this.clickedId = true
      this.iconId = 'keyboard_arrow_down'
      this.iconName = 'keyboard_arrow_down'
      this.iconId = 'keyboard_arrow_down'
      this.iconLn = 'keyboard_arrow_down'
    }
  }
  populateForm(selectedRecord: StudentModel) {
    this.service.formDataStudent = Object.assign({}, selectedRecord);
  }

  public getNextPage() {
    if (this.currentPage < this.getMaxPage()) {
      this.getStudents(this.currentPage = this.currentPage + 1, this.pageSize, this.currentSortOrder, this.curreentSortBy, this.currentNameFilter);
      this.getNumberNextPage();
      this.getNumberBackPage();
    }
  }

  public getBackPage() {
    if (this.currentPage > 1) {
      this.getStudents(this.currentPage = this.currentPage - 1, this.pageSize, this.currentSortOrder, this.curreentSortBy, this.currentNameFilter);
      this.actualiceButtons();
    }
  }

  public getNumberNextPage() {
    this.netxPage = this.currentPage + 1;
  }

  public getNumberBackPage() {
    this.backPage = this.currentPage - 1;
  }

  public getPageButtons(page: number) {
    if (page == 0) {
      if (this.currentPage < this.getMaxPage()) {
        this.getStudents(this.netxPage, this.pageSize, this.currentSortOrder, this.curreentSortBy, this.currentNameFilter);
        this.currentPage = this.currentPage + 1;
        this.actualiceButtons();
      }
    } else {
      if (this.backPage > 0) {
        this.getStudents(this.backPage, this.pageSize, this.currentSortOrder, this.curreentSortBy, this.currentNameFilter);
        this.currentPage = this.currentPage - 1;
        this.actualiceButtons();
      }
    }
  }

  public sortBy(sortBy: string) {
    if (this.currentSortOrder == "1") {
      this.currentSortOrder = "0";
    } else if (this.currentSortOrder == "0") {
      this.currentSortOrder = "1";
    }
    this.curreentSortBy = sortBy;
    this.getStudents(this.currentPage, this.pageSize, this.currentSortOrder, this.curreentSortBy, this.currentNameFilter);
  }

  filterByName(filter: string) {
    this.currentNameFilter = filter;
    this.getStudents(this.currentPage, this.pageSize, this.currentSortOrder, this.curreentSortBy, this.currentNameFilter);
  }

  private actualiceButtons() {
    this.getNumberBackPage();
    this.getNumberNextPage();
  }

  private getMaxPage(): number {
    return (this.tamanio / this.pageSize);
  }


  constructor(private studentsService: StudentsService, public service:AppService) {
  }

  ngOnInit(): void {
    this.getStudents(1, 10, "0", "", "");
  }

  getStudents(pageNumber: number, pageSize: number, sortOrder: string, sortBy: string, searchString: string): void {
    this.studentsService.getStudents(pageNumber, pageSize, sortOrder, sortBy, searchString).subscribe((response: any) => {
      // @ts-ignore
      this.array = response.body.$values;
      // @ts-ignore
      const tamstudents = response.headers.get("tamanio");
      this.tamanio = tamstudents;
    });
  }

}

export interface Students {
  studentId: number;
  studentName: string;
}
