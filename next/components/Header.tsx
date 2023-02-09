import { useState } from 'react'
import {
  createStyles,
  Header,
  Container,
  Group,
  Burger,
  Paper,
  Transition,
  Button,
  Text,
  Autocomplete,
  Box,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useWeb3React } from '@web3-react/core'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useRecoilState } from 'recoil'
import { AccountType } from '@/types'
import { accountState } from '@/states/index'
import SubHeader from '@/components/SubHeader'
import Link from 'next/link'
import { useRouter } from 'next/router'

const HEADER_HEIGHT = 60

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    zIndex: 1,
  },

  dropdown: {
    position: 'absolute',
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },

    [theme.fn.smallerThan('sm')]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },

  search: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },
}))

interface HeaderResponsiveProps {
  links: { link: string; label: string }[]
}

export default function HeaderResponsive({ links }: HeaderResponsiveProps) {
  const router = useRouter()
  const [opened, { toggle, close }] = useDisclosure(false)
  const [active, setActive] = useState(links[0].link)
  const { classes, cx } = useStyles()
  const [accountData, setAccountData] = useRecoilState<AccountType>(accountState)

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={cx(classes.link, { [classes.linkActive]: active === link.link })}
      onClick={(event) => {
        event.preventDefault()
        setActive(link.link)
        close()
      }}
    >
      {link.label}
    </a>
  ))

  const CustomConnectButton = () => {
    return (
      <ConnectButton.Custom>
        {({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
          if (account !== undefined && accountData.address === '') {
            console.log(account)
            setAccountData(account)
          }

          return (
            <div
              {...(!mounted && {
                'aria-hidden': true,
                style: {
                  opacity: 0,
                  pointerEvents: 'none',
                  userSelect: 'none',
                },
              })}
            >
              {(() => {
                if (!mounted || !account || !chain) {
                  return (
                    <Button color="dark" ml="md" onClick={openConnectModal}>
                      Connect Wallet
                    </Button>
                  )
                }

                if (chain.unsupported) {
                  return (
                    <button onClick={openChainModal} type="button">
                      Wrong network
                    </button>
                  )
                }

                return (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button color="dark" ml="md" onClick={openChainModal}>
                      {chain.hasIcon && (
                        <div
                          style={{
                            background: chain.iconBackground,
                            width: 12,
                            height: 12,
                            borderRadius: 999,
                            overflow: 'hidden',
                            marginRight: 4,
                          }}
                        >
                          {chain.iconUrl && (
                            <img
                              alt={chain.name ?? 'Chain icon'}
                              src={chain.iconUrl}
                              style={{ width: 12, height: 12 }}
                            />
                          )}
                        </div>
                      )}
                      {chain.name}
                    </Button>
                    <Button color="dark" ml="md" onClick={openAccountModal}>
                      {account.displayName}
                      {account.displayBalance ? ` (${account.displayBalance})` : ''}
                    </Button>
                    {/* <Text color="gray" size="sm" pl="md">
                      {account.address}
                    </Text> */}
                  </Box>
                )
              })()}
            </div>
          )
        }}
      </ConnectButton.Custom>
    )
  }

  return (
    <Header height={HEADER_HEIGHT} mb={80} className={classes.root}>
      <Container className={classes.header}>
        <Text weight="bold" sx={{ cursor: 'pointer' }} onClick={() => router.push('/')}>
          Fermented Blockchain
        </Text>
        <Group spacing={5} className={classes.links}>
          {items}
          <Autocomplete
            className={classes.search}
            placeholder="Search"
            data={['React', 'Angular', 'Vue', 'Next.js', 'Riot.js', 'Svelte', 'Blitz.js']}
          />
          {/* <Button color="dark" ml="md" onClick={handleConnectWallet}>
            Connect Wallet
          </Button> */}
          <CustomConnectButton />
        </Group>

        <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />

        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items}
            </Paper>
          )}
        </Transition>
      </Container>
      {/* <Container py="md" px={0}>
        <SubHeader />
      </Container> */}
    </Header>
  )
}
