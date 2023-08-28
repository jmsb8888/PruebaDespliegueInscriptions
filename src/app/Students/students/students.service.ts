import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private baseUrl: string | null = 'http://www.distriinscriptions.somee.com/api/Students';

  constructor(private http: HttpClient) { }

  getStudents(pageNumber: number = 50, pageSize: number = 10, sortOrder: string = "", sortBy: string = "", searchString: string = ""): Observable<any> {
    let url = `${this.baseUrl}/withSorts?pageNumber=${pageNumber}&pageSize=${pageSize}&sortOrder=${sortOrder}&sortBy=${sortBy}&searchString=${searchString}`;
    return this.http.get<any[]>(url, {observe: 'response'});
  }
}
