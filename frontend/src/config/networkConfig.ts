import { TESTNET_DASHBOARD_ID } from "@/constants";
import { createNetworkConfig } from "@mysten/dapp-kit";
import { getFullnodeUrl } from "@mysten/sui/client";

const { networkConfig, useNetworkVariable } = createNetworkConfig({
  testnet: {
    url: getFullnodeUrl("testnet"),
    variables: {
      dashboardId: TESTNET_DASHBOARD_ID,
    },
  },
  localnet: {
    url: getFullnodeUrl("localnet"),
    variables: {
      dashboardId: TESTNET_DASHBOARD_ID,
    },
  },
  devnet: {
    url: getFullnodeUrl("devnet"),
    variables: {
      dashboardId: TESTNET_DASHBOARD_ID,
    },
  },
  mainnet: {
    url: getFullnodeUrl("mainnet"),
    variables: {
      dashboardId: TESTNET_DASHBOARD_ID,
    },
  },
});

export { networkConfig, useNetworkVariable };
