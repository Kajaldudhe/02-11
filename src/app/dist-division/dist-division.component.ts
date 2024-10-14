import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestApiService } from '../shared/rest-api.service';

@Component({
  selector: 'app-dist-division',
  templateUrl: './dist-division.component.html',
  styleUrls: ['./dist-division.component.scss']
})
export class DistDivisionComponent implements OnInit {
  userregForm!:FormGroup;
  distarray:any;
  countryId:any = [];
  ministryId:any;
  zoneId:any;
  gvtbody:any;
  ministry:any;
  paginationNo: number = 1;
  totalCount !: number;
  pageSize = 10;
  constructor(private fb: FormBuilder, private api: RestApiService) { }

  ngOnInit() {
    this.userregForm = this.fb.group({
      countryId: [{ id: '3', name: 'India' }, [Validators.required]],
      gvtbody: ['', [Validators.required]],
      ministryName: ['', [Validators.required]],
      zoneName: ['', [Validators.required]],
      stateName: ['', [Validators.required]],
      divisionName: ['', [Validators.required]],
    })

  }

  clearForm(){

  }

  Submit(){

  }
  update(){

  }
  getAllRegistration() {
    this.api.getData().subscribe((response: any) => {
      this.distarray = response.responseData.data;
      console.log(this.distarray)
    })
    // console.log(JSON.parse(this.sampleData));
  }

// getCountry(){
//   this.api.getCountry().subscribe((response: any) => {
//     this.countryId = response.responseData;
//     this.countryId = this.countryId.filter((x: any) => x.countryName == 'India');
//     console.log(this.countryId)
// })
// }
getMinistries() {

}
// getMinistry(event:any){
// this.api.getMinistries(event.target.value).subscribe((response: any) => {
//   this.ministryId = response.responseData;
//   console.log(this.ministryId)
// })
// }
}
