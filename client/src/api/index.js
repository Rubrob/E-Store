import axios from "axios";

export default {
  products: {
    getProduct: async (category_slug = "") => await axios.get(`/api/products/t/${category_slug}`),
    getSuggestions: async (search_str = "") => await axios.get(`/api/products/suggestions/${search_str}`),
    validateCart: async () => await axios.post(`/api/products/validate_cart`, null, { timeout: 2000 }),
    getProducts: async (category_slug = "", params = {}) =>
      await axios.get(`/api/products/m/${category_slug}`, { params }),
    checkout: async (tokenHeader, data) =>
      await axios.post("/api/products/orders", data, {
        headers: { ...tokenHeader }
      }),
    addToCart: async data => await axios.post(`/api/products/add_to_cart`, data),
    updateCartItem: async (data, sku) => await axios.post(`/api/products/update_cart_item/${sku}`, data),
    deleteCartItem: async sku => await axios.post(`/api/products/delete_cart_item/${sku}`)
  },

  auth: {
    logIn: async data => await axios.post("/api/users/login", data),
    signUp: async data => await axios.post("/api/users/signup", data),
    oauthThirdParty: async (party, access_token) => await axios.post(`/api/users/oauth/${party}`, { access_token }),
    updateUserAddresses: async (tokenHeader, data) =>
      await axios.put("/api/users/user", data, {
        headers: { ...tokenHeader }
      }),
    getUser: async tokenHeader =>
      await axios.get("/api/users/user", {
        headers: { ...tokenHeader }
      }),
    getUserOrders: async tokenHeader =>
      await axios.get("/api/users/orders", {
        headers: { ...tokenHeader }
      })
  }
};
