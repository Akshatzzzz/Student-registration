import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  @ViewChild('myModal') model: ElementRef | undefined;
  studentObj: Student = new Student();
  studentList: Student[] = [];

  ngOnInit(): void {
    const localData = localStorage.getItem("angular17crud");
    if (localData != null) {
      this.studentList = JSON.parse(localData)
    }
  }

  openModal() {
    const model = document.getElementById("myModal");
    if (model != null) {
      model.style.display = 'block'
    }
  }
  closeModal(){
    this.studentObj =new Student();
    if (this.model != null) {
      this.model.nativeElement.style.display = 'none';
    }
  }

  onEdit(item:Student){
     this.studentObj = item;
     this.openModal();
  }

  onDelete(item:Student){
    const isDelt = confirm("Are you sure want to delete?")
    if (isDelt) {
      const currentRecord = this.studentList.findIndex(m=> m.id== this.studentObj.id);
      this.studentList.splice(currentRecord,1);
      localStorage.setItem("angular17crud",JSON.stringify(this.studentList));
    }
  }

  updateStudent(){
    const currentRecord = this.studentList.find(m=> m.id== this.studentObj.id);
    if (currentRecord != undefined) {
      currentRecord.name = this.studentObj.name;
      currentRecord.mobileNo = this.studentObj.mobileNo;
      currentRecord.city = this.studentObj.city;
      currentRecord.state = this.studentObj.state;
      currentRecord.address = this.studentObj.address;
      currentRecord.pincode = this.studentObj.pincode;
      currentRecord.email = this.studentObj.email;
      localStorage.setItem("angular17crud",JSON.stringify(this.studentList));
      this.closeModal();
    }
  }

  saveStudent(){
    debugger;
    const isLocalPresent = localStorage.getItem("angular17crud")
    if (isLocalPresent != null) {
      const oldArr = JSON.parse(isLocalPresent);
      this.studentObj.id = oldArr.length + 1;
      oldArr.push(this.studentObj);
      this.studentList = oldArr;
      localStorage.setItem("angular17crud",JSON.stringify(oldArr));
    } else {
      const newArr = [];
      this.studentObj.id = 1;
      newArr.push(this.studentObj);
      this.studentList = newArr;
      localStorage.setItem("angular17crud",JSON.stringify(newArr));
    }
    this.closeModal();
  }
}

export class Student{
  id: number;
  name: string;
  mobileNo: string;
  email: string;
  city: string;
  state: string;
  pincode: string;
  address: string;
  

  constructor(){
    this.id = 0;
    this.address = '';
    this.city = '';
    this.email = '';
    this.mobileNo = '';
    this.name = '';
    this.pincode = '';
    this.state = '';
    }
}
