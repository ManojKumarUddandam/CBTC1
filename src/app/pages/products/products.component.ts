import { Component,Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ApiService } from '../../services/api/api.service';
import { ActivatedRoute } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
interface Product {
  id: number;
  count: number;
  isDisabled: boolean;
  isDisabled2: boolean;
  // Add any other properties if needed
}
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  @Input() isDarkMode: boolean = false;
  title = 'Products';
  products: any[] = [];
  categories: { [key: string]: any[] } = {};
  pageName = 'products';
  searchts!: string;
  productLength: any[] = [];
  productsArray: any[] = [];
  searchQuery: string = ''; // Declare searchQuery property

  constructor(private titleService: Title, private as:ApiService,private route: ActivatedRoute){
    this.as.searchTs.subscribe(searchTs => {
      this.searchts = searchTs;

      this.as.getFilterProduct(this.searchts).subscribe((data:any) => {
        this.products = data.products;
      })

    });

    this.as.getActivePage(this.pageName);
    // this.as.cartSubObs.subscribe((data)=>this.c=data);

    titleService.setTitle(this.title);

    this.as.getProducts().subscribe((data:any) => {
      this.products = data.products.map((product: any) => ({ ...product, count: 1, isDisabled: false, isDisabled2: true }));
      
      this.products.forEach((product: any) => {
        const category = product.category;
        if (this.categories[category]) {
          this.categories[category].push(product);
        } else {
          this.categories[category] = [product];
        }
      });
    });

    const storedProducts = localStorage.getItem('myProducts');
    if (storedProducts) {
      this.productLength = JSON.parse(storedProducts);
    }
    
  }

  showAll(){
    this.as.getProducts().subscribe((data:any) => {
      this.products = data.products;
    });
  }
  filterAll(e:any){
    this.as.getCategoryProduct(e.target.textContent).subscribe((data:any) => (this.products = data.products));
  }

  addtocart(prod: Product) { // Use the Product interface as the type for 'prod'
    prod.count = 1; // Set the initial quantity to 1
    prod.isDisabled = false; // Ensure these properties are set for the newly added product
    prod.isDisabled2 = true;

    // Check if the product already exists in the cart
    const existingProductIndex = this.productsArray.findIndex((item: any) => item.id === prod.id);
    if (existingProductIndex !== -1) {
      // If the product exists, increment its quantity by 1
      this.productsArray[existingProductIndex].count++;
    } else {
      // If the product doesn't exist, add it to the cart with a quantity of 1
      this.productsArray.push(prod);
    }

    const updatedProducts = JSON.stringify(this.productsArray);
    localStorage.setItem('myProducts', updatedProducts);

    this.productLength = this.productsArray;
    this.as.updateCartCount(this.productLength.length);
    console.log(this.productLength.length);
  }

  removecart(id:number){
    const index = this.productLength.findIndex((item: any) => {
      return item.id === id;
    });

    if (index !== -1) {
      this.productLength.splice(index, 1);
      const updatedProducts = JSON.stringify(this.productLength);
      localStorage.setItem('myProducts', updatedProducts);
      
      this.as.updateCartCount(this.productLength.length);
      console.log(this.productLength.length);
    } else {
        console.log("Item not found in Cart.");
    }
  }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const category = params['category'];
      if (category) {
        this.as.getCategoryProduct(category).subscribe((data: any) => {
          this.products = data.products;
        });
      } else {
        this.as.getProducts().subscribe((data: any) => {
          this.products = data.products;
        });
      }
    });
  }
  loadProducts() {
    this.as.getProducts().subscribe((data: any) => {
      this.products = data.products.map((product: any) => ({ ...product, count: 1, isDisabled: false, isDisabled2: true }));
      
      this.products.forEach((product: any) => {
        const category = product.category;
        if (this.categories[category]) {
          this.categories[category].push(product);
        } else {
          this.categories[category] = [product];
        }
      });
    });
  }
  searchProducts(): void {
    if (this.searchQuery.trim() !== '') {
      // Filter products based on the search query
      this.products = this.products.filter(product =>
        product.name.toLowerCase() === this.searchQuery.toLowerCase()
      );
    } else {
      // Reload all products if the search query is empty
      this.loadProducts();
    }
  }
  
}
