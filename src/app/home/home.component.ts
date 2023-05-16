import { Component, OnInit } from '@angular/core';
import { HomeServices } from './services.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{


  editingRowIndex:number = -1;
  editMode:boolean = true;

  constructor(private homeservices:HomeServices){}

  public appointment:any;

  ngOnInit(){

    this.homeservices.GetApp().subscribe((res)=>{
      this.appointment = res;
    });
    
  }

  editRow(index:any){
    const Row = this.appointment[index];
  }
  deleteRow(index:any){

  }
  saveRow(index:any){

  }
  cancelRow(index:any){

  }
}
