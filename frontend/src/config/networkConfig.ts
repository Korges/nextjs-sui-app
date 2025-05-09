import { TESTNET_DASHBOARD_ID, TESTNET_PACKAGE_ID } from "@/constants";
import { createNetworkConfig } from "@mysten/dapp-kit";
import { getFullnodeUrl } from "@mysten/sui/client";

const { networkConfig, useNetworkVariable } = createNetworkConfig({
  testnet: {
    url: getFullnodeUrl("testnet"),
    variables: {
      dashboardId: TESTNET_DASHBOARD_ID,
      packageId: TESTNET_PACKAGE_ID,
    },
  },
  localnet: {
    url: getFullnodeUrl("localnet"),
    variables: {
      dashboardId: TESTNET_DASHBOARD_ID,
      packageId: TESTNET_PACKAGE_ID,
    },
  },
  devnet: {
    url: getFullnodeUrl("devnet"),
    variables: {
      dashboardId: TESTNET_DASHBOARD_ID,
      packageId: TESTNET_PACKAGE_ID,
    },
  },
  mainnet: {
    url: getFullnodeUrl("mainnet"),
    variables: {
      dashboardId: TESTNET_DASHBOARD_ID,
      packageId: TESTNET_PACKAGE_ID,
    },
  },
});

export { networkConfig, useNetworkVariable };
