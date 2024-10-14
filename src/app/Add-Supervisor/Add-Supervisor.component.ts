import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CallApiService } from '../core/call-api.service';
import { HandleErrorService } from '../core/handle-error.service';
import { ErrorsService } from '../error.service';
import {MatTableDataSource} from '@angular/material/table';
import {FormBuilder,FormGroup,NgForm,Validators} from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-Add-Supervisor',
  templateUrl: './Add-Supervisor.component.html',
  styleUrls: ['./Add-Supervisor.component.css']
})
export class AddSupervisorComponent implements OnInit {
  @ViewChild('formDirective') formDirective!: NgForm;
  displayedColumns: string[] = [
    'userId',
    'fullName',
    'mobileNo',
    'assignedBoothlist',
    'boothName',
    'action',
  ];

  isBothListArray = [
    { id: 0, name: 'male' },
    { id: 1, name: 'Female' },
  ];

  addSupervisorForm!: FormGroup;
  dataSource: any;
  filterForm!: FormGroup;
  addForm!:FormGroup;
  addSupervisorArray = new Array();
  editFlag: boolean = false;
  totalPages: any;
  pageNo = 1;
  pageSize = 10;
  client= new Array()
  subscription!: Subscription;
  isEdit:boolean=false;
  updatedObj: any;
  clientArr = new Array();
  electionArr = new Array();
  constituencyArr = new Array();
  boothArr = new Array();


  constructor(
    private fb: FormBuilder,
    private service: CallApiService,
    public error: ErrorsService,
    private snack: MatSnackBar,
    private handleErrorSer: HandleErrorService
  ) {}

  ngOnInit() {
    this.defaulForm();
    this.getClient();
    this.displayData();


  }

  defaulForm() {
    this.addSupervisorForm = this.fb.group({
      fullName:['',[Validators.required]],
      mobileNo:['',[Validators.required]],
      fName: ['',[Validators.required]],
      mName: [''],
      lName: ['',[Validators.required]],
      gender: [0,[Validators.required]],
      selectclient:['',[Validators.required]],
      isUserBlock: ['0',Validators.required],
      clientId: 0,
      clientName: ['',[]],
      subUserTypeId: 0,
      assignedBoothlist: [
        {
          assemblyId: 0,
          boothId: 0,
          boothName: "string",
          constituencyId: 0,
          constituencyName: "string",
          electionId: 0,
          electionName: "string"
        }]
    });

//FilterForm Form Group
        this.filterForm = this.fb.group({
          userId:[0],
          clientId: [0],
          electionId: [0],
          constituencyId: [0],
          boothId:[0],
          agentId:[0],
          searchtext: [''],

        });

//AddForm Form Group
    // this.addForm = this.fb.group({
    //   userId:[0],
    //   clientId: [0],
    //   electionId: [0],
    //   constituencyId: [0],
    //   boothId:[0],


    // });
  }
  get f() {
    return this.addSupervisorForm.controls;
  }
  selection = new SelectionModel<any>(true, []);

  //#region bind table fun start

  displayData() {
    let formData = this.filterForm.value
    this.service.setHttp(
      'get',
      'VoterCRM/GetCallCenterUser?ClientId='+formData.clientId+'&UserId='+formData.userId+'&ElectionId='+formData.electionId+'&ConstituencyId='+formData.constituencyId+'&BoothId='+formData.boothId+'&Search='+formData.searchtext+'&pageno='+this.pageNo+'&pagesize='+this.pageSize,false,false,false,''
    );
    this.service.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == '200') {
          let dataSet = res.responseData.responseData1;
          this.dataSource = new MatTableDataSource(dataSet);
          this.totalPages= res.responseData.responseData2.totalCount;

        }else{
          this.dataSource=[];
        }
      },
    });
  }
 //#endregion bind table fun end


 //#region Client Api start
  getClient() {
    this.service.setHttp('get','Filter/GetClientMaster?UserId=1',false,false,false,'baseURL');
    this.service.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === '200') {
          this.clientArr = res.responseData;
        }
      },
    });
  }

  // getCompanyData() {
  //   this.service.setHttp('get', 'api/CommonDropDown/GetCompany', false, false, false,
  //     'baseURL');
  //   this.service.getHttp().subscribe({
  //     next: (res: any) => {
  //       if (res.statusCode == '200') {
  //         this.displayCompanyDropdown = res.responseData;
  //       }
  //     }
  //   })
  // }

  //#endregion Client APi end


  //#region submit fun start
  onSubmit() {
    // alert();
    // if (this.addSupervisorForm.invalid) {
    //   return;
    // }
    let formData = this.addSupervisorForm.value;
    let obj = {
      // "createdBy": this.webStorage.getUserId(),
      // "modifiedBy": this.webStorage.getUserId(),
      // "createdDate": new Date(),
      // "modifiedDate": new Date(),
      // "isDeleted": true,
      // "id": this.isEdit == true ? this.updatedObj.id : 0,
      // "deptId": formData.deptId,
      // "name": formData.name,
      // "address": formData.address,
      // "emailId": formData.emailId,
      // "contactPersonName": formData.contactPersonName,
      // "mobileNo": formData.mobileNo,
      "id":this.isEdit == true ? this.updatedObj.id : 0,
      "fullName": formData.fullname,
      "mobileNo": formData.mobileNo,
      "fName": formData.fName,
      "mName": formData.mName,
      "lName": formData.lName,
      "gender": 0,
      "clientId": 0,
      "createdBy": 1,
      "subUserTypeId": 0,
      "assignedBoothlist": [
        {
          "assemblyId": formData.assemblyId,
          "boothId": formData.boothId,
          "constituencyId": formData.constituencyId,
          "electionId": formData.electionId
        }
      ]
    };

      if (this.editFlag){
      this.service.setHttp('put', 'VoterCRM/CreateCallCenterUser',false,obj,false,'baseURL'),
      this.service.getHttp().subscribe({
        next: (res:any)=>{
          if(res.statusCode == 200){
            this.displayData();
            this.onCancelRecord();
            this.snack.open(res.statusMessage, "ok");
          }
        }
      })
    }
    else{
  this.service.setHttp('post','VoterCRM/CreateCallCenterUser',false,obj,false,'baseURL');
  this.service.getHttp().subscribe({
    next: (res:any)=>{
      if (res.statusCode == 200){
        this.displayData();
            this.onCancelRecord();
        this.snack.open(res.statusMessage,"ok");
      }
    }
  })
    }
    // this.dialogRef.close();
    }
//#endregion submit fun end

//#region patch value fun start
  onEdit(ele: any) {
      this.isEdit = true;
      this.updatedObj = ele;
      this.addSupervisorForm.patchValue({
        fullName: this.updatedObj.fullName,
        fname: this.updatedObj?.fullName.fname,
        mobileNo: this.updatedObj.mobileNo,
        mName: this.updatedObj?.fullName.mName,
        lName: this.updatedObj?.fullName.lName,
        isUserBlock: this.updatedObj.gender,
        assignedBoothlist: this.updatedObj?.assignedBoothlist,
      });
    }

//#endregion patch value fun end

//#region Filter Fun start
FilterData(){
  this.pageNo = 1;
  this.displayData();
  this.onCancelRecord();
}

//#region Delete fun start
  onDelete() {
    let formData = this.addSupervisorForm.value;
    let selDelArray = this.selection.selected;
    let delArray = new Array();
    if (selDelArray.length > 0) {
      selDelArray.find((data: any) => {
        let obj = {
          clientId: data.clientId,
          agentId:data.agentId,
          CreatedBy:new Date(),


        };
        delArray.push(obj);
      });
    }
    this.service.setHttp(
      'DELETE',
      'http://demoelectionclientapp.eanifarm.com/ClientMasterApp/BoothAgent/DeleteClientPA?ClientId='+formData.clientId+'&AgentId='+formData.agentId+'&CreatedBy='+1,
      false,
      delArray,
      false,
      ''
    );
    this.service.getHttp().subscribe(
      {
        next: (res: any) => {
          if (res.statusCode === '200') {
            // this.highlightedRow = 0;
            this.displayData();
            // this.commonMethod.matSnackBar(res.statusMessage, 0);
            // this.selection.clear();
          } else {
            if (res.statusCode != '404') {
              this.error.handelError(res.statusMessage);
            }
          }
        },
      },
      (error: any) => {
        // this.spinner.hide();
        this.error.handelError(error.status);
      }
    );
    this.onCancelRecord();
  }
//#endregion Delete fun end

//#region pagination fun start
  pageChanged(event: any) {
    this.pageNo = event.pageIndex + 1;
    this.displayData();
    // this.currentPage=0;
  }

//#endregion pagination fun end


//#region cancleRecord start
  onCancelRecord() {
    this.formDirective.resetForm();
    this.isEdit = false;
  }
//#endregion cancleRecord end

//#region space and letteronly fun start
  space(e: any) {
    if (e.charCode === 32) {
      e.preventDefault();
    }
  }
  letterOnly(event: any): Boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if ((charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122)) {
      return false;
    }
    return true;
  }

//#endregion space and letteronly fun end
  //----------------------------------------------------------------------Add-------------------------------------------------------------------------

  //-------------------------------------------------------------------------Delete------------------------------------------------------------
  // OnDelete(index: any) {
  //   if (confirm('Are you sure you want to delete this?')) {
  //     // this.addnewArray.splice(index - 1);
  //   }
  // }
  //------------
}
