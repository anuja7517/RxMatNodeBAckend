import { Component, OnInit } from '@angular/core';
import { ICourse } from '../../models/courses';
import { CouresService } from '../../services/coures.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
courseArry! :Array<ICourse>;

beginnerCoursesArr!:Array<ICourse>
beginnerCourses$!:Observable<ICourse[]>

advancCoursseArry!:Array<ICourse>
advancCourses$!:Observable<ICourse[]>

courearry$!: Observable<ICourse[]> 
  constructor(private _courservices :CouresService) { }

  ngOnInit(): void {

    this.edite()
    this._courservices.editsub$
    .subscribe(res=>{
      console.log(res);
  if(res){
    this.edite()
  }


    })

    // this.courearry$= this._courservices.fetchAllcourses()
    // .subscribe(course =>{
    //   this.courseArry =course['payload']
    //   console.log(course);
      
    // })
    // this._courservices.fetchAllcourses()
    // .subscribe(courses =>{
    //   this.beginnerCoursesArr = courses.filter(c =>c.category ==="BEGINNER")

    //   this.advancCoursseArry = courses.filter(c=> c.category==="ADVANCED")

    // })
    // this._courservices.editsub$
    // .subscribe(res=>{
    //   console.log(res);
      
    // })
  //     this.courearry$=this._courservices.fetchAllcourses()
  //     this.advancCourses$ =this.courearry$
  //     .pipe(
  //       map(courseArry=>{
  //         console.log(courseArry);
  //         return courseArry.filter(c=>c.category === "ADVANCED")
          
  //       })
  //     )
  //     this.beginnerCourses$ = this.courearry$
  //     .pipe(
  //       map(arr =>{
  //         return arr.filter(c=>c.category === "BEGINNER")
  //       })
  //     )
  }



  edite(){
    this._courservices.fetchAllcourses()
    .subscribe(courses =>{
      this.beginnerCoursesArr = courses.filter(c =>c.category ==="BEGINNER")

      this.advancCoursseArry = courses.filter(c=> c.category==="ADVANCED")

    })
    this._courservices.editsub$
    .subscribe(res=>{
      console.log(res);
      
    })
  }
}
