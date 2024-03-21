import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  images: string[] = ['assets/laptop.jpg', 'assets/mobiles.jpg', 'assets/perfume1.jpg', 'assets/homedecor.jpg', 'assets/skincare.jpg'];
  slideIndex = 0;
  searchQuery: string = '';
  slides: HTMLElement[] = []; // Initialize slides array

  constructor(private router: Router, private sanitizer: DomSanitizer) {}

  ngAfterViewInit() {
    this.slides = Array.from(document.querySelectorAll('.mySlides') as NodeListOf<HTMLElement>);
    this.showSlide(this.slideIndex);
    setInterval(() => this.nextSlide(), 6000);
  }

  prevSlide() {
    this.showSlide(this.slideIndex -= 1);
  }

  nextSlide() {
    this.showSlide(this.slideIndex += 1);
  }

  showSlide(index: number) {
    console.log('Slides:', this.slides); // Log slides array
    if (index >= this.slides.length) { this.slideIndex = 0; }
    if (index < 0) { this.slideIndex = this.slides.length - 1; }
    for (const slide of this.slides) { slide.style.display = 'none'; }
    this.slides[this.slideIndex].style.display = 'block';
  }

  navigateToFilteredProducts(category: string) {
    this.router.navigate(['/products'], { queryParams: { category: category } });
  }

  getCategoryName(index: number): string {
    switch (index) {
      case 0: return 'laptops';
      case 1: return 'smartphones';
      case 2: return 'fragrances';
      case 3: return 'home-decoration';
      case 4: return 'skincare';
      default: return '';
    }
  }

  getImageText(index: number): SafeHtml {
    let imageText: string;

    switch (index) {
      case 0:
        imageText = '<div><h1 style="font-size:56px;padding-left=350px">Laptops</h1><p style="font-size:20px;padding-right:60px">Best selling laptops, Biggest price drop on top brands</p> <p style="padding-right:60px;font-size:20px">Shop Now</p></div>';
        break;
      case 1:
        imageText = '<h1 style="font-size:56px">Mobiles</h1><p style="padding-right:60px;font-size:20px" >Explore our latest collection of smartphones.</p><p>Shop Now</p>';
        break;
      case 2:
        imageText = '<div><h1 style="font-size:56px">Perfumes</h1><p style="padding-right:60px;font-size:20px">Find your signature scent with our range of perfumes.</p><p>Shop Now</p></div>';
        break;
      case 3:
        imageText = '<h1 style="font-size:56px">Home Decor</h1><p style="padding-right:60px;font-size:20px">Add style to your home with our decorative items.</p><p>Shop Now</p>';
        break;
      case 4:
        imageText = '<h1 style="font-size:56px">Skincare</h1><p style="padding-right:60px;font-size:20px">Care for your skin with our premium skincare products.</p><p>Shop Now</p>';
        break;
      default:
        imageText = '';
    }
    return this.sanitizer.bypassSecurityTrustHtml(imageText);
  }
  searchProducts(): void {
    // Navigate to the products page and pass the search query as a query parameter
    this.router.navigate(['/products'], { queryParams: { q: this.searchQuery } });
  }
}
