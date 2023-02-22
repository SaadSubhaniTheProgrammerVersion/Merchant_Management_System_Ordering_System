import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Product } from '../products/product';
import { ProductService } from '../products/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input() data: any;
  @Input() userId: any;

  constructor(private productService: ProductService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  addToCart(product: string) {
    if (this.userId == '' || this.userId == null || this.userId == undefined) {
      console.log("Invalid UserId");
      this.snackBar.open('Please select a user ID first!', '', {
        duration: 3000,
      });
      return
    }
    else {
      this.productService.addToCart(this.userId, product);
      // this.ngOnInit();
    
      this.snackBar.open('Cart Updated!', '', {
        duration: 3000,
      });

    }
    // this.ngOnInit();
  }

}
