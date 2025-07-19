import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SharedService } from '../shared.service';
import { RestaurentData } from './restaurent.model';

@Component({
  selector: 'app-resturant-dash',
  templateUrl: './resturant-dash.component.html',
  styleUrls: ['./resturant-dash.component.css']
})
export class ResturantDashComponent implements OnInit {
  formValue!: FormGroup;
  restaurentModelObj: RestaurentData = new RestaurentData();
  allRestaurentData: RestaurentData[] = [];
  showAdd: boolean = false;
  showBtn: boolean = false;

  constructor(private formBuilder: FormBuilder, private api: SharedService) {}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      services: [''],
    });
    this.getAllData();
  }

  clickAddResto() {
    this.formValue.reset();
    this.showAdd = true;
    this.showBtn = false;
  }

  addRestaurent() {
    this.restaurentModelObj = this.formValue.value;

    this.api.postRestaurent(this.restaurentModelObj).subscribe(res => {
      alert('Restaurant Added Successfully');
      document.getElementById('close')?.click();
      this.formValue.reset();
      this.getAllData();
    }, err => {
      alert('Failed to add restaurant');
    });
  }

  getAllData() {
    this.api.getRestaurent().subscribe(res => {
       console.log("Fetched restaurant data:", res); 
      this.allRestaurentData = res;
    }, err => {
    console.error("API error:", err);
  });
  }

  deleteResto(data: any) {
    this.api.deleteRestaurant(data.id).subscribe(res => {
      alert('Restaurant Deleted Successfully');
      this.getAllData();
    });
  }

  onEditResto(data: any) {
    this.showAdd = false;
    this.showBtn = true;
    this.restaurentModelObj.id = data.id;
    this.formValue.setValue({
      name: data.name,
      email: data.email,
      mobile: data.mobile,
      address: data.address,
      services: data.services
    });
  }

  updateResto() {
    this.restaurentModelObj = {
      ...this.restaurentModelObj,
      ...this.formValue.value
    };

    this.api.updateRestaurant(this.restaurentModelObj.id, this.restaurentModelObj).subscribe(res => {
      alert('Restaurant Updated Successfully');
      document.getElementById('close')?.click();
      this.formValue.reset();
      this.getAllData();
    });
  }
}
