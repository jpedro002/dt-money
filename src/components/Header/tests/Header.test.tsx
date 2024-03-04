import { render } from '@testing-library/react'
import { Header } from '../Header'
import {
  TransactionsContext,
  TransactionsContextData,
} from '@/contexts/transactionsContexts'

const renderHeader = () => {
  return render(
    <TransactionsContext.Provider
      value={{} as unknown as TransactionsContextData}
    >
      <Header />
    </TransactionsContext.Provider>,
  )
}

test('renders the header component', () => {
  const { getByText } = renderHeader()

  const title = getByText('DT Money')
  expect(title).toBeVisible()
})
