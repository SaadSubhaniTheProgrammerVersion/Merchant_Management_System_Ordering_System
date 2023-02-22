import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Product } from '../products/product';
import { Cart } from './cart';

@Injectable({
    providedIn: 'root'
})

export class CartService {

    private url = 'http://localhost:3000';
    private cart$ = new Subject<Cart[]>();

    constructor(private httpClient: HttpClient) { }


    getCart(userId: string) {
        this.httpClient.get<Cart[]>(`${this.url}/cart/getCart/${userId}`).subscribe(
            (response) => {
                console.log(response);
                this.cart$.next(response);
            }
        );
        // return this.cart$.asObservable();
    }

    getCartItems(userId: string): Subject<Cart[]> {
        this.getCart(userId);
        return this.cart$;
    }

    // deleteCartItem(userId: string, productId: string) {
    //     return this.httpClient.delete(`${this.url}/cart/deleteCart/${userId}`, { params: productId });
    // }
    deleteFromCart(userId: string, productId: string) {
        return this.httpClient.delete<any>(`${this.url}/cart/deleteCart/${userId}`, { body: { product_id: productId } });
      }


}