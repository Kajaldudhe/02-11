import { Injectable } from '@angular/core';
import {  HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  http: any;
  private httpObj: any = {
    type: '',
    url: '',
    options: Object
  };
  // Define API
  userObj: any;
  baseURL: string = "http://demoeelection.erpguru.inService.asmx/";
  AddURL: string = "http://demoelectionclientapp.eanifarm.com/"
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

      getCountry() {
        return this.httpclient.get(this.baseURL + 'Web_GetElectionType')
      }

      getAddSupervisor(){
        return this.httpclient.get(this.AddURL + 'VoterCRM/GetCallCenterUser?ClientId=0&UserId=1&ElectionId=0&ConstituencyId=0&BoothId=0&Search=&pageno=1&pagesize=10')

      }
      // getMinistries(govId: any){
      //   return this.httpclient.get(this.baseURL + `Division/Management/get-ddl-zonename?ministryId${govId}&&stateId`)}
        // `Ministries/Management/get-ddl-govbody_1_0?govbodyId=${govId}&countryId=3`




      // bindUserType() {
      //   return this.httpclient
      //     .get(
      //       'https://awseauction-master.mahamining.com/master/user-type/getAll'

      //     )
      // }
      // bindSubUser(_user:any,_data:any) {
      //   return this.httpclient
      //     .get(
      //       ' https://awseauction-master.mahamining.com/master/subusertype/GetAllByUserTypeId?UserTypeId='+ _user +'&ProjectId=' +_data
      //     )
      // }
      // bindRole(_subuser:any,_key:any){
      //   return this.httpclient
      //   .get(

      //     'https://awseauction-master.mahamining.com/master/user-role/GetAll?UserTypeId1&ProjectId='+ _subuser +'&ProjectId=' +_key
      //   )
      // }
      // getList(){
      //   return this.httpclient
      //   .get(
      //     'https://awseauction-master.mahamining.com/master/user-registration/GetAll'

      //   )
      // }

      // postSubmit(data: any){
      //   let headers = new HttpHeaders({
      //     'Content-Type': 'application/json',
      //     });
      //   return this.httpclient
      //   .post(
      //     'https://awseauction-master.mahamining.com/master/user-registration',  JSON.stringify(data),{ headers: headers}

      //   )
      // }
      // onUpdate(data: any){
      //   let headers = new HttpHeaders({
      //     'Content-Type': 'application/json',
      //     });
      //   return this.httpclient
      //   .put(
      //     'https://awseauction-master.mahamining.com/master/user-registration',  JSON.stringify(data),{ headers: headers}

      //   )
      // }
      // bindDesignation(){
      //   return this.httpclient
      //   .get(
      //     'https://awseauction-master.mahamining.com/master/designation/GetAll'


      //   )
      // }
      handleError(error: any) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // Get client-side error
          errorMessage = error.error.message;
        } else {
          // Get server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        window.alert(errorMessage);
        return throwError(() => {
          return errorMessage;
        });
      }
}
