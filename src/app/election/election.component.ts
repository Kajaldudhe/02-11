import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CallApiService } from '../core/call-api.service';
import { ErrorsService } from '../error.service';
import { HandleErrorService } from 'src/app/core/handle-error.service';


@Component({
  selector: 'app-election',
  templateUrl: './election.component.html',
  styleUrls: ['./election.component.scss'],
})
export class ElectionComponent implements OnInit {
  displayedColumns: string[] = [
    'srNo',
    'electionname',
    'type',
    'constituency',
    'subelection',
    'manageelection',
  ];
  add = {
    SubElectionId: '',
    ElectionName: '',
  };
  isBothListArray = [
    { id: 0, name: 'Assembly Booth List' },
    { id: 1, name: 'User Defined Booth List' },
  ];
  isSubElectionArray = [
    { id: 0, name: 'Yes' },
    { id: 1, name: 'No' },
  ];
  electionFrom!: FormGroup;
  dataSource: any[] = [];
  filterForm!: FormGroup;
  electionArray = new Array();
  editFlag: boolean = false;
  pageNumber: number = 0;
  pageSize: number = 7;
  totalCount: any;
  // pageCount!:number;
  pageEvent!: PageEvent;
  electionForm!: FormGroup;
  electionname = new Array();
  electiontype = new Array();
  electionType = new Array();
  currentPage: number = 0;
  searchtext!: string;
  electionSub = new Array();
  subselection = new Array();
  bothlisttype = new Array();
  editData: any;
  addForm!: FormGroup;
  addnewArray = new Array();
  constructor(
    private fb: FormBuilder,
    private service: CallApiService,
    public error: ErrorsService,
    private snack: MatSnackBar,
    private handleErrorSer: HandleErrorService
  ) {}

  ngOnInit() {
    this.error.handelError(220);
    this.defaulForm();
    this.displayData();
    this.getElection();
    this.getSubElection();
  }

  defaulForm() {
    this.electionForm = this.fb.group({
      electionname: ['', [Validators.required]],
      IsAsemblyBoothListApplicable: ['0', [Validators.required]],
      electiontype: ['', [Validators.required]],
      subselection: ['', [Validators.required]],
      IsSubElectionApplicable: ['1', [Validators.required]],
    });
    //Dynamically Load Form Group
    this.filterForm = this.fb.group({
      subselection: ['', [Validators.required]],
      searchtext: [''],
      electiontype: ['', [Validators.required]],
    });

    this.addForm = this.fb.group({
      subselection: ['', [Validators.required]],
      SubElectionId: ['', [Validators.required]],
    });
  }
  get f() {
    return this.electionForm.controls;
  }
  // ------------------------------------------------------ display Table ---------------------------------------------------------- //

  displayData() {
    let electionType = this.filterForm.controls['electiontype'].value? this.filterForm.controls['electiontype'].value: 0;
    let searchValue = this.filterForm.controls['searchtext'].value ? this.filterForm.controls['searchtext'].value: '';
    console.log(electionType);
    this.service.setHttp('get','Service.asmx/Web_GetElectionMaster?&ElectionTypeId=' + electionType +'&UserId=1&Search='+ searchValue +'&nopage=' + (this.currentPage + 1) , false,false,false,'baseURL');
    this.service.getHttp().subscribe({
      next: (res: any) => {
        if (res.data == 0) {
          // this.electionArray = res.data1;
          this.dataSource = res.data1;
          // console.log(this.electionArray);
                          

        console.log(this.totalCount);
        }
        else {
          this.dataSource = [];
        }
      },
    });
  }

  // ------------------------------------------------------ Election ------------------------------------------------------------ //
  getElection() {
    this.service.setHttp(
      'get','Service.asmx/Web_GetElectionType',false,false,false,'baseURL');
    this.service.getHttp().subscribe({
      next: (res: any) => {
        if (res.data == 0) {
          this.electionType = res.data1;
        }
      },
    });
  }

  //--------------------------------------------------------------- SubElection --------------------------------------------------------//
  getSubElection() {
    this.service.setHttp(
      'get','Service.asmx/Web_GetElection?UserId=1',false,false,false,'baseURL');
    this.service.getHttp().subscribe({
      next: (res: any) => {
        if (res.data == 0) {
          this.subselection = res.data1;
        }
      },
    });
  }

  // ------------------------------------------------------ Submit Record -------------------------------------------------------------- //
  onSubmit() {
    alert();
    let formData = this.electionForm.value;
    let obj = {
      ...this.electionForm.value,
      data1: [
        {
          Id: 0,
          ElectionName: 'string',
          ElectionTypeId: 0,
          IsSubElectionApplicable: 1,
          IsAsemblyBoothListApplicable: 0,
          CreatedBy: 0,
          StrSubElectionId: [{ SubElectionId: 0, ElectionName: 'string' }],
        },
      ],
    };
    if (this.editFlag) {
      let formData = this.electionForm.value;
      this.service.setHttp(
        'get',
        'Service.asmx/Web_Get_ElectionDetails?ElectionId=' +
          formData.electiontype,
        false,
        false,
        false,
        'baseURL'
      ),
        this.service.getHttp().subscribe({
          next: (res: any) => {
            if (res.statusCode == 200) {
              this.snack.open(res.statusMessage, 'ok');
            }
          },
        });
      this.electionForm.reset();
    } else {
      this.service.setHttp(
        'get',
        'Service.asmx/Web_Insert_ElectionMaster?Id=0' +
          '&ElectionName=' +
          formData.electionname +
          '&ElectionTypeId=' +
          formData.electiontype +
          '&IsSubElectionApplicable=' +
          formData.IsSubElectionApplicable +
          '&IsAsemblyBoothListApplicable=' +
          formData.IsAsemblyBoothListApplicable +
          '&CreatedBy=1' +
          '&StrSubElectionId=',
        false,
        false,
        false,
        'baseURL'
      );
      this.service.getHttp().subscribe({
        next: (res: any) => {
          if (res.statusCode == 200) {
            this.snack.open(res.statusMessage, 'ok');
          }
        },
      });
      this.displayData();
      this.electionForm.reset();
    }
  }
  // ------------------------------------------------------ Edit Record from Form---------------------------------------------------------- //
  onEdit(obj: any) {
    this.editFlag = true;
    this.electionForm.patchValue({
      electionname: obj.ElectionName,
      createdBy: obj.createdBy,
      electiontype: obj.ElectionTypeId,
      IsSubElectionApplicable: obj.IsSubElectionApplicable,
      IsAsemblyBoothListApplicable: obj.IsAsemblyBoothListApplicable,
      subselection: obj.StrSubElectionId,
    });
  }

  // ------------------------------------------------------ Delete Record from Form---------------------------------------------------------- //
  onDelete(Id: number) {
    // let formData = this.electionForm.value;
    this.service.setHttp(
      'get',
      'Service.asmx/Delete_Election?ElectionId=' + Id + '&CreatedBy=1',
      false,
      false,
      false,
      'baseURL'
    );
    this.service.getHttp().subscribe({
      next: (res: any) => {
        this.snack.open(res.statusMsg, 'Ok', { duration: 1000 });
        this.displayData();
      },
    });
  }
  //--------------------------------------------------------------------------Paginator--------------------------------------------------------------------------//
  pageChanged(event: any) {
    this.currentPage = event.pageIndex;
    this.displayData();
    this.currentPage=0;
  }
  // ------------------------------------------------------ Clear Form except self one---------------------------------------------------------- //

  clearDivDistForm() {
    this.electionForm.reset();
    this.addForm.reset();
    this.editFlag = false;
  }
  //---------------------------------------------------------------------Space---------------------------------------------------------------------------//
  space(e: any) {
    console.log(e);
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
  //----------------------------------------------------------------------Add-------------------------------------------------------------------------
  Add() {
    alert();
    this.addnewArray.push(this.add);
    this.add = {
      SubElectionId: '',
      ElectionName: '',
    };
  }
  //-------------------------------------------------------------------------Delete------------------------------------------------------------
  OnDelete(index: any) {
    if (confirm('Are you sure you want to delete this?')) {
      this.addnewArray.splice(index - 1);
    }
  }
  //--------------------------------------------------------------------------------------------------------------------------------
}
