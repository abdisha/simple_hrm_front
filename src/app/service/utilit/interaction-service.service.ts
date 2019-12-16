import { Injectable } from '@angular/core';
import { EmployeeLimted } from 'src/app/model/EmployeeLimted';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteractionServiceService {

  private _sendEmployeeLimitdObject=new Subject<EmployeeLimted>()
  private _nowRefreshEmployeeLimited = new Subject<boolean>();
    nowRefreshEmployeeLimited$=this._nowRefreshEmployeeLimited.asObservable();
    employeeLimitedObjct$ = this._sendEmployeeLimitdObject.asObservable();
    
  constructor() { }
   public  sendEmployeeLimitedObject(data:EmployeeLimted){
      this._sendEmployeeLimitdObject.next(data)
  }

  public refreshEmployeeLimitedInfo(now:boolean)
  {
    this._nowRefreshEmployeeLimited.next(now);
  }
}
