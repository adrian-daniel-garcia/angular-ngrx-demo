import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs';
import { CartItem } from '../cart.model';
import { CartService } from '../cart.service';
import { cartAddItem, cartDeleteItem, cartSetContent } from './cart.actions';

@Injectable()
export class CartEffects {

  constructor(
    private actions: Actions,
    private cartService: CartService
  ) {}

  cartAddItem$ = createEffect(() =>
    this.actions.pipe(
      ofType(cartAddItem),
      switchMap(action => this.cartService.addMovie(action.item)),
      map(data => cartSetContent({items: data.cartContent as CartItem[]}))
    )
  );

  cartDeleteItem$ = createEffect(() =>
  this.actions.pipe(
    ofType(cartDeleteItem),
    switchMap(action => this.cartService.removeMovie(action.itemId)),
    map(data => cartSetContent({items: data.cartContent as CartItem[]}))
  )
);
}
