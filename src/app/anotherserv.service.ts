import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnotherservService {
  http: any;
  private httpObj: any = {
    type: '',
    url: '',
    options: Object
  };
  // Define API
  userObj: any;
  baseURL: string = "http://demoeelection.erpguru.in/Service.asmx/";
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

        getData() {
          return this.httpclient.get(this.baseURL + 'Web_GetElectionMaster?&ElectionTypeId=0&UserId=1&Search=&nopage=1')
        }

        getElection() {
          return this.httpclient.get(this.baseURL + 'Web_GetElectionType')
        }


  // getMinistry(govtId:any){
  //   return this.http.get('http://demomaster.consultbuddy.com/Ministries/Management/get-ddl-govbody?govbodyId='+ govtId + '&countryId=3')
  // }

  // getState(){
  //   return this.http.get('http://demomaster.consultbuddy.com/api/StateMaster/get-ddl-state')
  // }

  // getZone(minId:any){
  //   return this.http.get('http://demomaster.consultbuddy.com/Division/Management/get-ddl-zonename?ministryId=' + minId + '&stateId=&countryId=3')
  // }

  // postFormData(formData:any){
  //   return this.http.post('http://demomaster.consultbuddy.com/Division/Management/insert',formData)
  // }

  // updateData(uData:any){
  //   return this.http.put('http://demomaster.consultbuddy.com/Division/Management/update',uData)
  // }

  // deleteData(d_data:any){
  //   return this.http.delete('http://demomaster.consultbuddy.com/Division/Management/delete?id=' + d_data + '&deletedby=USER202203041214524702060')
  // }
}
