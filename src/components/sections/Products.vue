<template>
  <section v-if="products.length" class="products">
    <SectionHeader title="Products" sorting />
    <ProductsList
      :products="this.products"
      :filteredProducts="this.filteredProducts"
      :filterActive="this.filterActive"
    />
    <Pagination
      :productsQuantity="this.products.length"
      :filteredQuantity="this.filteredProducts.length"
      :filterActive="this.filterActive"
    />
  </section>
</template>

<script>
import SectionHeader from "../shared/SectionHeader.vue";
import ProductsList from "../products/ProductsList.vue";
import Pagination from "../products/Pagination.vue";

import { mapState } from "vuex";

export default {
  name: "Products",
  components: {
    SectionHeader,
    ProductsList,
    Pagination,
  },
  computed: mapState([
    "products",
    "visibleProducts",
    "filteredProducts",
    "filterActive",
  ]),
};
</script>
