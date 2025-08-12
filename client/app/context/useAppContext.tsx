import { useContext } from "react"
import { AppContext } from "./ContextDefination"


export const useAppContext = () => {
  return useContext(AppContext)
}