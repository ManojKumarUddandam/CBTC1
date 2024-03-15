// dark-mode.component.ts
import { Component, OnInit ,Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-dark-mode',
  templateUrl: './dark-mode.component.html',
  styleUrls: ['./dark-mode.component.css']
})
export class DarkModeComponent implements OnInit {
  darkMode: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    if (this.darkMode) {
      this.darkModeChange.emit(this.darkMode);
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  }
  @Output() darkModeChange: EventEmitter<boolean> = new EventEmitter<boolean>();
}