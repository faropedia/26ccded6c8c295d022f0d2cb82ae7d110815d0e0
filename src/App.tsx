import { useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import Moment from 'moment'
import { extendMoment } from 'moment-range'
import { AppHeader } from './components/AppHeader'
import { CardList } from './components/CardList'
import { AppFooter } from './components/AppFooter'

const dummyLists = [
  {
    title: 'Aneka Cireng Frozen',
    img: require('./assets/images/Aneka Cireng Frozen.jpg').default
  },
  {
    title: 'Ayam Goreng Serai',
    img: require('./assets/images/Ayam Goreng Serai.jpg').default
  },
  {
    title: 'Bunling, Kulit Ayam Krispy d130gr',
    img: require('./assets/images/Bundling, Kulit Ayam Krispy 130gr.jpeg').default
  },
  {
    title: 'Holycow Steak Set Wagyu Tenderloin',
    img: require('./assets/images/Holycow Steak Set Wagyu Tenderloin.jpg').default
  },
]

const moment = extendMoment(Moment as any)

const dateRanges = (): DateRange[] => {
  const range = moment.range(moment().add(1, 'days'), moment().add(30, 'days'))

  return Array.from(range.by('day')).map(x => {
    return {
      ddd: x.format('ddd'),
      DD: x.format('DD')
    }
  })
}

const tomorrow = moment().add(1, 'days').format('dddd, DD MMMM YYYY')

const AppMain = styled.main`
  ${tw`pt-56 pb-24 px-4 text-gray-600`}
  h2 {
    ${tw`text-lg leading-6 font-medium mb-4`}
  }
`

function App () {
  const [carts, setCarts] = useState<Cart[]>([])

  const addCart = (price: number) => {
    const newCart = {
      price
    }
    const newCarts = [...carts, newCart]
    setCarts(newCarts)
  }

  return (
    <>
      <AppHeader dateRanges={dateRanges()}></AppHeader>
      <AppMain>
        <div><h2>{tomorrow}</h2></div>
        <CardList lists={dummyLists} addCart={addCart}></CardList>
      </AppMain>
      <AppFooter carts={carts}></AppFooter>
    </>
  )
}

export default App
