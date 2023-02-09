import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'
const { persistAtom } = recoilPersist()
import { AccountType } from '@/types/index'

export const accountState = atom<AccountType>({
  key: 'accountState',
  default: {
    address: '',
    balanceDecimals: 0,
    balanceFormatted: '',
    balanceSymbol: '',
    displayBalance: '',
    displayName: '',
    hasPendingTransactions: false,
  },
  effects_UNSTABLE: [persistAtom],
})
