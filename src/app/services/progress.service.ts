import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


/**
 * This service is used to control the Progress component which displays a 
 * progress bar beneath the main application toolbar. 
 * 
 * When the active state is set to true, the progress bar is activated and
 * displays a progress indicator. When set to false, the progress
 * bar is deactivated.
 * 
 * @export
 */
@Injectable({
  providedIn: 'root'
})
export class ProgressService {

  active = false;
  private progressSubject: BehaviorSubject<boolean> = new BehaviorSubject(this.active);

  constructor() { }

  /**
   * This method sets the state of the service and notifies any
   * subscribers.
   * 
   * @param active  The state of the service
   */
  public setActive(active: boolean): void {

    // Set the active state accordingly and
    // notify the subscribers.
    this.active = active;
    this.progressSubject.next(this.active);
  }

  /**
   * This method returns an Observable for the service state.
   * 
   * @returns {Observable<boolean>} An observable for the service state
   * @memberof ProgressService
   */
  public getProgressObservable(): Observable<boolean> {
    return this.progressSubject.asObservable();
  }

}
