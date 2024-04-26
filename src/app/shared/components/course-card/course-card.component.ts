import { Component, Input, OnInit } from '@angular/core';
import { ICourse } from '../../models/courses';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { CourseFormComponent } from '../course-form/course-form.component';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent implements OnInit {
@Input()getcourse!:ICourse
  constructor(private _matDilog :MatDialog) { }

  ngOnInit(): void {
  }

  oneidit(){
    let dialogconf =new MatDialogConfig();

    dialogconf.data= this.getcourse;
    dialogconf.width = "500px";
    dialogconf.disableClose = false;
    dialogconf.autoFocus = false

    const dialogRef = this._matDilog.open(CourseFormComponent,dialogconf)
    dialogRef.afterClosed()
    .subscribe(cours =>{
      console.log(`Updated Course`, cours);
      this.getcourse = cours
      
    })
  }

}
