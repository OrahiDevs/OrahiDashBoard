import { Component,HostBinding, OnInit,ChangeDetectionStrategy } from '@angular/core';


import { ITdDataTableColumn, TdDataTableSortingOrder, TdDataTableService,
         ITdDataTableSortChangeEvent, IPageChangeEvent } from "@covalent/core";
import { ServiceModel } from "../../../models/service.model";
import { SpReceiptModel } from "../../../models/receipt.model";
import { Router } from "@angular/router";
import { GetReceiptsService } from "../../../services/get-receipts.service";
import { WebapiService } from "../../../services/webapi.service";
import { MdSnackBar } from "@angular/material";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-receipts',
  templateUrl: './receipts.component.html',
  styleUrls: ['./receipts.component.scss']
})
export class ReceiptsComponent implements OnInit {
  //my 
  categoryList: Array<any>;
  service: ServiceModel = new ServiceModel();
  token:string;
  spReceiptsList: Array<SpReceiptModel> = new Array<SpReceiptModel>();

  constructor(
    private router: Router,
    private getReceiptService: GetReceiptsService,
    private webApiPathService: WebapiService,
    private snackBar: MdSnackBar,
    //covalent
    private _dataTableService: TdDataTableService
){}

ngOnInit(): void{
    this.getToken();
    this.filter();
}

getToken(){
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser.token;
    this.getSpReceiptsList();
}

getSpReceiptsList(){
  //console.log(this.webApiPathService.getWebApiPath('get-sp-receipts').path);
  this.getReceiptService.getReceipts( this.webApiPathService.getWebApiPath('get-sp-receipts').path, this.token)
  .subscribe(response => {
      if(response){
          this.spReceiptsList = this.getReceiptService.getReceiptsList();
          this.spReceiptsList.forEach((object)=>{
              let paymentDate = new Date(object.paymentDate);
              let year = paymentDate.getFullYear();
              let month = paymentDate.getMonth()+1;
              let dt = paymentDate.getDate();    
              let hours = paymentDate.getHours();
              let minutes = paymentDate.getMinutes();
              let seconds = paymentDate.getSeconds();
              object.paymentDate = dt+'-' + month + '-'+year+' '+hours+':' + minutes + ':'+seconds;
          });
          
      }else{
          this.snackBar.open('No receipts exist', '', {
                  duration: 2000,
          });
      }
  }, 
  errMsg => {
      this.snackBar.open(errMsg, '', {
          duration: 2000,
      });
      console.log(errMsg);
  });
}

  //Covalent
  data: any[] = [
    { approve: 'True', serviceName: 'Hotel', userName: 'gbrigens', amount: 1000, paymentDate: '12/08/2017' },
  ];
  columns: ITdDataTableColumn[] = [
    { name: 'approve', label: 'APPROVE', tooltip: 'Approve' },
    { name: 'serviceName', label: 'SERVICE NAME' },
    { name: 'userName', label: 'USER NAME' },
    { name: 'amount', label: 'AMOUNT' },
    { name: 'paymentDate', label: 'PAYMENT DATE' }
  ];

  filteredData: any[] = this.data;
  filteredTotal: number = this.data.length;

  searchTerm: string = '';
  fromRow: number = 1;
  currentPage: number = 1;
  pageSize: number = 5;
  sortBy: string = 'approve';
  selectedRows: any[] = [];
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;

  sort(sortEvent: ITdDataTableSortChangeEvent): void {
    this.sortBy = sortEvent.name;
    this.sortOrder = sortEvent.order;
    this.filter();
  }

  search(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.filter();
  }

  page(pagingEvent: IPageChangeEvent): void {
    this.fromRow = pagingEvent.fromRow;
    this.currentPage = pagingEvent.page;
    this.pageSize = pagingEvent.pageSize;
    this.filter();
  }

  filter(): void {
    let newData: any[] = this.data;
    let excludedColumns: string[] = this.columns
    .filter((column: ITdDataTableColumn) => {
      return ((column.filter === undefined && column.hidden === true) ||
              (column.filter !== undefined && column.filter === false));
    }).map((column: ITdDataTableColumn) => {
      return column.name;
    });
    newData = this._dataTableService.filterData(newData, this.searchTerm, true, excludedColumns);
    this.filteredTotal = newData.length;
    newData = this._dataTableService.sortData(newData, this.sortBy, this.sortOrder);
    newData = this._dataTableService.pageData(newData, this.fromRow, this.currentPage * this.pageSize);
    this.filteredData = newData;
  }
}
