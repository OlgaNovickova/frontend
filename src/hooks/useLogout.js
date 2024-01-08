import { useAuthContext } from "./useAuthContext";
import { useMovieContext } from "./useMovieContext";

export const useLogout = () => {
  const {dispatch} = useAuthContext()
  const {dispatch: filmoDispatch} = useMovieContext()

  const logout = () => {
    localStorage.removeItem('user')

    dispatch({type: 'LOGOUT'})
    filmoDispatch({type: 'SET_MOVIES', payload: null})
  }
  return {logout}
}