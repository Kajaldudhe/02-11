import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CbservService } from '../cbserv.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  displayedColumns: string[] = [
    'srNo',
    'govtBody',
    'ministry',
    'state',
    'zone',
    'division',
    'action',
  ];
  dataSource: any[]=[];
  userForm!:FormGroup;
  countryArray:any[]=[];
  stateArray:any[]=[];
  govtBodyArray:any[] = [{id:"1",name:"Central Government"},{id:"2",name:"State Government"}];
  ministryArray:any[]=[];
  zoneArray:any[]=[];
  minId!:any;
  flag:boolean = false;
  pageSize!:number;
  totalCount!:number;
  currentPage:number = 0;
  buttonValue:string = "Submit";
  divId!:any;
  highlightedRow!:string;

  globalId!:number;

  constructor(private fb: FormBuilder,private cbserv:CbservService) { }

  ngOnInit(): void {
    this.getAllData();
    this.getCountryDropdown();
    // this.getMinistryDropdown();
    // this.getZoneDropdown();
    this.getStateDropdown();

    this.userForm = this.fb.group({
      country:[''],
      govtBody:[''],
      ministry:[''],
      state:[''],
      zone:[''],
      subZone:['']
    })
  }

  getAllData(){
    this.cbserv.getData(this.currentPage + 1).subscribe((res:any)=>{
      this.dataSource = res.responseData.data;

      this.totalCount = res.responseData.totalCount;

      // console.log(this.totalCount);
      
      
    })
  }

  // country dropdown
  getCountryDropdown(){
    this.cbserv.getCountry().subscribe((c_data:any)=>{
      this.countryArray = c_data.responseData;
    })
  }

  //state dropdown
  getStateDropdown(){
    this.cbserv.getState().subscribe((s_data:any)=>{
      this.stateArray = s_data.responseData;
    })
  }

  //ministry dropdown
  getMinistryDropdown(event:any){

    let m_id;
    if(this.flag){
      m_id = event;
    }else{
      m_id = event.value;
    }

    console.log(event);
    // let g_id = event.value;
    
    this.cbserv.getMinistry(m_id).subscribe((m_data:any)=>{
      this.ministryArray = m_data.responseData;
    })
  }

  //zone dropdown
  getZoneDropdown(event:any){

    let z_id;
    if(this.flag){
      z_id = event;
    }else{
      z_id = event.value;
    }


    // let m_id = event.value;
    this.cbserv.getZone(z_id).subscribe((z_data:any)=>{
      this.zoneArray = z_data.responseData;
    })
  }


  onFormSubmit(){

    if(!this.flag) {
      let dataValue = this.userForm.value;
      let obj = {
        createdBy: "USER202203041214524702060",
        createdDate: new Date(),
        modifiedDate: new Date(),
        zoneId: dataValue.zone,
        divisionName: dataValue.subZone,
        ministryId: dataValue.ministry,
        govtBodyId: dataValue.govtBody,
        countryId: dataValue.country,
        stateId: dataValue.state,
        modifiedBy: "",
      }
  
      this.cbserv.postData(obj).subscribe((p_data:any)=>{
        
        if(p_data.statusCode == '200'){
          console.log(p_data);
          this.getAllData();
          this.userForm.reset();
        }     
        
      })
    }else{
      
      let formData = this.userForm.value;
      let uObj = {
        divisionId: this.divId,
        createdBy: "USER202203041214524702060",
        createdDate: new Date(),
        modifiedDate: new Date(),
        zoneId: formData.zone,
        divisionName: formData.subZone,
        ministryId: formData.ministry,
        govtBodyId: formData.govtBody,
        countryId: formData.country,
        stateId: formData.state,
        modifiedBy: "",
      }

      this.cbserv.updateData(uObj).subscribe((u_data:any)=>{

        if(u_data.statusCode == '200'){
          console.log(u_data);
          this.flag = false;
          this.getAllData();
          this.userForm.reset();
          this.highlightedRow = '';
        }
       
      })
    }
  }

  onEdit(ele:any){

    this.divId = ele.divisionId;
    this.highlightedRow = ele.divisionId;
    // console.log(ele);
    let patchData = ele;
    this.userForm.patchValue({
      country:patchData.countryId,
      govtBody:patchData.govtBodyId,
      ministry:patchData.ministryId,
      state:patchData.stateId,
      zone:patchData.zoneId,
      subZone:patchData.divisionName
    })
    this.getMinistryDropdown(ele.govtBodyId);
    this.getZoneDropdown(ele.ministryId);
    this.buttonValue = "Update";
    this.flag = true;
    
  }

  onDeleteRecord(ele:any){
    let deleteId = ele.divisionId;
    console.log(ele);
    
    console.log(deleteId);
    

    this.cbserv.deleteData(deleteId).subscribe((d_res:any)=>{
      console.log(d_res);
      // this.getAllData();
    })
  }

  onClickPaginatior(data:any){
    this.pageSize = data.pageSize;
    this.currentPage = data.pageIndex;

    this.getAllData();
 }
}
