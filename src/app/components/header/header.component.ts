import { Component, Input } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { Router } from '@angular/router';
import { ResponsiveService } from '../../ResponsiveService.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() isDarkMode:boolean = false;
  isMobile = false;
  isMenuOpen = false; // Add a variable to track the menu state
  searchQuery: string = '';
  c!: number;
  constructor(private api: ApiService,private router: Router,private responsiveService: ResponsiveService)
  {
    this.api.cartSubObs.subscribe((data)=>this.c=data)
    this.responsiveService.isMobileDevice().subscribe((isMobile: boolean) => {
      this.isMobile = window.innerWidth<768;
    });
  }
  ngOnInit(): void {
  }

  searchProducts(): void {
    // Navigate to the products page and pass the search query as a query parameter
    this.router.navigate(['/products'], { queryParams: { q: this.searchQuery } });
  }
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
  onDarkModeChange(isDarkMode: boolean): void {
    this.isDarkMode = isDarkMode;
    const header = document.querySelector('.container-fluid');
    if (header) {
      header.classList.toggle('dark-mode', this.isDarkMode);
    }
  }
  closeMenu() :void{
    this.isMenuOpen = false; // Close the menu when a link is clicked
  }
}