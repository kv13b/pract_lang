import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './store/index.js'
import Home from './pages/Home.jsx'
import Cart from './pages/Cart.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import WishList from './pages/WishList.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>, 
    children: [
      {
        path: '/',
        element: <Home/>,
      },
      {
        path: '/cart',
        element: <Cart/>,
      },
      {
        path:'/wish',
        element:<WishList/>
      }
    ],
  },
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
       <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
