import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AnotherservService } from '../anotherserv.service';

@Component({
  selector: 'app-another-form',
  templateUrl: './another-form.component.html',
  styleUrls: ['./another-form.component.css']
})
export class AnotherFormComponent implements OnInit {

  displayedColumns: string[] = [
    'srNo',
    'govtBody',
    'ministry',
    'state',
    'zone',
    'division',
    'action',
  ];

  dataSource: any[] = [];
  distDivManagementForm!: FormGroup;
  countryArray: any[] = [];
  govtBodyArray: any[] = [
    { id: '1', name: 'Central Government' },
    { id: '2', name: 'State Government' }
  ]
  ministryArray: any[] = [];
  stateArray: any[] = [];
  zoneArray: any[] = [];
  editFlag:boolean = false;
  editData:any;
  highlightedRow:any;
  buttonValue:string = 'Submit';

  constructor(private fb: FormBuilder, private service: AnotherservService) { }

  ngOnInit(): void {

    this.displayData();
    this.displayCountry();
    // this.displayMinistry();
    this.displayState();
    // this.zoneArray();

    this.distDivManagementForm = this.fb.group({
      countryId: [''],
      govtBodyId: [''],
      ministryId: [''],
      stateId: [''],
      zoneId: [''],
      divisionName: ['']
    })
  }

  // ------------------------------------------------------ display Table ---------------------------------------------------------- //
  displayData() {
    this.service.getData().subscribe((g_data: any) => {
      let finalRes = g_data.responseData.data;
      if (g_data.statusCode == '200' && finalRes.length) {
        this.dataSource = finalRes;
      }
    })
  }

  // ------------------------------------------------------ Country Array ---------------------------------------------------------- //
  displayCountry() {
    this.service.getCountry().subscribe((c_data: any) => {
      if (c_data.statusCode == '200' && c_data.responseData.length) {
        this.countryArray = c_data.responseData;
      }
    })
  }

  // ------------------------------------------------------ Ministry Array ---------------------------------------------------------- //
  displayMinistry() {
    let govtId = this.distDivManagementForm.value.govtBodyId;
    this.service.getMinistry(govtId).subscribe((m_data: any) => {
      if (m_data.statusCode == '200' && m_data.responseData.length) {
        this.ministryArray = m_data.responseData;
      }
    })
    this.editFlag ? this.distDivManagementForm.controls['ministryId'].setValue(this.editData.ministryId) : '',
    this.displayZone();
  }

  // ------------------------------------------------------ State Array ---------------------------------------------------------- //
  displayState() {
    this.service.getState().subscribe((s_data: any) => {
      if (s_data.statusCode == '200' && s_data.responseData.length) {
        this.stateArray = s_data.responseData;
      }
    })
  }

  // ------------------------------------------------------ Zone/Region Array ---------------------------------------------------------- //
  displayZone() {
    let minId = this.distDivManagementForm.value.ministryId;
    this.service.getZone(minId).subscribe((z_data: any) => {
      if (z_data.statusCode == '200' && z_data.responseData.length) {
        this.zoneArray = z_data.responseData;
      }
    })
    this.editFlag ? this.distDivManagementForm.controls['zoneId'].setValue(this.editData.zoneId) : '';
  }

  // ------------------------------------------------------ Submit Record -------------------------------------------------------------- //
  onSubmit() {
    let formValue = this.distDivManagementForm.value;
    if(!this.editFlag){
      formValue.createdBy = "USER202203041214524702060";
      formValue.createdDate = new Date();
      formValue.modifiedDate = new Date();
      this.service.postFormData(formValue).subscribe((p_data:any)=>{
        console.log(p_data);
        this.displayData();
        this.distDivManagementForm.reset();
        this.highlightedRow = '';
      })
    }else{
      formValue.divisionId = this.editData.divisionId;
      formValue.modifiedDate = new Date();

      this.service.updateData(formValue).subscribe((u_data:any)=>{
        if(u_data.statusCode == '200'){
          this.displayData();
          this.editFlag = false;
          this.distDivManagementForm.reset();
          this.highlightedRow = '';
        }
      })
    }
  }
  // ------------------------------------------------------ Edit Record from Form---------------------------------------------------------- //
  onEdit(ele:any){
    this.editData = ele;
    this.editFlag = true;
    this.buttonValue = 'Update';
    this.highlightedRow = ele.divisionId; //used to highlight the selected row from table

    this.distDivManagementForm.controls['countryId'].setValue(this.editData.countryId);
    this.distDivManagementForm.controls['stateId'].setValue(this.editData.stateId);
    this.distDivManagementForm.controls['govtBodyId'].setValue(this.editData.govtBodyId);
    this.distDivManagementForm.controls['divisionName'].setValue(this.editData.divisionName);
    this.displayMinistry();
  }

  // ------------------------------------------------------ Delete Record from Form---------------------------------------------------------- //
  onDelete(ele:any){
    let deleteId = ele.divisionId;
    this.service.deleteData(deleteId).subscribe((d_data:any)=>{
      if(d_data.statusCode == '200'){
        this.displayData();
      }
    })
  }

  // ------------------------------------------------------ Clear Form except self one---------------------------------------------------------- // 
  clearForm(formControlName: any) {
    console.log(formControlName);
    console.log(this.distDivManagementForm.value.countryId);
    if (formControlName.value == this.distDivManagementForm.value.countryId) {
      this.distDivManagementForm.controls['stateId'].setValue('');
      this.distDivManagementForm.controls['govtBodyId'].setValue('');
      this.distDivManagementForm.controls['ministryId'].setValue('');
      this.distDivManagementForm.controls['zoneId'].setValue('');
      this.distDivManagementForm.controls['divisionName'].setValue('');
    } else if (formControlName.value == this.distDivManagementForm.value.govtBodyId) {
      this.distDivManagementForm.controls['stateId'].setValue('');
      this.distDivManagementForm.controls['ministryId'].setValue('');
      this.distDivManagementForm.controls['zoneId'].setValue('');
      this.distDivManagementForm.controls['divisionName'].setValue('');
    } else if (formControlName.value == this.distDivManagementForm.value.stateId) {
      this.distDivManagementForm.controls['ministryId'].setValue('');
      this.distDivManagementForm.controls['zoneId'].setValue('');
      this.distDivManagementForm.controls['divisionName'].setValue('')
    } else if (formControlName.value == this.distDivManagementForm.value.ministryId) {
      this.distDivManagementForm.controls['zoneId'].setValue('');
      this.distDivManagementForm.controls['divisionName'].setValue('');
    } else if (formControlName.value == this.distDivManagementForm.value.zoneId) {
      this.distDivManagementForm.controls['divisionName'].setValue('');
    }
  }

  clearDivDistForm(){
    this.distDivManagementForm.reset();
    this.editFlag = false;
    this.buttonValue = 'Submit';
    this.highlightedRow = '';
  }

}