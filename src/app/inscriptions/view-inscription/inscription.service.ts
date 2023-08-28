import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {
  private baseUrlInscriptionsGetAll: string | null = 'https://www.distriinscriptions.somee.com/api/Inscriptions';

  constructor(private http: HttpClient) {
  }

  getInscriptions(pageNumber: number = 50, pageSize: number = 10, sortOrder: string = "asc", sortBy: string = "", searchString: string = ""): Observable<any> {
    let url = `${this.baseUrlInscriptionsGetAll}/all?pageNumber=${pageNumber}&pageSize=${pageSize}&sortOrder=${sortOrder}&sortBy=${sortBy}`;
    return this.http.get<any[]>(url, {observe: 'response'});
  }
}
