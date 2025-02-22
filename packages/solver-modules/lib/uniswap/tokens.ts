// Token Configuration for Each Chain
export const TOKENS = {
  sepolia: [
    {
      chainId: 11155111,
      address: "0x0000000000000000000000000000000000000000", // Native ETH
      decimals: 18,
      symbol: "ETH",
      name: "Ether",
      isToken: false,
      isNative: true,
      wrapped: false,
    },
    {
      chainId: 11155111,
      address: "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14", // WETH
      decimals: 18,
      symbol: "WETH",
      name: "Wrapped Ether",
      isToken: true,
      isNative: false,
      wrapped: true,
    },
    {
      chainId: 11155111,
      address: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238", // USDC
      decimals: 6,
      symbol: "USDC",
      name: "USD Coin",
      isToken: true,
      isNative: false,
      wrapped: false,
    },
    {
      chainId: 11155111,
      address: "0x08210f9170f89ab7658f0b5e3ff39b0e03c594d4", // Native ETH
      decimals: 6,
      symbol: "EURC",
      name: "EUR Coin",
      isToken: false,
      isNative: true,
      wrapped: false,
    },
    {
      chainId: 11155111,
      address: "0x68194a729C2450ad26072b3D33ADaCbcef39D574", // DAI
      decimals: 18,
      symbol: "DAI",
      name: "Dai Stablecoin",
      isToken: true,
      isNative: false,
      wrapped: false,
    },
    {
      chainId: 11155111,
      address: "0x779877A7B0D9E8603169DdbD7836e478b4624789", // LINK
      decimals: 18,
      symbol: "LINK",
      name: "Chainlink",
      isToken: true,
      isNative: false,
      wrapped: false,
    },
  ],
  baseSepolia: [
    {
      chainId: 84532, // Base Sepolia Chain ID
      address: "0x0000000000000000000000000000000000000000", // Native ETH
      decimals: 18,
      symbol: "ETH",
      name: "Ether",
      isToken: false,
      isNative: true,
      wrapped: false,
    },
    {
      chainId: 84532,
      address: "0x4200000000000000000000000000000000000006", // WETH
      decimals: 18,
      symbol: "WETH",
      name: "Wrapped Ether",
      isToken: true,
      isNative: false,
      wrapped: true,
    },
    {
      chainId: 84532,
      address: "0x036CbD53842c5426634e7929541eC2318f3dCF7e", // USDC
      decimals: 6,
      symbol: "USDC",
      name: "USD Coin",
      isToken: true,
      isNative: false,
      wrapped: false,
    },
    {
      chainId: 84532,
      address: "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb", // DAI
      decimals: 18,
      symbol: "DAI",
      name: "Dai Stablecoin",
      isToken: true,
      isNative: false,
      wrapped: false,
    },
    {
      chainId: 84532,
      address: "0xE4aB69C077896252FAFBD49EFD26B5D171A32410", // LINK
      decimals: 18,
      symbol: "LINK",
      name: "Chainlink",
      isToken: true,
      isNative: false,
      wrapped: false,
    },
  ],
  arbitrumSepolia: [
    {
      chainId: 421614,
      address: "0x0000000000000000000000000000000000000000", // Native ETH
      decimals: 18,
      symbol: "ETH",
      name: "Ether",
      isToken: false,
      isNative: true,
      wrapped: false,
    },
    {
      chainId: 421614,
      address: "0x980B62Da83eFf3D4576C647993b0c1D7faf17c73", // WETH
      decimals: 18,
      symbol: "WETH",
      name: "Wrapped Ether",
      isToken: true,
      isNative: false,
      wrapped: true,
    },
    {
      chainId: 421614,
      address: "0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d", // USDC
      decimals: 6,
      symbol: "USDC",
      name: "USD Coin",
      isToken: true,
      isNative: false,
      wrapped: false,
    },
    {
      chainId: 421614,
      address: "0x08C19FE57AF150a1AF975CB9a38769848c7DF98e", // DAI
      decimals: 18,
      symbol: "DAI",
      name: "Dai Stablecoin",
      isToken: true,
      isNative: false,
      wrapped: false,
    },
  ],
  optimismSepolia: [
    {
      chainId: 11155420,
      address: "0x0000000000000000000000000000000000000000", // Native ETH
      decimals: 18,
      symbol: "ETH",
      name: "Ether",
      isToken: false,
      isNative: true,
      wrapped: false,
    },
    {
      chainId: 11155420,
      address: "0x4200000000000000000000000000000000000006", // WETH
      decimals: 18,
      symbol: "WETH",
      name: "Wrapped Ether",
      isToken: true,
      isNative: false,
      wrapped: true,
    },
    {
      chainId: 11155420,
      address: "0x5fd84259d66Cd46123540766Be93DFE6D43130D7", // USDC
      decimals: 6,
      symbol: "USDC",
      name: "USD Coin",
      isToken: true,
      isNative: false,
      wrapped: false,
    },
    {
      chainId: 11155420,
      address: "0x4EFDFe8fFAfF109451Fc306e0B529B088597dd8d", // DAI
      decimals: 18,
      symbol: "DAI",
      name: "Dai Stablecoin",
      isToken: true,
      isNative: false,
      wrapped: false,
    },
  ],
  polygonMumbai: [
    {
      chainId: 80001,
      address: "0x0000000000000000000000000000000000000000", // Native MATIC
      decimals: 18,
      symbol: "MATIC",
      name: "Matic",
      isToken: false,
      isNative: true,
      wrapped: false,
    },
  ],
  bscTestnet: [
    // BSC Testnet Tokens
    {
      chainId: 97,
      address: "0x0000000000000000000000000000000000000000", // Native BNB
      decimals: 18,
      symbol: "BNB",
      name: "Binance Coin",
      isToken: false,
      isNative: true,
      wrapped: false,
    },
  ],
  avalancheCChain: [
    {
      chainId: 43114,
      address: "0x0000000000000000000000000000000000000000", // Native AVAX
      decimals: 18,
      symbol: "AVAX",
      name: "Avalanche",
      isToken: false,
      isNative: true,
      wrapped: false,
    },
    {
      chainId: 43114,
      address: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7", // WAVAX
      decimals: 18,
      symbol: "WAVAX",
      name: "Wrapped AVAX",
      isToken: true,
      isNative: false,
      wrapped: true,
    },
    {
      chainId: 43114,
      address: "0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664", // USDC
      decimals: 6,
      symbol: "USDC",
      name: "USD Coin",
      isToken: true,
      isNative: false,
      wrapped: false,
    },
    {
      chainId: 43114,
      address: "0xd586E7F844cEa2F87f50152665BCbc2C279D8d70", // DAI
      decimals: 18,
      symbol: "DAI",
      name: "Dai Stablecoin",
      isToken: true,
      isNative: false,
      wrapped: false,
    },
    {
      chainId: 43114,
      address: "0x5947BB275c521040051D82396192181b413227A3", // LINK
      decimals: 18,
      symbol: "LINK",
      name: "Chainlink",
      isToken: true,
      isNative: false,
      wrapped: false,
    },
  ],
};

// export const DEPRECATED_TOKENS = [];
