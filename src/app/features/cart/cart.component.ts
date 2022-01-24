import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { AppSetTitle } from 'src/app/store/app.actions';
import { CartItem } from './cart.model';
import { CartState } from './store/cart-store.model';
import { cartAddItem, cartDeleteItem } from './store/cart.actions';
import { cartItemsSelector } from './store/cart.selectors';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  private idSeed = 1;

  cartItems$!: Observable<CartItem[]>;

  constructor(
    private store: Store<CartState>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(AppSetTitle({title: 'Cart'}));

    this.cartItems$ = this.store.pipe(
      select(cartItemsSelector),
      tap(data => console.log(data))
    );
  }

  addOneItem() {
    const item: CartItem = { id: String(this.idSeed), movie: {name: `item ${this.idSeed}`}};
    this.idSeed++;
    this.store.dispatch(cartAddItem({ item }));
  }

  removeItem(id: string) {
    this.store.dispatch(cartDeleteItem({ itemId: id }));
  }

  clearCart() {
    // this.store.dispatch(cartClear());
  }
}

