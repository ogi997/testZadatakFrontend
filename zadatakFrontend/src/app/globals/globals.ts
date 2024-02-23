import {Component, EventEmitter, Injectable, Input, OnInit, Output} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private userData: boolean | undefined;
  userDataChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  private loadingSupplyProduct: boolean = false;
  loadingSupplyProductDataChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  getUserData(): boolean | undefined {
    return this.userData;
  }

  setUserData(value: boolean | undefined): void {
    this.userData = value;
    this.userDataChanged.emit(value);
  }

  getLoadingSupplyProduct(): boolean {
    return this.loadingSupplyProduct;
  }

  setLoadingSupplyProduct(value: boolean):void {
    this.loadingSupplyProduct = value;
    this.loadingSupplyProductDataChanged.emit(value);
  }
}