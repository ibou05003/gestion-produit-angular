import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  public resourceUrl = environment.API_URL+"employee";

  constructor(private http:HttpClient) { }

  /**créer employee */
  create(employee: any): Observable<any> {
    return this.http.post<any>(this.resourceUrl, employee);
  }

  /**modifier employee */
  update(employee: any, id: any): Observable<any> {
    return this.http.post<any>(`${this.resourceUrl}/${id}`, employee);
  }

  /**rechercher employee */
  find(id: string): Observable<any> {
    return this.http.get<any>(`${this.resourceUrl}/${id}`);
  }

  /**Supprimer employee */
  delete(id: string): Observable<{}> {
    return this.http.delete(`${this.resourceUrl}/${id}`);
  }


  /**Liste des employees */
  getEmployees(): Observable<any>{
    return this.http.get<any>(this.resourceUrl)
    .pipe(catchError(this.errorHandler))
  }

  /**permet la gestion des erreurs */
  errorHandler(error: HttpErrorResponse) {
    return throwError(error)
  }
}
