import { GET_SEARCH_ID, GET_TICKETS, SHOW_TICKETS } from '../actions/ticketsAction'

const defaultStore = {
  tickets: [],
  updatedTickets: [],
  stop: false,
  searchId: '',
  ticketsToShow: 5,
}

function ticketsReducer(state = defaultStore, action = {}) {
  switch (action.type) {
    case GET_SEARCH_ID:
      return {
        ...state,
        searchId: action.searchId,
      }

    case GET_TICKETS:
      return {
        ...state,
        tickets: [...state.tickets, ...action.tickets],
        stop: action.stop,
      }

    case SHOW_TICKETS:
      return {
        ...state,
        ticketsToShow: state.ticketsToShow + 5,
      }

    default:
      return state
  }
}

export default ticketsReducer
