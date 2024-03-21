import { Component, Input, Renderer2, ElementRef } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { Router } from '@angular/router';
import { ResponsiveService } from '../../ResponsiveService.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() isDarkMode:boolean = false;
  isMobile = false;
  isMenuOpen = false; // Add a variable to track the menu state
  searchQuery: string = '';
  c!: number;

  constructor(
    private api: ApiService,
    private router: Router,
    private responsiveService: ResponsiveService,
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {
    this.api.cartSubObs.subscribe((data)=>this.c=data)
    this.responsiveService.isMobileDevice().subscribe((isMobile: boolean) => {
      this.isMobile = window.innerWidth < 768;
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
    const header = this.elementRef.nativeElement.querySelector('.container-fluid');
    if (header) {
      if (this.isDarkMode) {
        this.renderer.addClass(header, 'dark-mode');
      } else {
        this.renderer.removeClass(header, 'dark-mode');
      }
    }
  }

  closeMenu(): void {
    this.isMenuOpen = false; // Close the menu when a link is clicked
  }
}
