import { Provider } from "react-redux"
import { AppRouter } from "./routers/AppRouter"
import { store } from "./store"


export const ControlEscolarApp = () => {
  return (
    <Provider store={ store }>
      <AppRouter/>
    </Provider>
    
  )
}
