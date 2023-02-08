import Header from '@/components/Header'
import HeaderLinks from '@/data/header'

type Props = {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Header links={HeaderLinks} />
      {children}
    </>
  )
}
