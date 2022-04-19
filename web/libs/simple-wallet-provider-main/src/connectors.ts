/*
 * Thanks Uniswap ❤️🦄
 * https://github.com/Uniswap/uniswap-interface/blob/master/src/connectors/index.ts
 */

import { AbstractConnector } from "@web3-react/abstract-connector";
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { WalletLinkConnector } from 'wagmi/connectors/walletLink';
import { LAST_CONNECTOR_KEY } from "./constants";
import { ConnectorType } from "./types";

export function getConnectorType(connector: AbstractConnector) {
  if (connector instanceof WalletConnectConnector) {
    return ConnectorType.WALLETCONNECT;
  }
  if (connector instanceof WalletLinkConnector) {
    return ConnectorType.WALLETLINK;
  }
  return ConnectorType.INJECTED;
}


export function setLastConnectorType(connector?: AbstractConnector) {
  const connectorType = connector ? getConnectorType(connector) : undefined;
  if (!connectorType) {
    sessionStorage.removeItem(LAST_CONNECTOR_KEY);
    return;
  }

  return sessionStorage.setItem(LAST_CONNECTOR_KEY, connectorType);
}
