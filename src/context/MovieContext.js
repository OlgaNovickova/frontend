import { createContext, useReducer } from 'react'

export const MovieContext = createContext()

export const movieReducer = (state, action) => {
	switch (action.type) {
		case 'SET_MOVIES':
			return { filmai: action.payload }
		case 'CREATE_MOVIE':
			return { filmai: [action.payload, ...state.filmai] }
		default:
			return state
		case 'UPDATE_MOVIE':
			return { filmai: action.payload }
		case 'DELETE_MOVIE':
			return {
				filmai: state.filmai.filter(
					filmas => filmas._id !== action.payload._id
				),
			}
	}
}

export const MovieContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(movieReducer, {
		filmai: null,
	})

	return (
		<MovieContext.Provider value={{ ...state, dispatch }}>
			{children}
		</MovieContext.Provider>
	)
}
