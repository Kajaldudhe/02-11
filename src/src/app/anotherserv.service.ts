import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnotherservService {
  constructor(private http: HttpClient) { }

  getData(){
    return this.http.get('http://demomaster.consultbuddy.com/Division/Management/get-division?pageid=1&rowsperpage=10&govbodyId=')
  }

  getCountry(){
    return this.http.get('http://demomaster.consultbuddy.com/Country/Management/get-ddl-country')
  }

  getMinistry(govtId:any){
    return this.http.get('http://demomaster.consultbuddy.com/Ministries/Management/get-ddl-govbody?govbodyId='+ govtId + '&countryId=3')
  }

  getState(){
    return this.http.get('http://demomaster.consultbuddy.com/api/StateMaster/get-ddl-state')
  }

  getZone(minId:any){
    return this.http.get('http://demomaster.consultbuddy.com/Division/Management/get-ddl-zonename?ministryId=' + minId + '&stateId=&countryId=3')
  }

  postFormData(formData:any){
    return this.http.post('http://demomaster.consultbuddy.com/Division/Management/insert',formData)
  }

  updateData(uData:any){
    return this.http.put('http://demomaster.consultbuddy.com/Division/Management/update',uData)
  }

  deleteData(d_data:any){
    return this.http.delete('http://demomaster.consultbuddy.com/Division/Management/delete?id=' + d_data + '&deletedby=USER202203041214524702060')
  }
}
