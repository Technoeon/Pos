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
      state.shoppingCart.push(payload)
     // console.log('cart',state.shoppingCart)
      // console.log('cart',prodExist)
    },
    async SET_TO_EXIST_CART (state, payload) {
      const prodExist = await state.shoppingCart.find(prod => prod.id === payload.id)
      prodExist.qty++
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
      state.shoppingCart.find(cart=> cart.selected === true).qty = payload
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
        await commit('SET_TO_CART', payload)
      } else {
        await commit('SET_TO_EXIST_CART', payload)
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
      await commit('SET_SELECT', payload)
    },
    updateCartQuantity ({commit}, payload ) {
      commit('UPDATE_CART', payload)
    }
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