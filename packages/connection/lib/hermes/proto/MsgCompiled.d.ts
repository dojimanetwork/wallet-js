import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace common. */
export namespace common {
  /** Properties of an Asset. */
  interface IAsset {
    /** Asset chain */
    chain?: string | null;

    /** Asset symbol */
    symbol?: string | null;

    /** Asset ticker */
    ticker?: string | null;

    /** Asset synth */
    synth?: boolean | null;
  }

  /** Represents an Asset. */
  class Asset implements IAsset {
    /**
     * Constructs a new Asset.
     * @param [properties] Properties to set
     */
    constructor(properties?: common.IAsset);

    /** Asset chain. */
    public chain: string;

    /** Asset symbol. */
    public symbol: string;

    /** Asset ticker. */
    public ticker: string;

    /** Asset synth. */
    public synth: boolean;

    /**
     * Creates a new Asset instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Asset instance
     */
    public static create(properties?: common.IAsset): common.Asset;

    /**
     * Encodes the specified Asset message. Does not implicitly {@link common.Asset.verify|verify} messages.
     * @param message Asset message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: common.IAsset,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Encodes the specified Asset message, length delimited. Does not implicitly {@link common.Asset.verify|verify} messages.
     * @param message Asset message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: common.IAsset,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Decodes an Asset message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Asset
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number
    ): common.Asset;

    /**
     * Decodes an Asset message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Asset
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array
    ): common.Asset;

    /**
     * Verifies an Asset message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates an Asset message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Asset
     */
    public static fromObject(object: { [k: string]: any }): common.Asset;

    /**
     * Creates a plain object from an Asset message. Also converts values to other types if specified.
     * @param message Asset
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: common.Asset,
      options?: $protobuf.IConversionOptions
    ): { [k: string]: any };

    /**
     * Converts this Asset to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for Asset
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }

  /** Properties of a Coin. */
  interface ICoin {
    /** Coin asset */
    asset?: common.IAsset | null;

    /** Coin amount */
    amount?: string | null;

    /** Coin decimals */
    decimals?: number | Long | null;
  }

  /** Represents a Coin. */
  class Coin implements ICoin {
    /**
     * Constructs a new Coin.
     * @param [properties] Properties to set
     */
    constructor(properties?: common.ICoin);

    /** Coin asset. */
    public asset?: common.IAsset | null;

    /** Coin amount. */
    public amount: string;

    /** Coin decimals. */
    public decimals: number | Long;

    /**
     * Creates a new Coin instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Coin instance
     */
    public static create(properties?: common.ICoin): common.Coin;

    /**
     * Encodes the specified Coin message. Does not implicitly {@link common.Coin.verify|verify} messages.
     * @param message Coin message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: common.ICoin,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Encodes the specified Coin message, length delimited. Does not implicitly {@link common.Coin.verify|verify} messages.
     * @param message Coin message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: common.ICoin,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Decodes a Coin message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Coin
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number
    ): common.Coin;

    /**
     * Decodes a Coin message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Coin
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array
    ): common.Coin;

    /**
     * Verifies a Coin message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a Coin message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Coin
     */
    public static fromObject(object: { [k: string]: any }): common.Coin;

    /**
     * Creates a plain object from a Coin message. Also converts values to other types if specified.
     * @param message Coin
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: common.Coin,
      options?: $protobuf.IConversionOptions
    ): { [k: string]: any };

    /**
     * Converts this Coin to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for Coin
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }

  /** Properties of a PubKeySet. */
  interface IPubKeySet {
    /** PubKeySet secp256k1 */
    secp256k1?: string | null;

    /** PubKeySet ed25519 */
    ed25519?: string | null;
  }

  /** Represents a PubKeySet. */
  class PubKeySet implements IPubKeySet {
    /**
     * Constructs a new PubKeySet.
     * @param [properties] Properties to set
     */
    constructor(properties?: common.IPubKeySet);

    /** PubKeySet secp256k1. */
    public secp256k1: string;

    /** PubKeySet ed25519. */
    public ed25519: string;

    /**
     * Creates a new PubKeySet instance using the specified properties.
     * @param [properties] Properties to set
     * @returns PubKeySet instance
     */
    public static create(properties?: common.IPubKeySet): common.PubKeySet;

    /**
     * Encodes the specified PubKeySet message. Does not implicitly {@link common.PubKeySet.verify|verify} messages.
     * @param message PubKeySet message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: common.IPubKeySet,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Encodes the specified PubKeySet message, length delimited. Does not implicitly {@link common.PubKeySet.verify|verify} messages.
     * @param message PubKeySet message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: common.IPubKeySet,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Decodes a PubKeySet message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns PubKeySet
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number
    ): common.PubKeySet;

    /**
     * Decodes a PubKeySet message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns PubKeySet
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array
    ): common.PubKeySet;

    /**
     * Verifies a PubKeySet message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a PubKeySet message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns PubKeySet
     */
    public static fromObject(object: { [k: string]: any }): common.PubKeySet;

    /**
     * Creates a plain object from a PubKeySet message. Also converts values to other types if specified.
     * @param message PubKeySet
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: common.PubKeySet,
      options?: $protobuf.IConversionOptions
    ): { [k: string]: any };

    /**
     * Converts this PubKeySet to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for PubKeySet
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }

  /** Properties of a Tx. */
  interface ITx {
    /** Tx id */
    id?: string | null;

    /** Tx chain */
    chain?: string | null;

    /** Tx fromAddress */
    fromAddress?: string | null;

    /** Tx toAddress */
    toAddress?: string | null;

    /** Tx coins */
    coins?: common.ICoin[] | null;

    /** Tx gas */
    gas?: common.ICoin[] | null;

    /** Tx memo */
    memo?: string | null;

    /** Tx payload */
    payload?: Uint8Array | null;

    /** Tx isXcMsg */
    isXcMsg?: boolean | null;
  }

  /** Represents a Tx. */
  class Tx implements ITx {
    /**
     * Constructs a new Tx.
     * @param [properties] Properties to set
     */
    constructor(properties?: common.ITx);

    /** Tx id. */
    public id: string;

    /** Tx chain. */
    public chain: string;

    /** Tx fromAddress. */
    public fromAddress: string;

    /** Tx toAddress. */
    public toAddress: string;

    /** Tx coins. */
    public coins: common.ICoin[];

    /** Tx gas. */
    public gas: common.ICoin[];

    /** Tx memo. */
    public memo: string;

    /** Tx payload. */
    public payload: Uint8Array;

    /** Tx isXcMsg. */
    public isXcMsg: boolean;

    /**
     * Creates a new Tx instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Tx instance
     */
    public static create(properties?: common.ITx): common.Tx;

    /**
     * Encodes the specified Tx message. Does not implicitly {@link common.Tx.verify|verify} messages.
     * @param message Tx message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: common.ITx,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Encodes the specified Tx message, length delimited. Does not implicitly {@link common.Tx.verify|verify} messages.
     * @param message Tx message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: common.ITx,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Decodes a Tx message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Tx
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number
    ): common.Tx;

    /**
     * Decodes a Tx message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Tx
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array
    ): common.Tx;

    /**
     * Verifies a Tx message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a Tx message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Tx
     */
    public static fromObject(object: { [k: string]: any }): common.Tx;

    /**
     * Creates a plain object from a Tx message. Also converts values to other types if specified.
     * @param message Tx
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: common.Tx,
      options?: $protobuf.IConversionOptions
    ): { [k: string]: any };

    /**
     * Converts this Tx to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for Tx
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }

  /** Properties of a Fee. */
  interface IFee {
    /** Fee coins */
    coins?: common.ICoin[] | null;

    /** Fee poolDeduct */
    poolDeduct?: string | null;
  }

  /** Represents a Fee. */
  class Fee implements IFee {
    /**
     * Constructs a new Fee.
     * @param [properties] Properties to set
     */
    constructor(properties?: common.IFee);

    /** Fee coins. */
    public coins: common.ICoin[];

    /** Fee poolDeduct. */
    public poolDeduct: string;

    /**
     * Creates a new Fee instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Fee instance
     */
    public static create(properties?: common.IFee): common.Fee;

    /**
     * Encodes the specified Fee message. Does not implicitly {@link common.Fee.verify|verify} messages.
     * @param message Fee message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: common.IFee,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Encodes the specified Fee message, length delimited. Does not implicitly {@link common.Fee.verify|verify} messages.
     * @param message Fee message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: common.IFee,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Decodes a Fee message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Fee
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number
    ): common.Fee;

    /**
     * Decodes a Fee message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Fee
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array
    ): common.Fee;

    /**
     * Verifies a Fee message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a Fee message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Fee
     */
    public static fromObject(object: { [k: string]: any }): common.Fee;

    /**
     * Creates a plain object from a Fee message. Also converts values to other types if specified.
     * @param message Fee
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: common.Fee,
      options?: $protobuf.IConversionOptions
    ): { [k: string]: any };

    /**
     * Converts this Fee to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for Fee
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }

  /** Properties of a KVPair. */
  interface IKVPair {
    /** KVPair key */
    key?: Uint8Array | null;

    /** KVPair value */
    value?: Uint8Array | null;
  }

  /** Represents a KVPair. */
  class KVPair implements IKVPair {
    /**
     * Constructs a new KVPair.
     * @param [properties] Properties to set
     */
    constructor(properties?: common.IKVPair);

    /** KVPair key. */
    public key: Uint8Array;

    /** KVPair value. */
    public value: Uint8Array;

    /**
     * Creates a new KVPair instance using the specified properties.
     * @param [properties] Properties to set
     * @returns KVPair instance
     */
    public static create(properties?: common.IKVPair): common.KVPair;

    /**
     * Encodes the specified KVPair message. Does not implicitly {@link common.KVPair.verify|verify} messages.
     * @param message KVPair message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: common.IKVPair,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Encodes the specified KVPair message, length delimited. Does not implicitly {@link common.KVPair.verify|verify} messages.
     * @param message KVPair message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: common.IKVPair,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Decodes a KVPair message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns KVPair
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number
    ): common.KVPair;

    /**
     * Decodes a KVPair message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns KVPair
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array
    ): common.KVPair;

    /**
     * Verifies a KVPair message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a KVPair message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns KVPair
     */
    public static fromObject(object: { [k: string]: any }): common.KVPair;

    /**
     * Creates a plain object from a KVPair message. Also converts values to other types if specified.
     * @param message KVPair
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: common.KVPair,
      options?: $protobuf.IConversionOptions
    ): { [k: string]: any };

    /**
     * Converts this KVPair to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for KVPair
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }

  /** Properties of a DcAddress. */
  interface IDcAddress {
    /** DcAddress address */
    address?: Uint8Array | null;
  }

  /** Represents a DcAddress. */
  class DcAddress implements IDcAddress {
    /**
     * Constructs a new DcAddress.
     * @param [properties] Properties to set
     */
    constructor(properties?: common.IDcAddress);

    /** DcAddress address. */
    public address: Uint8Array;

    /**
     * Creates a new DcAddress instance using the specified properties.
     * @param [properties] Properties to set
     * @returns DcAddress instance
     */
    public static create(properties?: common.IDcAddress): common.DcAddress;

    /**
     * Encodes the specified DcAddress message. Does not implicitly {@link common.DcAddress.verify|verify} messages.
     * @param message DcAddress message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: common.IDcAddress,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Encodes the specified DcAddress message, length delimited. Does not implicitly {@link common.DcAddress.verify|verify} messages.
     * @param message DcAddress message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: common.IDcAddress,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Decodes a DcAddress message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns DcAddress
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number
    ): common.DcAddress;

    /**
     * Decodes a DcAddress message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns DcAddress
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array
    ): common.DcAddress;

    /**
     * Verifies a DcAddress message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a DcAddress message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns DcAddress
     */
    public static fromObject(object: { [k: string]: any }): common.DcAddress;

    /**
     * Creates a plain object from a DcAddress message. Also converts values to other types if specified.
     * @param message DcAddress
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: common.DcAddress,
      options?: $protobuf.IConversionOptions
    ): { [k: string]: any };

    /**
     * Converts this DcAddress to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for DcAddress
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }

  /** Properties of a DcHash. */
  interface IDcHash {
    /** DcHash hash */
    hash?: Uint8Array[] | null;
  }

  /** Represents a DcHash. */
  class DcHash implements IDcHash {
    /**
     * Constructs a new DcHash.
     * @param [properties] Properties to set
     */
    constructor(properties?: common.IDcHash);

    /** DcHash hash. */
    public hash: Uint8Array[];

    /**
     * Creates a new DcHash instance using the specified properties.
     * @param [properties] Properties to set
     * @returns DcHash instance
     */
    public static create(properties?: common.IDcHash): common.DcHash;

    /**
     * Encodes the specified DcHash message. Does not implicitly {@link common.DcHash.verify|verify} messages.
     * @param message DcHash message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: common.IDcHash,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Encodes the specified DcHash message, length delimited. Does not implicitly {@link common.DcHash.verify|verify} messages.
     * @param message DcHash message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: common.IDcHash,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Decodes a DcHash message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns DcHash
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number
    ): common.DcHash;

    /**
     * Decodes a DcHash message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns DcHash
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array
    ): common.DcHash;

    /**
     * Verifies a DcHash message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a DcHash message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns DcHash
     */
    public static fromObject(object: { [k: string]: any }): common.DcHash;

    /**
     * Creates a plain object from a DcHash message. Also converts values to other types if specified.
     * @param message DcHash
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: common.DcHash,
      options?: $protobuf.IConversionOptions
    ): { [k: string]: any };

    /**
     * Converts this DcHash to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for DcHash
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }

  /** Properties of a H128. */
  interface IH128 {
    /** H128 Hi */
    Hi?: number | Long | null;

    /** H128 Lo */
    Lo?: number | Long | null;
  }

  /** Represents a H128. */
  class H128 implements IH128 {
    /**
     * Constructs a new H128.
     * @param [properties] Properties to set
     */
    constructor(properties?: common.IH128);

    /** H128 Hi. */
    public Hi: number | Long;

    /** H128 Lo. */
    public Lo: number | Long;

    /**
     * Creates a new H128 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns H128 instance
     */
    public static create(properties?: common.IH128): common.H128;

    /**
     * Encodes the specified H128 message. Does not implicitly {@link common.H128.verify|verify} messages.
     * @param message H128 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: common.IH128,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Encodes the specified H128 message, length delimited. Does not implicitly {@link common.H128.verify|verify} messages.
     * @param message H128 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: common.IH128,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Decodes a H128 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns H128
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number
    ): common.H128;

    /**
     * Decodes a H128 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns H128
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array
    ): common.H128;

    /**
     * Verifies a H128 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a H128 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns H128
     */
    public static fromObject(object: { [k: string]: any }): common.H128;

    /**
     * Creates a plain object from a H128 message. Also converts values to other types if specified.
     * @param message H128
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: common.H128,
      options?: $protobuf.IConversionOptions
    ): { [k: string]: any };

    /**
     * Converts this H128 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for H128
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }

  /** Properties of a H160. */
  interface IH160 {
    /** H160 Hi */
    Hi?: common.IH128 | null;

    /** H160 Lo */
    Lo?: number | null;
  }

  /** Represents a H160. */
  class H160 implements IH160 {
    /**
     * Constructs a new H160.
     * @param [properties] Properties to set
     */
    constructor(properties?: common.IH160);

    /** H160 Hi. */
    public Hi?: common.IH128 | null;

    /** H160 Lo. */
    public Lo: number;

    /**
     * Creates a new H160 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns H160 instance
     */
    public static create(properties?: common.IH160): common.H160;

    /**
     * Encodes the specified H160 message. Does not implicitly {@link common.H160.verify|verify} messages.
     * @param message H160 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: common.IH160,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Encodes the specified H160 message, length delimited. Does not implicitly {@link common.H160.verify|verify} messages.
     * @param message H160 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: common.IH160,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Decodes a H160 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns H160
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number
    ): common.H160;

    /**
     * Decodes a H160 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns H160
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array
    ): common.H160;

    /**
     * Verifies a H160 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a H160 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns H160
     */
    public static fromObject(object: { [k: string]: any }): common.H160;

    /**
     * Creates a plain object from a H160 message. Also converts values to other types if specified.
     * @param message H160
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: common.H160,
      options?: $protobuf.IConversionOptions
    ): { [k: string]: any };

    /**
     * Converts this H160 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for H160
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }

  /** Properties of a H256. */
  interface IH256 {
    /** H256 Hi */
    Hi?: common.IH128 | null;

    /** H256 Lo */
    Lo?: common.IH128 | null;
  }

  /** Represents a H256. */
  class H256 implements IH256 {
    /**
     * Constructs a new H256.
     * @param [properties] Properties to set
     */
    constructor(properties?: common.IH256);

    /** H256 Hi. */
    public Hi?: common.IH128 | null;

    /** H256 Lo. */
    public Lo?: common.IH128 | null;

    /**
     * Creates a new H256 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns H256 instance
     */
    public static create(properties?: common.IH256): common.H256;

    /**
     * Encodes the specified H256 message. Does not implicitly {@link common.H256.verify|verify} messages.
     * @param message H256 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: common.IH256,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Encodes the specified H256 message, length delimited. Does not implicitly {@link common.H256.verify|verify} messages.
     * @param message H256 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: common.IH256,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Decodes a H256 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns H256
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number
    ): common.H256;

    /**
     * Decodes a H256 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns H256
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array
    ): common.H256;

    /**
     * Verifies a H256 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a H256 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns H256
     */
    public static fromObject(object: { [k: string]: any }): common.H256;

    /**
     * Creates a plain object from a H256 message. Also converts values to other types if specified.
     * @param message H256
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: common.H256,
      options?: $protobuf.IConversionOptions
    ): { [k: string]: any };

    /**
     * Converts this H256 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for H256
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }

  /** Properties of a Validator. */
  interface IValidator {
    /** Validator address */
    address?: Uint8Array | null;

    /** Validator power */
    power?: number | Long | null;
  }

  /** Represents a Validator. */
  class Validator implements IValidator {
    /**
     * Constructs a new Validator.
     * @param [properties] Properties to set
     */
    constructor(properties?: common.IValidator);

    /** Validator address. */
    public address: Uint8Array;

    /** Validator power. */
    public power: number | Long;

    /**
     * Creates a new Validator instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Validator instance
     */
    public static create(properties?: common.IValidator): common.Validator;

    /**
     * Encodes the specified Validator message. Does not implicitly {@link common.Validator.verify|verify} messages.
     * @param message Validator message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: common.IValidator,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Encodes the specified Validator message, length delimited. Does not implicitly {@link common.Validator.verify|verify} messages.
     * @param message Validator message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: common.IValidator,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Decodes a Validator message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Validator
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number
    ): common.Validator;

    /**
     * Decodes a Validator message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Validator
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array
    ): common.Validator;

    /**
     * Verifies a Validator message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a Validator message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Validator
     */
    public static fromObject(object: { [k: string]: any }): common.Validator;

    /**
     * Creates a plain object from a Validator message. Also converts values to other types if specified.
     * @param message Validator
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: common.Validator,
      options?: $protobuf.IConversionOptions
    ): { [k: string]: any };

    /**
     * Converts this Validator to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for Validator
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }

  /** Properties of a ValidatorsWrapper. */
  interface IValidatorsWrapper {
    /** ValidatorsWrapper validators */
    validators?: common.IValidator[] | null;
  }

  /** Represents a ValidatorsWrapper. */
  class ValidatorsWrapper implements IValidatorsWrapper {
    /**
     * Constructs a new ValidatorsWrapper.
     * @param [properties] Properties to set
     */
    constructor(properties?: common.IValidatorsWrapper);

    /** ValidatorsWrapper validators. */
    public validators: common.IValidator[];

    /**
     * Creates a new ValidatorsWrapper instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ValidatorsWrapper instance
     */
    public static create(
      properties?: common.IValidatorsWrapper
    ): common.ValidatorsWrapper;

    /**
     * Encodes the specified ValidatorsWrapper message. Does not implicitly {@link common.ValidatorsWrapper.verify|verify} messages.
     * @param message ValidatorsWrapper message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: common.IValidatorsWrapper,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Encodes the specified ValidatorsWrapper message, length delimited. Does not implicitly {@link common.ValidatorsWrapper.verify|verify} messages.
     * @param message ValidatorsWrapper message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: common.IValidatorsWrapper,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Decodes a ValidatorsWrapper message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ValidatorsWrapper
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number
    ): common.ValidatorsWrapper;

    /**
     * Decodes a ValidatorsWrapper message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ValidatorsWrapper
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array
    ): common.ValidatorsWrapper;

    /**
     * Verifies a ValidatorsWrapper message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a ValidatorsWrapper message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns ValidatorsWrapper
     */
    public static fromObject(object: {
      [k: string]: any;
    }): common.ValidatorsWrapper;

    /**
     * Creates a plain object from a ValidatorsWrapper message. Also converts values to other types if specified.
     * @param message ValidatorsWrapper
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: common.ValidatorsWrapper,
      options?: $protobuf.IConversionOptions
    ): { [k: string]: any };

    /**
     * Converts this ValidatorsWrapper to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for ValidatorsWrapper
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }

  /** Properties of a ProtoUint. */
  interface IProtoUint {
    /** ProtoUint value */
    value?: string | null;
  }

  /** Represents a ProtoUint. */
  class ProtoUint implements IProtoUint {
    /**
     * Constructs a new ProtoUint.
     * @param [properties] Properties to set
     */
    constructor(properties?: common.IProtoUint);

    /** ProtoUint value. */
    public value: string;

    /**
     * Creates a new ProtoUint instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ProtoUint instance
     */
    public static create(properties?: common.IProtoUint): common.ProtoUint;

    /**
     * Encodes the specified ProtoUint message. Does not implicitly {@link common.ProtoUint.verify|verify} messages.
     * @param message ProtoUint message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: common.IProtoUint,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Encodes the specified ProtoUint message, length delimited. Does not implicitly {@link common.ProtoUint.verify|verify} messages.
     * @param message ProtoUint message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: common.IProtoUint,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Decodes a ProtoUint message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ProtoUint
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number
    ): common.ProtoUint;

    /**
     * Decodes a ProtoUint message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ProtoUint
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array
    ): common.ProtoUint;

    /**
     * Verifies a ProtoUint message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a ProtoUint message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns ProtoUint
     */
    public static fromObject(object: { [k: string]: any }): common.ProtoUint;

    /**
     * Creates a plain object from a ProtoUint message. Also converts values to other types if specified.
     * @param message ProtoUint
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: common.ProtoUint,
      options?: $protobuf.IConversionOptions
    ): { [k: string]: any };

    /**
     * Converts this ProtoUint to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for ProtoUint
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }
}

/** Namespace hermes. */
export namespace hermes {
  /** Namespace hermes. */
  namespace hermes {
    /** Namespace v1beta1. */
    namespace v1beta1 {
      /** Namespace types. */
      namespace types {
        /** Properties of a MsgDeposit. */
        interface IMsgDeposit {
          /** MsgDeposit coins */
          coins?: common.ICoin[] | null;

          /** MsgDeposit memo */
          memo?: string | null;

          /** MsgDeposit signer */
          signer?: Uint8Array | null;
        }

        /** Represents a MsgDeposit. */
        class MsgDeposit implements IMsgDeposit {
          /**
           * Constructs a new MsgDeposit.
           * @param [properties] Properties to set
           */
          constructor(properties?: hermes.hermes.v1beta1.types.IMsgDeposit);

          /** MsgDeposit coins. */
          public coins: common.ICoin[];

          /** MsgDeposit memo. */
          public memo: string;

          /** MsgDeposit signer. */
          public signer: Uint8Array;

          /**
           * Creates a new MsgDeposit instance using the specified properties.
           * @param [properties] Properties to set
           * @returns MsgDeposit instance
           */
          public static create(
            properties?: hermes.hermes.v1beta1.types.IMsgDeposit
          ): hermes.hermes.v1beta1.types.MsgDeposit;

          /**
           * Encodes the specified MsgDeposit message. Does not implicitly {@link hermes.hermes.v1beta1.types.MsgDeposit.verify|verify} messages.
           * @param message MsgDeposit message or plain object to encode
           * @param [writer] Writer to encode to
           * @returns Writer
           */
          public static encode(
            message: hermes.hermes.v1beta1.types.IMsgDeposit,
            writer?: $protobuf.Writer
          ): $protobuf.Writer;

          /**
           * Encodes the specified MsgDeposit message, length delimited. Does not implicitly {@link hermes.hermes.v1beta1.types.MsgDeposit.verify|verify} messages.
           * @param message MsgDeposit message or plain object to encode
           * @param [writer] Writer to encode to
           * @returns Writer
           */
          public static encodeDelimited(
            message: hermes.hermes.v1beta1.types.IMsgDeposit,
            writer?: $protobuf.Writer
          ): $protobuf.Writer;

          /**
           * Decodes a MsgDeposit message from the specified reader or buffer.
           * @param reader Reader or buffer to decode from
           * @param [length] Message length if known beforehand
           * @returns MsgDeposit
           * @throws {Error} If the payload is not a reader or valid buffer
           * @throws {$protobuf.util.ProtocolError} If required fields are missing
           */
          public static decode(
            reader: $protobuf.Reader | Uint8Array,
            length?: number
          ): hermes.hermes.v1beta1.types.MsgDeposit;

          /**
           * Decodes a MsgDeposit message from the specified reader or buffer, length delimited.
           * @param reader Reader or buffer to decode from
           * @returns MsgDeposit
           * @throws {Error} If the payload is not a reader or valid buffer
           * @throws {$protobuf.util.ProtocolError} If required fields are missing
           */
          public static decodeDelimited(
            reader: $protobuf.Reader | Uint8Array
          ): hermes.hermes.v1beta1.types.MsgDeposit;

          /**
           * Verifies a MsgDeposit message.
           * @param message Plain object to verify
           * @returns `null` if valid, otherwise the reason why it is not
           */
          public static verify(message: { [k: string]: any }): string | null;

          /**
           * Creates a MsgDeposit message from a plain object. Also converts values to their respective internal types.
           * @param object Plain object
           * @returns MsgDeposit
           */
          public static fromObject(object: {
            [k: string]: any;
          }): hermes.hermes.v1beta1.types.MsgDeposit;

          /**
           * Creates a plain object from a MsgDeposit message. Also converts values to other types if specified.
           * @param message MsgDeposit
           * @param [options] Conversion options
           * @returns Plain object
           */
          public static toObject(
            message: hermes.hermes.v1beta1.types.MsgDeposit,
            options?: $protobuf.IConversionOptions
          ): { [k: string]: any };

          /**
           * Converts this MsgDeposit to JSON.
           * @returns JSON object
           */
          public toJSON(): { [k: string]: any };

          /**
           * Gets the default type url for MsgDeposit
           * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
           * @returns The default type url
           */
          public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a MsgSend. */
        interface IMsgSend {
          /** MsgSend fromAddress */
          fromAddress?: Uint8Array | null;

          /** MsgSend toAddress */
          toAddress?: Uint8Array | null;

          /** MsgSend amount */
          amount?: cosmos.base.v1beta1.ICoin[] | null;
        }

        /** Represents a MsgSend. */
        class MsgSend implements IMsgSend {
          /**
           * Constructs a new MsgSend.
           * @param [properties] Properties to set
           */
          constructor(properties?: hermes.hermes.v1beta1.types.IMsgSend);

          /** MsgSend fromAddress. */
          public fromAddress: Uint8Array;

          /** MsgSend toAddress. */
          public toAddress: Uint8Array;

          /** MsgSend amount. */
          public amount: cosmos.base.v1beta1.ICoin[];

          /**
           * Creates a new MsgSend instance using the specified properties.
           * @param [properties] Properties to set
           * @returns MsgSend instance
           */
          public static create(
            properties?: hermes.hermes.v1beta1.types.IMsgSend
          ): hermes.hermes.v1beta1.types.MsgSend;

          /**
           * Encodes the specified MsgSend message. Does not implicitly {@link hermes.hermes.v1beta1.types.MsgSend.verify|verify} messages.
           * @param message MsgSend message or plain object to encode
           * @param [writer] Writer to encode to
           * @returns Writer
           */
          public static encode(
            message: hermes.hermes.v1beta1.types.IMsgSend,
            writer?: $protobuf.Writer
          ): $protobuf.Writer;

          /**
           * Encodes the specified MsgSend message, length delimited. Does not implicitly {@link hermes.hermes.v1beta1.types.MsgSend.verify|verify} messages.
           * @param message MsgSend message or plain object to encode
           * @param [writer] Writer to encode to
           * @returns Writer
           */
          public static encodeDelimited(
            message: hermes.hermes.v1beta1.types.IMsgSend,
            writer?: $protobuf.Writer
          ): $protobuf.Writer;

          /**
           * Decodes a MsgSend message from the specified reader or buffer.
           * @param reader Reader or buffer to decode from
           * @param [length] Message length if known beforehand
           * @returns MsgSend
           * @throws {Error} If the payload is not a reader or valid buffer
           * @throws {$protobuf.util.ProtocolError} If required fields are missing
           */
          public static decode(
            reader: $protobuf.Reader | Uint8Array,
            length?: number
          ): hermes.hermes.v1beta1.types.MsgSend;

          /**
           * Decodes a MsgSend message from the specified reader or buffer, length delimited.
           * @param reader Reader or buffer to decode from
           * @returns MsgSend
           * @throws {Error} If the payload is not a reader or valid buffer
           * @throws {$protobuf.util.ProtocolError} If required fields are missing
           */
          public static decodeDelimited(
            reader: $protobuf.Reader | Uint8Array
          ): hermes.hermes.v1beta1.types.MsgSend;

          /**
           * Verifies a MsgSend message.
           * @param message Plain object to verify
           * @returns `null` if valid, otherwise the reason why it is not
           */
          public static verify(message: { [k: string]: any }): string | null;

          /**
           * Creates a MsgSend message from a plain object. Also converts values to their respective internal types.
           * @param object Plain object
           * @returns MsgSend
           */
          public static fromObject(object: {
            [k: string]: any;
          }): hermes.hermes.v1beta1.types.MsgSend;

          /**
           * Creates a plain object from a MsgSend message. Also converts values to other types if specified.
           * @param message MsgSend
           * @param [options] Conversion options
           * @returns Plain object
           */
          public static toObject(
            message: hermes.hermes.v1beta1.types.MsgSend,
            options?: $protobuf.IConversionOptions
          ): { [k: string]: any };

          /**
           * Converts this MsgSend to JSON.
           * @returns JSON object
           */
          public toJSON(): { [k: string]: any };

          /**
           * Gets the default type url for MsgSend
           * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
           * @returns The default type url
           */
          public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a MsgSetIPAddress. */
        interface IMsgSetIPAddress {
          /** MsgSetIPAddress ipAddress */
          ipAddress?: string | null;

          /** MsgSetIPAddress signer */
          signer?: Uint8Array | null;
        }

        /** Represents a MsgSetIPAddress. */
        class MsgSetIPAddress implements IMsgSetIPAddress {
          /**
           * Constructs a new MsgSetIPAddress.
           * @param [properties] Properties to set
           */
          constructor(
            properties?: hermes.hermes.v1beta1.types.IMsgSetIPAddress
          );

          /** MsgSetIPAddress ipAddress. */
          public ipAddress: string;

          /** MsgSetIPAddress signer. */
          public signer: Uint8Array;

          /**
           * Creates a new MsgSetIPAddress instance using the specified properties.
           * @param [properties] Properties to set
           * @returns MsgSetIPAddress instance
           */
          public static create(
            properties?: hermes.hermes.v1beta1.types.IMsgSetIPAddress
          ): hermes.hermes.v1beta1.types.MsgSetIPAddress;

          /**
           * Encodes the specified MsgSetIPAddress message. Does not implicitly {@link hermes.hermes.v1beta1.types.MsgSetIPAddress.verify|verify} messages.
           * @param message MsgSetIPAddress message or plain object to encode
           * @param [writer] Writer to encode to
           * @returns Writer
           */
          public static encode(
            message: hermes.hermes.v1beta1.types.IMsgSetIPAddress,
            writer?: $protobuf.Writer
          ): $protobuf.Writer;

          /**
           * Encodes the specified MsgSetIPAddress message, length delimited. Does not implicitly {@link hermes.hermes.v1beta1.types.MsgSetIPAddress.verify|verify} messages.
           * @param message MsgSetIPAddress message or plain object to encode
           * @param [writer] Writer to encode to
           * @returns Writer
           */
          public static encodeDelimited(
            message: hermes.hermes.v1beta1.types.IMsgSetIPAddress,
            writer?: $protobuf.Writer
          ): $protobuf.Writer;

          /**
           * Decodes a MsgSetIPAddress message from the specified reader or buffer.
           * @param reader Reader or buffer to decode from
           * @param [length] Message length if known beforehand
           * @returns MsgSetIPAddress
           * @throws {Error} If the payload is not a reader or valid buffer
           * @throws {$protobuf.util.ProtocolError} If required fields are missing
           */
          public static decode(
            reader: $protobuf.Reader | Uint8Array,
            length?: number
          ): hermes.hermes.v1beta1.types.MsgSetIPAddress;

          /**
           * Decodes a MsgSetIPAddress message from the specified reader or buffer, length delimited.
           * @param reader Reader or buffer to decode from
           * @returns MsgSetIPAddress
           * @throws {Error} If the payload is not a reader or valid buffer
           * @throws {$protobuf.util.ProtocolError} If required fields are missing
           */
          public static decodeDelimited(
            reader: $protobuf.Reader | Uint8Array
          ): hermes.hermes.v1beta1.types.MsgSetIPAddress;

          /**
           * Verifies a MsgSetIPAddress message.
           * @param message Plain object to verify
           * @returns `null` if valid, otherwise the reason why it is not
           */
          public static verify(message: { [k: string]: any }): string | null;

          /**
           * Creates a MsgSetIPAddress message from a plain object. Also converts values to their respective internal types.
           * @param object Plain object
           * @returns MsgSetIPAddress
           */
          public static fromObject(object: {
            [k: string]: any;
          }): hermes.hermes.v1beta1.types.MsgSetIPAddress;

          /**
           * Creates a plain object from a MsgSetIPAddress message. Also converts values to other types if specified.
           * @param message MsgSetIPAddress
           * @param [options] Conversion options
           * @returns Plain object
           */
          public static toObject(
            message: hermes.hermes.v1beta1.types.MsgSetIPAddress,
            options?: $protobuf.IConversionOptions
          ): { [k: string]: any };

          /**
           * Converts this MsgSetIPAddress to JSON.
           * @returns JSON object
           */
          public toJSON(): { [k: string]: any };

          /**
           * Gets the default type url for MsgSetIPAddress
           * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
           * @returns The default type url
           */
          public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a MsgSetNodeKeys. */
        interface IMsgSetNodeKeys {
          /** MsgSetNodeKeys pubKeySetSet */
          pubKeySetSet?: common.IPubKeySet | null;

          /** MsgSetNodeKeys validatorConsPubKey */
          validatorConsPubKey?: string | null;

          /** MsgSetNodeKeys signer */
          signer?: Uint8Array | null;

          /** MsgSetNodeKeys dcValidatorAddress */
          dcValidatorAddress?: common.IDcAddress | null;
        }

        /** Represents a MsgSetNodeKeys. */
        class MsgSetNodeKeys implements IMsgSetNodeKeys {
          /**
           * Constructs a new MsgSetNodeKeys.
           * @param [properties] Properties to set
           */
          constructor(properties?: hermes.hermes.v1beta1.types.IMsgSetNodeKeys);

          /** MsgSetNodeKeys pubKeySetSet. */
          public pubKeySetSet?: common.IPubKeySet | null;

          /** MsgSetNodeKeys validatorConsPubKey. */
          public validatorConsPubKey: string;

          /** MsgSetNodeKeys signer. */
          public signer: Uint8Array;

          /** MsgSetNodeKeys dcValidatorAddress. */
          public dcValidatorAddress?: common.IDcAddress | null;

          /**
           * Creates a new MsgSetNodeKeys instance using the specified properties.
           * @param [properties] Properties to set
           * @returns MsgSetNodeKeys instance
           */
          public static create(
            properties?: hermes.hermes.v1beta1.types.IMsgSetNodeKeys
          ): hermes.hermes.v1beta1.types.MsgSetNodeKeys;

          /**
           * Encodes the specified MsgSetNodeKeys message. Does not implicitly {@link hermes.hermes.v1beta1.types.MsgSetNodeKeys.verify|verify} messages.
           * @param message MsgSetNodeKeys message or plain object to encode
           * @param [writer] Writer to encode to
           * @returns Writer
           */
          public static encode(
            message: hermes.hermes.v1beta1.types.IMsgSetNodeKeys,
            writer?: $protobuf.Writer
          ): $protobuf.Writer;

          /**
           * Encodes the specified MsgSetNodeKeys message, length delimited. Does not implicitly {@link hermes.hermes.v1beta1.types.MsgSetNodeKeys.verify|verify} messages.
           * @param message MsgSetNodeKeys message or plain object to encode
           * @param [writer] Writer to encode to
           * @returns Writer
           */
          public static encodeDelimited(
            message: hermes.hermes.v1beta1.types.IMsgSetNodeKeys,
            writer?: $protobuf.Writer
          ): $protobuf.Writer;

          /**
           * Decodes a MsgSetNodeKeys message from the specified reader or buffer.
           * @param reader Reader or buffer to decode from
           * @param [length] Message length if known beforehand
           * @returns MsgSetNodeKeys
           * @throws {Error} If the payload is not a reader or valid buffer
           * @throws {$protobuf.util.ProtocolError} If required fields are missing
           */
          public static decode(
            reader: $protobuf.Reader | Uint8Array,
            length?: number
          ): hermes.hermes.v1beta1.types.MsgSetNodeKeys;

          /**
           * Decodes a MsgSetNodeKeys message from the specified reader or buffer, length delimited.
           * @param reader Reader or buffer to decode from
           * @returns MsgSetNodeKeys
           * @throws {Error} If the payload is not a reader or valid buffer
           * @throws {$protobuf.util.ProtocolError} If required fields are missing
           */
          public static decodeDelimited(
            reader: $protobuf.Reader | Uint8Array
          ): hermes.hermes.v1beta1.types.MsgSetNodeKeys;

          /**
           * Verifies a MsgSetNodeKeys message.
           * @param message Plain object to verify
           * @returns `null` if valid, otherwise the reason why it is not
           */
          public static verify(message: { [k: string]: any }): string | null;

          /**
           * Creates a MsgSetNodeKeys message from a plain object. Also converts values to their respective internal types.
           * @param object Plain object
           * @returns MsgSetNodeKeys
           */
          public static fromObject(object: {
            [k: string]: any;
          }): hermes.hermes.v1beta1.types.MsgSetNodeKeys;

          /**
           * Creates a plain object from a MsgSetNodeKeys message. Also converts values to other types if specified.
           * @param message MsgSetNodeKeys
           * @param [options] Conversion options
           * @returns Plain object
           */
          public static toObject(
            message: hermes.hermes.v1beta1.types.MsgSetNodeKeys,
            options?: $protobuf.IConversionOptions
          ): { [k: string]: any };

          /**
           * Converts this MsgSetNodeKeys to JSON.
           * @returns JSON object
           */
          public toJSON(): { [k: string]: any };

          /**
           * Gets the default type url for MsgSetNodeKeys
           * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
           * @returns The default type url
           */
          public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a MsgSetVersion. */
        interface IMsgSetVersion {
          /** MsgSetVersion version */
          version?: string | null;

          /** MsgSetVersion signer */
          signer?: Uint8Array | null;
        }

        /** Represents a MsgSetVersion. */
        class MsgSetVersion implements IMsgSetVersion {
          /**
           * Constructs a new MsgSetVersion.
           * @param [properties] Properties to set
           */
          constructor(properties?: hermes.hermes.v1beta1.types.IMsgSetVersion);

          /** MsgSetVersion version. */
          public version: string;

          /** MsgSetVersion signer. */
          public signer: Uint8Array;

          /**
           * Creates a new MsgSetVersion instance using the specified properties.
           * @param [properties] Properties to set
           * @returns MsgSetVersion instance
           */
          public static create(
            properties?: hermes.hermes.v1beta1.types.IMsgSetVersion
          ): hermes.hermes.v1beta1.types.MsgSetVersion;

          /**
           * Encodes the specified MsgSetVersion message. Does not implicitly {@link hermes.hermes.v1beta1.types.MsgSetVersion.verify|verify} messages.
           * @param message MsgSetVersion message or plain object to encode
           * @param [writer] Writer to encode to
           * @returns Writer
           */
          public static encode(
            message: hermes.hermes.v1beta1.types.IMsgSetVersion,
            writer?: $protobuf.Writer
          ): $protobuf.Writer;

          /**
           * Encodes the specified MsgSetVersion message, length delimited. Does not implicitly {@link hermes.hermes.v1beta1.types.MsgSetVersion.verify|verify} messages.
           * @param message MsgSetVersion message or plain object to encode
           * @param [writer] Writer to encode to
           * @returns Writer
           */
          public static encodeDelimited(
            message: hermes.hermes.v1beta1.types.IMsgSetVersion,
            writer?: $protobuf.Writer
          ): $protobuf.Writer;

          /**
           * Decodes a MsgSetVersion message from the specified reader or buffer.
           * @param reader Reader or buffer to decode from
           * @param [length] Message length if known beforehand
           * @returns MsgSetVersion
           * @throws {Error} If the payload is not a reader or valid buffer
           * @throws {$protobuf.util.ProtocolError} If required fields are missing
           */
          public static decode(
            reader: $protobuf.Reader | Uint8Array,
            length?: number
          ): hermes.hermes.v1beta1.types.MsgSetVersion;

          /**
           * Decodes a MsgSetVersion message from the specified reader or buffer, length delimited.
           * @param reader Reader or buffer to decode from
           * @returns MsgSetVersion
           * @throws {Error} If the payload is not a reader or valid buffer
           * @throws {$protobuf.util.ProtocolError} If required fields are missing
           */
          public static decodeDelimited(
            reader: $protobuf.Reader | Uint8Array
          ): hermes.hermes.v1beta1.types.MsgSetVersion;

          /**
           * Verifies a MsgSetVersion message.
           * @param message Plain object to verify
           * @returns `null` if valid, otherwise the reason why it is not
           */
          public static verify(message: { [k: string]: any }): string | null;

          /**
           * Creates a MsgSetVersion message from a plain object. Also converts values to their respective internal types.
           * @param object Plain object
           * @returns MsgSetVersion
           */
          public static fromObject(object: {
            [k: string]: any;
          }): hermes.hermes.v1beta1.types.MsgSetVersion;

          /**
           * Creates a plain object from a MsgSetVersion message. Also converts values to other types if specified.
           * @param message MsgSetVersion
           * @param [options] Conversion options
           * @returns Plain object
           */
          public static toObject(
            message: hermes.hermes.v1beta1.types.MsgSetVersion,
            options?: $protobuf.IConversionOptions
          ): { [k: string]: any };

          /**
           * Converts this MsgSetVersion to JSON.
           * @returns JSON object
           */
          public toJSON(): { [k: string]: any };

          /**
           * Gets the default type url for MsgSetVersion
           * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
           * @returns The default type url
           */
          public static getTypeUrl(typeUrlPrefix?: string): string;
        }
      }
    }
  }

  /** Namespace operatorstaking. */
  namespace operatorstaking {
    /** Namespace v1beta1. */
    namespace v1beta1 {
      /** Represents a Msg */
      class Msg extends $protobuf.rpc.Service {
        /**
         * Constructs a new Msg service.
         * @param rpcImpl RPC implementation
         * @param [requestDelimited=false] Whether requests are length-delimited
         * @param [responseDelimited=false] Whether responses are length-delimited
         */
        constructor(
          rpcImpl: $protobuf.RPCImpl,
          requestDelimited?: boolean,
          responseDelimited?: boolean
        );

        /**
         * Creates new Msg service using the specified rpc implementation.
         * @param rpcImpl RPC implementation
         * @param [requestDelimited=false] Whether requests are length-delimited
         * @param [responseDelimited=false] Whether responses are length-delimited
         * @returns RPC service. Useful where requests and/or responses are streamed.
         */
        public static create(
          rpcImpl: $protobuf.RPCImpl,
          requestDelimited?: boolean,
          responseDelimited?: boolean
        ): Msg;

        /**
         * Calls CreateOperator.
         * @param request MsgCreateOperator message or plain object
         * @param callback Node-style callback called with the error, if any, and MsgCreateOperatorResponse
         */
        public createOperator(
          request: hermes.operatorstaking.v1beta1.IMsgCreateOperator,
          callback: hermes.operatorstaking.v1beta1.Msg.CreateOperatorCallback
        ): void;

        /**
         * Calls CreateOperator.
         * @param request MsgCreateOperator message or plain object
         * @returns Promise
         */
        public createOperator(
          request: hermes.operatorstaking.v1beta1.IMsgCreateOperator
        ): Promise<hermes.operatorstaking.v1beta1.MsgCreateOperatorResponse>;
      }

      namespace Msg {
        /**
         * Callback as used by {@link hermes.operatorstaking.v1beta1.Msg#createOperator}.
         * @param error Error, if any
         * @param [response] MsgCreateOperatorResponse
         */
        type CreateOperatorCallback = (
          error: Error | null,
          response?: hermes.operatorstaking.v1beta1.MsgCreateOperatorResponse
        ) => void;
      }

      /** Properties of a MsgCreateOperator. */
      interface IMsgCreateOperator {
        /** MsgCreateOperator stake */
        stake?: number | Long | null;

        /** MsgCreateOperator server */
        server?: string | null;

        /** MsgCreateOperator computeunits */
        computeunits?: number | Long | null;

        /** MsgCreateOperator signer */
        signer?: Uint8Array | null;
      }

      /** Represents a MsgCreateOperator. */
      class MsgCreateOperator implements IMsgCreateOperator {
        /**
         * Constructs a new MsgCreateOperator.
         * @param [properties] Properties to set
         */
        constructor(
          properties?: hermes.operatorstaking.v1beta1.IMsgCreateOperator
        );

        /** MsgCreateOperator stake. */
        public stake: number | Long;

        /** MsgCreateOperator server. */
        public server: string;

        /** MsgCreateOperator computeunits. */
        public computeunits: number | Long;

        /** MsgCreateOperator signer. */
        public signer: Uint8Array;

        /**
         * Creates a new MsgCreateOperator instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MsgCreateOperator instance
         */
        public static create(
          properties?: hermes.operatorstaking.v1beta1.IMsgCreateOperator
        ): hermes.operatorstaking.v1beta1.MsgCreateOperator;

        /**
         * Encodes the specified MsgCreateOperator message. Does not implicitly {@link hermes.operatorstaking.v1beta1.MsgCreateOperator.verify|verify} messages.
         * @param message MsgCreateOperator message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(
          message: hermes.operatorstaking.v1beta1.IMsgCreateOperator,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Encodes the specified MsgCreateOperator message, length delimited. Does not implicitly {@link hermes.operatorstaking.v1beta1.MsgCreateOperator.verify|verify} messages.
         * @param message MsgCreateOperator message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(
          message: hermes.operatorstaking.v1beta1.IMsgCreateOperator,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Decodes a MsgCreateOperator message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MsgCreateOperator
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          reader: $protobuf.Reader | Uint8Array,
          length?: number
        ): hermes.operatorstaking.v1beta1.MsgCreateOperator;

        /**
         * Decodes a MsgCreateOperator message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MsgCreateOperator
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(
          reader: $protobuf.Reader | Uint8Array
        ): hermes.operatorstaking.v1beta1.MsgCreateOperator;

        /**
         * Verifies a MsgCreateOperator message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates a MsgCreateOperator message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MsgCreateOperator
         */
        public static fromObject(object: {
          [k: string]: any;
        }): hermes.operatorstaking.v1beta1.MsgCreateOperator;

        /**
         * Creates a plain object from a MsgCreateOperator message. Also converts values to other types if specified.
         * @param message MsgCreateOperator
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(
          message: hermes.operatorstaking.v1beta1.MsgCreateOperator,
          options?: $protobuf.IConversionOptions
        ): { [k: string]: any };

        /**
         * Converts this MsgCreateOperator to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for MsgCreateOperator
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
      }

      /** Properties of a MsgCreateOperatorResponse. */
      interface IMsgCreateOperatorResponse {
        /** MsgCreateOperatorResponse created */
        created?: boolean | null;
      }

      /** Represents a MsgCreateOperatorResponse. */
      class MsgCreateOperatorResponse implements IMsgCreateOperatorResponse {
        /**
         * Constructs a new MsgCreateOperatorResponse.
         * @param [properties] Properties to set
         */
        constructor(
          properties?: hermes.operatorstaking.v1beta1.IMsgCreateOperatorResponse
        );

        /** MsgCreateOperatorResponse created. */
        public created: boolean;

        /**
         * Creates a new MsgCreateOperatorResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MsgCreateOperatorResponse instance
         */
        public static create(
          properties?: hermes.operatorstaking.v1beta1.IMsgCreateOperatorResponse
        ): hermes.operatorstaking.v1beta1.MsgCreateOperatorResponse;

        /**
         * Encodes the specified MsgCreateOperatorResponse message. Does not implicitly {@link hermes.operatorstaking.v1beta1.MsgCreateOperatorResponse.verify|verify} messages.
         * @param message MsgCreateOperatorResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(
          message: hermes.operatorstaking.v1beta1.IMsgCreateOperatorResponse,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Encodes the specified MsgCreateOperatorResponse message, length delimited. Does not implicitly {@link hermes.operatorstaking.v1beta1.MsgCreateOperatorResponse.verify|verify} messages.
         * @param message MsgCreateOperatorResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(
          message: hermes.operatorstaking.v1beta1.IMsgCreateOperatorResponse,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Decodes a MsgCreateOperatorResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MsgCreateOperatorResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          reader: $protobuf.Reader | Uint8Array,
          length?: number
        ): hermes.operatorstaking.v1beta1.MsgCreateOperatorResponse;

        /**
         * Decodes a MsgCreateOperatorResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MsgCreateOperatorResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(
          reader: $protobuf.Reader | Uint8Array
        ): hermes.operatorstaking.v1beta1.MsgCreateOperatorResponse;

        /**
         * Verifies a MsgCreateOperatorResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates a MsgCreateOperatorResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MsgCreateOperatorResponse
         */
        public static fromObject(object: {
          [k: string]: any;
        }): hermes.operatorstaking.v1beta1.MsgCreateOperatorResponse;

        /**
         * Creates a plain object from a MsgCreateOperatorResponse message. Also converts values to other types if specified.
         * @param message MsgCreateOperatorResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(
          message: hermes.operatorstaking.v1beta1.MsgCreateOperatorResponse,
          options?: $protobuf.IConversionOptions
        ): { [k: string]: any };

        /**
         * Converts this MsgCreateOperatorResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for MsgCreateOperatorResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
      }
    }
  }

  /** Namespace chainlist. */
  namespace chainlist {
    /** Namespace v1beta1. */
    namespace v1beta1 {
      /** Represents a Msg */
      class Msg extends $protobuf.rpc.Service {
        /**
         * Constructs a new Msg service.
         * @param rpcImpl RPC implementation
         * @param [requestDelimited=false] Whether requests are length-delimited
         * @param [responseDelimited=false] Whether responses are length-delimited
         */
        constructor(
          rpcImpl: $protobuf.RPCImpl,
          requestDelimited?: boolean,
          responseDelimited?: boolean
        );

        /**
         * Creates new Msg service using the specified rpc implementation.
         * @param rpcImpl RPC implementation
         * @param [requestDelimited=false] Whether requests are length-delimited
         * @param [responseDelimited=false] Whether responses are length-delimited
         * @returns RPC service. Useful where requests and/or responses are streamed.
         */
        public static create(
          rpcImpl: $protobuf.RPCImpl,
          requestDelimited?: boolean,
          responseDelimited?: boolean
        ): Msg;

        /**
         * Calls SubmitOptrWork.
         * @param request MsgSubmitOptrWorkRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and MsgSubmitOptrWorkResponse
         */
        public submitOptrWork(
          request: hermes.chainlist.v1beta1.IMsgSubmitOptrWorkRequest,
          callback: hermes.chainlist.v1beta1.Msg.SubmitOptrWorkCallback
        ): void;

        /**
         * Calls SubmitOptrWork.
         * @param request MsgSubmitOptrWorkRequest message or plain object
         * @returns Promise
         */
        public submitOptrWork(
          request: hermes.chainlist.v1beta1.IMsgSubmitOptrWorkRequest
        ): Promise<hermes.chainlist.v1beta1.MsgSubmitOptrWorkResponse>;

        /**
         * Calls RegisterChain.
         * @param request MsgRegisterChainWithCU message or plain object
         * @param callback Node-style callback called with the error, if any, and MsgRegisterChainWithCUResponse
         */
        public registerChain(
          request: hermes.chainlist.v1beta1.IMsgRegisterChainWithCU,
          callback: hermes.chainlist.v1beta1.Msg.RegisterChainCallback
        ): void;

        /**
         * Calls RegisterChain.
         * @param request MsgRegisterChainWithCU message or plain object
         * @returns Promise
         */
        public registerChain(
          request: hermes.chainlist.v1beta1.IMsgRegisterChainWithCU
        ): Promise<hermes.chainlist.v1beta1.MsgRegisterChainWithCUResponse>;

        /**
         * Calls VoteForChainCU.
         * @param request MsgVoteForChainCURequest message or plain object
         * @param callback Node-style callback called with the error, if any, and MsgVoteForChainCUResponse
         */
        public voteForChainCU(
          request: hermes.chainlist.v1beta1.IMsgVoteForChainCURequest,
          callback: hermes.chainlist.v1beta1.Msg.VoteForChainCUCallback
        ): void;

        /**
         * Calls VoteForChainCU.
         * @param request MsgVoteForChainCURequest message or plain object
         * @returns Promise
         */
        public voteForChainCU(
          request: hermes.chainlist.v1beta1.IMsgVoteForChainCURequest
        ): Promise<hermes.chainlist.v1beta1.MsgVoteForChainCUResponse>;

        /**
         * Calls CreateEndpoint.
         * @param request MsgCreateEndpoint message or plain object
         * @param callback Node-style callback called with the error, if any, and MsgCreateEndpointResponse
         */
        public createEndpoint(
          request: hermes.chainlist.v1beta1.IMsgCreateEndpoint,
          callback: hermes.chainlist.v1beta1.Msg.CreateEndpointCallback
        ): void;

        /**
         * Calls CreateEndpoint.
         * @param request MsgCreateEndpoint message or plain object
         * @returns Promise
         */
        public createEndpoint(
          request: hermes.chainlist.v1beta1.IMsgCreateEndpoint
        ): Promise<hermes.chainlist.v1beta1.MsgCreateEndpointResponse>;

        /**
         * Calls CreatePairingList.
         * @param request MsgCreatePairingList message or plain object
         * @param callback Node-style callback called with the error, if any, and MsgCreatePairingListResponse
         */
        public createPairingList(
          request: hermes.chainlist.v1beta1.IMsgCreatePairingList,
          callback: hermes.chainlist.v1beta1.Msg.CreatePairingListCallback
        ): void;

        /**
         * Calls CreatePairingList.
         * @param request MsgCreatePairingList message or plain object
         * @returns Promise
         */
        public createPairingList(
          request: hermes.chainlist.v1beta1.IMsgCreatePairingList
        ): Promise<hermes.chainlist.v1beta1.MsgCreatePairingListResponse>;

        /**
         * Calls IntializePairinglist.
         * @param request MsgInitializePairingList message or plain object
         * @param callback Node-style callback called with the error, if any, and MsgInitializePairingListResponse
         */
        public intializePairinglist(
          request: hermes.chainlist.v1beta1.IMsgInitializePairingList,
          callback: hermes.chainlist.v1beta1.Msg.IntializePairinglistCallback
        ): void;

        /**
         * Calls IntializePairinglist.
         * @param request MsgInitializePairingList message or plain object
         * @returns Promise
         */
        public intializePairinglist(
          request: hermes.chainlist.v1beta1.IMsgInitializePairingList
        ): Promise<hermes.chainlist.v1beta1.MsgInitializePairingListResponse>;

        /**
         * Calls RegisterCrawlerIp.
         * @param request MsgRegisterCrawlerIp message or plain object
         * @param callback Node-style callback called with the error, if any, and MsgRegisterCrawlerIPResponse
         */
        public registerCrawlerIp(
          request: hermes.chainlist.v1beta1.IMsgRegisterCrawlerIp,
          callback: hermes.chainlist.v1beta1.Msg.RegisterCrawlerIpCallback
        ): void;

        /**
         * Calls RegisterCrawlerIp.
         * @param request MsgRegisterCrawlerIp message or plain object
         * @returns Promise
         */
        public registerCrawlerIp(
          request: hermes.chainlist.v1beta1.IMsgRegisterCrawlerIp
        ): Promise<hermes.chainlist.v1beta1.MsgRegisterCrawlerIPResponse>;
      }

      namespace Msg {
        /**
         * Callback as used by {@link hermes.chainlist.v1beta1.Msg#submitOptrWork}.
         * @param error Error, if any
         * @param [response] MsgSubmitOptrWorkResponse
         */
        type SubmitOptrWorkCallback = (
          error: Error | null,
          response?: hermes.chainlist.v1beta1.MsgSubmitOptrWorkResponse
        ) => void;

        /**
         * Callback as used by {@link hermes.chainlist.v1beta1.Msg#registerChain}.
         * @param error Error, if any
         * @param [response] MsgRegisterChainWithCUResponse
         */
        type RegisterChainCallback = (
          error: Error | null,
          response?: hermes.chainlist.v1beta1.MsgRegisterChainWithCUResponse
        ) => void;

        /**
         * Callback as used by {@link hermes.chainlist.v1beta1.Msg#voteForChainCU}.
         * @param error Error, if any
         * @param [response] MsgVoteForChainCUResponse
         */
        type VoteForChainCUCallback = (
          error: Error | null,
          response?: hermes.chainlist.v1beta1.MsgVoteForChainCUResponse
        ) => void;

        /**
         * Callback as used by {@link hermes.chainlist.v1beta1.Msg#createEndpoint}.
         * @param error Error, if any
         * @param [response] MsgCreateEndpointResponse
         */
        type CreateEndpointCallback = (
          error: Error | null,
          response?: hermes.chainlist.v1beta1.MsgCreateEndpointResponse
        ) => void;

        /**
         * Callback as used by {@link hermes.chainlist.v1beta1.Msg#createPairingList}.
         * @param error Error, if any
         * @param [response] MsgCreatePairingListResponse
         */
        type CreatePairingListCallback = (
          error: Error | null,
          response?: hermes.chainlist.v1beta1.MsgCreatePairingListResponse
        ) => void;

        /**
         * Callback as used by {@link hermes.chainlist.v1beta1.Msg#intializePairinglist}.
         * @param error Error, if any
         * @param [response] MsgInitializePairingListResponse
         */
        type IntializePairinglistCallback = (
          error: Error | null,
          response?: hermes.chainlist.v1beta1.MsgInitializePairingListResponse
        ) => void;

        /**
         * Callback as used by {@link hermes.chainlist.v1beta1.Msg#registerCrawlerIp}.
         * @param error Error, if any
         * @param [response] MsgRegisterCrawlerIPResponse
         */
        type RegisterCrawlerIpCallback = (
          error: Error | null,
          response?: hermes.chainlist.v1beta1.MsgRegisterCrawlerIPResponse
        ) => void;
      }

      /** Properties of a MsgRegisterCrawlerIp. */
      interface IMsgRegisterCrawlerIp {
        /** MsgRegisterCrawlerIp Ip */
        Ip?: string | null;

        /** MsgRegisterCrawlerIp signer */
        signer?: Uint8Array | null;
      }

      /** Represents a MsgRegisterCrawlerIp. */
      class MsgRegisterCrawlerIp implements IMsgRegisterCrawlerIp {
        /**
         * Constructs a new MsgRegisterCrawlerIp.
         * @param [properties] Properties to set
         */
        constructor(
          properties?: hermes.chainlist.v1beta1.IMsgRegisterCrawlerIp
        );

        /** MsgRegisterCrawlerIp Ip. */
        public Ip: string;

        /** MsgRegisterCrawlerIp signer. */
        public signer: Uint8Array;

        /**
         * Creates a new MsgRegisterCrawlerIp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MsgRegisterCrawlerIp instance
         */
        public static create(
          properties?: hermes.chainlist.v1beta1.IMsgRegisterCrawlerIp
        ): hermes.chainlist.v1beta1.MsgRegisterCrawlerIp;

        /**
         * Encodes the specified MsgRegisterCrawlerIp message. Does not implicitly {@link hermes.chainlist.v1beta1.MsgRegisterCrawlerIp.verify|verify} messages.
         * @param message MsgRegisterCrawlerIp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(
          message: hermes.chainlist.v1beta1.IMsgRegisterCrawlerIp,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Encodes the specified MsgRegisterCrawlerIp message, length delimited. Does not implicitly {@link hermes.chainlist.v1beta1.MsgRegisterCrawlerIp.verify|verify} messages.
         * @param message MsgRegisterCrawlerIp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(
          message: hermes.chainlist.v1beta1.IMsgRegisterCrawlerIp,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Decodes a MsgRegisterCrawlerIp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MsgRegisterCrawlerIp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          reader: $protobuf.Reader | Uint8Array,
          length?: number
        ): hermes.chainlist.v1beta1.MsgRegisterCrawlerIp;

        /**
         * Decodes a MsgRegisterCrawlerIp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MsgRegisterCrawlerIp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(
          reader: $protobuf.Reader | Uint8Array
        ): hermes.chainlist.v1beta1.MsgRegisterCrawlerIp;

        /**
         * Verifies a MsgRegisterCrawlerIp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates a MsgRegisterCrawlerIp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MsgRegisterCrawlerIp
         */
        public static fromObject(object: {
          [k: string]: any;
        }): hermes.chainlist.v1beta1.MsgRegisterCrawlerIp;

        /**
         * Creates a plain object from a MsgRegisterCrawlerIp message. Also converts values to other types if specified.
         * @param message MsgRegisterCrawlerIp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(
          message: hermes.chainlist.v1beta1.MsgRegisterCrawlerIp,
          options?: $protobuf.IConversionOptions
        ): { [k: string]: any };

        /**
         * Converts this MsgRegisterCrawlerIp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for MsgRegisterCrawlerIp
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
      }

      /** Properties of a MsgRegisterCrawlerIPResponse. */
      interface IMsgRegisterCrawlerIPResponse {}

      /** Represents a MsgRegisterCrawlerIPResponse. */
      class MsgRegisterCrawlerIPResponse
        implements IMsgRegisterCrawlerIPResponse
      {
        /**
         * Constructs a new MsgRegisterCrawlerIPResponse.
         * @param [properties] Properties to set
         */
        constructor(
          properties?: hermes.chainlist.v1beta1.IMsgRegisterCrawlerIPResponse
        );

        /**
         * Creates a new MsgRegisterCrawlerIPResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MsgRegisterCrawlerIPResponse instance
         */
        public static create(
          properties?: hermes.chainlist.v1beta1.IMsgRegisterCrawlerIPResponse
        ): hermes.chainlist.v1beta1.MsgRegisterCrawlerIPResponse;

        /**
         * Encodes the specified MsgRegisterCrawlerIPResponse message. Does not implicitly {@link hermes.chainlist.v1beta1.MsgRegisterCrawlerIPResponse.verify|verify} messages.
         * @param message MsgRegisterCrawlerIPResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(
          message: hermes.chainlist.v1beta1.IMsgRegisterCrawlerIPResponse,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Encodes the specified MsgRegisterCrawlerIPResponse message, length delimited. Does not implicitly {@link hermes.chainlist.v1beta1.MsgRegisterCrawlerIPResponse.verify|verify} messages.
         * @param message MsgRegisterCrawlerIPResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(
          message: hermes.chainlist.v1beta1.IMsgRegisterCrawlerIPResponse,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Decodes a MsgRegisterCrawlerIPResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MsgRegisterCrawlerIPResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          reader: $protobuf.Reader | Uint8Array,
          length?: number
        ): hermes.chainlist.v1beta1.MsgRegisterCrawlerIPResponse;

        /**
         * Decodes a MsgRegisterCrawlerIPResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MsgRegisterCrawlerIPResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(
          reader: $protobuf.Reader | Uint8Array
        ): hermes.chainlist.v1beta1.MsgRegisterCrawlerIPResponse;

        /**
         * Verifies a MsgRegisterCrawlerIPResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates a MsgRegisterCrawlerIPResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MsgRegisterCrawlerIPResponse
         */
        public static fromObject(object: {
          [k: string]: any;
        }): hermes.chainlist.v1beta1.MsgRegisterCrawlerIPResponse;

        /**
         * Creates a plain object from a MsgRegisterCrawlerIPResponse message. Also converts values to other types if specified.
         * @param message MsgRegisterCrawlerIPResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(
          message: hermes.chainlist.v1beta1.MsgRegisterCrawlerIPResponse,
          options?: $protobuf.IConversionOptions
        ): { [k: string]: any };

        /**
         * Converts this MsgRegisterCrawlerIPResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for MsgRegisterCrawlerIPResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
      }

      /** Properties of a MsgSubmitOptrWorkRequest. */
      interface IMsgSubmitOptrWorkRequest {
        /** MsgSubmitOptrWorkRequest workdoneForChains */
        workdoneForChains?: hermes.chainlist.v1beta1.IWorkdoneForChain[] | null;

        /** MsgSubmitOptrWorkRequest signer */
        signer?: Uint8Array | null;
      }

      /** Represents a MsgSubmitOptrWorkRequest. */
      class MsgSubmitOptrWorkRequest implements IMsgSubmitOptrWorkRequest {
        /**
         * Constructs a new MsgSubmitOptrWorkRequest.
         * @param [properties] Properties to set
         */
        constructor(
          properties?: hermes.chainlist.v1beta1.IMsgSubmitOptrWorkRequest
        );

        /** MsgSubmitOptrWorkRequest workdoneForChains. */
        public workdoneForChains: hermes.chainlist.v1beta1.IWorkdoneForChain[];

        /** MsgSubmitOptrWorkRequest signer. */
        public signer: Uint8Array;

        /**
         * Creates a new MsgSubmitOptrWorkRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MsgSubmitOptrWorkRequest instance
         */
        public static create(
          properties?: hermes.chainlist.v1beta1.IMsgSubmitOptrWorkRequest
        ): hermes.chainlist.v1beta1.MsgSubmitOptrWorkRequest;

        /**
         * Encodes the specified MsgSubmitOptrWorkRequest message. Does not implicitly {@link hermes.chainlist.v1beta1.MsgSubmitOptrWorkRequest.verify|verify} messages.
         * @param message MsgSubmitOptrWorkRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(
          message: hermes.chainlist.v1beta1.IMsgSubmitOptrWorkRequest,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Encodes the specified MsgSubmitOptrWorkRequest message, length delimited. Does not implicitly {@link hermes.chainlist.v1beta1.MsgSubmitOptrWorkRequest.verify|verify} messages.
         * @param message MsgSubmitOptrWorkRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(
          message: hermes.chainlist.v1beta1.IMsgSubmitOptrWorkRequest,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Decodes a MsgSubmitOptrWorkRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MsgSubmitOptrWorkRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          reader: $protobuf.Reader | Uint8Array,
          length?: number
        ): hermes.chainlist.v1beta1.MsgSubmitOptrWorkRequest;

        /**
         * Decodes a MsgSubmitOptrWorkRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MsgSubmitOptrWorkRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(
          reader: $protobuf.Reader | Uint8Array
        ): hermes.chainlist.v1beta1.MsgSubmitOptrWorkRequest;

        /**
         * Verifies a MsgSubmitOptrWorkRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates a MsgSubmitOptrWorkRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MsgSubmitOptrWorkRequest
         */
        public static fromObject(object: {
          [k: string]: any;
        }): hermes.chainlist.v1beta1.MsgSubmitOptrWorkRequest;

        /**
         * Creates a plain object from a MsgSubmitOptrWorkRequest message. Also converts values to other types if specified.
         * @param message MsgSubmitOptrWorkRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(
          message: hermes.chainlist.v1beta1.MsgSubmitOptrWorkRequest,
          options?: $protobuf.IConversionOptions
        ): { [k: string]: any };

        /**
         * Converts this MsgSubmitOptrWorkRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for MsgSubmitOptrWorkRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
      }

      /** Properties of a MsgSubmitOptrWorkResponse. */
      interface IMsgSubmitOptrWorkResponse {}

      /** Represents a MsgSubmitOptrWorkResponse. */
      class MsgSubmitOptrWorkResponse implements IMsgSubmitOptrWorkResponse {
        /**
         * Constructs a new MsgSubmitOptrWorkResponse.
         * @param [properties] Properties to set
         */
        constructor(
          properties?: hermes.chainlist.v1beta1.IMsgSubmitOptrWorkResponse
        );

        /**
         * Creates a new MsgSubmitOptrWorkResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MsgSubmitOptrWorkResponse instance
         */
        public static create(
          properties?: hermes.chainlist.v1beta1.IMsgSubmitOptrWorkResponse
        ): hermes.chainlist.v1beta1.MsgSubmitOptrWorkResponse;

        /**
         * Encodes the specified MsgSubmitOptrWorkResponse message. Does not implicitly {@link hermes.chainlist.v1beta1.MsgSubmitOptrWorkResponse.verify|verify} messages.
         * @param message MsgSubmitOptrWorkResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(
          message: hermes.chainlist.v1beta1.IMsgSubmitOptrWorkResponse,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Encodes the specified MsgSubmitOptrWorkResponse message, length delimited. Does not implicitly {@link hermes.chainlist.v1beta1.MsgSubmitOptrWorkResponse.verify|verify} messages.
         * @param message MsgSubmitOptrWorkResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(
          message: hermes.chainlist.v1beta1.IMsgSubmitOptrWorkResponse,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Decodes a MsgSubmitOptrWorkResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MsgSubmitOptrWorkResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          reader: $protobuf.Reader | Uint8Array,
          length?: number
        ): hermes.chainlist.v1beta1.MsgSubmitOptrWorkResponse;

        /**
         * Decodes a MsgSubmitOptrWorkResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MsgSubmitOptrWorkResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(
          reader: $protobuf.Reader | Uint8Array
        ): hermes.chainlist.v1beta1.MsgSubmitOptrWorkResponse;

        /**
         * Verifies a MsgSubmitOptrWorkResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates a MsgSubmitOptrWorkResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MsgSubmitOptrWorkResponse
         */
        public static fromObject(object: {
          [k: string]: any;
        }): hermes.chainlist.v1beta1.MsgSubmitOptrWorkResponse;

        /**
         * Creates a plain object from a MsgSubmitOptrWorkResponse message. Also converts values to other types if specified.
         * @param message MsgSubmitOptrWorkResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(
          message: hermes.chainlist.v1beta1.MsgSubmitOptrWorkResponse,
          options?: $protobuf.IConversionOptions
        ): { [k: string]: any };

        /**
         * Converts this MsgSubmitOptrWorkResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for MsgSubmitOptrWorkResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
      }

      /** Properties of a MsgRegisterChainWithCU. */
      interface IMsgRegisterChainWithCU {
        /** MsgRegisterChainWithCU Chain */
        Chain?: hermes.chainlist.v1beta1.IChain | null;

        /** MsgRegisterChainWithCU Cu */
        Cu?: hermes.chainlist.v1beta1.IComputeUnits | null;

        /** MsgRegisterChainWithCU signer */
        signer?: Uint8Array | null;
      }

      /** Represents a MsgRegisterChainWithCU. */
      class MsgRegisterChainWithCU implements IMsgRegisterChainWithCU {
        /**
         * Constructs a new MsgRegisterChainWithCU.
         * @param [properties] Properties to set
         */
        constructor(
          properties?: hermes.chainlist.v1beta1.IMsgRegisterChainWithCU
        );

        /** MsgRegisterChainWithCU Chain. */
        public Chain?: hermes.chainlist.v1beta1.IChain | null;

        /** MsgRegisterChainWithCU Cu. */
        public Cu?: hermes.chainlist.v1beta1.IComputeUnits | null;

        /** MsgRegisterChainWithCU signer. */
        public signer: Uint8Array;

        /**
         * Creates a new MsgRegisterChainWithCU instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MsgRegisterChainWithCU instance
         */
        public static create(
          properties?: hermes.chainlist.v1beta1.IMsgRegisterChainWithCU
        ): hermes.chainlist.v1beta1.MsgRegisterChainWithCU;

        /**
         * Encodes the specified MsgRegisterChainWithCU message. Does not implicitly {@link hermes.chainlist.v1beta1.MsgRegisterChainWithCU.verify|verify} messages.
         * @param message MsgRegisterChainWithCU message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(
          message: hermes.chainlist.v1beta1.IMsgRegisterChainWithCU,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Encodes the specified MsgRegisterChainWithCU message, length delimited. Does not implicitly {@link hermes.chainlist.v1beta1.MsgRegisterChainWithCU.verify|verify} messages.
         * @param message MsgRegisterChainWithCU message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(
          message: hermes.chainlist.v1beta1.IMsgRegisterChainWithCU,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Decodes a MsgRegisterChainWithCU message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MsgRegisterChainWithCU
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          reader: $protobuf.Reader | Uint8Array,
          length?: number
        ): hermes.chainlist.v1beta1.MsgRegisterChainWithCU;

        /**
         * Decodes a MsgRegisterChainWithCU message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MsgRegisterChainWithCU
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(
          reader: $protobuf.Reader | Uint8Array
        ): hermes.chainlist.v1beta1.MsgRegisterChainWithCU;

        /**
         * Verifies a MsgRegisterChainWithCU message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates a MsgRegisterChainWithCU message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MsgRegisterChainWithCU
         */
        public static fromObject(object: {
          [k: string]: any;
        }): hermes.chainlist.v1beta1.MsgRegisterChainWithCU;

        /**
         * Creates a plain object from a MsgRegisterChainWithCU message. Also converts values to other types if specified.
         * @param message MsgRegisterChainWithCU
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(
          message: hermes.chainlist.v1beta1.MsgRegisterChainWithCU,
          options?: $protobuf.IConversionOptions
        ): { [k: string]: any };

        /**
         * Converts this MsgRegisterChainWithCU to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for MsgRegisterChainWithCU
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
      }

      /** Properties of a MsgRegisterChainWithCUResponse. */
      interface IMsgRegisterChainWithCUResponse {}

      /** Represents a MsgRegisterChainWithCUResponse. */
      class MsgRegisterChainWithCUResponse
        implements IMsgRegisterChainWithCUResponse
      {
        /**
         * Constructs a new MsgRegisterChainWithCUResponse.
         * @param [properties] Properties to set
         */
        constructor(
          properties?: hermes.chainlist.v1beta1.IMsgRegisterChainWithCUResponse
        );

        /**
         * Creates a new MsgRegisterChainWithCUResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MsgRegisterChainWithCUResponse instance
         */
        public static create(
          properties?: hermes.chainlist.v1beta1.IMsgRegisterChainWithCUResponse
        ): hermes.chainlist.v1beta1.MsgRegisterChainWithCUResponse;

        /**
         * Encodes the specified MsgRegisterChainWithCUResponse message. Does not implicitly {@link hermes.chainlist.v1beta1.MsgRegisterChainWithCUResponse.verify|verify} messages.
         * @param message MsgRegisterChainWithCUResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(
          message: hermes.chainlist.v1beta1.IMsgRegisterChainWithCUResponse,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Encodes the specified MsgRegisterChainWithCUResponse message, length delimited. Does not implicitly {@link hermes.chainlist.v1beta1.MsgRegisterChainWithCUResponse.verify|verify} messages.
         * @param message MsgRegisterChainWithCUResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(
          message: hermes.chainlist.v1beta1.IMsgRegisterChainWithCUResponse,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Decodes a MsgRegisterChainWithCUResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MsgRegisterChainWithCUResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          reader: $protobuf.Reader | Uint8Array,
          length?: number
        ): hermes.chainlist.v1beta1.MsgRegisterChainWithCUResponse;

        /**
         * Decodes a MsgRegisterChainWithCUResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MsgRegisterChainWithCUResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(
          reader: $protobuf.Reader | Uint8Array
        ): hermes.chainlist.v1beta1.MsgRegisterChainWithCUResponse;

        /**
         * Verifies a MsgRegisterChainWithCUResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates a MsgRegisterChainWithCUResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MsgRegisterChainWithCUResponse
         */
        public static fromObject(object: {
          [k: string]: any;
        }): hermes.chainlist.v1beta1.MsgRegisterChainWithCUResponse;

        /**
         * Creates a plain object from a MsgRegisterChainWithCUResponse message. Also converts values to other types if specified.
         * @param message MsgRegisterChainWithCUResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(
          message: hermes.chainlist.v1beta1.MsgRegisterChainWithCUResponse,
          options?: $protobuf.IConversionOptions
        ): { [k: string]: any };

        /**
         * Converts this MsgRegisterChainWithCUResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for MsgRegisterChainWithCUResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
      }

      /** Properties of a MsgVoteForChainCURequest. */
      interface IMsgVoteForChainCURequest {
        /** MsgVoteForChainCURequest Chain */
        Chain?: hermes.chainlist.v1beta1.IChain | null;

        /** MsgVoteForChainCURequest signer */
        signer?: Uint8Array | null;
      }

      /** Represents a MsgVoteForChainCURequest. */
      class MsgVoteForChainCURequest implements IMsgVoteForChainCURequest {
        /**
         * Constructs a new MsgVoteForChainCURequest.
         * @param [properties] Properties to set
         */
        constructor(
          properties?: hermes.chainlist.v1beta1.IMsgVoteForChainCURequest
        );

        /** MsgVoteForChainCURequest Chain. */
        public Chain?: hermes.chainlist.v1beta1.IChain | null;

        /** MsgVoteForChainCURequest signer. */
        public signer: Uint8Array;

        /**
         * Creates a new MsgVoteForChainCURequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MsgVoteForChainCURequest instance
         */
        public static create(
          properties?: hermes.chainlist.v1beta1.IMsgVoteForChainCURequest
        ): hermes.chainlist.v1beta1.MsgVoteForChainCURequest;

        /**
         * Encodes the specified MsgVoteForChainCURequest message. Does not implicitly {@link hermes.chainlist.v1beta1.MsgVoteForChainCURequest.verify|verify} messages.
         * @param message MsgVoteForChainCURequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(
          message: hermes.chainlist.v1beta1.IMsgVoteForChainCURequest,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Encodes the specified MsgVoteForChainCURequest message, length delimited. Does not implicitly {@link hermes.chainlist.v1beta1.MsgVoteForChainCURequest.verify|verify} messages.
         * @param message MsgVoteForChainCURequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(
          message: hermes.chainlist.v1beta1.IMsgVoteForChainCURequest,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Decodes a MsgVoteForChainCURequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MsgVoteForChainCURequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          reader: $protobuf.Reader | Uint8Array,
          length?: number
        ): hermes.chainlist.v1beta1.MsgVoteForChainCURequest;

        /**
         * Decodes a MsgVoteForChainCURequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MsgVoteForChainCURequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(
          reader: $protobuf.Reader | Uint8Array
        ): hermes.chainlist.v1beta1.MsgVoteForChainCURequest;

        /**
         * Verifies a MsgVoteForChainCURequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates a MsgVoteForChainCURequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MsgVoteForChainCURequest
         */
        public static fromObject(object: {
          [k: string]: any;
        }): hermes.chainlist.v1beta1.MsgVoteForChainCURequest;

        /**
         * Creates a plain object from a MsgVoteForChainCURequest message. Also converts values to other types if specified.
         * @param message MsgVoteForChainCURequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(
          message: hermes.chainlist.v1beta1.MsgVoteForChainCURequest,
          options?: $protobuf.IConversionOptions
        ): { [k: string]: any };

        /**
         * Converts this MsgVoteForChainCURequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for MsgVoteForChainCURequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
      }

      /** Properties of a MsgVoteForChainCUResponse. */
      interface IMsgVoteForChainCUResponse {}

      /** Represents a MsgVoteForChainCUResponse. */
      class MsgVoteForChainCUResponse implements IMsgVoteForChainCUResponse {
        /**
         * Constructs a new MsgVoteForChainCUResponse.
         * @param [properties] Properties to set
         */
        constructor(
          properties?: hermes.chainlist.v1beta1.IMsgVoteForChainCUResponse
        );

        /**
         * Creates a new MsgVoteForChainCUResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MsgVoteForChainCUResponse instance
         */
        public static create(
          properties?: hermes.chainlist.v1beta1.IMsgVoteForChainCUResponse
        ): hermes.chainlist.v1beta1.MsgVoteForChainCUResponse;

        /**
         * Encodes the specified MsgVoteForChainCUResponse message. Does not implicitly {@link hermes.chainlist.v1beta1.MsgVoteForChainCUResponse.verify|verify} messages.
         * @param message MsgVoteForChainCUResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(
          message: hermes.chainlist.v1beta1.IMsgVoteForChainCUResponse,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Encodes the specified MsgVoteForChainCUResponse message, length delimited. Does not implicitly {@link hermes.chainlist.v1beta1.MsgVoteForChainCUResponse.verify|verify} messages.
         * @param message MsgVoteForChainCUResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(
          message: hermes.chainlist.v1beta1.IMsgVoteForChainCUResponse,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Decodes a MsgVoteForChainCUResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MsgVoteForChainCUResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          reader: $protobuf.Reader | Uint8Array,
          length?: number
        ): hermes.chainlist.v1beta1.MsgVoteForChainCUResponse;

        /**
         * Decodes a MsgVoteForChainCUResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MsgVoteForChainCUResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(
          reader: $protobuf.Reader | Uint8Array
        ): hermes.chainlist.v1beta1.MsgVoteForChainCUResponse;

        /**
         * Verifies a MsgVoteForChainCUResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates a MsgVoteForChainCUResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MsgVoteForChainCUResponse
         */
        public static fromObject(object: {
          [k: string]: any;
        }): hermes.chainlist.v1beta1.MsgVoteForChainCUResponse;

        /**
         * Creates a plain object from a MsgVoteForChainCUResponse message. Also converts values to other types if specified.
         * @param message MsgVoteForChainCUResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(
          message: hermes.chainlist.v1beta1.MsgVoteForChainCUResponse,
          options?: $protobuf.IConversionOptions
        ): { [k: string]: any };

        /**
         * Converts this MsgVoteForChainCUResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for MsgVoteForChainCUResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
      }

      /** Properties of a MsgCreateEndpoint. */
      interface IMsgCreateEndpoint {
        /** MsgCreateEndpoint Chain */
        Chain?: hermes.chainlist.v1beta1.IChain | null;

        /** MsgCreateEndpoint Rpc */
        Rpc?: string | null;

        /** MsgCreateEndpoint Ws */
        Ws?: string | null;

        /** MsgCreateEndpoint signer */
        signer?: Uint8Array | null;
      }

      /** Represents a MsgCreateEndpoint. */
      class MsgCreateEndpoint implements IMsgCreateEndpoint {
        /**
         * Constructs a new MsgCreateEndpoint.
         * @param [properties] Properties to set
         */
        constructor(properties?: hermes.chainlist.v1beta1.IMsgCreateEndpoint);

        /** MsgCreateEndpoint Chain. */
        public Chain?: hermes.chainlist.v1beta1.IChain | null;

        /** MsgCreateEndpoint Rpc. */
        public Rpc: string;

        /** MsgCreateEndpoint Ws. */
        public Ws: string;

        /** MsgCreateEndpoint signer. */
        public signer: Uint8Array;

        /**
         * Creates a new MsgCreateEndpoint instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MsgCreateEndpoint instance
         */
        public static create(
          properties?: hermes.chainlist.v1beta1.IMsgCreateEndpoint
        ): hermes.chainlist.v1beta1.MsgCreateEndpoint;

        /**
         * Encodes the specified MsgCreateEndpoint message. Does not implicitly {@link hermes.chainlist.v1beta1.MsgCreateEndpoint.verify|verify} messages.
         * @param message MsgCreateEndpoint message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(
          message: hermes.chainlist.v1beta1.IMsgCreateEndpoint,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Encodes the specified MsgCreateEndpoint message, length delimited. Does not implicitly {@link hermes.chainlist.v1beta1.MsgCreateEndpoint.verify|verify} messages.
         * @param message MsgCreateEndpoint message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(
          message: hermes.chainlist.v1beta1.IMsgCreateEndpoint,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Decodes a MsgCreateEndpoint message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MsgCreateEndpoint
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          reader: $protobuf.Reader | Uint8Array,
          length?: number
        ): hermes.chainlist.v1beta1.MsgCreateEndpoint;

        /**
         * Decodes a MsgCreateEndpoint message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MsgCreateEndpoint
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(
          reader: $protobuf.Reader | Uint8Array
        ): hermes.chainlist.v1beta1.MsgCreateEndpoint;

        /**
         * Verifies a MsgCreateEndpoint message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates a MsgCreateEndpoint message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MsgCreateEndpoint
         */
        public static fromObject(object: {
          [k: string]: any;
        }): hermes.chainlist.v1beta1.MsgCreateEndpoint;

        /**
         * Creates a plain object from a MsgCreateEndpoint message. Also converts values to other types if specified.
         * @param message MsgCreateEndpoint
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(
          message: hermes.chainlist.v1beta1.MsgCreateEndpoint,
          options?: $protobuf.IConversionOptions
        ): { [k: string]: any };

        /**
         * Converts this MsgCreateEndpoint to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for MsgCreateEndpoint
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
      }

      /** Properties of a MsgCreateEndpointResponse. */
      interface IMsgCreateEndpointResponse {}

      /** Represents a MsgCreateEndpointResponse. */
      class MsgCreateEndpointResponse implements IMsgCreateEndpointResponse {
        /**
         * Constructs a new MsgCreateEndpointResponse.
         * @param [properties] Properties to set
         */
        constructor(
          properties?: hermes.chainlist.v1beta1.IMsgCreateEndpointResponse
        );

        /**
         * Creates a new MsgCreateEndpointResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MsgCreateEndpointResponse instance
         */
        public static create(
          properties?: hermes.chainlist.v1beta1.IMsgCreateEndpointResponse
        ): hermes.chainlist.v1beta1.MsgCreateEndpointResponse;

        /**
         * Encodes the specified MsgCreateEndpointResponse message. Does not implicitly {@link hermes.chainlist.v1beta1.MsgCreateEndpointResponse.verify|verify} messages.
         * @param message MsgCreateEndpointResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(
          message: hermes.chainlist.v1beta1.IMsgCreateEndpointResponse,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Encodes the specified MsgCreateEndpointResponse message, length delimited. Does not implicitly {@link hermes.chainlist.v1beta1.MsgCreateEndpointResponse.verify|verify} messages.
         * @param message MsgCreateEndpointResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(
          message: hermes.chainlist.v1beta1.IMsgCreateEndpointResponse,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Decodes a MsgCreateEndpointResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MsgCreateEndpointResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          reader: $protobuf.Reader | Uint8Array,
          length?: number
        ): hermes.chainlist.v1beta1.MsgCreateEndpointResponse;

        /**
         * Decodes a MsgCreateEndpointResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MsgCreateEndpointResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(
          reader: $protobuf.Reader | Uint8Array
        ): hermes.chainlist.v1beta1.MsgCreateEndpointResponse;

        /**
         * Verifies a MsgCreateEndpointResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates a MsgCreateEndpointResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MsgCreateEndpointResponse
         */
        public static fromObject(object: {
          [k: string]: any;
        }): hermes.chainlist.v1beta1.MsgCreateEndpointResponse;

        /**
         * Creates a plain object from a MsgCreateEndpointResponse message. Also converts values to other types if specified.
         * @param message MsgCreateEndpointResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(
          message: hermes.chainlist.v1beta1.MsgCreateEndpointResponse,
          options?: $protobuf.IConversionOptions
        ): { [k: string]: any };

        /**
         * Converts this MsgCreateEndpointResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for MsgCreateEndpointResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
      }

      /** Properties of a MsgCreatePairingList. */
      interface IMsgCreatePairingList {
        /** MsgCreatePairingList ChainsPL */
        ChainsPL?: hermes.chainlist.v1beta1.IChainPairingList[] | null;

        /** MsgCreatePairingList signer */
        signer?: Uint8Array | null;
      }

      /** Represents a MsgCreatePairingList. */
      class MsgCreatePairingList implements IMsgCreatePairingList {
        /**
         * Constructs a new MsgCreatePairingList.
         * @param [properties] Properties to set
         */
        constructor(
          properties?: hermes.chainlist.v1beta1.IMsgCreatePairingList
        );

        /** MsgCreatePairingList ChainsPL. */
        public ChainsPL: hermes.chainlist.v1beta1.IChainPairingList[];

        /** MsgCreatePairingList signer. */
        public signer: Uint8Array;

        /**
         * Creates a new MsgCreatePairingList instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MsgCreatePairingList instance
         */
        public static create(
          properties?: hermes.chainlist.v1beta1.IMsgCreatePairingList
        ): hermes.chainlist.v1beta1.MsgCreatePairingList;

        /**
         * Encodes the specified MsgCreatePairingList message. Does not implicitly {@link hermes.chainlist.v1beta1.MsgCreatePairingList.verify|verify} messages.
         * @param message MsgCreatePairingList message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(
          message: hermes.chainlist.v1beta1.IMsgCreatePairingList,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Encodes the specified MsgCreatePairingList message, length delimited. Does not implicitly {@link hermes.chainlist.v1beta1.MsgCreatePairingList.verify|verify} messages.
         * @param message MsgCreatePairingList message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(
          message: hermes.chainlist.v1beta1.IMsgCreatePairingList,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Decodes a MsgCreatePairingList message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MsgCreatePairingList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          reader: $protobuf.Reader | Uint8Array,
          length?: number
        ): hermes.chainlist.v1beta1.MsgCreatePairingList;

        /**
         * Decodes a MsgCreatePairingList message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MsgCreatePairingList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(
          reader: $protobuf.Reader | Uint8Array
        ): hermes.chainlist.v1beta1.MsgCreatePairingList;

        /**
         * Verifies a MsgCreatePairingList message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates a MsgCreatePairingList message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MsgCreatePairingList
         */
        public static fromObject(object: {
          [k: string]: any;
        }): hermes.chainlist.v1beta1.MsgCreatePairingList;

        /**
         * Creates a plain object from a MsgCreatePairingList message. Also converts values to other types if specified.
         * @param message MsgCreatePairingList
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(
          message: hermes.chainlist.v1beta1.MsgCreatePairingList,
          options?: $protobuf.IConversionOptions
        ): { [k: string]: any };

        /**
         * Converts this MsgCreatePairingList to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for MsgCreatePairingList
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
      }

      /** Properties of a MsgInitializePairingList. */
      interface IMsgInitializePairingList {
        /** MsgInitializePairingList ChainsPL */
        ChainsPL?: hermes.chainlist.v1beta1.IChainPairingList[] | null;

        /** MsgInitializePairingList signer */
        signer?: Uint8Array | null;
      }

      /** Represents a MsgInitializePairingList. */
      class MsgInitializePairingList implements IMsgInitializePairingList {
        /**
         * Constructs a new MsgInitializePairingList.
         * @param [properties] Properties to set
         */
        constructor(
          properties?: hermes.chainlist.v1beta1.IMsgInitializePairingList
        );

        /** MsgInitializePairingList ChainsPL. */
        public ChainsPL: hermes.chainlist.v1beta1.IChainPairingList[];

        /** MsgInitializePairingList signer. */
        public signer: Uint8Array;

        /**
         * Creates a new MsgInitializePairingList instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MsgInitializePairingList instance
         */
        public static create(
          properties?: hermes.chainlist.v1beta1.IMsgInitializePairingList
        ): hermes.chainlist.v1beta1.MsgInitializePairingList;

        /**
         * Encodes the specified MsgInitializePairingList message. Does not implicitly {@link hermes.chainlist.v1beta1.MsgInitializePairingList.verify|verify} messages.
         * @param message MsgInitializePairingList message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(
          message: hermes.chainlist.v1beta1.IMsgInitializePairingList,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Encodes the specified MsgInitializePairingList message, length delimited. Does not implicitly {@link hermes.chainlist.v1beta1.MsgInitializePairingList.verify|verify} messages.
         * @param message MsgInitializePairingList message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(
          message: hermes.chainlist.v1beta1.IMsgInitializePairingList,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Decodes a MsgInitializePairingList message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MsgInitializePairingList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          reader: $protobuf.Reader | Uint8Array,
          length?: number
        ): hermes.chainlist.v1beta1.MsgInitializePairingList;

        /**
         * Decodes a MsgInitializePairingList message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MsgInitializePairingList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(
          reader: $protobuf.Reader | Uint8Array
        ): hermes.chainlist.v1beta1.MsgInitializePairingList;

        /**
         * Verifies a MsgInitializePairingList message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates a MsgInitializePairingList message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MsgInitializePairingList
         */
        public static fromObject(object: {
          [k: string]: any;
        }): hermes.chainlist.v1beta1.MsgInitializePairingList;

        /**
         * Creates a plain object from a MsgInitializePairingList message. Also converts values to other types if specified.
         * @param message MsgInitializePairingList
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(
          message: hermes.chainlist.v1beta1.MsgInitializePairingList,
          options?: $protobuf.IConversionOptions
        ): { [k: string]: any };

        /**
         * Converts this MsgInitializePairingList to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for MsgInitializePairingList
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
      }

      /** Properties of a ChainPairingList. */
      interface IChainPairingList {
        /** ChainPairingList Chain */
        Chain?: hermes.chainlist.v1beta1.IChain | null;

        /** ChainPairingList OperatorList */
        OperatorList?: string[] | null;

        /** ChainPairingList CrawlerList */
        CrawlerList?: string[] | null;
      }

      /** Represents a ChainPairingList. */
      class ChainPairingList implements IChainPairingList {
        /**
         * Constructs a new ChainPairingList.
         * @param [properties] Properties to set
         */
        constructor(properties?: hermes.chainlist.v1beta1.IChainPairingList);

        /** ChainPairingList Chain. */
        public Chain?: hermes.chainlist.v1beta1.IChain | null;

        /** ChainPairingList OperatorList. */
        public OperatorList: string[];

        /** ChainPairingList CrawlerList. */
        public CrawlerList: string[];

        /**
         * Creates a new ChainPairingList instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ChainPairingList instance
         */
        public static create(
          properties?: hermes.chainlist.v1beta1.IChainPairingList
        ): hermes.chainlist.v1beta1.ChainPairingList;

        /**
         * Encodes the specified ChainPairingList message. Does not implicitly {@link hermes.chainlist.v1beta1.ChainPairingList.verify|verify} messages.
         * @param message ChainPairingList message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(
          message: hermes.chainlist.v1beta1.IChainPairingList,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Encodes the specified ChainPairingList message, length delimited. Does not implicitly {@link hermes.chainlist.v1beta1.ChainPairingList.verify|verify} messages.
         * @param message ChainPairingList message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(
          message: hermes.chainlist.v1beta1.IChainPairingList,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Decodes a ChainPairingList message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ChainPairingList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          reader: $protobuf.Reader | Uint8Array,
          length?: number
        ): hermes.chainlist.v1beta1.ChainPairingList;

        /**
         * Decodes a ChainPairingList message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ChainPairingList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(
          reader: $protobuf.Reader | Uint8Array
        ): hermes.chainlist.v1beta1.ChainPairingList;

        /**
         * Verifies a ChainPairingList message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates a ChainPairingList message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ChainPairingList
         */
        public static fromObject(object: {
          [k: string]: any;
        }): hermes.chainlist.v1beta1.ChainPairingList;

        /**
         * Creates a plain object from a ChainPairingList message. Also converts values to other types if specified.
         * @param message ChainPairingList
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(
          message: hermes.chainlist.v1beta1.ChainPairingList,
          options?: $protobuf.IConversionOptions
        ): { [k: string]: any };

        /**
         * Converts this ChainPairingList to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ChainPairingList
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
      }

      /** Properties of a MsgCreatePairingListResponse. */
      interface IMsgCreatePairingListResponse {}

      /** Represents a MsgCreatePairingListResponse. */
      class MsgCreatePairingListResponse
        implements IMsgCreatePairingListResponse
      {
        /**
         * Constructs a new MsgCreatePairingListResponse.
         * @param [properties] Properties to set
         */
        constructor(
          properties?: hermes.chainlist.v1beta1.IMsgCreatePairingListResponse
        );

        /**
         * Creates a new MsgCreatePairingListResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MsgCreatePairingListResponse instance
         */
        public static create(
          properties?: hermes.chainlist.v1beta1.IMsgCreatePairingListResponse
        ): hermes.chainlist.v1beta1.MsgCreatePairingListResponse;

        /**
         * Encodes the specified MsgCreatePairingListResponse message. Does not implicitly {@link hermes.chainlist.v1beta1.MsgCreatePairingListResponse.verify|verify} messages.
         * @param message MsgCreatePairingListResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(
          message: hermes.chainlist.v1beta1.IMsgCreatePairingListResponse,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Encodes the specified MsgCreatePairingListResponse message, length delimited. Does not implicitly {@link hermes.chainlist.v1beta1.MsgCreatePairingListResponse.verify|verify} messages.
         * @param message MsgCreatePairingListResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(
          message: hermes.chainlist.v1beta1.IMsgCreatePairingListResponse,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Decodes a MsgCreatePairingListResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MsgCreatePairingListResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          reader: $protobuf.Reader | Uint8Array,
          length?: number
        ): hermes.chainlist.v1beta1.MsgCreatePairingListResponse;

        /**
         * Decodes a MsgCreatePairingListResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MsgCreatePairingListResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(
          reader: $protobuf.Reader | Uint8Array
        ): hermes.chainlist.v1beta1.MsgCreatePairingListResponse;

        /**
         * Verifies a MsgCreatePairingListResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates a MsgCreatePairingListResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MsgCreatePairingListResponse
         */
        public static fromObject(object: {
          [k: string]: any;
        }): hermes.chainlist.v1beta1.MsgCreatePairingListResponse;

        /**
         * Creates a plain object from a MsgCreatePairingListResponse message. Also converts values to other types if specified.
         * @param message MsgCreatePairingListResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(
          message: hermes.chainlist.v1beta1.MsgCreatePairingListResponse,
          options?: $protobuf.IConversionOptions
        ): { [k: string]: any };

        /**
         * Converts this MsgCreatePairingListResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for MsgCreatePairingListResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
      }

      /** Properties of a MsgInitializePairingListResponse. */
      interface IMsgInitializePairingListResponse {}

      /** Represents a MsgInitializePairingListResponse. */
      class MsgInitializePairingListResponse
        implements IMsgInitializePairingListResponse
      {
        /**
         * Constructs a new MsgInitializePairingListResponse.
         * @param [properties] Properties to set
         */
        constructor(
          properties?: hermes.chainlist.v1beta1.IMsgInitializePairingListResponse
        );

        /**
         * Creates a new MsgInitializePairingListResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MsgInitializePairingListResponse instance
         */
        public static create(
          properties?: hermes.chainlist.v1beta1.IMsgInitializePairingListResponse
        ): hermes.chainlist.v1beta1.MsgInitializePairingListResponse;

        /**
         * Encodes the specified MsgInitializePairingListResponse message. Does not implicitly {@link hermes.chainlist.v1beta1.MsgInitializePairingListResponse.verify|verify} messages.
         * @param message MsgInitializePairingListResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(
          message: hermes.chainlist.v1beta1.IMsgInitializePairingListResponse,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Encodes the specified MsgInitializePairingListResponse message, length delimited. Does not implicitly {@link hermes.chainlist.v1beta1.MsgInitializePairingListResponse.verify|verify} messages.
         * @param message MsgInitializePairingListResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(
          message: hermes.chainlist.v1beta1.IMsgInitializePairingListResponse,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Decodes a MsgInitializePairingListResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MsgInitializePairingListResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          reader: $protobuf.Reader | Uint8Array,
          length?: number
        ): hermes.chainlist.v1beta1.MsgInitializePairingListResponse;

        /**
         * Decodes a MsgInitializePairingListResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MsgInitializePairingListResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(
          reader: $protobuf.Reader | Uint8Array
        ): hermes.chainlist.v1beta1.MsgInitializePairingListResponse;

        /**
         * Verifies a MsgInitializePairingListResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates a MsgInitializePairingListResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MsgInitializePairingListResponse
         */
        public static fromObject(object: {
          [k: string]: any;
        }): hermes.chainlist.v1beta1.MsgInitializePairingListResponse;

        /**
         * Creates a plain object from a MsgInitializePairingListResponse message. Also converts values to other types if specified.
         * @param message MsgInitializePairingListResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(
          message: hermes.chainlist.v1beta1.MsgInitializePairingListResponse,
          options?: $protobuf.IConversionOptions
        ): { [k: string]: any };

        /**
         * Converts this MsgInitializePairingListResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for MsgInitializePairingListResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
      }

      /** Properties of a ComputeUnits. */
      interface IComputeUnits {
        /** ComputeUnits blockunits */
        blockunits?: number | Long | null;

        /** ComputeUnits transactionunits */
        transactionunits?: number | Long | null;
      }

      /** Represents a ComputeUnits. */
      class ComputeUnits implements IComputeUnits {
        /**
         * Constructs a new ComputeUnits.
         * @param [properties] Properties to set
         */
        constructor(properties?: hermes.chainlist.v1beta1.IComputeUnits);

        /** ComputeUnits blockunits. */
        public blockunits: number | Long;

        /** ComputeUnits transactionunits. */
        public transactionunits: number | Long;

        /**
         * Creates a new ComputeUnits instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ComputeUnits instance
         */
        public static create(
          properties?: hermes.chainlist.v1beta1.IComputeUnits
        ): hermes.chainlist.v1beta1.ComputeUnits;

        /**
         * Encodes the specified ComputeUnits message. Does not implicitly {@link hermes.chainlist.v1beta1.ComputeUnits.verify|verify} messages.
         * @param message ComputeUnits message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(
          message: hermes.chainlist.v1beta1.IComputeUnits,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Encodes the specified ComputeUnits message, length delimited. Does not implicitly {@link hermes.chainlist.v1beta1.ComputeUnits.verify|verify} messages.
         * @param message ComputeUnits message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(
          message: hermes.chainlist.v1beta1.IComputeUnits,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Decodes a ComputeUnits message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ComputeUnits
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          reader: $protobuf.Reader | Uint8Array,
          length?: number
        ): hermes.chainlist.v1beta1.ComputeUnits;

        /**
         * Decodes a ComputeUnits message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ComputeUnits
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(
          reader: $protobuf.Reader | Uint8Array
        ): hermes.chainlist.v1beta1.ComputeUnits;

        /**
         * Verifies a ComputeUnits message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates a ComputeUnits message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ComputeUnits
         */
        public static fromObject(object: {
          [k: string]: any;
        }): hermes.chainlist.v1beta1.ComputeUnits;

        /**
         * Creates a plain object from a ComputeUnits message. Also converts values to other types if specified.
         * @param message ComputeUnits
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(
          message: hermes.chainlist.v1beta1.ComputeUnits,
          options?: $protobuf.IConversionOptions
        ): { [k: string]: any };

        /**
         * Converts this ComputeUnits to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ComputeUnits
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
      }

      /** Properties of a Chain. */
      interface IChain {
        /** Chain Name */
        Name?: string | null;

        /** Chain Ticker */
        Ticker?: string | null;

        /** Chain Id */
        Id?: string | null;
      }

      /** Represents a Chain. */
      class Chain implements IChain {
        /**
         * Constructs a new Chain.
         * @param [properties] Properties to set
         */
        constructor(properties?: hermes.chainlist.v1beta1.IChain);

        /** Chain Name. */
        public Name: string;

        /** Chain Ticker. */
        public Ticker: string;

        /** Chain Id. */
        public Id: string;

        /**
         * Creates a new Chain instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Chain instance
         */
        public static create(
          properties?: hermes.chainlist.v1beta1.IChain
        ): hermes.chainlist.v1beta1.Chain;

        /**
         * Encodes the specified Chain message. Does not implicitly {@link hermes.chainlist.v1beta1.Chain.verify|verify} messages.
         * @param message Chain message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(
          message: hermes.chainlist.v1beta1.IChain,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Encodes the specified Chain message, length delimited. Does not implicitly {@link hermes.chainlist.v1beta1.Chain.verify|verify} messages.
         * @param message Chain message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(
          message: hermes.chainlist.v1beta1.IChain,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Decodes a Chain message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Chain
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          reader: $protobuf.Reader | Uint8Array,
          length?: number
        ): hermes.chainlist.v1beta1.Chain;

        /**
         * Decodes a Chain message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Chain
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(
          reader: $protobuf.Reader | Uint8Array
        ): hermes.chainlist.v1beta1.Chain;

        /**
         * Verifies a Chain message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates a Chain message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Chain
         */
        public static fromObject(object: {
          [k: string]: any;
        }): hermes.chainlist.v1beta1.Chain;

        /**
         * Creates a plain object from a Chain message. Also converts values to other types if specified.
         * @param message Chain
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(
          message: hermes.chainlist.v1beta1.Chain,
          options?: $protobuf.IConversionOptions
        ): { [k: string]: any };

        /**
         * Converts this Chain to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Chain
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
      }

      /** Properties of a WorkdoneForChain. */
      interface IWorkdoneForChain {
        /** WorkdoneForChain chain */
        chain?: hermes.chainlist.v1beta1.IChain | null;

        /** WorkdoneForChain blocks */
        blocks?: number | Long | null;

        /** WorkdoneForChain transactions */
        transactions?: number | Long | null;
      }

      /** Represents a WorkdoneForChain. */
      class WorkdoneForChain implements IWorkdoneForChain {
        /**
         * Constructs a new WorkdoneForChain.
         * @param [properties] Properties to set
         */
        constructor(properties?: hermes.chainlist.v1beta1.IWorkdoneForChain);

        /** WorkdoneForChain chain. */
        public chain?: hermes.chainlist.v1beta1.IChain | null;

        /** WorkdoneForChain blocks. */
        public blocks: number | Long;

        /** WorkdoneForChain transactions. */
        public transactions: number | Long;

        /**
         * Creates a new WorkdoneForChain instance using the specified properties.
         * @param [properties] Properties to set
         * @returns WorkdoneForChain instance
         */
        public static create(
          properties?: hermes.chainlist.v1beta1.IWorkdoneForChain
        ): hermes.chainlist.v1beta1.WorkdoneForChain;

        /**
         * Encodes the specified WorkdoneForChain message. Does not implicitly {@link hermes.chainlist.v1beta1.WorkdoneForChain.verify|verify} messages.
         * @param message WorkdoneForChain message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(
          message: hermes.chainlist.v1beta1.IWorkdoneForChain,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Encodes the specified WorkdoneForChain message, length delimited. Does not implicitly {@link hermes.chainlist.v1beta1.WorkdoneForChain.verify|verify} messages.
         * @param message WorkdoneForChain message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(
          message: hermes.chainlist.v1beta1.IWorkdoneForChain,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Decodes a WorkdoneForChain message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns WorkdoneForChain
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          reader: $protobuf.Reader | Uint8Array,
          length?: number
        ): hermes.chainlist.v1beta1.WorkdoneForChain;

        /**
         * Decodes a WorkdoneForChain message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns WorkdoneForChain
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(
          reader: $protobuf.Reader | Uint8Array
        ): hermes.chainlist.v1beta1.WorkdoneForChain;

        /**
         * Verifies a WorkdoneForChain message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates a WorkdoneForChain message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns WorkdoneForChain
         */
        public static fromObject(object: {
          [k: string]: any;
        }): hermes.chainlist.v1beta1.WorkdoneForChain;

        /**
         * Creates a plain object from a WorkdoneForChain message. Also converts values to other types if specified.
         * @param message WorkdoneForChain
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(
          message: hermes.chainlist.v1beta1.WorkdoneForChain,
          options?: $protobuf.IConversionOptions
        ): { [k: string]: any };

        /**
         * Converts this WorkdoneForChain to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for WorkdoneForChain
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
      }
    }
  }
}

/** Namespace cosmos. */
export namespace cosmos {
  /** Namespace base. */
  namespace base {
    /** Namespace v1beta1. */
    namespace v1beta1 {
      /** Properties of a Coin. */
      interface ICoin {
        /** Coin denom */
        denom?: string | null;

        /** Coin amount */
        amount?: string | null;
      }

      /** Represents a Coin. */
      class Coin implements ICoin {
        /**
         * Constructs a new Coin.
         * @param [properties] Properties to set
         */
        constructor(properties?: cosmos.base.v1beta1.ICoin);

        /** Coin denom. */
        public denom: string;

        /** Coin amount. */
        public amount: string;

        /**
         * Creates a new Coin instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Coin instance
         */
        public static create(
          properties?: cosmos.base.v1beta1.ICoin
        ): cosmos.base.v1beta1.Coin;

        /**
         * Encodes the specified Coin message. Does not implicitly {@link cosmos.base.v1beta1.Coin.verify|verify} messages.
         * @param message Coin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(
          message: cosmos.base.v1beta1.ICoin,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Encodes the specified Coin message, length delimited. Does not implicitly {@link cosmos.base.v1beta1.Coin.verify|verify} messages.
         * @param message Coin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(
          message: cosmos.base.v1beta1.ICoin,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Decodes a Coin message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Coin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          reader: $protobuf.Reader | Uint8Array,
          length?: number
        ): cosmos.base.v1beta1.Coin;

        /**
         * Decodes a Coin message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Coin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(
          reader: $protobuf.Reader | Uint8Array
        ): cosmos.base.v1beta1.Coin;

        /**
         * Verifies a Coin message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates a Coin message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Coin
         */
        public static fromObject(object: {
          [k: string]: any;
        }): cosmos.base.v1beta1.Coin;

        /**
         * Creates a plain object from a Coin message. Also converts values to other types if specified.
         * @param message Coin
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(
          message: cosmos.base.v1beta1.Coin,
          options?: $protobuf.IConversionOptions
        ): { [k: string]: any };

        /**
         * Converts this Coin to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Coin
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
      }

      /** Properties of a DecCoin. */
      interface IDecCoin {
        /** DecCoin denom */
        denom?: string | null;

        /** DecCoin amount */
        amount?: string | null;
      }

      /** Represents a DecCoin. */
      class DecCoin implements IDecCoin {
        /**
         * Constructs a new DecCoin.
         * @param [properties] Properties to set
         */
        constructor(properties?: cosmos.base.v1beta1.IDecCoin);

        /** DecCoin denom. */
        public denom: string;

        /** DecCoin amount. */
        public amount: string;

        /**
         * Creates a new DecCoin instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DecCoin instance
         */
        public static create(
          properties?: cosmos.base.v1beta1.IDecCoin
        ): cosmos.base.v1beta1.DecCoin;

        /**
         * Encodes the specified DecCoin message. Does not implicitly {@link cosmos.base.v1beta1.DecCoin.verify|verify} messages.
         * @param message DecCoin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(
          message: cosmos.base.v1beta1.IDecCoin,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Encodes the specified DecCoin message, length delimited. Does not implicitly {@link cosmos.base.v1beta1.DecCoin.verify|verify} messages.
         * @param message DecCoin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(
          message: cosmos.base.v1beta1.IDecCoin,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Decodes a DecCoin message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DecCoin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          reader: $protobuf.Reader | Uint8Array,
          length?: number
        ): cosmos.base.v1beta1.DecCoin;

        /**
         * Decodes a DecCoin message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DecCoin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(
          reader: $protobuf.Reader | Uint8Array
        ): cosmos.base.v1beta1.DecCoin;

        /**
         * Verifies a DecCoin message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates a DecCoin message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DecCoin
         */
        public static fromObject(object: {
          [k: string]: any;
        }): cosmos.base.v1beta1.DecCoin;

        /**
         * Creates a plain object from a DecCoin message. Also converts values to other types if specified.
         * @param message DecCoin
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(
          message: cosmos.base.v1beta1.DecCoin,
          options?: $protobuf.IConversionOptions
        ): { [k: string]: any };

        /**
         * Converts this DecCoin to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for DecCoin
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
      }

      /** Properties of an IntProto. */
      interface IIntProto {
        /** IntProto int */
        int?: string | null;
      }

      /** Represents an IntProto. */
      class IntProto implements IIntProto {
        /**
         * Constructs a new IntProto.
         * @param [properties] Properties to set
         */
        constructor(properties?: cosmos.base.v1beta1.IIntProto);

        /** IntProto int. */
        public int: string;

        /**
         * Creates a new IntProto instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IntProto instance
         */
        public static create(
          properties?: cosmos.base.v1beta1.IIntProto
        ): cosmos.base.v1beta1.IntProto;

        /**
         * Encodes the specified IntProto message. Does not implicitly {@link cosmos.base.v1beta1.IntProto.verify|verify} messages.
         * @param message IntProto message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(
          message: cosmos.base.v1beta1.IIntProto,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Encodes the specified IntProto message, length delimited. Does not implicitly {@link cosmos.base.v1beta1.IntProto.verify|verify} messages.
         * @param message IntProto message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(
          message: cosmos.base.v1beta1.IIntProto,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Decodes an IntProto message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IntProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          reader: $protobuf.Reader | Uint8Array,
          length?: number
        ): cosmos.base.v1beta1.IntProto;

        /**
         * Decodes an IntProto message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IntProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(
          reader: $protobuf.Reader | Uint8Array
        ): cosmos.base.v1beta1.IntProto;

        /**
         * Verifies an IntProto message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates an IntProto message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns IntProto
         */
        public static fromObject(object: {
          [k: string]: any;
        }): cosmos.base.v1beta1.IntProto;

        /**
         * Creates a plain object from an IntProto message. Also converts values to other types if specified.
         * @param message IntProto
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(
          message: cosmos.base.v1beta1.IntProto,
          options?: $protobuf.IConversionOptions
        ): { [k: string]: any };

        /**
         * Converts this IntProto to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for IntProto
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
      }

      /** Properties of a DecProto. */
      interface IDecProto {
        /** DecProto dec */
        dec?: string | null;
      }

      /** Represents a DecProto. */
      class DecProto implements IDecProto {
        /**
         * Constructs a new DecProto.
         * @param [properties] Properties to set
         */
        constructor(properties?: cosmos.base.v1beta1.IDecProto);

        /** DecProto dec. */
        public dec: string;

        /**
         * Creates a new DecProto instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DecProto instance
         */
        public static create(
          properties?: cosmos.base.v1beta1.IDecProto
        ): cosmos.base.v1beta1.DecProto;

        /**
         * Encodes the specified DecProto message. Does not implicitly {@link cosmos.base.v1beta1.DecProto.verify|verify} messages.
         * @param message DecProto message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(
          message: cosmos.base.v1beta1.IDecProto,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Encodes the specified DecProto message, length delimited. Does not implicitly {@link cosmos.base.v1beta1.DecProto.verify|verify} messages.
         * @param message DecProto message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(
          message: cosmos.base.v1beta1.IDecProto,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Decodes a DecProto message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DecProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          reader: $protobuf.Reader | Uint8Array,
          length?: number
        ): cosmos.base.v1beta1.DecProto;

        /**
         * Decodes a DecProto message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DecProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(
          reader: $protobuf.Reader | Uint8Array
        ): cosmos.base.v1beta1.DecProto;

        /**
         * Verifies a DecProto message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates a DecProto message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DecProto
         */
        public static fromObject(object: {
          [k: string]: any;
        }): cosmos.base.v1beta1.DecProto;

        /**
         * Creates a plain object from a DecProto message. Also converts values to other types if specified.
         * @param message DecProto
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(
          message: cosmos.base.v1beta1.DecProto,
          options?: $protobuf.IConversionOptions
        ): { [k: string]: any };

        /**
         * Converts this DecProto to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for DecProto
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
      }
    }
  }
}
