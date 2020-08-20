const mutations = {
  setVisibleProperties({ visibleProperties }, { from, to }) {
    this.state.visibleProperties = {
      from,
      to,
    };

    if (this.state.filteredProducts.length) {
      this.state.visibleProducts = this.state.filteredProducts.slice(from, to);
    } else {
      this.state.visibleProducts = this.state.products.slice(from, to);
    }

    return visibleProperties;
  },

  handleFilterProducts({ filterProperties }, { key, val, type }) {
    switch (type) {
      case "SEARCH":
        this.state.filterProperties = {
          ...this.state.filterProperties,
          [key]: val,
        };
        break;

      case "INPUT":
        this.state.filterProperties = {
          ...this.state.filterProperties,
          price: {
            ...this.state.filterProperties.price,
            [key]: Number(val),
          },
        };
        break;

      case "CHECKBOX":
        if (!this.state.filterProperties[key].includes(val)) {
          this.state.filterProperties = {
            ...this.state.filterProperties,
            [key]: [...this.state.filterProperties[key], val],
          };
        } else {
          this.state.filterProperties = {
            ...this.state.filterProperties,
            [key]: this.state.filterProperties[key].filter(
              (color) => color !== val
            ),
          };
        }
        break;

      default:
        console.log(filterProperties);
    }

    this.state.filterActive = false;

    for (let key in this.state.filterProperties) {
      console.log(key, this.state.filterProperties[key]);

      if (
        this.state.filterProperties[key] &&
        !(this.state.filterProperties[key] instanceof Object) &&
        !this.state.filterActive
      )
        this.state.filterActive = true;
      if (
        Array.isArray(this.state.filterProperties[key]) &&
        this.state.filterProperties[key].length &&
        !this.state.filterActive
      ) {
        this.state.filterActive = true;
      }
      if (
        this.state.filterProperties[key] instanceof Object &&
        !this.state.filterActive
      ) {
        for (const [a] of Object.entries(this.state.filterProperties[key])) {
          if (this.state.filterProperties[key][a] > 0)
            this.state.filterActive = true;
        }
      }
    }

    const newList = [];

    this.state.products.map((product) => {
      let productIsValid = true;
      if (this.state.filterProperties.name) {
        if (
          productIsValid &&
          this.state.filterProperties.name.trim().length >= 3 &&
          (product.name
            .toLowerCase()
            .includes(this.state.filterProperties.name.toLowerCase()) ||
            product.model
              .toLowerCase()
              .includes(this.state.filterProperties.name.toLowerCase()))
        )
          newList.push(product);
        else {
          productIsValid = false;
          newList.filter((item) => item.id !== product.id);
        }
      }

      if (this.state.filterProperties.brand) {
        if (
          productIsValid &&
          product.brand === this.state.filterProperties.brand
        )
          newList.includes(product) ? null : newList.push(product);
        else {
          productIsValid = false;
          newList.filter((item) => item.id !== product.id);
        }
      }
    });

    // this.state.products.map((product) => {
    //   let validProduct = true;

    //   if (
    //     this.state.filterProperties.name &&
    //     this.state.filterProperties.name.trim().length >= 3 &&
    //     (product.name
    //       .toLowerCase()
    //       .includes(this.state.filterProperties.name.toLowerCase()) ||
    //       product.model
    //         .toLowerCase()
    //         .includes(this.state.filterProperties.name.toLowerCase()))
    //   )
    //     validProduct = true;
    //   else return;

    //   if (
    //     this.state.filterProperties.brand &&
    //     product.brand === this.state.filterProperties.brand
    //   )
    //     validProduct = true;
    //   else return;

    //   if (validProduct) newList.push(product);
    // });

    this.state.filteredProducts = newList;
    // console.log(newList);
  },

  // handleFilterPriceProducts({ filterProperties }, { key, val }) {
  //   console.log("handle", filterProperties);

  //   this.state.filterProperties = {
  //     ...this.state.filterProperties,
  //     price: {
  //       ...this.state.filterProperties.price,
  //       [key]: Number(val),
  //     },
  //   };

  //   for (let key in this.state.filterProperties) {
  //     console.log(key, this.state.filterProperties[key]);
  //   }
  // },

  // deleteBook({ books }, id) {
  //   const newBooks = books.filter((book) => book.id !== id);
  //   this.state.books = newBooks;
  // },
};

export default mutations;