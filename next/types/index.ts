export type AccountType = {
  address: string
  balanceDecimals?: number | undefined
  balanceFormatted?: string | undefined
  balanceSymbol?: string | undefined
  displayBalance?: string | undefined
  displayName: string
  ensAvatar?: string | undefined
  ensName?: string | undefined
  hasPendingTransactions: boolean
}
