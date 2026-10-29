
import { Front } from './frontpage'
import { Sign } from './signup'
import { Login } from './login'
import { Cart } from "./allcart"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from '@stripe/react-stripe-js'
import { Routes, Route } from 'react-router-dom'
import { Dashboard } from './dashboard'
import { Shop } from './shop'
import { Layout } from './layout'

const stripepromise = loadStripe("pk_test_51U2sPe1UEJSS0C3EPEOhNUv81WyMrtw2CdPWiWhhLqNSj70a1REx40CnXpakceCt9MjiuunRg5OHK0U6XuJeOo8C009uOg1Qhu")
function App() {


  return (
    <>

      <Elements stripe={stripepromise}>
        <Routes>

          <Route element={<Layout />}>
            <Route path='/' element={<Front />}></Route>
            <Route path='/shop' element={<Shop />}></Route>
          </Route>


          <Route path='/sign' element={<Sign />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path='dashboard' element={<Dashboard />}></Route>

        </Routes>
      </Elements>
    </>
  )
}

export default App
