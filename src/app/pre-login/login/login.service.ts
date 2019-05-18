import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) { }


  loginAsStore(email: string, password: string): Observable<LogInStoreResponse> {
    return this.http.post(`http://${environment.host}/signin-store`, {
      storeID: email,
      password: password
    }) as Observable<LogInStoreResponse>
  }
}

export interface LogInStoreResponse {
  "status": string,
  "result": {
    "id": string,
    "storeID": string,
    "storeName": string,
    "storeDescription": string
  }
}