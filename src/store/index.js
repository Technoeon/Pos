import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export const store = new Vuex.Store({
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
      payload.qty = 1
      payload.subprice = parseFloat(payload.price)
      payload.subvat = parseFloat(payload.vat_amount)
      state.shoppingCart.push(payload)
    },
    SET_TO_EXIST_CART (state, payload) {
      const prodExist = state.shoppingCart.find(prod => parseInt(prod.id) === parseInt(payload.id))
      prodExist.qty++
      prodExist.subprice = parseFloat(payload.price) * prodExist.qty
      prodExist.subvat = parseFloat(payload.vat_amount) * prodExist.qty
      prodExist.selected = true
    },
    SET_UNSELECT (state) {
      state.shoppingCart.map(cart=> {
        cart.selected = false
        return cart
      })
    },
    SET_SELECT (state, payload) {
      state.shoppingCart.find(cart=> cart.id === payload).selected = true
    },
    UPDATE_CART ( state, payload) {
      const prodExist = state.shoppingCart.find(cart=> cart.selected === true)
      prodExist.qty = payload
      prodExist.subprice = parseFloat(prodExist.price) * prodExist.qty
      prodExist.subvat = parseFloat(prodExist.vat_amount) * prodExist.qty
    }
  },
  actions: {
    loadUserData ({ commit }, payload) {
      commit('SET_USER_DATA', payload)
    },
    loadProduct ({ commit }, payload) {
      commit('SET_PRODUCTS', payload)
    },
    async addToCart ({ commit, state }, payload) {
      await commit('SET_UNSELECT')
      const isExist = state.shoppingCart.find(sp => sp.id === payload.id)
      if (!isExist) {
        commit('SET_TO_CART', payload)
      } else {
        commit('SET_TO_EXIST_CART', payload)
      }
    },
    logout ({state}) {
      state.userData = null
      state.shoppingCart = []
      window.localStorage.clear()
    },
    clearCart ({state}) {
      state.shoppingCart = []
    },
    async selectCart ({commit},payload) {
      await commit('SET_UNSELECT')
      commit('SET_SELECT', payload)
    },
    updateCartQuantity ({commit}, payload ) {
      commit('UPDATE_CART', payload)
    },
    setItemZero ({ state }) {
      const itemzero = state.shoppingCart.find(sp => sp.selected === true)
      state.shoppingCart.splice(state.shoppingCart.indexOf(itemzero), 1)
    }
  },
  getters: {
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
      return state.shoppingCart.reduce((a, b) => a + (parseInt(b['subprice']) || 0), 0)
    },
    vat (state) {
      return state.shoppingCart.reduce((a, b) => a + (parseInt(b['subvat']) || 0), 0)
    },
    total (state) {
      let subtotal = state.shoppingCart.reduce((a, b) => a + (parseInt(b['subprice']) || 0), 0)
      let vat = state.shoppingCart.reduce((a, b) => a + (parseInt(b['subvat']) || 0), 0)
      let total = subtotal + vat
      return total
    }
  },
  plugins: [createPersistedState({storage: window.localStorage})]
})