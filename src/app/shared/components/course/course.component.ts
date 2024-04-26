import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { ICourse, Ilession } from '../../models/courses';
import { CouresService } from '../../services/coures.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
courseId ! : string;
courseObj$!:Observable<ICourse>;
lessons$ ! : Observable<Ilession[]>
  constructor( private _routes : ActivatedRoute,
                private _courseServices : CouresService
  ) { }

  ngOnInit(): void {
  this.courseId= this._routes.snapshot.params['id'];
   this.courseObj$= this._courseServices.getcourseInfi(this.courseId)
  // .subscribe(res =>{
  //   console.log(res);
    
  // })
    // this._courseServices.getCourseLession(this.courseId)
    // .subscribe(res =>{
    //   console.log(res);
      
    // })
    this.lessons$= this._courseServices.getCourseLession(this.courseId)

  }

  onsearch(eve:Event){
    let val = (eve.target as HTMLInputElement).value as string;
    console.log(val);
    // this._courseServices.getCourseLession(this.courseId,10,val)
    // .subscribe(res=>{
    //   console.log(res);
      
    // })
    let val$ = of (val)
    //API call on each keyup event
    val$
    .pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(str =>this._courseServices.getCourseLession(this.courseId,10,str))
    )
    .subscribe(res=>{
      // this._courseServices.getCourseLession(this.courseId,10,res)
      // .subscribe(data=>{
        console.log(res);
        
     // }
   // )
    
      
    })
    
    
  }

}
