import {MovieContext} from "../context/MovieContext"
import {useContext} from "react"

export const useMovieContext = () => {
  const context = useContext(MovieContext)
  if(!context) {
    throw Error('useMovieContext turi būti MovieContextProvider viduje')
  }
  return context
}