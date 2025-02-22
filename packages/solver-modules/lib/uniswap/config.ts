import { Config } from "./types";

// Deployment Addresses for Each Chain
export const CHAIN_CONFIG: Record<string, Config> = {
  sepolia: {
    chainId: 11155111,
    rpcUrl: "https://ethereum-sepolia-rpc.publicnode.com",
    // rpcUrl: "https://eth-sepolia.g.alchemy.com/v2/T4jNrT9xqgER8lbHbkHNY9hd5MkGwncj",
    poolFactory: "0x0227628f3F023bb0B980b67D528571c95c6DaC1c",
    quoter: "0xEd1f6473345F45b75F8179591dd5bA1888cf2FB3",
    swapRouter: "0x3bFA4769FB09eefC5a80d6E87c3B9C650f7Ae48E",
    explorerUrl: "https://sepolia.etherscan.io/tx",
  },
  baseSepolia: {
    chainId: 84532,
    rpcUrl: "https://sepolia.base.org",
    poolFactory: "0x4752ba5DBc23f44D87826276BF6Fd6b1C372aD24",
    quoter: "0xC5290058841028F1614F3A6F0F5816cAd0df5E27",
    swapRouter: "0x94cC0AaC535CCDB3C01d6787D6413C739ae12bc4",
    explorerUrl: "https://sepolia.basescan.org/tx",
  },
  arbitrumSepolia: {
    chainId: 421614,
    rpcUrl: "https://arbitrum-sepolia-rpc.publicnode.com",
    poolFactory: "0x248AB79Bbb9bC29bB72f7Cd42F17e054Fc40188e",
    quoter: "0x2779a0CC1c3e0E44D2542EC3e79e3864Ae93Ef0B",
    swapRouter: "0x101F443B4d1b059569D643917553c771E1b9663E",
    explorerUrl: "https://sepolia.arbiscan.io/tx",
  },
  optimismSepolia: {
    chainId: 11155420,
    rpcUrl: "https://optimism-sepolia-rpc.publicnode.com",
    poolFactory: "0x4752ba5DBc23f44D87826276BF6Fd6b1C372aD24",
    quoter: "0xC5290058841028F1614F3A6F0F5816cAd0df5E27",
    swapRouter: "0x94cC0AaC535CCDB3C01d6787D6413C739ae12bc4",
    explorerUrl: "https://sepolia-optimism.etherscan.io/tx",
  },
  polygonMumbai: {
    chainId: 80001,
    rpcUrl: "https://polygon-mumbai-rpc.publicnode.com",
    poolFactory: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
    quoter: "0x61fFE014bA17989E743c5F6cB21bF9697530B21e",
    swapRouter: "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45",
    explorerUrl: "https://mumbai.polygonscan.com/tx",
  },
  bscTestnet: {
    chainId: 97,
    rpcUrl: "https://bsc-testnet-rpc.publicnode.com",
    poolFactory: "0xdB1d10011AD0Ff90774D0C6Bb92e5C5c8b4461F7",
    quoter: "0x78D78E420Da98ad378D7799bE8f4AF69033EB077",
    swapRouter: "0x9a489505a00cE272eAa5e07Dba6491314CaE3796",
    explorerUrl: "https://testnet.bscscan.com/tx",
  },
  avalancheCChain: {
    chainId: 43114, // Avalanche C-Chain Mainnet
    rpcUrl: "https://api.avax.network/ext/bc/C/rpc",
    poolFactory: "0x740b1c1de25031C31FF4fC9A62f554A55cdC1baD", // Uniswap V3 Pool Factory
    quoter: "0xbe0F5544EC67e9B3b2D979aaA43f18Fd87E6257F", // Uniswap V3 Quoter
    swapRouter: "0xbb00FF08d01D300023C629E8fFfFcb65A5a578cE", // Uniswap V3 Swap Router
    explorerUrl: "https://snowtrace.io/tx",
  },
  // arbitrumSepolia: {
  //     chainId: 421614,
  //     rpcUrl: "https://arbitrum-sepolia-rpc.publicnode.com",
  //     poolFactory: '0x4893376342d5D7b3e31d4184c08b265e5aB2A3f6',
  //     quoter: '0x1d92da0e8D33c925277C3050bF5B90160Cb0b94a',
  //     swapRouter: '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45',
  //     explorerUrl: "https://sepolia.arbiscan.io/tx",
  // },
  // optimismSepolia: {
  //     chainId: 11155420,
  //     rpcUrl: "https://optimism-sepolia-rpc.publicnode.com",
  //     poolFactory: '0x1F98431c8aD98523631AE4a59f267346ea31F984',
  //     quoter: '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6',
  //     swapRouter: '0xE592427A0AEce92De3Edee1F18E0157C05861564',
  //     explorerUrl: "https://sepolia-optimism.etherscan.io/tx",
  // },
  // polygonMumbai: {
  //     chainId: 80001,
  //     rpcUrl: "https://polygon-mumbai-rpc.publicnode.com",
  //     poolFactory: '0x1F98431c8aD98523631AE4a59f267346ea31F984',
  //     quoter: '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6',
  //     swapRouter: '0xE592427A0AEce92De3Edee1F18E0157C05861564',
  //     explorerUrl: "https://mumbai.polygonscan.com/tx",
  // },
  // bscTestnet: {
  //     chainId: 97,
  //     rpcUrl: "https://bsc-testnet-rpc.publicnode.com",
  //     poolFactory: '0xdB1d10011AD0Ff90774D0C6Bb92e5C5c8b4461F7',
  //     quoter: '0x78D78E420Da98ad378D7799bE8f4AF69033EB077',
  //     swapRouter: '0x9a489505a00cE272eAa5e07Dba6491314CaE3796',
  //     explorerUrl: "https://testnet.bscscan.com/tx",
  // },
};

export const DEPRECATED_CHAIN_CONFIG: Record<string, Config> = {};
