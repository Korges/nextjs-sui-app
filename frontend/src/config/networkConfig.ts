import { getFullnodeUrl } from "@mysten/sui/client";

const networkConfig = {
    testnet: { url: getFullnodeUrl('testnet') },
    localnet: { url: getFullnodeUrl('localnet') },
    devnet: { url: getFullnodeUrl('devnet') },
    mainnet: { url: getFullnodeUrl('mainnet') },
};

export { networkConfig };