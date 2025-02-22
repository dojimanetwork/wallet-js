// ABI's

export const ERC20_ABI = [
  // Read-Only Functions
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",

  // Authenticated Functions
  "function transfer(address to, uint amount) returns (bool)",
  "function approve(address _spender, uint256 _value) returns (bool)",

  // Events
  "event Transfer(address indexed from, address indexed to, uint amount)",
];

export const NONFUNGIBLE_POSITION_MANAGER_ABI = [
  // Read-Only Functions
  "function balanceOf(address _owner) view returns (uint256)",
  "function tokenOfOwnerByIndex(address _owner, uint256 _index) view returns (uint256)",
  "function tokenURI(uint256 tokenId) view returns (string memory)",

  "function positions(uint256 tokenId) external view returns (uint96 nonce, address operator, address token0, address token1, uint24 fee, int24 tickLower, int24 tickUpper, uint128 liquidity, uint256 feeGrowthInside0LastX128, uint256 feeGrowthInside1LastX128, uint128 tokensOwed0, uint128 tokensOwed1)",
];

export const WETH_ABI = [
  // Include all ERC20 functions
  ...ERC20_ABI,

  // WETH specific functions
  "function deposit() payable",
  "function withdraw(uint256 amount) external",

  // WETH specific events
  "event Deposit(address indexed dst, uint256 wad)",
  "event Withdrawal(address indexed src, uint256 wad)",
];
