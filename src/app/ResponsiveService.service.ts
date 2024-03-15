import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {
  private isMobile = false;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe([Breakpoints.HandsetPortrait]).subscribe(result => {
      this.isMobile = result.matches;
    });
  }

  public isMobileDevice(): Observable<boolean> {
    return new Observable<boolean>(observer => {
      observer.next(this.isMobile);
      return { unsubscribe() {} };
    });
  }
}
