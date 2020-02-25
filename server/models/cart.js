class Cart {
  constructor() {
    this.items = [];
    this.totalQuantity = 0;
    this.totalPrice = 0;
  }

  setCart(items = []) {
    this.items = items;
    this.totalCalculation();
    return this;
  }

  get data() {
    return {
      cart: this.items,
      totalPrice: this.totalPrice,
      totalQuantity: this.totalQuantity
    };
  }

  totalCalculation() {
    this.totalPrice = this.items.reduce((a, c) => a + c.price * c.quantity, 0);
    this.totalQuantity = this.items.reduce((a, c) => a + c.quantity, 0);
  }

  checkItemQuantity(quantity) {
    return quantity >= 10 ? 10 : quantity;
  }

  add(item) {
    const existsIdx = this.items.findIndex(({ sku }) => item.sku === sku);

    if (existsIdx > -1) {
      const existsItem = this.items[existsIdx];

      this.items.splice(existsIdx, 1, {
        ...existsItem,
        quantity: this.checkItemQuantity(existsItem.quantity + item.quantity)
      });
    } else {
      this.items = this.items.concat({
        ...item,
        quantity: this.checkItemQuantity(item.quantity)
      });
    }
    this.totalCalculation();
  }

  delete(skuId) {
    this.items = this.items.filter(({ sku }) => sku !== skuId);
    this.totalCalculation();
  }

  update(restUpdate, skuId) {
    const existsIdx = this.items.findIndex(({ sku }) => skuId === sku);
    if (existsIdx > -1) {
      const existsItem = this.items[existsIdx];

      this.items.splice(existsIdx, 1, {
        ...existsItem,
        ...restUpdate,
        quantity: this.checkItemQuantity(restUpdate.quantity)
      });
    }
    this.totalCalculation();
  }
}

module.exports = new Cart();
