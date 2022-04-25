export type Dojima = {
  version: "0.1.0";
  name: "dojima";
  instructions: [
    {
      name: "transferNonNativeTokens";
      accounts: [
        {
          name: "from";
          isMut: true;
          isSigner: true;
        },
        {
          name: "fromTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "toTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "mint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "tokenAmount";
          type: "u64";
        },
        {
          name: "sourceChain";
          type: "string";
        },
        {
          name: "destinationChain";
          type: "string";
        },
        {
          name: "tokenLocked";
          type: "string";
        }
      ];
    },
    {
      name: "transferNativeTokens";
      accounts: [
        {
          name: "from";
          isMut: true;
          isSigner: true;
        },
        {
          name: "to";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "tokenAmount";
          type: "u64";
        },
        {
          name: "sourceChain";
          type: "string";
        },
        {
          name: "destinationChain";
          type: "string";
        },
        {
          name: "tokenLocked";
          type: "string";
        }
      ];
    },
    {
      name: "lockPairTokens";
      accounts: [
        {
          name: "from";
          isMut: true;
          isSigner: true;
        },
        {
          name: "fromTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "toTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "to";
          isMut: true;
          isSigner: false;
        },
        {
          name: "mint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "tokenAmountA";
          type: "u64";
        },
        {
          name: "tokenAmountB";
          type: "u64";
        },
        {
          name: "tokenA";
          type: "string";
        },
        {
          name: "tokenB";
          type: "string";
        }
      ];
    }
  ];
  events: [
    {
      name: "LockEvent";
      fields: [
        {
          name: "sourceBlockchain";
          type: "string";
          index: false;
        },
        {
          name: "destinationBlockchain";
          type: "string";
          index: false;
        },
        {
          name: "sender";
          type: "publicKey";
          index: true;
        },
        {
          name: "amount";
          type: "u64";
          index: false;
        },
        {
          name: "asset";
          type: "string";
          index: false;
        }
      ];
    },
    {
      name: "PoolLockEvent";
      fields: [
        {
          name: "tokenA";
          type: "string";
          index: false;
        },
        {
          name: "tokenB";
          type: "string";
          index: false;
        },
        {
          name: "sender";
          type: "publicKey";
          index: true;
        },
        {
          name: "amountTokenA";
          type: "u64";
          index: false;
        },
        {
          name: "amountTokenB";
          type: "u64";
          index: false;
        }
      ];
    }
  ];
};

export const IDL: Dojima = {
  version: "0.1.0",
  name: "dojima",
  instructions: [
    {
      name: "transferNonNativeTokens",
      accounts: [
        {
          name: "from",
          isMut: true,
          isSigner: true,
        },
        {
          name: "fromTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "toTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "tokenAmount",
          type: "u64",
        },
        {
          name: "sourceChain",
          type: "string",
        },
        {
          name: "destinationChain",
          type: "string",
        },
        {
          name: "tokenLocked",
          type: "string",
        },
      ],
    },
    {
      name: "transferNativeTokens",
      accounts: [
        {
          name: "from",
          isMut: true,
          isSigner: true,
        },
        {
          name: "to",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "tokenAmount",
          type: "u64",
        },
        {
          name: "sourceChain",
          type: "string",
        },
        {
          name: "destinationChain",
          type: "string",
        },
        {
          name: "tokenLocked",
          type: "string",
        },
      ],
    },
    {
      name: "lockPairTokens",
      accounts: [
        {
          name: "from",
          isMut: true,
          isSigner: true,
        },
        {
          name: "fromTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "toTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "to",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "tokenAmountA",
          type: "u64",
        },
        {
          name: "tokenAmountB",
          type: "u64",
        },
        {
          name: "tokenA",
          type: "string",
        },
        {
          name: "tokenB",
          type: "string",
        },
      ],
    },
  ],
  events: [
    {
      name: "LockEvent",
      fields: [
        {
          name: "sourceBlockchain",
          type: "string",
          index: false,
        },
        {
          name: "destinationBlockchain",
          type: "string",
          index: false,
        },
        {
          name: "sender",
          type: "publicKey",
          index: true,
        },
        {
          name: "amount",
          type: "u64",
          index: false,
        },
        {
          name: "asset",
          type: "string",
          index: false,
        },
      ],
    },
    {
      name: "PoolLockEvent",
      fields: [
        {
          name: "tokenA",
          type: "string",
          index: false,
        },
        {
          name: "tokenB",
          type: "string",
          index: false,
        },
        {
          name: "sender",
          type: "publicKey",
          index: true,
        },
        {
          name: "amountTokenA",
          type: "u64",
          index: false,
        },
        {
          name: "amountTokenB",
          type: "u64",
          index: false,
        },
      ],
    },
  ],
};
