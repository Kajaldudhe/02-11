import { Injectable } from '@angular/core';
import {  HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CbservService {
  http: any;
  private httpObj: any = {
    type: '',
    url: '',
    options: Object
  };
  // Define API
  userObj: any;
  baseURL: string = "http://demomaster.consultbuddy.com/";
  constructor(private httpclient:HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  getHttp(): any {
    return this.httpclient.request(this.httpObj.type, this.httpObj.url, this.httpObj.options);
  }

  setHttp(_type: string, _url: string,) {
    this.httpObj.type = _type;
    this.httpObj.url = this.baseURL + _url;
        }

  getData(did:any,pageNumber:any){
    return this.httpclient.get(this.baseURL +'Division/Management/get-division?pageid=' + pageNumber + '&rowsperpage=10&govbodyId=');
    // this.pageNumber + 1, this.pageSize
    // + '&NoPage=' + this.pageNumber + '&RowsPerPage=10',
  }

  getCountry(){
    return this.httpclient.get(this.baseURL +'Country/Management/get-ddl-country');
  }

  getState(){
    return this.httpclient.get(this.baseURL +'api/StateMaster/get-ddl-state');
  }

  getMinistry(g_id:any){
    return this.httpclient.get(this.baseURL +'Ministries/Management/get-ddl-govbody?govbodyId='+ g_id + '&countryId=3');
  }

  getZone(m_id:any){
    return this.httpclient.get(this.baseURL +'Division/Management/get-ddl-zonename?ministryId=' + m_id + '&stateId=&countryId=3')
  }

  postData(userData:any){
    return this.httpclient.post(this.baseURL +'Division/Management/insert',userData)
  }

  updateData(uData:any){
    return this.httpclient.put(this.baseURL +'Division/Management/update',uData)
  }

  deleteData(d_data:any){
    return this.httpclient.delete(this.baseURL +'Division/Management/delete?id=' + d_data + '&deletedby=USER202203041214524702060')
  }
}
