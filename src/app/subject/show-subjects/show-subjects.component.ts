import {Component, OnInit} from '@angular/core';
import {Observable, of} from "rxjs";
import {AppService} from "src/app/service-app.service";
import * as XLSX from 'xlsx';
import { FileSaverService } from 'ngx-filesaver';
import {SubjectModel} from "../subject.model";
import {FormEditSubjectComponent} from "../form-edit-subject/form-edit-subject.component";
import {Router, Routes} from "@angular/router";
import {ShowSubjectsService} from "./show-subjects.service";

@Component({
  selector: 'app-show-subjects',
  templateUrl: './show-subjects.component.html',
  styleUrls: ['./show-subjects.component.css']
})
export class ShowSubjectsComponent implements OnInit{

  public nombre = "Jorge Martinez ";
  public array: any[] = [];
  pageSize: number = 10;
  backPage: number = 0;
  currentPage: number = 1;
  netxPage: number = 2;
  currentSortOrder: string = "asc";
  curreentSortBy: string = "id";
  tamanio: number = 0;
  constructor(private service:AppService, private showSubjectService:ShowSubjectsService, private fileSaverService: FileSaverService, private router: Router) {
  }
  populateForm(selectedRecord:SubjectModel) {
   this.service.formDataSubject = Object.assign({},selectedRecord);
  }
  myFunctionName(studentLn:string):void{
    this.sortBy(studentLn);
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
  myFunctionId(sort:string):void{
    this.sortBy(sort);
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
  exportTableToExcel() {
    const table = document.getElementById('myTable'); // Replace 'myTable' with the ID of your table
    const workbook = XLSX.utils.table_to_book(table);
    const fileName = 'myTable.xlsx'; // Replace 'myTable' with the name you want to give the file
    const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([buffer], { type: 'application/octet-stream' });
    this.fileSaverService.save(blob, fileName);
  }
  ngOnInit(): void {
    this.getSubjects("id","asc",1,10);
    };

  getSubjects(sortBy: string, sortOrder: string, page: number , pageSize: number): void {
    this.showSubjectService.getSubjects(sortBy, sortOrder, page, pageSize).subscribe((response: any) => {
      // @ts-ignore
      this.array = response.body.items.$values;
      // @ts-ignore
      const tamsubjects = response.headers.get("tamanio-subjects");
      this.tamanio = tamsubjects;
    });
  }
  public getNextPage() {
    if (this.currentPage < this.getMaxPage()) {
      this.getSubjects(this.curreentSortBy, this.currentSortOrder, this.currentPage = this.currentPage + 1, this.pageSize);
      this.getNumberNextPage();
      this.getNumberBackPage();
    }
  }
  public getBackPage() {
    if (this.currentPage > 1) {
      this.getSubjects(this.curreentSortBy, this.currentSortOrder, this.currentPage = this.currentPage - 1, this.pageSize);
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
        this.getSubjects(this.curreentSortBy, this.currentSortOrder, this.netxPage, this.pageSize);
        this.currentPage = this.currentPage + 1;
        this.actualiceButtons();
      }
    }
    else {
      if (this.backPage > 0) {
        this.getSubjects(this.curreentSortBy, this.currentSortOrder, this.backPage, this.pageSize);
        this.currentPage = this.currentPage - 1;
        this.actualiceButtons();
      }
    }
  }

  public sortBy(sortBy: string) {
    if (this.currentSortOrder == "asc") {
      this.currentSortOrder = "desc";
    } else if (this.currentSortOrder == "desc") {
      this.currentSortOrder = "asc";
    }
    this.curreentSortBy = sortBy;
    this.getSubjects(this.curreentSortBy, this.currentSortOrder, this.currentPage, this.pageSize);
  }

  private actualiceButtons() {
    this.getNumberBackPage();
    this.getNumberNextPage();
  }

  private getMaxPage(): number {
    return (this.tamanio / this.pageSize);
  }



}
