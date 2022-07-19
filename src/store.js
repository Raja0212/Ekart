import { createStore } from 'redux'

const initialState = {
  cartData : []
}

function reducer(state = initialState,action){
  console.log('act',action,state)
  switch(action.type){
    case 'HANDLE_CART':
      return {
        cartData : action.cartData
      }
    default:
      return state
  }
}


const store = createStore(reducer)

export default store