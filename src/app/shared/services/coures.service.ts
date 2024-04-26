import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map, shareReplay, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICoursReps, ICourse, Ilession,IlessonRes } from '../models/courses';

@Injectable({
  providedIn: 'root'
})
export class CouresService {
  editsub$ : Subject<boolean> = new Subject<boolean>()
  courseUrl=`${environment.basUrl}/courses`
  
  constructor(  private _http : HttpClient) { }

  fetchAllcourses ():Observable<ICourse[]>{
   return this._http.get<ICoursReps>(this.courseUrl)
   .pipe(
    map(res => res['payload']),
    shareReplay()
    )
   
  }    

  updatecourse(coures: ICourse):Observable<ICourse>{
    let updateUrl=`${this.courseUrl}/${coures.id}`;
   return this._http.put<ICourse>(updateUrl,coures)
  }

  getcourseInfi(couresId :string):Observable<ICourse>{
    let courseUrl = `${this.courseUrl}/${couresId}`;
    return this._http.get<ICourse>(courseUrl)

  }
  // getcourseLessions(couresId:String){
  //   let courseLessions = `${this.courseUrl}/lessions`;

  //   let params = new HttpParams()
  //   .set("courseId",couresId)
       

  // }

  getCourseLession(courseId : string, pageSize: number = 15, filter=''): Observable<Ilession[]>{
    let courseLessions = `${environment.basUrl}/lessons`;

    let params = new HttpParams()
      .set("courseId",courseId)
      .set("pageSize",pageSize)
      .set("filter",filter)
      return this._http.get<IlessonRes>(courseLessions,{
        params : params
      })
      .pipe(
        map(res =>{
         return res ['payload']
        })
      )

  }
}
