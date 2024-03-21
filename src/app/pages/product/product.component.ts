import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api/api.service';
import { DbService } from '../../services/db/db.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  id: any;
  product: any;
  fullImg: any;
  count: number = 1;
  isDisabled = false;
  isDisabled2 = true;
  isItemStored = false;
  productLength: any[] = [];
  currentUser: any;
  
  constructor(private router: ActivatedRoute, private as: ApiService, private route: Router, private data: DbService) {
    this.router.params.subscribe((data) => {
      this.id = data['id'];

      this.as.getProduct(this.id).subscribe((data: any) => {
        this.product = data;
      });
    });

    const storedProducts = localStorage.getItem('myProducts');
    if (storedProducts) {
      this.productLength = JSON.parse(storedProducts);
    }

    const userEmail: any = localStorage.getItem('currentUser');
    
    this.data.getUserByEmail(userEmail).subscribe(existingUser => {
      if (existingUser.length === 1) {
        this.currentUser = existingUser[0].payload.doc.data();
      }
    });
  }

  incr() {
    if (this.count >= 5) {
      this.isDisabled = true;
    } else {
      this.count++;
      this.isDisabled2 = false;
    }
  }

  decr() {
    if (this.count <= 1) {
      this.isDisabled2 = true;
    } else {
      this.count--;
      this.isDisabled = false;
    }
  }

  clicking(smallImg: any) {
    this.fullImg = document.querySelector('#imagebox');
    this.fullImg.src = smallImg.src;
  }
  
  addtocart(prod: Object) {
    const storedProducts = localStorage.getItem('myProducts');
    let productsArray: any[] = [];
    if (storedProducts) {
      productsArray = JSON.parse(storedProducts);
    }
    
    for (let i = 0; i < this.count; i++) {
      productsArray.push(prod);
    }

    const updatedProducts = JSON.stringify(productsArray);
    localStorage.setItem('myProducts', updatedProducts);

    this.productLength = productsArray;
    this.as.updateCartCount(this.productLength.length);
    console.log(this.productLength.length);
    this.isItemStored = true;
  }

  checkOut(product: any) {
    const token = localStorage.getItem('token');
    if (token) {
      // Logic for checkout
    } else {
      const confirmed = window.confirm("Please login first. Do you want to proceed to the login page?");
      if (confirmed) {
        this.route.navigateByUrl('/login');
      }
    }
  }
}
