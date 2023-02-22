import { Component, OnInit } from '@angular/core';
import { Cart } from './cart';
import { Observable } from 'rxjs';
import { CartService } from './cart.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CreateOrderComponent } from '../create-order/create-order.component';
import { ProductService } from '../products/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  userId: string = '';
  address: string = '';
  cartResponse: Observable<Cart[]> = new Observable();
  cart: Cart[] = [];
  cartSize = 0;


  constructor(private productService: ProductService, private cartService: CartService, private route: ActivatedRoute, private router: Router,  private snackBar: MatSnackBar) { }


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userId = params['userId'];
    });
    this.getCart(this.userId);

    this.cartSize = this.cart.length;
    console.log(this.cartSize);
  }

  navigateToHome() {
    this.router.navigate(['products']);
  }


  getCart(userId: string) {
    this.cartResponse = this.cartService.getCartItems(this.userId);
    this.cartResponse.subscribe(
      (response) => {
        console.log(response);
        this.cart = response;
        console.log(this.cart);
      },
      (error) => {
        console.log(error);
      }
    );
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
    this.ngOnInit();
  }

  deleteCartItem(product: string) {
    console.log(this.userId);
    console.log(product);
    this.cartService.deleteFromCart(this.userId, product).subscribe(
      (response) => {
        console.log(response);
        this.getCart(this.userId);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addOrder() {
    this.productService.addOrder(this.userId,this.address, 'not delivered');
    
    this.snackBar.open('Order Confirmed!', '', {
      duration: 3000,
    });

    this.navigateToHome();

  }


  
}
