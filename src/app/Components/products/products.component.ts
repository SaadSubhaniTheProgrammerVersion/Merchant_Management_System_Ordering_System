import { Component, OnInit } from '@angular/core';
import { Product } from './product';
import { Observable } from 'rxjs';
import { ProductService } from './product.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {

  categories: string[] = ["All","Physical", "Digital"];
  productList$: Observable<Product[]> = new Observable();
  physicalList: Observable<Product[]> = new Observable();
  digitalList: Observable<Product[]> = new Observable();
  physicalChecked = false;
  digitalChecked = false;
  userId: string;
  radioSelect : string = "";


  constructor(private productService: ProductService, private snackBar: MatSnackBar, private router: Router) {
    this.userId = '';
    this.fetchAllProducts();
  }

  ngOnInit(): void {
  }


  fetchAllProducts(): void {
    this.productList$ = this.productService.getAllProducts();
  }
  fetchDigitalProducts() : void {
    this.productList$ = this.productService.getDigitalProducts();
  }
  fetchPhysicalProducts() : void {
    this.productList$= this.productService.getPhysicalProducts();
  }

  radioFunction() {
    console.log(this.radioSelect);
    if ( this.radioSelect == "physical") {
      
      this.fetchPhysicalProducts();
    }
    else if (this.radioSelect == "digital") {
      this.fetchDigitalProducts();
    }
    else {
      this.fetchAllProducts();
    }
  } 

  printID() {
    console.log(this.userId);
    this.snackBar.open('User selected Successfully!', '', {
      duration: 3000,
    });
  }

  navigateToCart() {
    this.router.navigate(['cart'], { queryParams: { userId: this.userId } });
  }

  navigateToOrders() {
    this.router.navigate(['orders'] );
  }
}


