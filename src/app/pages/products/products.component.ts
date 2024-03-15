import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  searchQuery: string = '';

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getProducts().subscribe((data: any) => {
      this.products = data.products;
      this.filteredProducts = [...this.products]; // Initialize filteredProducts with all products
    });
  }

  filterProducts(): void {
    this.filteredProducts = this.products.filter((product) =>
      product.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  add(prod: any): void {
    console.log("Product add called:", prod);
    this.api.addValue(prod);
  }
}
