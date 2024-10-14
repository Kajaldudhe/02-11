import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CbservService {

  constructor(private http : HttpClient) { }

  getData(did:any){
    return this.http.get('https://demomaster.consultbuddy.com/Division/Management/get-division?pageid=' + did + '&rowsperpage=10&govbodyId=');
  }

  getCountry(){
    return this.http.get('http://demomaster.consultbuddy.com/Country/Management/get-ddl-country');
  }

  getState(){
    return this.http.get('http://demomaster.consultbuddy.com/api/StateMaster/get-ddl-state');
  }

  getMinistry(g_id:any){
    return this.http.get('http://demomaster.consultbuddy.com/Ministries/Management/get-ddl-govbody?govbodyId='+ g_id + '&countryId=3');
  }

  getZone(m_id:any){
    return this.http.get('http://demomaster.consultbuddy.com/Division/Management/get-ddl-zonename?ministryId=' + m_id + '&stateId=&countryId=3')
  }

  postData(userData:any){
    return this.http.post('http://demomaster.consultbuddy.com/Division/Management/insert',userData)
  }

  updateData(uData:any){
    return this.http.put('http://demomaster.consultbuddy.com/Division/Management/update',uData)
  }

  deleteData(d_data:any){
    return this.http.delete('http://demomaster.consultbuddy.com/Division/Management/delete?id=' + d_data + '&deletedby=USER202203041214524702060')
  }
}
 