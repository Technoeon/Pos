import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    test: 'data ffff',
    userData: null,
    products: [],
    shoppingCart:[]
  },
  mutations: {
    SET_USER_DATA(state, payload) {
      state.userData = payload
    },
    SET_PRODUCTS(state, payload) {
      state.products = payload
    },
    SET_TO_CART (state, payload) {
      let prodExist = state.shoppingCart.find(prod => prod.id === payload.id)
      if (!prodExist) {
        payload.price = parseInt(payload.qty) * parseInt(payload.price)
        payload.vat_amount = parseInt(payload.qty) * parseInt(payload.vat_amount)
        state.shoppingCart.push(payload)
      } else {
        prodExist.qty++
        prodExist.price = parseInt(prodExist.qty) * parseInt(prodExist.price)
        payload.vat_amount = parseInt(payload.qty) * parseInt(payload.vat_amount)
      }
    }
  },
  actions: {
    loadUserData ({ commit }, payload) {
      commit('SET_USER_DATA', payload)
    },
    loadProduct ({ commit }, payload) {
      commit('SET_PRODUCTS', payload)
    },
    async addToCart ({ commit }, payload) {
      await commit('SET_TO_CART', payload)
    },
    logout (state) {
      state.userData = null
      state.shoppingCart = []
      window.localStorage.clear()
    },

  },
  getters: {
    test (state) {
      return state.test
    },
    userData (state) {
      return state.userData
    },
    products (state) {
      return state.products
    },
    shoppingCart (state) {
      return state.shoppingCart
    },
    subTotal (state) {
      return state.shoppingCart.reduce((a, b) => a + (parseInt(b['price']) || 0), 0)
    },
    vat (state) {
      return state.shoppingCart.reduce((a, b) => a + (parseInt(b['vat_amount']) || 0), 0)
    },
    total (state) {
      let subtotal = state.shoppingCart.reduce((a, b) => a + (parseInt(b['price']) || 0), 0)
      let vat = state.shoppingCart.reduce((a, b) => a + (parseInt(b['vat_amount']) || 0), 0)
      let total = subtotal + vat
      return total
    }
  }
})