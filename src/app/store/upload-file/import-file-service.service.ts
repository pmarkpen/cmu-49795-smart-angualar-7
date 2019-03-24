import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImportFileServiceService {

  constructor(private http: HttpClient) { }

  import(fileURL: string, storeID: string):Observable<ImportFileResponse>  {
    return this.http.post(`http://localhost:3000/api/import`, {
      fileURL: fileURL,
      storeID: storeID
    }) as Observable<ImportFileResponse>;
  }

  getImportStatus(storeID: string): Observable<ImportFileStatusResponse> {
    return this.http.get(`http://localhost:3000/api/import/${storeID}`) as Observable<ImportFileStatusResponse>;
  }
}

export class ImportFileResponse {
  status: string;
}


export class ImportFileStatusResponse {
  status: string;
  result: {
    requests: ImportFileStatusItem[]
  };
}

export class ImportFileStatusItem {
  status: string;
  storeID: string; 
  code: number;
}