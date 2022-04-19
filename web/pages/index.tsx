import { Section1 } from '../views/landing'

export async function getStaticProps() {
  return {
    props: {
      column: 1,
    },
  }
}

export default function Index() {
  return (
    <>
      <Section1 />
      <div>Section 2</div>
    </>
  )
}
