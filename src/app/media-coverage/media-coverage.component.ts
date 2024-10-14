import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CallApiService } from '../core/call-api.service';

@Component({
  selector: 'app-media-coverage',
  templateUrl: './media-coverage.component.html',
  styleUrls: ['./media-coverage.component.scss']
})
export class MediaCoverageComponent implements OnInit {
  displayedColumns: string[] = ['srNo','article_Title','source','url','Action'];
  dataSource:any;
  frmMediacoverage!:FormGroup;
  isEdit:boolean=false;
  totalPages: any;
  pageNo = 1;
  pageSize = 10;
  constructor( private fb: FormBuilder,
    private service: CallApiService,
    ) { }

  ngOnInit() {
    this.CreateMediaForm();
    this.getData();
  }


  get f() {
    return this.frmMediacoverage.controls;
  }
  CreateMediaForm(){
    this.frmMediacoverage = this.fb.group({
      article_Title :['',[Validators.required]],
      source :['',[Validators.required]],
      url:['',[Validators.required]]


    })
  }

  selection = new SelectionModel<any>(true, []);

  getData(){
    this.service.setHttp('get','media/GetAllByPagination?pageno='+this.pageNo+'&pagesize='+this.pageSize,false,false,false,'baseURL');
    this.service.getHttp().subscribe({
      next: (res: any) =>{

          this.dataSource .res.responseData1;
          this.totalPages = res.responseData.responseData2.pageCount;
      }
    })
  }

  onSubmitMediacoverage(){

}

onCancle(){
  this.frmMediacoverage.reset();
}
 filterData(){

}
}
