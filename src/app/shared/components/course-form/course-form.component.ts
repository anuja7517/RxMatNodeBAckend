import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ICourse } from '../../models/courses';
import { CouresService } from '../../services/coures.service';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {
  courseData! :ICourse
  courseForm! : FormGroup
  constructor(
    @Inject(MAT_DIALOG_DATA) private  coures :ICourse,
    private fb : FormBuilder,
    private _courseservices : CouresService,
    private _matdilog:MatDialogRef<CourseDialogComponent>
  ) { 
    this.creatform()
    console.log(coures);
    this.courseData =coures;
    this.courseForm.patchValue(coures)
    
  }

  ngOnInit(): void {
    console.log(this.courseForm.value);
    
  }
   get f(){
    return this.courseForm.controls
  }

  creatform(){
    this.courseForm = this.fb.group({
      description :["", Validators.required],
      category : ["", Validators.required],
      releaseAt:["",Validators.required],
      longDescription:["",Validators.required],

      
    })
   
  }
  savecourse(){
      if(this.courseForm.valid){
        console.log(this.courseForm.value);
        let updatedCourse ={...this.courseForm.value, id :this.courseData.id}
        this._courseservices.updatecourse(updatedCourse)
        .subscribe(res=>{
          console.log(res);
          this._courseservices.editsub$.next(true)
          this._matdilog.close(updatedCourse)
          // this.courseForm.reset()
          
        })
        
      }
  }
  

}
