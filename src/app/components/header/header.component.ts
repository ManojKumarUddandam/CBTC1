import { Component, Input, Renderer2, ElementRef, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { Router } from '@angular/router';
import { ResponsiveService } from '../../ResponsiveService.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() isDarkMode: boolean = false;
  isMobile = false;
  isMenuOpen = false;
  searchQuery: string = '';
  c!: number;

  constructor(
    private api: ApiService,
    private router: Router,
    private responsiveService: ResponsiveService,
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.api.cartSubObs.subscribe((data) => this.c = data);
    this.responsiveService.isMobileDevice().subscribe((isMobile: boolean) => {
      this.isMobile = window.innerWidth < 768;
    });
  }

  searchProducts(): void {
    this.router.navigate(['/products'], { queryParams: { q: this.searchQuery } });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onDarkModeChange(isDarkMode: boolean): void {
    this.isDarkMode = isDarkMode;
    if (this.isDarkMode) {
      this.renderer.addClass(document.body, 'dark-mode');
    } else {
      this.renderer.removeClass(document.body, 'dark-mode');
    }
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }
}

