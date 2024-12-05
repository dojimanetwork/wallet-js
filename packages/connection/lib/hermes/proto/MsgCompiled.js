/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader,
  $Writer = $protobuf.Writer,
  $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.common = (function () {
  /**
   * Namespace common.
   * @exports common
   * @namespace
   */
  var common = {};

  common.Asset = (function () {
    /**
     * Properties of an Asset.
     * @memberof common
     * @interface IAsset
     * @property {string|null} [chain] Asset chain
     * @property {string|null} [symbol] Asset symbol
     * @property {string|null} [ticker] Asset ticker
     * @property {boolean|null} [synth] Asset synth
     */

    /**
     * Constructs a new Asset.
     * @memberof common
     * @classdesc Represents an Asset.
     * @implements IAsset
     * @constructor
     * @param {common.IAsset=} [properties] Properties to set
     */
    function Asset(properties) {
      if (properties)
        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
    }

    /**
     * Asset chain.
     * @member {string} chain
     * @memberof common.Asset
     * @instance
     */
    Asset.prototype.chain = "";

    /**
     * Asset symbol.
     * @member {string} symbol
     * @memberof common.Asset
     * @instance
     */
    Asset.prototype.symbol = "";

    /**
     * Asset ticker.
     * @member {string} ticker
     * @memberof common.Asset
     * @instance
     */
    Asset.prototype.ticker = "";

    /**
     * Asset synth.
     * @member {boolean} synth
     * @memberof common.Asset
     * @instance
     */
    Asset.prototype.synth = false;

    /**
     * Creates a new Asset instance using the specified properties.
     * @function create
     * @memberof common.Asset
     * @static
     * @param {common.IAsset=} [properties] Properties to set
     * @returns {common.Asset} Asset instance
     */
    Asset.create = function create(properties) {
      return new Asset(properties);
    };

    /**
     * Encodes the specified Asset message. Does not implicitly {@link common.Asset.verify|verify} messages.
     * @function encode
     * @memberof common.Asset
     * @static
     * @param {common.IAsset} message Asset message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Asset.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create();
      if (message.chain != null && Object.hasOwnProperty.call(message, "chain"))
        writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.chain);
      if (
        message.symbol != null &&
        Object.hasOwnProperty.call(message, "symbol")
      )
        writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.symbol);
      if (
        message.ticker != null &&
        Object.hasOwnProperty.call(message, "ticker")
      )
        writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.ticker);
      if (message.synth != null && Object.hasOwnProperty.call(message, "synth"))
        writer.uint32(/* id 4, wireType 0 =*/ 32).bool(message.synth);
      return writer;
    };

    /**
     * Encodes the specified Asset message, length delimited. Does not implicitly {@link common.Asset.verify|verify} messages.
     * @function encodeDelimited
     * @memberof common.Asset
     * @static
     * @param {common.IAsset} message Asset message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Asset.encodeDelimited = function encodeDelimited(message, writer) {
      return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an Asset message from the specified reader or buffer.
     * @function decode
     * @memberof common.Asset
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {common.Asset} Asset
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Asset.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
      var end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.common.Asset();
      while (reader.pos < end) {
        var tag = reader.uint32();
        switch (tag >>> 3) {
          case 1: {
            message.chain = reader.string();
            break;
          }
          case 2: {
            message.symbol = reader.string();
            break;
          }
          case 3: {
            message.ticker = reader.string();
            break;
          }
          case 4: {
            message.synth = reader.bool();
            break;
          }
          default:
            reader.skipType(tag & 7);
            break;
        }
      }
      return message;
    };

    /**
     * Decodes an Asset message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof common.Asset
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {common.Asset} Asset
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Asset.decodeDelimited = function decodeDelimited(reader) {
      if (!(reader instanceof $Reader)) reader = new $Reader(reader);
      return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an Asset message.
     * @function verify
     * @memberof common.Asset
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Asset.verify = function verify(message) {
      if (typeof message !== "object" || message === null)
        return "object expected";
      if (message.chain != null && message.hasOwnProperty("chain"))
        if (!$util.isString(message.chain)) return "chain: string expected";
      if (message.symbol != null && message.hasOwnProperty("symbol"))
        if (!$util.isString(message.symbol)) return "symbol: string expected";
      if (message.ticker != null && message.hasOwnProperty("ticker"))
        if (!$util.isString(message.ticker)) return "ticker: string expected";
      if (message.synth != null && message.hasOwnProperty("synth"))
        if (typeof message.synth !== "boolean")
          return "synth: boolean expected";
      return null;
    };

    /**
     * Creates an Asset message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof common.Asset
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {common.Asset} Asset
     */
    Asset.fromObject = function fromObject(object) {
      if (object instanceof $root.common.Asset) return object;
      var message = new $root.common.Asset();
      if (object.chain != null) message.chain = String(object.chain);
      if (object.symbol != null) message.symbol = String(object.symbol);
      if (object.ticker != null) message.ticker = String(object.ticker);
      if (object.synth != null) message.synth = Boolean(object.synth);
      return message;
    };

    /**
     * Creates a plain object from an Asset message. Also converts values to other types if specified.
     * @function toObject
     * @memberof common.Asset
     * @static
     * @param {common.Asset} message Asset
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Asset.toObject = function toObject(message, options) {
      if (!options) options = {};
      var object = {};
      if (options.defaults) {
        object.chain = "";
        object.symbol = "";
        object.ticker = "";
        object.synth = false;
      }
      if (message.chain != null && message.hasOwnProperty("chain"))
        object.chain = message.chain;
      if (message.symbol != null && message.hasOwnProperty("symbol"))
        object.symbol = message.symbol;
      if (message.ticker != null && message.hasOwnProperty("ticker"))
        object.ticker = message.ticker;
      if (message.synth != null && message.hasOwnProperty("synth"))
        object.synth = message.synth;
      return object;
    };

    /**
     * Converts this Asset to JSON.
     * @function toJSON
     * @memberof common.Asset
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Asset.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for Asset
     * @function getTypeUrl
     * @memberof common.Asset
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    Asset.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
      if (typeUrlPrefix === undefined) {
        typeUrlPrefix = "type.googleapis.com";
      }
      return typeUrlPrefix + "/common.Asset";
    };

    return Asset;
  })();

  common.Coin = (function () {
    /**
     * Properties of a Coin.
     * @memberof common
     * @interface ICoin
     * @property {common.IAsset|null} [asset] Coin asset
     * @property {string|null} [amount] Coin amount
     * @property {number|Long|null} [decimals] Coin decimals
     */

    /**
     * Constructs a new Coin.
     * @memberof common
     * @classdesc Represents a Coin.
     * @implements ICoin
     * @constructor
     * @param {common.ICoin=} [properties] Properties to set
     */
    function Coin(properties) {
      if (properties)
        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
    }

    /**
     * Coin asset.
     * @member {common.IAsset|null|undefined} asset
     * @memberof common.Coin
     * @instance
     */
    Coin.prototype.asset = null;

    /**
     * Coin amount.
     * @member {string} amount
     * @memberof common.Coin
     * @instance
     */
    Coin.prototype.amount = "";

    /**
     * Coin decimals.
     * @member {number|Long} decimals
     * @memberof common.Coin
     * @instance
     */
    Coin.prototype.decimals = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;

    /**
     * Creates a new Coin instance using the specified properties.
     * @function create
     * @memberof common.Coin
     * @static
     * @param {common.ICoin=} [properties] Properties to set
     * @returns {common.Coin} Coin instance
     */
    Coin.create = function create(properties) {
      return new Coin(properties);
    };

    /**
     * Encodes the specified Coin message. Does not implicitly {@link common.Coin.verify|verify} messages.
     * @function encode
     * @memberof common.Coin
     * @static
     * @param {common.ICoin} message Coin message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Coin.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create();
      if (message.asset != null && Object.hasOwnProperty.call(message, "asset"))
        $root.common.Asset.encode(
          message.asset,
          writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
        ).ldelim();
      if (
        message.amount != null &&
        Object.hasOwnProperty.call(message, "amount")
      )
        writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.amount);
      if (
        message.decimals != null &&
        Object.hasOwnProperty.call(message, "decimals")
      )
        writer.uint32(/* id 3, wireType 0 =*/ 24).int64(message.decimals);
      return writer;
    };

    /**
     * Encodes the specified Coin message, length delimited. Does not implicitly {@link common.Coin.verify|verify} messages.
     * @function encodeDelimited
     * @memberof common.Coin
     * @static
     * @param {common.ICoin} message Coin message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Coin.encodeDelimited = function encodeDelimited(message, writer) {
      return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Coin message from the specified reader or buffer.
     * @function decode
     * @memberof common.Coin
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {common.Coin} Coin
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Coin.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
      var end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.common.Coin();
      while (reader.pos < end) {
        var tag = reader.uint32();
        switch (tag >>> 3) {
          case 1: {
            message.asset = $root.common.Asset.decode(reader, reader.uint32());
            break;
          }
          case 2: {
            message.amount = reader.string();
            break;
          }
          case 3: {
            message.decimals = reader.int64();
            break;
          }
          default:
            reader.skipType(tag & 7);
            break;
        }
      }
      return message;
    };

    /**
     * Decodes a Coin message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof common.Coin
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {common.Coin} Coin
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Coin.decodeDelimited = function decodeDelimited(reader) {
      if (!(reader instanceof $Reader)) reader = new $Reader(reader);
      return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Coin message.
     * @function verify
     * @memberof common.Coin
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Coin.verify = function verify(message) {
      if (typeof message !== "object" || message === null)
        return "object expected";
      if (message.asset != null && message.hasOwnProperty("asset")) {
        var error = $root.common.Asset.verify(message.asset);
        if (error) return "asset." + error;
      }
      if (message.amount != null && message.hasOwnProperty("amount"))
        if (!$util.isString(message.amount)) return "amount: string expected";
      if (message.decimals != null && message.hasOwnProperty("decimals"))
        if (
          !$util.isInteger(message.decimals) &&
          !(
            message.decimals &&
            $util.isInteger(message.decimals.low) &&
            $util.isInteger(message.decimals.high)
          )
        )
          return "decimals: integer|Long expected";
      return null;
    };

    /**
     * Creates a Coin message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof common.Coin
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {common.Coin} Coin
     */
    Coin.fromObject = function fromObject(object) {
      if (object instanceof $root.common.Coin) return object;
      var message = new $root.common.Coin();
      if (object.asset != null) {
        if (typeof object.asset !== "object")
          throw TypeError(".common.Coin.asset: object expected");
        message.asset = $root.common.Asset.fromObject(object.asset);
      }
      if (object.amount != null) message.amount = String(object.amount);
      if (object.decimals != null)
        if ($util.Long)
          (message.decimals = $util.Long.fromValue(
            object.decimals
          )).unsigned = false;
        else if (typeof object.decimals === "string")
          message.decimals = parseInt(object.decimals, 10);
        else if (typeof object.decimals === "number")
          message.decimals = object.decimals;
        else if (typeof object.decimals === "object")
          message.decimals = new $util.LongBits(
            object.decimals.low >>> 0,
            object.decimals.high >>> 0
          ).toNumber();
      return message;
    };

    /**
     * Creates a plain object from a Coin message. Also converts values to other types if specified.
     * @function toObject
     * @memberof common.Coin
     * @static
     * @param {common.Coin} message Coin
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Coin.toObject = function toObject(message, options) {
      if (!options) options = {};
      var object = {};
      if (options.defaults) {
        object.asset = null;
        object.amount = "";
        if ($util.Long) {
          var long = new $util.Long(0, 0, false);
          object.decimals =
            options.longs === String
              ? long.toString()
              : options.longs === Number
              ? long.toNumber()
              : long;
        } else object.decimals = options.longs === String ? "0" : 0;
      }
      if (message.asset != null && message.hasOwnProperty("asset"))
        object.asset = $root.common.Asset.toObject(message.asset, options);
      if (message.amount != null && message.hasOwnProperty("amount"))
        object.amount = message.amount;
      if (message.decimals != null && message.hasOwnProperty("decimals"))
        if (typeof message.decimals === "number")
          object.decimals =
            options.longs === String
              ? String(message.decimals)
              : message.decimals;
        else
          object.decimals =
            options.longs === String
              ? $util.Long.prototype.toString.call(message.decimals)
              : options.longs === Number
              ? new $util.LongBits(
                  message.decimals.low >>> 0,
                  message.decimals.high >>> 0
                ).toNumber()
              : message.decimals;
      return object;
    };

    /**
     * Converts this Coin to JSON.
     * @function toJSON
     * @memberof common.Coin
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Coin.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for Coin
     * @function getTypeUrl
     * @memberof common.Coin
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    Coin.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
      if (typeUrlPrefix === undefined) {
        typeUrlPrefix = "type.googleapis.com";
      }
      return typeUrlPrefix + "/common.Coin";
    };

    return Coin;
  })();

  common.PubKeySet = (function () {
    /**
     * Properties of a PubKeySet.
     * @memberof common
     * @interface IPubKeySet
     * @property {string|null} [secp256k1] PubKeySet secp256k1
     * @property {string|null} [ed25519] PubKeySet ed25519
     */

    /**
     * Constructs a new PubKeySet.
     * @memberof common
     * @classdesc Represents a PubKeySet.
     * @implements IPubKeySet
     * @constructor
     * @param {common.IPubKeySet=} [properties] Properties to set
     */
    function PubKeySet(properties) {
      if (properties)
        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
    }

    /**
     * PubKeySet secp256k1.
     * @member {string} secp256k1
     * @memberof common.PubKeySet
     * @instance
     */
    PubKeySet.prototype.secp256k1 = "";

    /**
     * PubKeySet ed25519.
     * @member {string} ed25519
     * @memberof common.PubKeySet
     * @instance
     */
    PubKeySet.prototype.ed25519 = "";

    /**
     * Creates a new PubKeySet instance using the specified properties.
     * @function create
     * @memberof common.PubKeySet
     * @static
     * @param {common.IPubKeySet=} [properties] Properties to set
     * @returns {common.PubKeySet} PubKeySet instance
     */
    PubKeySet.create = function create(properties) {
      return new PubKeySet(properties);
    };

    /**
     * Encodes the specified PubKeySet message. Does not implicitly {@link common.PubKeySet.verify|verify} messages.
     * @function encode
     * @memberof common.PubKeySet
     * @static
     * @param {common.IPubKeySet} message PubKeySet message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PubKeySet.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create();
      if (
        message.secp256k1 != null &&
        Object.hasOwnProperty.call(message, "secp256k1")
      )
        writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.secp256k1);
      if (
        message.ed25519 != null &&
        Object.hasOwnProperty.call(message, "ed25519")
      )
        writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.ed25519);
      return writer;
    };

    /**
     * Encodes the specified PubKeySet message, length delimited. Does not implicitly {@link common.PubKeySet.verify|verify} messages.
     * @function encodeDelimited
     * @memberof common.PubKeySet
     * @static
     * @param {common.IPubKeySet} message PubKeySet message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PubKeySet.encodeDelimited = function encodeDelimited(message, writer) {
      return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a PubKeySet message from the specified reader or buffer.
     * @function decode
     * @memberof common.PubKeySet
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {common.PubKeySet} PubKeySet
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PubKeySet.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
      var end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.common.PubKeySet();
      while (reader.pos < end) {
        var tag = reader.uint32();
        switch (tag >>> 3) {
          case 1: {
            message.secp256k1 = reader.string();
            break;
          }
          case 2: {
            message.ed25519 = reader.string();
            break;
          }
          default:
            reader.skipType(tag & 7);
            break;
        }
      }
      return message;
    };

    /**
     * Decodes a PubKeySet message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof common.PubKeySet
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {common.PubKeySet} PubKeySet
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PubKeySet.decodeDelimited = function decodeDelimited(reader) {
      if (!(reader instanceof $Reader)) reader = new $Reader(reader);
      return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a PubKeySet message.
     * @function verify
     * @memberof common.PubKeySet
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    PubKeySet.verify = function verify(message) {
      if (typeof message !== "object" || message === null)
        return "object expected";
      if (message.secp256k1 != null && message.hasOwnProperty("secp256k1"))
        if (!$util.isString(message.secp256k1))
          return "secp256k1: string expected";
      if (message.ed25519 != null && message.hasOwnProperty("ed25519"))
        if (!$util.isString(message.ed25519)) return "ed25519: string expected";
      return null;
    };

    /**
     * Creates a PubKeySet message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof common.PubKeySet
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {common.PubKeySet} PubKeySet
     */
    PubKeySet.fromObject = function fromObject(object) {
      if (object instanceof $root.common.PubKeySet) return object;
      var message = new $root.common.PubKeySet();
      if (object.secp256k1 != null)
        message.secp256k1 = String(object.secp256k1);
      if (object.ed25519 != null) message.ed25519 = String(object.ed25519);
      return message;
    };

    /**
     * Creates a plain object from a PubKeySet message. Also converts values to other types if specified.
     * @function toObject
     * @memberof common.PubKeySet
     * @static
     * @param {common.PubKeySet} message PubKeySet
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    PubKeySet.toObject = function toObject(message, options) {
      if (!options) options = {};
      var object = {};
      if (options.defaults) {
        object.secp256k1 = "";
        object.ed25519 = "";
      }
      if (message.secp256k1 != null && message.hasOwnProperty("secp256k1"))
        object.secp256k1 = message.secp256k1;
      if (message.ed25519 != null && message.hasOwnProperty("ed25519"))
        object.ed25519 = message.ed25519;
      return object;
    };

    /**
     * Converts this PubKeySet to JSON.
     * @function toJSON
     * @memberof common.PubKeySet
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    PubKeySet.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for PubKeySet
     * @function getTypeUrl
     * @memberof common.PubKeySet
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    PubKeySet.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
      if (typeUrlPrefix === undefined) {
        typeUrlPrefix = "type.googleapis.com";
      }
      return typeUrlPrefix + "/common.PubKeySet";
    };

    return PubKeySet;
  })();

  common.Tx = (function () {
    /**
     * Properties of a Tx.
     * @memberof common
     * @interface ITx
     * @property {string|null} [id] Tx id
     * @property {string|null} [chain] Tx chain
     * @property {string|null} [fromAddress] Tx fromAddress
     * @property {string|null} [toAddress] Tx toAddress
     * @property {Array.<common.ICoin>|null} [coins] Tx coins
     * @property {Array.<common.ICoin>|null} [gas] Tx gas
     * @property {string|null} [memo] Tx memo
     * @property {Uint8Array|null} [payload] Tx payload
     * @property {boolean|null} [isXcMsg] Tx isXcMsg
     */

    /**
     * Constructs a new Tx.
     * @memberof common
     * @classdesc Represents a Tx.
     * @implements ITx
     * @constructor
     * @param {common.ITx=} [properties] Properties to set
     */
    function Tx(properties) {
      this.coins = [];
      this.gas = [];
      if (properties)
        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
    }

    /**
     * Tx id.
     * @member {string} id
     * @memberof common.Tx
     * @instance
     */
    Tx.prototype.id = "";

    /**
     * Tx chain.
     * @member {string} chain
     * @memberof common.Tx
     * @instance
     */
    Tx.prototype.chain = "";

    /**
     * Tx fromAddress.
     * @member {string} fromAddress
     * @memberof common.Tx
     * @instance
     */
    Tx.prototype.fromAddress = "";

    /**
     * Tx toAddress.
     * @member {string} toAddress
     * @memberof common.Tx
     * @instance
     */
    Tx.prototype.toAddress = "";

    /**
     * Tx coins.
     * @member {Array.<common.ICoin>} coins
     * @memberof common.Tx
     * @instance
     */
    Tx.prototype.coins = $util.emptyArray;

    /**
     * Tx gas.
     * @member {Array.<common.ICoin>} gas
     * @memberof common.Tx
     * @instance
     */
    Tx.prototype.gas = $util.emptyArray;

    /**
     * Tx memo.
     * @member {string} memo
     * @memberof common.Tx
     * @instance
     */
    Tx.prototype.memo = "";

    /**
     * Tx payload.
     * @member {Uint8Array} payload
     * @memberof common.Tx
     * @instance
     */
    Tx.prototype.payload = $util.newBuffer([]);

    /**
     * Tx isXcMsg.
     * @member {boolean} isXcMsg
     * @memberof common.Tx
     * @instance
     */
    Tx.prototype.isXcMsg = false;

    /**
     * Creates a new Tx instance using the specified properties.
     * @function create
     * @memberof common.Tx
     * @static
     * @param {common.ITx=} [properties] Properties to set
     * @returns {common.Tx} Tx instance
     */
    Tx.create = function create(properties) {
      return new Tx(properties);
    };

    /**
     * Encodes the specified Tx message. Does not implicitly {@link common.Tx.verify|verify} messages.
     * @function encode
     * @memberof common.Tx
     * @static
     * @param {common.ITx} message Tx message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Tx.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create();
      if (message.id != null && Object.hasOwnProperty.call(message, "id"))
        writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.id);
      if (message.chain != null && Object.hasOwnProperty.call(message, "chain"))
        writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.chain);
      if (
        message.fromAddress != null &&
        Object.hasOwnProperty.call(message, "fromAddress")
      )
        writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.fromAddress);
      if (
        message.toAddress != null &&
        Object.hasOwnProperty.call(message, "toAddress")
      )
        writer.uint32(/* id 4, wireType 2 =*/ 34).string(message.toAddress);
      if (message.coins != null && message.coins.length)
        for (var i = 0; i < message.coins.length; ++i)
          $root.common.Coin.encode(
            message.coins[i],
            writer.uint32(/* id 5, wireType 2 =*/ 42).fork()
          ).ldelim();
      if (message.gas != null && message.gas.length)
        for (var i = 0; i < message.gas.length; ++i)
          $root.common.Coin.encode(
            message.gas[i],
            writer.uint32(/* id 6, wireType 2 =*/ 50).fork()
          ).ldelim();
      if (message.memo != null && Object.hasOwnProperty.call(message, "memo"))
        writer.uint32(/* id 7, wireType 2 =*/ 58).string(message.memo);
      if (
        message.payload != null &&
        Object.hasOwnProperty.call(message, "payload")
      )
        writer.uint32(/* id 8, wireType 2 =*/ 66).bytes(message.payload);
      if (
        message.isXcMsg != null &&
        Object.hasOwnProperty.call(message, "isXcMsg")
      )
        writer.uint32(/* id 9, wireType 0 =*/ 72).bool(message.isXcMsg);
      return writer;
    };

    /**
     * Encodes the specified Tx message, length delimited. Does not implicitly {@link common.Tx.verify|verify} messages.
     * @function encodeDelimited
     * @memberof common.Tx
     * @static
     * @param {common.ITx} message Tx message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Tx.encodeDelimited = function encodeDelimited(message, writer) {
      return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Tx message from the specified reader or buffer.
     * @function decode
     * @memberof common.Tx
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {common.Tx} Tx
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Tx.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
      var end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.common.Tx();
      while (reader.pos < end) {
        var tag = reader.uint32();
        switch (tag >>> 3) {
          case 1: {
            message.id = reader.string();
            break;
          }
          case 2: {
            message.chain = reader.string();
            break;
          }
          case 3: {
            message.fromAddress = reader.string();
            break;
          }
          case 4: {
            message.toAddress = reader.string();
            break;
          }
          case 5: {
            if (!(message.coins && message.coins.length)) message.coins = [];
            message.coins.push(
              $root.common.Coin.decode(reader, reader.uint32())
            );
            break;
          }
          case 6: {
            if (!(message.gas && message.gas.length)) message.gas = [];
            message.gas.push($root.common.Coin.decode(reader, reader.uint32()));
            break;
          }
          case 7: {
            message.memo = reader.string();
            break;
          }
          case 8: {
            message.payload = reader.bytes();
            break;
          }
          case 9: {
            message.isXcMsg = reader.bool();
            break;
          }
          default:
            reader.skipType(tag & 7);
            break;
        }
      }
      return message;
    };

    /**
     * Decodes a Tx message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof common.Tx
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {common.Tx} Tx
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Tx.decodeDelimited = function decodeDelimited(reader) {
      if (!(reader instanceof $Reader)) reader = new $Reader(reader);
      return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Tx message.
     * @function verify
     * @memberof common.Tx
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Tx.verify = function verify(message) {
      if (typeof message !== "object" || message === null)
        return "object expected";
      if (message.id != null && message.hasOwnProperty("id"))
        if (!$util.isString(message.id)) return "id: string expected";
      if (message.chain != null && message.hasOwnProperty("chain"))
        if (!$util.isString(message.chain)) return "chain: string expected";
      if (message.fromAddress != null && message.hasOwnProperty("fromAddress"))
        if (!$util.isString(message.fromAddress))
          return "fromAddress: string expected";
      if (message.toAddress != null && message.hasOwnProperty("toAddress"))
        if (!$util.isString(message.toAddress))
          return "toAddress: string expected";
      if (message.coins != null && message.hasOwnProperty("coins")) {
        if (!Array.isArray(message.coins)) return "coins: array expected";
        for (var i = 0; i < message.coins.length; ++i) {
          var error = $root.common.Coin.verify(message.coins[i]);
          if (error) return "coins." + error;
        }
      }
      if (message.gas != null && message.hasOwnProperty("gas")) {
        if (!Array.isArray(message.gas)) return "gas: array expected";
        for (var i = 0; i < message.gas.length; ++i) {
          var error = $root.common.Coin.verify(message.gas[i]);
          if (error) return "gas." + error;
        }
      }
      if (message.memo != null && message.hasOwnProperty("memo"))
        if (!$util.isString(message.memo)) return "memo: string expected";
      if (message.payload != null && message.hasOwnProperty("payload"))
        if (
          !(
            (message.payload && typeof message.payload.length === "number") ||
            $util.isString(message.payload)
          )
        )
          return "payload: buffer expected";
      if (message.isXcMsg != null && message.hasOwnProperty("isXcMsg"))
        if (typeof message.isXcMsg !== "boolean")
          return "isXcMsg: boolean expected";
      return null;
    };

    /**
     * Creates a Tx message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof common.Tx
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {common.Tx} Tx
     */
    Tx.fromObject = function fromObject(object) {
      if (object instanceof $root.common.Tx) return object;
      var message = new $root.common.Tx();
      if (object.id != null) message.id = String(object.id);
      if (object.chain != null) message.chain = String(object.chain);
      if (object.fromAddress != null)
        message.fromAddress = String(object.fromAddress);
      if (object.toAddress != null)
        message.toAddress = String(object.toAddress);
      if (object.coins) {
        if (!Array.isArray(object.coins))
          throw TypeError(".common.Tx.coins: array expected");
        message.coins = [];
        for (var i = 0; i < object.coins.length; ++i) {
          if (typeof object.coins[i] !== "object")
            throw TypeError(".common.Tx.coins: object expected");
          message.coins[i] = $root.common.Coin.fromObject(object.coins[i]);
        }
      }
      if (object.gas) {
        if (!Array.isArray(object.gas))
          throw TypeError(".common.Tx.gas: array expected");
        message.gas = [];
        for (var i = 0; i < object.gas.length; ++i) {
          if (typeof object.gas[i] !== "object")
            throw TypeError(".common.Tx.gas: object expected");
          message.gas[i] = $root.common.Coin.fromObject(object.gas[i]);
        }
      }
      if (object.memo != null) message.memo = String(object.memo);
      if (object.payload != null)
        if (typeof object.payload === "string")
          $util.base64.decode(
            object.payload,
            (message.payload = $util.newBuffer(
              $util.base64.length(object.payload)
            )),
            0
          );
        else if (object.payload.length >= 0) message.payload = object.payload;
      if (object.isXcMsg != null) message.isXcMsg = Boolean(object.isXcMsg);
      return message;
    };

    /**
     * Creates a plain object from a Tx message. Also converts values to other types if specified.
     * @function toObject
     * @memberof common.Tx
     * @static
     * @param {common.Tx} message Tx
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Tx.toObject = function toObject(message, options) {
      if (!options) options = {};
      var object = {};
      if (options.arrays || options.defaults) {
        object.coins = [];
        object.gas = [];
      }
      if (options.defaults) {
        object.id = "";
        object.chain = "";
        object.fromAddress = "";
        object.toAddress = "";
        object.memo = "";
        if (options.bytes === String) object.payload = "";
        else {
          object.payload = [];
          if (options.bytes !== Array)
            object.payload = $util.newBuffer(object.payload);
        }
        object.isXcMsg = false;
      }
      if (message.id != null && message.hasOwnProperty("id"))
        object.id = message.id;
      if (message.chain != null && message.hasOwnProperty("chain"))
        object.chain = message.chain;
      if (message.fromAddress != null && message.hasOwnProperty("fromAddress"))
        object.fromAddress = message.fromAddress;
      if (message.toAddress != null && message.hasOwnProperty("toAddress"))
        object.toAddress = message.toAddress;
      if (message.coins && message.coins.length) {
        object.coins = [];
        for (var j = 0; j < message.coins.length; ++j)
          object.coins[j] = $root.common.Coin.toObject(
            message.coins[j],
            options
          );
      }
      if (message.gas && message.gas.length) {
        object.gas = [];
        for (var j = 0; j < message.gas.length; ++j)
          object.gas[j] = $root.common.Coin.toObject(message.gas[j], options);
      }
      if (message.memo != null && message.hasOwnProperty("memo"))
        object.memo = message.memo;
      if (message.payload != null && message.hasOwnProperty("payload"))
        object.payload =
          options.bytes === String
            ? $util.base64.encode(message.payload, 0, message.payload.length)
            : options.bytes === Array
            ? Array.prototype.slice.call(message.payload)
            : message.payload;
      if (message.isXcMsg != null && message.hasOwnProperty("isXcMsg"))
        object.isXcMsg = message.isXcMsg;
      return object;
    };

    /**
     * Converts this Tx to JSON.
     * @function toJSON
     * @memberof common.Tx
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Tx.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for Tx
     * @function getTypeUrl
     * @memberof common.Tx
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    Tx.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
      if (typeUrlPrefix === undefined) {
        typeUrlPrefix = "type.googleapis.com";
      }
      return typeUrlPrefix + "/common.Tx";
    };

    return Tx;
  })();

  common.Fee = (function () {
    /**
     * Properties of a Fee.
     * @memberof common
     * @interface IFee
     * @property {Array.<common.ICoin>|null} [coins] Fee coins
     * @property {string|null} [poolDeduct] Fee poolDeduct
     */

    /**
     * Constructs a new Fee.
     * @memberof common
     * @classdesc Represents a Fee.
     * @implements IFee
     * @constructor
     * @param {common.IFee=} [properties] Properties to set
     */
    function Fee(properties) {
      this.coins = [];
      if (properties)
        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
    }

    /**
     * Fee coins.
     * @member {Array.<common.ICoin>} coins
     * @memberof common.Fee
     * @instance
     */
    Fee.prototype.coins = $util.emptyArray;

    /**
     * Fee poolDeduct.
     * @member {string} poolDeduct
     * @memberof common.Fee
     * @instance
     */
    Fee.prototype.poolDeduct = "";

    /**
     * Creates a new Fee instance using the specified properties.
     * @function create
     * @memberof common.Fee
     * @static
     * @param {common.IFee=} [properties] Properties to set
     * @returns {common.Fee} Fee instance
     */
    Fee.create = function create(properties) {
      return new Fee(properties);
    };

    /**
     * Encodes the specified Fee message. Does not implicitly {@link common.Fee.verify|verify} messages.
     * @function encode
     * @memberof common.Fee
     * @static
     * @param {common.IFee} message Fee message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Fee.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create();
      if (message.coins != null && message.coins.length)
        for (var i = 0; i < message.coins.length; ++i)
          $root.common.Coin.encode(
            message.coins[i],
            writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
          ).ldelim();
      if (
        message.poolDeduct != null &&
        Object.hasOwnProperty.call(message, "poolDeduct")
      )
        writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.poolDeduct);
      return writer;
    };

    /**
     * Encodes the specified Fee message, length delimited. Does not implicitly {@link common.Fee.verify|verify} messages.
     * @function encodeDelimited
     * @memberof common.Fee
     * @static
     * @param {common.IFee} message Fee message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Fee.encodeDelimited = function encodeDelimited(message, writer) {
      return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Fee message from the specified reader or buffer.
     * @function decode
     * @memberof common.Fee
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {common.Fee} Fee
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Fee.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
      var end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.common.Fee();
      while (reader.pos < end) {
        var tag = reader.uint32();
        switch (tag >>> 3) {
          case 1: {
            if (!(message.coins && message.coins.length)) message.coins = [];
            message.coins.push(
              $root.common.Coin.decode(reader, reader.uint32())
            );
            break;
          }
          case 2: {
            message.poolDeduct = reader.string();
            break;
          }
          default:
            reader.skipType(tag & 7);
            break;
        }
      }
      return message;
    };

    /**
     * Decodes a Fee message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof common.Fee
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {common.Fee} Fee
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Fee.decodeDelimited = function decodeDelimited(reader) {
      if (!(reader instanceof $Reader)) reader = new $Reader(reader);
      return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Fee message.
     * @function verify
     * @memberof common.Fee
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Fee.verify = function verify(message) {
      if (typeof message !== "object" || message === null)
        return "object expected";
      if (message.coins != null && message.hasOwnProperty("coins")) {
        if (!Array.isArray(message.coins)) return "coins: array expected";
        for (var i = 0; i < message.coins.length; ++i) {
          var error = $root.common.Coin.verify(message.coins[i]);
          if (error) return "coins." + error;
        }
      }
      if (message.poolDeduct != null && message.hasOwnProperty("poolDeduct"))
        if (!$util.isString(message.poolDeduct))
          return "poolDeduct: string expected";
      return null;
    };

    /**
     * Creates a Fee message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof common.Fee
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {common.Fee} Fee
     */
    Fee.fromObject = function fromObject(object) {
      if (object instanceof $root.common.Fee) return object;
      var message = new $root.common.Fee();
      if (object.coins) {
        if (!Array.isArray(object.coins))
          throw TypeError(".common.Fee.coins: array expected");
        message.coins = [];
        for (var i = 0; i < object.coins.length; ++i) {
          if (typeof object.coins[i] !== "object")
            throw TypeError(".common.Fee.coins: object expected");
          message.coins[i] = $root.common.Coin.fromObject(object.coins[i]);
        }
      }
      if (object.poolDeduct != null)
        message.poolDeduct = String(object.poolDeduct);
      return message;
    };

    /**
     * Creates a plain object from a Fee message. Also converts values to other types if specified.
     * @function toObject
     * @memberof common.Fee
     * @static
     * @param {common.Fee} message Fee
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Fee.toObject = function toObject(message, options) {
      if (!options) options = {};
      var object = {};
      if (options.arrays || options.defaults) object.coins = [];
      if (options.defaults) object.poolDeduct = "";
      if (message.coins && message.coins.length) {
        object.coins = [];
        for (var j = 0; j < message.coins.length; ++j)
          object.coins[j] = $root.common.Coin.toObject(
            message.coins[j],
            options
          );
      }
      if (message.poolDeduct != null && message.hasOwnProperty("poolDeduct"))
        object.poolDeduct = message.poolDeduct;
      return object;
    };

    /**
     * Converts this Fee to JSON.
     * @function toJSON
     * @memberof common.Fee
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Fee.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for Fee
     * @function getTypeUrl
     * @memberof common.Fee
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    Fee.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
      if (typeUrlPrefix === undefined) {
        typeUrlPrefix = "type.googleapis.com";
      }
      return typeUrlPrefix + "/common.Fee";
    };

    return Fee;
  })();

  common.KVPair = (function () {
    /**
     * Properties of a KVPair.
     * @memberof common
     * @interface IKVPair
     * @property {Uint8Array|null} [key] KVPair key
     * @property {Uint8Array|null} [value] KVPair value
     */

    /**
     * Constructs a new KVPair.
     * @memberof common
     * @classdesc Represents a KVPair.
     * @implements IKVPair
     * @constructor
     * @param {common.IKVPair=} [properties] Properties to set
     */
    function KVPair(properties) {
      if (properties)
        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
    }

    /**
     * KVPair key.
     * @member {Uint8Array} key
     * @memberof common.KVPair
     * @instance
     */
    KVPair.prototype.key = $util.newBuffer([]);

    /**
     * KVPair value.
     * @member {Uint8Array} value
     * @memberof common.KVPair
     * @instance
     */
    KVPair.prototype.value = $util.newBuffer([]);

    /**
     * Creates a new KVPair instance using the specified properties.
     * @function create
     * @memberof common.KVPair
     * @static
     * @param {common.IKVPair=} [properties] Properties to set
     * @returns {common.KVPair} KVPair instance
     */
    KVPair.create = function create(properties) {
      return new KVPair(properties);
    };

    /**
     * Encodes the specified KVPair message. Does not implicitly {@link common.KVPair.verify|verify} messages.
     * @function encode
     * @memberof common.KVPair
     * @static
     * @param {common.IKVPair} message KVPair message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    KVPair.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create();
      if (message.key != null && Object.hasOwnProperty.call(message, "key"))
        writer.uint32(/* id 1, wireType 2 =*/ 10).bytes(message.key);
      if (message.value != null && Object.hasOwnProperty.call(message, "value"))
        writer.uint32(/* id 2, wireType 2 =*/ 18).bytes(message.value);
      return writer;
    };

    /**
     * Encodes the specified KVPair message, length delimited. Does not implicitly {@link common.KVPair.verify|verify} messages.
     * @function encodeDelimited
     * @memberof common.KVPair
     * @static
     * @param {common.IKVPair} message KVPair message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    KVPair.encodeDelimited = function encodeDelimited(message, writer) {
      return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a KVPair message from the specified reader or buffer.
     * @function decode
     * @memberof common.KVPair
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {common.KVPair} KVPair
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    KVPair.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
      var end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.common.KVPair();
      while (reader.pos < end) {
        var tag = reader.uint32();
        switch (tag >>> 3) {
          case 1: {
            message.key = reader.bytes();
            break;
          }
          case 2: {
            message.value = reader.bytes();
            break;
          }
          default:
            reader.skipType(tag & 7);
            break;
        }
      }
      return message;
    };

    /**
     * Decodes a KVPair message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof common.KVPair
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {common.KVPair} KVPair
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    KVPair.decodeDelimited = function decodeDelimited(reader) {
      if (!(reader instanceof $Reader)) reader = new $Reader(reader);
      return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a KVPair message.
     * @function verify
     * @memberof common.KVPair
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    KVPair.verify = function verify(message) {
      if (typeof message !== "object" || message === null)
        return "object expected";
      if (message.key != null && message.hasOwnProperty("key"))
        if (
          !(
            (message.key && typeof message.key.length === "number") ||
            $util.isString(message.key)
          )
        )
          return "key: buffer expected";
      if (message.value != null && message.hasOwnProperty("value"))
        if (
          !(
            (message.value && typeof message.value.length === "number") ||
            $util.isString(message.value)
          )
        )
          return "value: buffer expected";
      return null;
    };

    /**
     * Creates a KVPair message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof common.KVPair
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {common.KVPair} KVPair
     */
    KVPair.fromObject = function fromObject(object) {
      if (object instanceof $root.common.KVPair) return object;
      var message = new $root.common.KVPair();
      if (object.key != null)
        if (typeof object.key === "string")
          $util.base64.decode(
            object.key,
            (message.key = $util.newBuffer($util.base64.length(object.key))),
            0
          );
        else if (object.key.length >= 0) message.key = object.key;
      if (object.value != null)
        if (typeof object.value === "string")
          $util.base64.decode(
            object.value,
            (message.value = $util.newBuffer(
              $util.base64.length(object.value)
            )),
            0
          );
        else if (object.value.length >= 0) message.value = object.value;
      return message;
    };

    /**
     * Creates a plain object from a KVPair message. Also converts values to other types if specified.
     * @function toObject
     * @memberof common.KVPair
     * @static
     * @param {common.KVPair} message KVPair
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    KVPair.toObject = function toObject(message, options) {
      if (!options) options = {};
      var object = {};
      if (options.defaults) {
        if (options.bytes === String) object.key = "";
        else {
          object.key = [];
          if (options.bytes !== Array) object.key = $util.newBuffer(object.key);
        }
        if (options.bytes === String) object.value = "";
        else {
          object.value = [];
          if (options.bytes !== Array)
            object.value = $util.newBuffer(object.value);
        }
      }
      if (message.key != null && message.hasOwnProperty("key"))
        object.key =
          options.bytes === String
            ? $util.base64.encode(message.key, 0, message.key.length)
            : options.bytes === Array
            ? Array.prototype.slice.call(message.key)
            : message.key;
      if (message.value != null && message.hasOwnProperty("value"))
        object.value =
          options.bytes === String
            ? $util.base64.encode(message.value, 0, message.value.length)
            : options.bytes === Array
            ? Array.prototype.slice.call(message.value)
            : message.value;
      return object;
    };

    /**
     * Converts this KVPair to JSON.
     * @function toJSON
     * @memberof common.KVPair
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    KVPair.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for KVPair
     * @function getTypeUrl
     * @memberof common.KVPair
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    KVPair.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
      if (typeUrlPrefix === undefined) {
        typeUrlPrefix = "type.googleapis.com";
      }
      return typeUrlPrefix + "/common.KVPair";
    };

    return KVPair;
  })();

  common.DcAddress = (function () {
    /**
     * Properties of a DcAddress.
     * @memberof common
     * @interface IDcAddress
     * @property {Uint8Array|null} [address] DcAddress address
     */

    /**
     * Constructs a new DcAddress.
     * @memberof common
     * @classdesc Represents a DcAddress.
     * @implements IDcAddress
     * @constructor
     * @param {common.IDcAddress=} [properties] Properties to set
     */
    function DcAddress(properties) {
      if (properties)
        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
    }

    /**
     * DcAddress address.
     * @member {Uint8Array} address
     * @memberof common.DcAddress
     * @instance
     */
    DcAddress.prototype.address = $util.newBuffer([]);

    /**
     * Creates a new DcAddress instance using the specified properties.
     * @function create
     * @memberof common.DcAddress
     * @static
     * @param {common.IDcAddress=} [properties] Properties to set
     * @returns {common.DcAddress} DcAddress instance
     */
    DcAddress.create = function create(properties) {
      return new DcAddress(properties);
    };

    /**
     * Encodes the specified DcAddress message. Does not implicitly {@link common.DcAddress.verify|verify} messages.
     * @function encode
     * @memberof common.DcAddress
     * @static
     * @param {common.IDcAddress} message DcAddress message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DcAddress.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create();
      if (
        message.address != null &&
        Object.hasOwnProperty.call(message, "address")
      )
        writer.uint32(/* id 1, wireType 2 =*/ 10).bytes(message.address);
      return writer;
    };

    /**
     * Encodes the specified DcAddress message, length delimited. Does not implicitly {@link common.DcAddress.verify|verify} messages.
     * @function encodeDelimited
     * @memberof common.DcAddress
     * @static
     * @param {common.IDcAddress} message DcAddress message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DcAddress.encodeDelimited = function encodeDelimited(message, writer) {
      return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a DcAddress message from the specified reader or buffer.
     * @function decode
     * @memberof common.DcAddress
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {common.DcAddress} DcAddress
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DcAddress.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
      var end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.common.DcAddress();
      while (reader.pos < end) {
        var tag = reader.uint32();
        switch (tag >>> 3) {
          case 1: {
            message.address = reader.bytes();
            break;
          }
          default:
            reader.skipType(tag & 7);
            break;
        }
      }
      return message;
    };

    /**
     * Decodes a DcAddress message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof common.DcAddress
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {common.DcAddress} DcAddress
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DcAddress.decodeDelimited = function decodeDelimited(reader) {
      if (!(reader instanceof $Reader)) reader = new $Reader(reader);
      return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a DcAddress message.
     * @function verify
     * @memberof common.DcAddress
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    DcAddress.verify = function verify(message) {
      if (typeof message !== "object" || message === null)
        return "object expected";
      if (message.address != null && message.hasOwnProperty("address"))
        if (
          !(
            (message.address && typeof message.address.length === "number") ||
            $util.isString(message.address)
          )
        )
          return "address: buffer expected";
      return null;
    };

    /**
     * Creates a DcAddress message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof common.DcAddress
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {common.DcAddress} DcAddress
     */
    DcAddress.fromObject = function fromObject(object) {
      if (object instanceof $root.common.DcAddress) return object;
      var message = new $root.common.DcAddress();
      if (object.address != null)
        if (typeof object.address === "string")
          $util.base64.decode(
            object.address,
            (message.address = $util.newBuffer(
              $util.base64.length(object.address)
            )),
            0
          );
        else if (object.address.length >= 0) message.address = object.address;
      return message;
    };

    /**
     * Creates a plain object from a DcAddress message. Also converts values to other types if specified.
     * @function toObject
     * @memberof common.DcAddress
     * @static
     * @param {common.DcAddress} message DcAddress
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    DcAddress.toObject = function toObject(message, options) {
      if (!options) options = {};
      var object = {};
      if (options.defaults)
        if (options.bytes === String) object.address = "";
        else {
          object.address = [];
          if (options.bytes !== Array)
            object.address = $util.newBuffer(object.address);
        }
      if (message.address != null && message.hasOwnProperty("address"))
        object.address =
          options.bytes === String
            ? $util.base64.encode(message.address, 0, message.address.length)
            : options.bytes === Array
            ? Array.prototype.slice.call(message.address)
            : message.address;
      return object;
    };

    /**
     * Converts this DcAddress to JSON.
     * @function toJSON
     * @memberof common.DcAddress
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    DcAddress.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for DcAddress
     * @function getTypeUrl
     * @memberof common.DcAddress
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    DcAddress.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
      if (typeUrlPrefix === undefined) {
        typeUrlPrefix = "type.googleapis.com";
      }
      return typeUrlPrefix + "/common.DcAddress";
    };

    return DcAddress;
  })();

  common.DcHash = (function () {
    /**
     * Properties of a DcHash.
     * @memberof common
     * @interface IDcHash
     * @property {Array.<Uint8Array>|null} [hash] DcHash hash
     */

    /**
     * Constructs a new DcHash.
     * @memberof common
     * @classdesc Represents a DcHash.
     * @implements IDcHash
     * @constructor
     * @param {common.IDcHash=} [properties] Properties to set
     */
    function DcHash(properties) {
      this.hash = [];
      if (properties)
        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
    }

    /**
     * DcHash hash.
     * @member {Array.<Uint8Array>} hash
     * @memberof common.DcHash
     * @instance
     */
    DcHash.prototype.hash = $util.emptyArray;

    /**
     * Creates a new DcHash instance using the specified properties.
     * @function create
     * @memberof common.DcHash
     * @static
     * @param {common.IDcHash=} [properties] Properties to set
     * @returns {common.DcHash} DcHash instance
     */
    DcHash.create = function create(properties) {
      return new DcHash(properties);
    };

    /**
     * Encodes the specified DcHash message. Does not implicitly {@link common.DcHash.verify|verify} messages.
     * @function encode
     * @memberof common.DcHash
     * @static
     * @param {common.IDcHash} message DcHash message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DcHash.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create();
      if (message.hash != null && message.hash.length)
        for (var i = 0; i < message.hash.length; ++i)
          writer.uint32(/* id 1, wireType 2 =*/ 10).bytes(message.hash[i]);
      return writer;
    };

    /**
     * Encodes the specified DcHash message, length delimited. Does not implicitly {@link common.DcHash.verify|verify} messages.
     * @function encodeDelimited
     * @memberof common.DcHash
     * @static
     * @param {common.IDcHash} message DcHash message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DcHash.encodeDelimited = function encodeDelimited(message, writer) {
      return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a DcHash message from the specified reader or buffer.
     * @function decode
     * @memberof common.DcHash
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {common.DcHash} DcHash
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DcHash.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
      var end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.common.DcHash();
      while (reader.pos < end) {
        var tag = reader.uint32();
        switch (tag >>> 3) {
          case 1: {
            if (!(message.hash && message.hash.length)) message.hash = [];
            message.hash.push(reader.bytes());
            break;
          }
          default:
            reader.skipType(tag & 7);
            break;
        }
      }
      return message;
    };

    /**
     * Decodes a DcHash message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof common.DcHash
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {common.DcHash} DcHash
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DcHash.decodeDelimited = function decodeDelimited(reader) {
      if (!(reader instanceof $Reader)) reader = new $Reader(reader);
      return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a DcHash message.
     * @function verify
     * @memberof common.DcHash
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    DcHash.verify = function verify(message) {
      if (typeof message !== "object" || message === null)
        return "object expected";
      if (message.hash != null && message.hasOwnProperty("hash")) {
        if (!Array.isArray(message.hash)) return "hash: array expected";
        for (var i = 0; i < message.hash.length; ++i)
          if (
            !(
              (message.hash[i] && typeof message.hash[i].length === "number") ||
              $util.isString(message.hash[i])
            )
          )
            return "hash: buffer[] expected";
      }
      return null;
    };

    /**
     * Creates a DcHash message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof common.DcHash
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {common.DcHash} DcHash
     */
    DcHash.fromObject = function fromObject(object) {
      if (object instanceof $root.common.DcHash) return object;
      var message = new $root.common.DcHash();
      if (object.hash) {
        if (!Array.isArray(object.hash))
          throw TypeError(".common.DcHash.hash: array expected");
        message.hash = [];
        for (var i = 0; i < object.hash.length; ++i)
          if (typeof object.hash[i] === "string")
            $util.base64.decode(
              object.hash[i],
              (message.hash[i] = $util.newBuffer(
                $util.base64.length(object.hash[i])
              )),
              0
            );
          else if (object.hash[i].length >= 0) message.hash[i] = object.hash[i];
      }
      return message;
    };

    /**
     * Creates a plain object from a DcHash message. Also converts values to other types if specified.
     * @function toObject
     * @memberof common.DcHash
     * @static
     * @param {common.DcHash} message DcHash
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    DcHash.toObject = function toObject(message, options) {
      if (!options) options = {};
      var object = {};
      if (options.arrays || options.defaults) object.hash = [];
      if (message.hash && message.hash.length) {
        object.hash = [];
        for (var j = 0; j < message.hash.length; ++j)
          object.hash[j] =
            options.bytes === String
              ? $util.base64.encode(message.hash[j], 0, message.hash[j].length)
              : options.bytes === Array
              ? Array.prototype.slice.call(message.hash[j])
              : message.hash[j];
      }
      return object;
    };

    /**
     * Converts this DcHash to JSON.
     * @function toJSON
     * @memberof common.DcHash
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    DcHash.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for DcHash
     * @function getTypeUrl
     * @memberof common.DcHash
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    DcHash.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
      if (typeUrlPrefix === undefined) {
        typeUrlPrefix = "type.googleapis.com";
      }
      return typeUrlPrefix + "/common.DcHash";
    };

    return DcHash;
  })();

  common.H128 = (function () {
    /**
     * Properties of a H128.
     * @memberof common
     * @interface IH128
     * @property {number|Long|null} [Hi] H128 Hi
     * @property {number|Long|null} [Lo] H128 Lo
     */

    /**
     * Constructs a new H128.
     * @memberof common
     * @classdesc Represents a H128.
     * @implements IH128
     * @constructor
     * @param {common.IH128=} [properties] Properties to set
     */
    function H128(properties) {
      if (properties)
        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
    }

    /**
     * H128 Hi.
     * @member {number|Long} Hi
     * @memberof common.H128
     * @instance
     */
    H128.prototype.Hi = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;

    /**
     * H128 Lo.
     * @member {number|Long} Lo
     * @memberof common.H128
     * @instance
     */
    H128.prototype.Lo = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;

    /**
     * Creates a new H128 instance using the specified properties.
     * @function create
     * @memberof common.H128
     * @static
     * @param {common.IH128=} [properties] Properties to set
     * @returns {common.H128} H128 instance
     */
    H128.create = function create(properties) {
      return new H128(properties);
    };

    /**
     * Encodes the specified H128 message. Does not implicitly {@link common.H128.verify|verify} messages.
     * @function encode
     * @memberof common.H128
     * @static
     * @param {common.IH128} message H128 message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    H128.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create();
      if (message.Hi != null && Object.hasOwnProperty.call(message, "Hi"))
        writer.uint32(/* id 1, wireType 0 =*/ 8).uint64(message.Hi);
      if (message.Lo != null && Object.hasOwnProperty.call(message, "Lo"))
        writer.uint32(/* id 2, wireType 0 =*/ 16).uint64(message.Lo);
      return writer;
    };

    /**
     * Encodes the specified H128 message, length delimited. Does not implicitly {@link common.H128.verify|verify} messages.
     * @function encodeDelimited
     * @memberof common.H128
     * @static
     * @param {common.IH128} message H128 message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    H128.encodeDelimited = function encodeDelimited(message, writer) {
      return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a H128 message from the specified reader or buffer.
     * @function decode
     * @memberof common.H128
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {common.H128} H128
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    H128.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
      var end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.common.H128();
      while (reader.pos < end) {
        var tag = reader.uint32();
        switch (tag >>> 3) {
          case 1: {
            message.Hi = reader.uint64();
            break;
          }
          case 2: {
            message.Lo = reader.uint64();
            break;
          }
          default:
            reader.skipType(tag & 7);
            break;
        }
      }
      return message;
    };

    /**
     * Decodes a H128 message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof common.H128
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {common.H128} H128
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    H128.decodeDelimited = function decodeDelimited(reader) {
      if (!(reader instanceof $Reader)) reader = new $Reader(reader);
      return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a H128 message.
     * @function verify
     * @memberof common.H128
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    H128.verify = function verify(message) {
      if (typeof message !== "object" || message === null)
        return "object expected";
      if (message.Hi != null && message.hasOwnProperty("Hi"))
        if (
          !$util.isInteger(message.Hi) &&
          !(
            message.Hi &&
            $util.isInteger(message.Hi.low) &&
            $util.isInteger(message.Hi.high)
          )
        )
          return "Hi: integer|Long expected";
      if (message.Lo != null && message.hasOwnProperty("Lo"))
        if (
          !$util.isInteger(message.Lo) &&
          !(
            message.Lo &&
            $util.isInteger(message.Lo.low) &&
            $util.isInteger(message.Lo.high)
          )
        )
          return "Lo: integer|Long expected";
      return null;
    };

    /**
     * Creates a H128 message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof common.H128
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {common.H128} H128
     */
    H128.fromObject = function fromObject(object) {
      if (object instanceof $root.common.H128) return object;
      var message = new $root.common.H128();
      if (object.Hi != null)
        if ($util.Long)
          (message.Hi = $util.Long.fromValue(object.Hi)).unsigned = true;
        else if (typeof object.Hi === "string")
          message.Hi = parseInt(object.Hi, 10);
        else if (typeof object.Hi === "number") message.Hi = object.Hi;
        else if (typeof object.Hi === "object")
          message.Hi = new $util.LongBits(
            object.Hi.low >>> 0,
            object.Hi.high >>> 0
          ).toNumber(true);
      if (object.Lo != null)
        if ($util.Long)
          (message.Lo = $util.Long.fromValue(object.Lo)).unsigned = true;
        else if (typeof object.Lo === "string")
          message.Lo = parseInt(object.Lo, 10);
        else if (typeof object.Lo === "number") message.Lo = object.Lo;
        else if (typeof object.Lo === "object")
          message.Lo = new $util.LongBits(
            object.Lo.low >>> 0,
            object.Lo.high >>> 0
          ).toNumber(true);
      return message;
    };

    /**
     * Creates a plain object from a H128 message. Also converts values to other types if specified.
     * @function toObject
     * @memberof common.H128
     * @static
     * @param {common.H128} message H128
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    H128.toObject = function toObject(message, options) {
      if (!options) options = {};
      var object = {};
      if (options.defaults) {
        if ($util.Long) {
          var long = new $util.Long(0, 0, true);
          object.Hi =
            options.longs === String
              ? long.toString()
              : options.longs === Number
              ? long.toNumber()
              : long;
        } else object.Hi = options.longs === String ? "0" : 0;
        if ($util.Long) {
          var long = new $util.Long(0, 0, true);
          object.Lo =
            options.longs === String
              ? long.toString()
              : options.longs === Number
              ? long.toNumber()
              : long;
        } else object.Lo = options.longs === String ? "0" : 0;
      }
      if (message.Hi != null && message.hasOwnProperty("Hi"))
        if (typeof message.Hi === "number")
          object.Hi =
            options.longs === String ? String(message.Hi) : message.Hi;
        else
          object.Hi =
            options.longs === String
              ? $util.Long.prototype.toString.call(message.Hi)
              : options.longs === Number
              ? new $util.LongBits(
                  message.Hi.low >>> 0,
                  message.Hi.high >>> 0
                ).toNumber(true)
              : message.Hi;
      if (message.Lo != null && message.hasOwnProperty("Lo"))
        if (typeof message.Lo === "number")
          object.Lo =
            options.longs === String ? String(message.Lo) : message.Lo;
        else
          object.Lo =
            options.longs === String
              ? $util.Long.prototype.toString.call(message.Lo)
              : options.longs === Number
              ? new $util.LongBits(
                  message.Lo.low >>> 0,
                  message.Lo.high >>> 0
                ).toNumber(true)
              : message.Lo;
      return object;
    };

    /**
     * Converts this H128 to JSON.
     * @function toJSON
     * @memberof common.H128
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    H128.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for H128
     * @function getTypeUrl
     * @memberof common.H128
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    H128.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
      if (typeUrlPrefix === undefined) {
        typeUrlPrefix = "type.googleapis.com";
      }
      return typeUrlPrefix + "/common.H128";
    };

    return H128;
  })();

  common.H160 = (function () {
    /**
     * Properties of a H160.
     * @memberof common
     * @interface IH160
     * @property {common.IH128|null} [Hi] H160 Hi
     * @property {number|null} [Lo] H160 Lo
     */

    /**
     * Constructs a new H160.
     * @memberof common
     * @classdesc Represents a H160.
     * @implements IH160
     * @constructor
     * @param {common.IH160=} [properties] Properties to set
     */
    function H160(properties) {
      if (properties)
        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
    }

    /**
     * H160 Hi.
     * @member {common.IH128|null|undefined} Hi
     * @memberof common.H160
     * @instance
     */
    H160.prototype.Hi = null;

    /**
     * H160 Lo.
     * @member {number} Lo
     * @memberof common.H160
     * @instance
     */
    H160.prototype.Lo = 0;

    /**
     * Creates a new H160 instance using the specified properties.
     * @function create
     * @memberof common.H160
     * @static
     * @param {common.IH160=} [properties] Properties to set
     * @returns {common.H160} H160 instance
     */
    H160.create = function create(properties) {
      return new H160(properties);
    };

    /**
     * Encodes the specified H160 message. Does not implicitly {@link common.H160.verify|verify} messages.
     * @function encode
     * @memberof common.H160
     * @static
     * @param {common.IH160} message H160 message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    H160.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create();
      if (message.Hi != null && Object.hasOwnProperty.call(message, "Hi"))
        $root.common.H128.encode(
          message.Hi,
          writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
        ).ldelim();
      if (message.Lo != null && Object.hasOwnProperty.call(message, "Lo"))
        writer.uint32(/* id 2, wireType 0 =*/ 16).uint32(message.Lo);
      return writer;
    };

    /**
     * Encodes the specified H160 message, length delimited. Does not implicitly {@link common.H160.verify|verify} messages.
     * @function encodeDelimited
     * @memberof common.H160
     * @static
     * @param {common.IH160} message H160 message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    H160.encodeDelimited = function encodeDelimited(message, writer) {
      return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a H160 message from the specified reader or buffer.
     * @function decode
     * @memberof common.H160
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {common.H160} H160
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    H160.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
      var end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.common.H160();
      while (reader.pos < end) {
        var tag = reader.uint32();
        switch (tag >>> 3) {
          case 1: {
            message.Hi = $root.common.H128.decode(reader, reader.uint32());
            break;
          }
          case 2: {
            message.Lo = reader.uint32();
            break;
          }
          default:
            reader.skipType(tag & 7);
            break;
        }
      }
      return message;
    };

    /**
     * Decodes a H160 message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof common.H160
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {common.H160} H160
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    H160.decodeDelimited = function decodeDelimited(reader) {
      if (!(reader instanceof $Reader)) reader = new $Reader(reader);
      return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a H160 message.
     * @function verify
     * @memberof common.H160
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    H160.verify = function verify(message) {
      if (typeof message !== "object" || message === null)
        return "object expected";
      if (message.Hi != null && message.hasOwnProperty("Hi")) {
        var error = $root.common.H128.verify(message.Hi);
        if (error) return "Hi." + error;
      }
      if (message.Lo != null && message.hasOwnProperty("Lo"))
        if (!$util.isInteger(message.Lo)) return "Lo: integer expected";
      return null;
    };

    /**
     * Creates a H160 message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof common.H160
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {common.H160} H160
     */
    H160.fromObject = function fromObject(object) {
      if (object instanceof $root.common.H160) return object;
      var message = new $root.common.H160();
      if (object.Hi != null) {
        if (typeof object.Hi !== "object")
          throw TypeError(".common.H160.Hi: object expected");
        message.Hi = $root.common.H128.fromObject(object.Hi);
      }
      if (object.Lo != null) message.Lo = object.Lo >>> 0;
      return message;
    };

    /**
     * Creates a plain object from a H160 message. Also converts values to other types if specified.
     * @function toObject
     * @memberof common.H160
     * @static
     * @param {common.H160} message H160
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    H160.toObject = function toObject(message, options) {
      if (!options) options = {};
      var object = {};
      if (options.defaults) {
        object.Hi = null;
        object.Lo = 0;
      }
      if (message.Hi != null && message.hasOwnProperty("Hi"))
        object.Hi = $root.common.H128.toObject(message.Hi, options);
      if (message.Lo != null && message.hasOwnProperty("Lo"))
        object.Lo = message.Lo;
      return object;
    };

    /**
     * Converts this H160 to JSON.
     * @function toJSON
     * @memberof common.H160
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    H160.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for H160
     * @function getTypeUrl
     * @memberof common.H160
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    H160.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
      if (typeUrlPrefix === undefined) {
        typeUrlPrefix = "type.googleapis.com";
      }
      return typeUrlPrefix + "/common.H160";
    };

    return H160;
  })();

  common.H256 = (function () {
    /**
     * Properties of a H256.
     * @memberof common
     * @interface IH256
     * @property {common.IH128|null} [Hi] H256 Hi
     * @property {common.IH128|null} [Lo] H256 Lo
     */

    /**
     * Constructs a new H256.
     * @memberof common
     * @classdesc Represents a H256.
     * @implements IH256
     * @constructor
     * @param {common.IH256=} [properties] Properties to set
     */
    function H256(properties) {
      if (properties)
        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
    }

    /**
     * H256 Hi.
     * @member {common.IH128|null|undefined} Hi
     * @memberof common.H256
     * @instance
     */
    H256.prototype.Hi = null;

    /**
     * H256 Lo.
     * @member {common.IH128|null|undefined} Lo
     * @memberof common.H256
     * @instance
     */
    H256.prototype.Lo = null;

    /**
     * Creates a new H256 instance using the specified properties.
     * @function create
     * @memberof common.H256
     * @static
     * @param {common.IH256=} [properties] Properties to set
     * @returns {common.H256} H256 instance
     */
    H256.create = function create(properties) {
      return new H256(properties);
    };

    /**
     * Encodes the specified H256 message. Does not implicitly {@link common.H256.verify|verify} messages.
     * @function encode
     * @memberof common.H256
     * @static
     * @param {common.IH256} message H256 message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    H256.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create();
      if (message.Hi != null && Object.hasOwnProperty.call(message, "Hi"))
        $root.common.H128.encode(
          message.Hi,
          writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
        ).ldelim();
      if (message.Lo != null && Object.hasOwnProperty.call(message, "Lo"))
        $root.common.H128.encode(
          message.Lo,
          writer.uint32(/* id 2, wireType 2 =*/ 18).fork()
        ).ldelim();
      return writer;
    };

    /**
     * Encodes the specified H256 message, length delimited. Does not implicitly {@link common.H256.verify|verify} messages.
     * @function encodeDelimited
     * @memberof common.H256
     * @static
     * @param {common.IH256} message H256 message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    H256.encodeDelimited = function encodeDelimited(message, writer) {
      return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a H256 message from the specified reader or buffer.
     * @function decode
     * @memberof common.H256
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {common.H256} H256
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    H256.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
      var end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.common.H256();
      while (reader.pos < end) {
        var tag = reader.uint32();
        switch (tag >>> 3) {
          case 1: {
            message.Hi = $root.common.H128.decode(reader, reader.uint32());
            break;
          }
          case 2: {
            message.Lo = $root.common.H128.decode(reader, reader.uint32());
            break;
          }
          default:
            reader.skipType(tag & 7);
            break;
        }
      }
      return message;
    };

    /**
     * Decodes a H256 message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof common.H256
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {common.H256} H256
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    H256.decodeDelimited = function decodeDelimited(reader) {
      if (!(reader instanceof $Reader)) reader = new $Reader(reader);
      return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a H256 message.
     * @function verify
     * @memberof common.H256
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    H256.verify = function verify(message) {
      if (typeof message !== "object" || message === null)
        return "object expected";
      if (message.Hi != null && message.hasOwnProperty("Hi")) {
        var error = $root.common.H128.verify(message.Hi);
        if (error) return "Hi." + error;
      }
      if (message.Lo != null && message.hasOwnProperty("Lo")) {
        var error = $root.common.H128.verify(message.Lo);
        if (error) return "Lo." + error;
      }
      return null;
    };

    /**
     * Creates a H256 message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof common.H256
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {common.H256} H256
     */
    H256.fromObject = function fromObject(object) {
      if (object instanceof $root.common.H256) return object;
      var message = new $root.common.H256();
      if (object.Hi != null) {
        if (typeof object.Hi !== "object")
          throw TypeError(".common.H256.Hi: object expected");
        message.Hi = $root.common.H128.fromObject(object.Hi);
      }
      if (object.Lo != null) {
        if (typeof object.Lo !== "object")
          throw TypeError(".common.H256.Lo: object expected");
        message.Lo = $root.common.H128.fromObject(object.Lo);
      }
      return message;
    };

    /**
     * Creates a plain object from a H256 message. Also converts values to other types if specified.
     * @function toObject
     * @memberof common.H256
     * @static
     * @param {common.H256} message H256
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    H256.toObject = function toObject(message, options) {
      if (!options) options = {};
      var object = {};
      if (options.defaults) {
        object.Hi = null;
        object.Lo = null;
      }
      if (message.Hi != null && message.hasOwnProperty("Hi"))
        object.Hi = $root.common.H128.toObject(message.Hi, options);
      if (message.Lo != null && message.hasOwnProperty("Lo"))
        object.Lo = $root.common.H128.toObject(message.Lo, options);
      return object;
    };

    /**
     * Converts this H256 to JSON.
     * @function toJSON
     * @memberof common.H256
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    H256.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for H256
     * @function getTypeUrl
     * @memberof common.H256
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    H256.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
      if (typeUrlPrefix === undefined) {
        typeUrlPrefix = "type.googleapis.com";
      }
      return typeUrlPrefix + "/common.H256";
    };

    return H256;
  })();

  common.Validator = (function () {
    /**
     * Properties of a Validator.
     * @memberof common
     * @interface IValidator
     * @property {Uint8Array|null} [address] Validator address
     * @property {number|Long|null} [power] Validator power
     */

    /**
     * Constructs a new Validator.
     * @memberof common
     * @classdesc Represents a Validator.
     * @implements IValidator
     * @constructor
     * @param {common.IValidator=} [properties] Properties to set
     */
    function Validator(properties) {
      if (properties)
        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
    }

    /**
     * Validator address.
     * @member {Uint8Array} address
     * @memberof common.Validator
     * @instance
     */
    Validator.prototype.address = $util.newBuffer([]);

    /**
     * Validator power.
     * @member {number|Long} power
     * @memberof common.Validator
     * @instance
     */
    Validator.prototype.power = $util.Long
      ? $util.Long.fromBits(0, 0, false)
      : 0;

    /**
     * Creates a new Validator instance using the specified properties.
     * @function create
     * @memberof common.Validator
     * @static
     * @param {common.IValidator=} [properties] Properties to set
     * @returns {common.Validator} Validator instance
     */
    Validator.create = function create(properties) {
      return new Validator(properties);
    };

    /**
     * Encodes the specified Validator message. Does not implicitly {@link common.Validator.verify|verify} messages.
     * @function encode
     * @memberof common.Validator
     * @static
     * @param {common.IValidator} message Validator message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Validator.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create();
      if (
        message.address != null &&
        Object.hasOwnProperty.call(message, "address")
      )
        writer.uint32(/* id 1, wireType 2 =*/ 10).bytes(message.address);
      if (message.power != null && Object.hasOwnProperty.call(message, "power"))
        writer.uint32(/* id 3, wireType 0 =*/ 24).int64(message.power);
      return writer;
    };

    /**
     * Encodes the specified Validator message, length delimited. Does not implicitly {@link common.Validator.verify|verify} messages.
     * @function encodeDelimited
     * @memberof common.Validator
     * @static
     * @param {common.IValidator} message Validator message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Validator.encodeDelimited = function encodeDelimited(message, writer) {
      return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Validator message from the specified reader or buffer.
     * @function decode
     * @memberof common.Validator
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {common.Validator} Validator
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Validator.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
      var end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.common.Validator();
      while (reader.pos < end) {
        var tag = reader.uint32();
        switch (tag >>> 3) {
          case 1: {
            message.address = reader.bytes();
            break;
          }
          case 3: {
            message.power = reader.int64();
            break;
          }
          default:
            reader.skipType(tag & 7);
            break;
        }
      }
      return message;
    };

    /**
     * Decodes a Validator message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof common.Validator
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {common.Validator} Validator
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Validator.decodeDelimited = function decodeDelimited(reader) {
      if (!(reader instanceof $Reader)) reader = new $Reader(reader);
      return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Validator message.
     * @function verify
     * @memberof common.Validator
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Validator.verify = function verify(message) {
      if (typeof message !== "object" || message === null)
        return "object expected";
      if (message.address != null && message.hasOwnProperty("address"))
        if (
          !(
            (message.address && typeof message.address.length === "number") ||
            $util.isString(message.address)
          )
        )
          return "address: buffer expected";
      if (message.power != null && message.hasOwnProperty("power"))
        if (
          !$util.isInteger(message.power) &&
          !(
            message.power &&
            $util.isInteger(message.power.low) &&
            $util.isInteger(message.power.high)
          )
        )
          return "power: integer|Long expected";
      return null;
    };

    /**
     * Creates a Validator message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof common.Validator
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {common.Validator} Validator
     */
    Validator.fromObject = function fromObject(object) {
      if (object instanceof $root.common.Validator) return object;
      var message = new $root.common.Validator();
      if (object.address != null)
        if (typeof object.address === "string")
          $util.base64.decode(
            object.address,
            (message.address = $util.newBuffer(
              $util.base64.length(object.address)
            )),
            0
          );
        else if (object.address.length >= 0) message.address = object.address;
      if (object.power != null)
        if ($util.Long)
          (message.power = $util.Long.fromValue(object.power)).unsigned = false;
        else if (typeof object.power === "string")
          message.power = parseInt(object.power, 10);
        else if (typeof object.power === "number") message.power = object.power;
        else if (typeof object.power === "object")
          message.power = new $util.LongBits(
            object.power.low >>> 0,
            object.power.high >>> 0
          ).toNumber();
      return message;
    };

    /**
     * Creates a plain object from a Validator message. Also converts values to other types if specified.
     * @function toObject
     * @memberof common.Validator
     * @static
     * @param {common.Validator} message Validator
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Validator.toObject = function toObject(message, options) {
      if (!options) options = {};
      var object = {};
      if (options.defaults) {
        if (options.bytes === String) object.address = "";
        else {
          object.address = [];
          if (options.bytes !== Array)
            object.address = $util.newBuffer(object.address);
        }
        if ($util.Long) {
          var long = new $util.Long(0, 0, false);
          object.power =
            options.longs === String
              ? long.toString()
              : options.longs === Number
              ? long.toNumber()
              : long;
        } else object.power = options.longs === String ? "0" : 0;
      }
      if (message.address != null && message.hasOwnProperty("address"))
        object.address =
          options.bytes === String
            ? $util.base64.encode(message.address, 0, message.address.length)
            : options.bytes === Array
            ? Array.prototype.slice.call(message.address)
            : message.address;
      if (message.power != null && message.hasOwnProperty("power"))
        if (typeof message.power === "number")
          object.power =
            options.longs === String ? String(message.power) : message.power;
        else
          object.power =
            options.longs === String
              ? $util.Long.prototype.toString.call(message.power)
              : options.longs === Number
              ? new $util.LongBits(
                  message.power.low >>> 0,
                  message.power.high >>> 0
                ).toNumber()
              : message.power;
      return object;
    };

    /**
     * Converts this Validator to JSON.
     * @function toJSON
     * @memberof common.Validator
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Validator.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for Validator
     * @function getTypeUrl
     * @memberof common.Validator
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    Validator.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
      if (typeUrlPrefix === undefined) {
        typeUrlPrefix = "type.googleapis.com";
      }
      return typeUrlPrefix + "/common.Validator";
    };

    return Validator;
  })();

  common.ValidatorsWrapper = (function () {
    /**
     * Properties of a ValidatorsWrapper.
     * @memberof common
     * @interface IValidatorsWrapper
     * @property {Array.<common.IValidator>|null} [validators] ValidatorsWrapper validators
     */

    /**
     * Constructs a new ValidatorsWrapper.
     * @memberof common
     * @classdesc Represents a ValidatorsWrapper.
     * @implements IValidatorsWrapper
     * @constructor
     * @param {common.IValidatorsWrapper=} [properties] Properties to set
     */
    function ValidatorsWrapper(properties) {
      this.validators = [];
      if (properties)
        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
    }

    /**
     * ValidatorsWrapper validators.
     * @member {Array.<common.IValidator>} validators
     * @memberof common.ValidatorsWrapper
     * @instance
     */
    ValidatorsWrapper.prototype.validators = $util.emptyArray;

    /**
     * Creates a new ValidatorsWrapper instance using the specified properties.
     * @function create
     * @memberof common.ValidatorsWrapper
     * @static
     * @param {common.IValidatorsWrapper=} [properties] Properties to set
     * @returns {common.ValidatorsWrapper} ValidatorsWrapper instance
     */
    ValidatorsWrapper.create = function create(properties) {
      return new ValidatorsWrapper(properties);
    };

    /**
     * Encodes the specified ValidatorsWrapper message. Does not implicitly {@link common.ValidatorsWrapper.verify|verify} messages.
     * @function encode
     * @memberof common.ValidatorsWrapper
     * @static
     * @param {common.IValidatorsWrapper} message ValidatorsWrapper message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ValidatorsWrapper.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create();
      if (message.validators != null && message.validators.length)
        for (var i = 0; i < message.validators.length; ++i)
          $root.common.Validator.encode(
            message.validators[i],
            writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
          ).ldelim();
      return writer;
    };

    /**
     * Encodes the specified ValidatorsWrapper message, length delimited. Does not implicitly {@link common.ValidatorsWrapper.verify|verify} messages.
     * @function encodeDelimited
     * @memberof common.ValidatorsWrapper
     * @static
     * @param {common.IValidatorsWrapper} message ValidatorsWrapper message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ValidatorsWrapper.encodeDelimited = function encodeDelimited(
      message,
      writer
    ) {
      return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a ValidatorsWrapper message from the specified reader or buffer.
     * @function decode
     * @memberof common.ValidatorsWrapper
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {common.ValidatorsWrapper} ValidatorsWrapper
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ValidatorsWrapper.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
      var end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.common.ValidatorsWrapper();
      while (reader.pos < end) {
        var tag = reader.uint32();
        switch (tag >>> 3) {
          case 1: {
            if (!(message.validators && message.validators.length))
              message.validators = [];
            message.validators.push(
              $root.common.Validator.decode(reader, reader.uint32())
            );
            break;
          }
          default:
            reader.skipType(tag & 7);
            break;
        }
      }
      return message;
    };

    /**
     * Decodes a ValidatorsWrapper message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof common.ValidatorsWrapper
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {common.ValidatorsWrapper} ValidatorsWrapper
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ValidatorsWrapper.decodeDelimited = function decodeDelimited(reader) {
      if (!(reader instanceof $Reader)) reader = new $Reader(reader);
      return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a ValidatorsWrapper message.
     * @function verify
     * @memberof common.ValidatorsWrapper
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ValidatorsWrapper.verify = function verify(message) {
      if (typeof message !== "object" || message === null)
        return "object expected";
      if (message.validators != null && message.hasOwnProperty("validators")) {
        if (!Array.isArray(message.validators))
          return "validators: array expected";
        for (var i = 0; i < message.validators.length; ++i) {
          var error = $root.common.Validator.verify(message.validators[i]);
          if (error) return "validators." + error;
        }
      }
      return null;
    };

    /**
     * Creates a ValidatorsWrapper message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof common.ValidatorsWrapper
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {common.ValidatorsWrapper} ValidatorsWrapper
     */
    ValidatorsWrapper.fromObject = function fromObject(object) {
      if (object instanceof $root.common.ValidatorsWrapper) return object;
      var message = new $root.common.ValidatorsWrapper();
      if (object.validators) {
        if (!Array.isArray(object.validators))
          throw TypeError(
            ".common.ValidatorsWrapper.validators: array expected"
          );
        message.validators = [];
        for (var i = 0; i < object.validators.length; ++i) {
          if (typeof object.validators[i] !== "object")
            throw TypeError(
              ".common.ValidatorsWrapper.validators: object expected"
            );
          message.validators[i] = $root.common.Validator.fromObject(
            object.validators[i]
          );
        }
      }
      return message;
    };

    /**
     * Creates a plain object from a ValidatorsWrapper message. Also converts values to other types if specified.
     * @function toObject
     * @memberof common.ValidatorsWrapper
     * @static
     * @param {common.ValidatorsWrapper} message ValidatorsWrapper
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    ValidatorsWrapper.toObject = function toObject(message, options) {
      if (!options) options = {};
      var object = {};
      if (options.arrays || options.defaults) object.validators = [];
      if (message.validators && message.validators.length) {
        object.validators = [];
        for (var j = 0; j < message.validators.length; ++j)
          object.validators[j] = $root.common.Validator.toObject(
            message.validators[j],
            options
          );
      }
      return object;
    };

    /**
     * Converts this ValidatorsWrapper to JSON.
     * @function toJSON
     * @memberof common.ValidatorsWrapper
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ValidatorsWrapper.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for ValidatorsWrapper
     * @function getTypeUrl
     * @memberof common.ValidatorsWrapper
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    ValidatorsWrapper.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
      if (typeUrlPrefix === undefined) {
        typeUrlPrefix = "type.googleapis.com";
      }
      return typeUrlPrefix + "/common.ValidatorsWrapper";
    };

    return ValidatorsWrapper;
  })();

  common.ProtoUint = (function () {
    /**
     * Properties of a ProtoUint.
     * @memberof common
     * @interface IProtoUint
     * @property {string|null} [value] ProtoUint value
     */

    /**
     * Constructs a new ProtoUint.
     * @memberof common
     * @classdesc Represents a ProtoUint.
     * @implements IProtoUint
     * @constructor
     * @param {common.IProtoUint=} [properties] Properties to set
     */
    function ProtoUint(properties) {
      if (properties)
        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
    }

    /**
     * ProtoUint value.
     * @member {string} value
     * @memberof common.ProtoUint
     * @instance
     */
    ProtoUint.prototype.value = "";

    /**
     * Creates a new ProtoUint instance using the specified properties.
     * @function create
     * @memberof common.ProtoUint
     * @static
     * @param {common.IProtoUint=} [properties] Properties to set
     * @returns {common.ProtoUint} ProtoUint instance
     */
    ProtoUint.create = function create(properties) {
      return new ProtoUint(properties);
    };

    /**
     * Encodes the specified ProtoUint message. Does not implicitly {@link common.ProtoUint.verify|verify} messages.
     * @function encode
     * @memberof common.ProtoUint
     * @static
     * @param {common.IProtoUint} message ProtoUint message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ProtoUint.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create();
      if (message.value != null && Object.hasOwnProperty.call(message, "value"))
        writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.value);
      return writer;
    };

    /**
     * Encodes the specified ProtoUint message, length delimited. Does not implicitly {@link common.ProtoUint.verify|verify} messages.
     * @function encodeDelimited
     * @memberof common.ProtoUint
     * @static
     * @param {common.IProtoUint} message ProtoUint message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ProtoUint.encodeDelimited = function encodeDelimited(message, writer) {
      return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a ProtoUint message from the specified reader or buffer.
     * @function decode
     * @memberof common.ProtoUint
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {common.ProtoUint} ProtoUint
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ProtoUint.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
      var end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.common.ProtoUint();
      while (reader.pos < end) {
        var tag = reader.uint32();
        switch (tag >>> 3) {
          case 1: {
            message.value = reader.string();
            break;
          }
          default:
            reader.skipType(tag & 7);
            break;
        }
      }
      return message;
    };

    /**
     * Decodes a ProtoUint message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof common.ProtoUint
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {common.ProtoUint} ProtoUint
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ProtoUint.decodeDelimited = function decodeDelimited(reader) {
      if (!(reader instanceof $Reader)) reader = new $Reader(reader);
      return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a ProtoUint message.
     * @function verify
     * @memberof common.ProtoUint
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ProtoUint.verify = function verify(message) {
      if (typeof message !== "object" || message === null)
        return "object expected";
      if (message.value != null && message.hasOwnProperty("value"))
        if (!$util.isString(message.value)) return "value: string expected";
      return null;
    };

    /**
     * Creates a ProtoUint message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof common.ProtoUint
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {common.ProtoUint} ProtoUint
     */
    ProtoUint.fromObject = function fromObject(object) {
      if (object instanceof $root.common.ProtoUint) return object;
      var message = new $root.common.ProtoUint();
      if (object.value != null) message.value = String(object.value);
      return message;
    };

    /**
     * Creates a plain object from a ProtoUint message. Also converts values to other types if specified.
     * @function toObject
     * @memberof common.ProtoUint
     * @static
     * @param {common.ProtoUint} message ProtoUint
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    ProtoUint.toObject = function toObject(message, options) {
      if (!options) options = {};
      var object = {};
      if (options.defaults) object.value = "";
      if (message.value != null && message.hasOwnProperty("value"))
        object.value = message.value;
      return object;
    };

    /**
     * Converts this ProtoUint to JSON.
     * @function toJSON
     * @memberof common.ProtoUint
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ProtoUint.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for ProtoUint
     * @function getTypeUrl
     * @memberof common.ProtoUint
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    ProtoUint.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
      if (typeUrlPrefix === undefined) {
        typeUrlPrefix = "type.googleapis.com";
      }
      return typeUrlPrefix + "/common.ProtoUint";
    };

    return ProtoUint;
  })();

  return common;
})();

$root.hermes = (function () {
  /**
   * Namespace hermes.
   * @exports hermes
   * @namespace
   */
  var hermes = {};

  hermes.hermes = (function () {
    /**
     * Namespace hermes.
     * @memberof hermes
     * @namespace
     */
    var hermes = {};

    hermes.v1beta1 = (function () {
      /**
       * Namespace v1beta1.
       * @memberof hermes.hermes
       * @namespace
       */
      var v1beta1 = {};

      v1beta1.types = (function () {
        /**
         * Namespace types.
         * @memberof hermes.hermes.v1beta1
         * @namespace
         */
        var types = {};

        types.MsgDeposit = (function () {
          /**
           * Properties of a MsgDeposit.
           * @memberof hermes.hermes.v1beta1.types
           * @interface IMsgDeposit
           * @property {Array.<common.ICoin>|null} [coins] MsgDeposit coins
           * @property {string|null} [memo] MsgDeposit memo
           * @property {Uint8Array|null} [signer] MsgDeposit signer
           */

          /**
           * Constructs a new MsgDeposit.
           * @memberof hermes.hermes.v1beta1.types
           * @classdesc Represents a MsgDeposit.
           * @implements IMsgDeposit
           * @constructor
           * @param {hermes.hermes.v1beta1.types.IMsgDeposit=} [properties] Properties to set
           */
          function MsgDeposit(properties) {
            this.coins = [];
            if (properties)
              for (
                var keys = Object.keys(properties), i = 0;
                i < keys.length;
                ++i
              )
                if (properties[keys[i]] != null)
                  this[keys[i]] = properties[keys[i]];
          }

          /**
           * MsgDeposit coins.
           * @member {Array.<common.ICoin>} coins
           * @memberof hermes.hermes.v1beta1.types.MsgDeposit
           * @instance
           */
          MsgDeposit.prototype.coins = $util.emptyArray;

          /**
           * MsgDeposit memo.
           * @member {string} memo
           * @memberof hermes.hermes.v1beta1.types.MsgDeposit
           * @instance
           */
          MsgDeposit.prototype.memo = "";

          /**
           * MsgDeposit signer.
           * @member {Uint8Array} signer
           * @memberof hermes.hermes.v1beta1.types.MsgDeposit
           * @instance
           */
          MsgDeposit.prototype.signer = $util.newBuffer([]);

          /**
           * Creates a new MsgDeposit instance using the specified properties.
           * @function create
           * @memberof hermes.hermes.v1beta1.types.MsgDeposit
           * @static
           * @param {hermes.hermes.v1beta1.types.IMsgDeposit=} [properties] Properties to set
           * @returns {hermes.hermes.v1beta1.types.MsgDeposit} MsgDeposit instance
           */
          MsgDeposit.create = function create(properties) {
            return new MsgDeposit(properties);
          };

          /**
           * Encodes the specified MsgDeposit message. Does not implicitly {@link hermes.hermes.v1beta1.types.MsgDeposit.verify|verify} messages.
           * @function encode
           * @memberof hermes.hermes.v1beta1.types.MsgDeposit
           * @static
           * @param {hermes.hermes.v1beta1.types.IMsgDeposit} message MsgDeposit message or plain object to encode
           * @param {$protobuf.Writer} [writer] Writer to encode to
           * @returns {$protobuf.Writer} Writer
           */
          MsgDeposit.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.coins != null && message.coins.length)
              for (var i = 0; i < message.coins.length; ++i)
                $root.common.Coin.encode(
                  message.coins[i],
                  writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
                ).ldelim();
            if (
              message.memo != null &&
              Object.hasOwnProperty.call(message, "memo")
            )
              writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.memo);
            if (
              message.signer != null &&
              Object.hasOwnProperty.call(message, "signer")
            )
              writer.uint32(/* id 3, wireType 2 =*/ 26).bytes(message.signer);
            return writer;
          };

          /**
           * Encodes the specified MsgDeposit message, length delimited. Does not implicitly {@link hermes.hermes.v1beta1.types.MsgDeposit.verify|verify} messages.
           * @function encodeDelimited
           * @memberof hermes.hermes.v1beta1.types.MsgDeposit
           * @static
           * @param {hermes.hermes.v1beta1.types.IMsgDeposit} message MsgDeposit message or plain object to encode
           * @param {$protobuf.Writer} [writer] Writer to encode to
           * @returns {$protobuf.Writer} Writer
           */
          MsgDeposit.encodeDelimited = function encodeDelimited(
            message,
            writer
          ) {
            return this.encode(message, writer).ldelim();
          };

          /**
           * Decodes a MsgDeposit message from the specified reader or buffer.
           * @function decode
           * @memberof hermes.hermes.v1beta1.types.MsgDeposit
           * @static
           * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
           * @param {number} [length] Message length if known beforehand
           * @returns {hermes.hermes.v1beta1.types.MsgDeposit} MsgDeposit
           * @throws {Error} If the payload is not a reader or valid buffer
           * @throws {$protobuf.util.ProtocolError} If required fields are missing
           */
          MsgDeposit.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
              message = new $root.hermes.hermes.v1beta1.types.MsgDeposit();
            while (reader.pos < end) {
              var tag = reader.uint32();
              switch (tag >>> 3) {
                case 1: {
                  if (!(message.coins && message.coins.length))
                    message.coins = [];
                  message.coins.push(
                    $root.common.Coin.decode(reader, reader.uint32())
                  );
                  break;
                }
                case 2: {
                  message.memo = reader.string();
                  break;
                }
                case 3: {
                  message.signer = reader.bytes();
                  break;
                }
                default:
                  reader.skipType(tag & 7);
                  break;
              }
            }
            return message;
          };

          /**
           * Decodes a MsgDeposit message from the specified reader or buffer, length delimited.
           * @function decodeDelimited
           * @memberof hermes.hermes.v1beta1.types.MsgDeposit
           * @static
           * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
           * @returns {hermes.hermes.v1beta1.types.MsgDeposit} MsgDeposit
           * @throws {Error} If the payload is not a reader or valid buffer
           * @throws {$protobuf.util.ProtocolError} If required fields are missing
           */
          MsgDeposit.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
          };

          /**
           * Verifies a MsgDeposit message.
           * @function verify
           * @memberof hermes.hermes.v1beta1.types.MsgDeposit
           * @static
           * @param {Object.<string,*>} message Plain object to verify
           * @returns {string|null} `null` if valid, otherwise the reason why it is not
           */
          MsgDeposit.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
              return "object expected";
            if (message.coins != null && message.hasOwnProperty("coins")) {
              if (!Array.isArray(message.coins)) return "coins: array expected";
              for (var i = 0; i < message.coins.length; ++i) {
                var error = $root.common.Coin.verify(message.coins[i]);
                if (error) return "coins." + error;
              }
            }
            if (message.memo != null && message.hasOwnProperty("memo"))
              if (!$util.isString(message.memo)) return "memo: string expected";
            if (message.signer != null && message.hasOwnProperty("signer"))
              if (
                !(
                  (message.signer &&
                    typeof message.signer.length === "number") ||
                  $util.isString(message.signer)
                )
              )
                return "signer: buffer expected";
            return null;
          };

          /**
           * Creates a MsgDeposit message from a plain object. Also converts values to their respective internal types.
           * @function fromObject
           * @memberof hermes.hermes.v1beta1.types.MsgDeposit
           * @static
           * @param {Object.<string,*>} object Plain object
           * @returns {hermes.hermes.v1beta1.types.MsgDeposit} MsgDeposit
           */
          MsgDeposit.fromObject = function fromObject(object) {
            if (object instanceof $root.hermes.hermes.v1beta1.types.MsgDeposit)
              return object;
            var message = new $root.hermes.hermes.v1beta1.types.MsgDeposit();
            if (object.coins) {
              if (!Array.isArray(object.coins))
                throw TypeError(
                  ".hermes.hermes.v1beta1.types.MsgDeposit.coins: array expected"
                );
              message.coins = [];
              for (var i = 0; i < object.coins.length; ++i) {
                if (typeof object.coins[i] !== "object")
                  throw TypeError(
                    ".hermes.hermes.v1beta1.types.MsgDeposit.coins: object expected"
                  );
                message.coins[i] = $root.common.Coin.fromObject(
                  object.coins[i]
                );
              }
            }
            if (object.memo != null) message.memo = String(object.memo);
            if (object.signer != null)
              if (typeof object.signer === "string")
                $util.base64.decode(
                  object.signer,
                  (message.signer = $util.newBuffer(
                    $util.base64.length(object.signer)
                  )),
                  0
                );
              else if (object.signer.length >= 0)
                message.signer = object.signer;
            return message;
          };

          /**
           * Creates a plain object from a MsgDeposit message. Also converts values to other types if specified.
           * @function toObject
           * @memberof hermes.hermes.v1beta1.types.MsgDeposit
           * @static
           * @param {hermes.hermes.v1beta1.types.MsgDeposit} message MsgDeposit
           * @param {$protobuf.IConversionOptions} [options] Conversion options
           * @returns {Object.<string,*>} Plain object
           */
          MsgDeposit.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (options.arrays || options.defaults) object.coins = [];
            if (options.defaults) {
              object.memo = "";
              if (options.bytes === String) object.signer = "";
              else {
                object.signer = [];
                if (options.bytes !== Array)
                  object.signer = $util.newBuffer(object.signer);
              }
            }
            if (message.coins && message.coins.length) {
              object.coins = [];
              for (var j = 0; j < message.coins.length; ++j)
                object.coins[j] = $root.common.Coin.toObject(
                  message.coins[j],
                  options
                );
            }
            if (message.memo != null && message.hasOwnProperty("memo"))
              object.memo = message.memo;
            if (message.signer != null && message.hasOwnProperty("signer"))
              object.signer =
                options.bytes === String
                  ? $util.base64.encode(
                      message.signer,
                      0,
                      message.signer.length
                    )
                  : options.bytes === Array
                  ? Array.prototype.slice.call(message.signer)
                  : message.signer;
            return object;
          };

          /**
           * Converts this MsgDeposit to JSON.
           * @function toJSON
           * @memberof hermes.hermes.v1beta1.types.MsgDeposit
           * @instance
           * @returns {Object.<string,*>} JSON object
           */
          MsgDeposit.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(
              this,
              $protobuf.util.toJSONOptions
            );
          };

          /**
           * Gets the default type url for MsgDeposit
           * @function getTypeUrl
           * @memberof hermes.hermes.v1beta1.types.MsgDeposit
           * @static
           * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
           * @returns {string} The default type url
           */
          MsgDeposit.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
              typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/hermes.hermes.v1beta1.types.MsgDeposit";
          };

          return MsgDeposit;
        })();

        types.MsgSend = (function () {
          /**
           * Properties of a MsgSend.
           * @memberof hermes.hermes.v1beta1.types
           * @interface IMsgSend
           * @property {Uint8Array|null} [fromAddress] MsgSend fromAddress
           * @property {Uint8Array|null} [toAddress] MsgSend toAddress
           * @property {Array.<cosmos.base.v1beta1.ICoin>|null} [amount] MsgSend amount
           */

          /**
           * Constructs a new MsgSend.
           * @memberof hermes.hermes.v1beta1.types
           * @classdesc Represents a MsgSend.
           * @implements IMsgSend
           * @constructor
           * @param {hermes.hermes.v1beta1.types.IMsgSend=} [properties] Properties to set
           */
          function MsgSend(properties) {
            this.amount = [];
            if (properties)
              for (
                var keys = Object.keys(properties), i = 0;
                i < keys.length;
                ++i
              )
                if (properties[keys[i]] != null)
                  this[keys[i]] = properties[keys[i]];
          }

          /**
           * MsgSend fromAddress.
           * @member {Uint8Array} fromAddress
           * @memberof hermes.hermes.v1beta1.types.MsgSend
           * @instance
           */
          MsgSend.prototype.fromAddress = $util.newBuffer([]);

          /**
           * MsgSend toAddress.
           * @member {Uint8Array} toAddress
           * @memberof hermes.hermes.v1beta1.types.MsgSend
           * @instance
           */
          MsgSend.prototype.toAddress = $util.newBuffer([]);

          /**
           * MsgSend amount.
           * @member {Array.<cosmos.base.v1beta1.ICoin>} amount
           * @memberof hermes.hermes.v1beta1.types.MsgSend
           * @instance
           */
          MsgSend.prototype.amount = $util.emptyArray;

          /**
           * Creates a new MsgSend instance using the specified properties.
           * @function create
           * @memberof hermes.hermes.v1beta1.types.MsgSend
           * @static
           * @param {hermes.hermes.v1beta1.types.IMsgSend=} [properties] Properties to set
           * @returns {hermes.hermes.v1beta1.types.MsgSend} MsgSend instance
           */
          MsgSend.create = function create(properties) {
            return new MsgSend(properties);
          };

          /**
           * Encodes the specified MsgSend message. Does not implicitly {@link hermes.hermes.v1beta1.types.MsgSend.verify|verify} messages.
           * @function encode
           * @memberof hermes.hermes.v1beta1.types.MsgSend
           * @static
           * @param {hermes.hermes.v1beta1.types.IMsgSend} message MsgSend message or plain object to encode
           * @param {$protobuf.Writer} [writer] Writer to encode to
           * @returns {$protobuf.Writer} Writer
           */
          MsgSend.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (
              message.fromAddress != null &&
              Object.hasOwnProperty.call(message, "fromAddress")
            )
              writer
                .uint32(/* id 1, wireType 2 =*/ 10)
                .bytes(message.fromAddress);
            if (
              message.toAddress != null &&
              Object.hasOwnProperty.call(message, "toAddress")
            )
              writer
                .uint32(/* id 2, wireType 2 =*/ 18)
                .bytes(message.toAddress);
            if (message.amount != null && message.amount.length)
              for (var i = 0; i < message.amount.length; ++i)
                $root.cosmos.base.v1beta1.Coin.encode(
                  message.amount[i],
                  writer.uint32(/* id 3, wireType 2 =*/ 26).fork()
                ).ldelim();
            return writer;
          };

          /**
           * Encodes the specified MsgSend message, length delimited. Does not implicitly {@link hermes.hermes.v1beta1.types.MsgSend.verify|verify} messages.
           * @function encodeDelimited
           * @memberof hermes.hermes.v1beta1.types.MsgSend
           * @static
           * @param {hermes.hermes.v1beta1.types.IMsgSend} message MsgSend message or plain object to encode
           * @param {$protobuf.Writer} [writer] Writer to encode to
           * @returns {$protobuf.Writer} Writer
           */
          MsgSend.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
          };

          /**
           * Decodes a MsgSend message from the specified reader or buffer.
           * @function decode
           * @memberof hermes.hermes.v1beta1.types.MsgSend
           * @static
           * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
           * @param {number} [length] Message length if known beforehand
           * @returns {hermes.hermes.v1beta1.types.MsgSend} MsgSend
           * @throws {Error} If the payload is not a reader or valid buffer
           * @throws {$protobuf.util.ProtocolError} If required fields are missing
           */
          MsgSend.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
              message = new $root.hermes.hermes.v1beta1.types.MsgSend();
            while (reader.pos < end) {
              var tag = reader.uint32();
              switch (tag >>> 3) {
                case 1: {
                  message.fromAddress = reader.bytes();
                  break;
                }
                case 2: {
                  message.toAddress = reader.bytes();
                  break;
                }
                case 3: {
                  if (!(message.amount && message.amount.length))
                    message.amount = [];
                  message.amount.push(
                    $root.cosmos.base.v1beta1.Coin.decode(
                      reader,
                      reader.uint32()
                    )
                  );
                  break;
                }
                default:
                  reader.skipType(tag & 7);
                  break;
              }
            }
            return message;
          };

          /**
           * Decodes a MsgSend message from the specified reader or buffer, length delimited.
           * @function decodeDelimited
           * @memberof hermes.hermes.v1beta1.types.MsgSend
           * @static
           * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
           * @returns {hermes.hermes.v1beta1.types.MsgSend} MsgSend
           * @throws {Error} If the payload is not a reader or valid buffer
           * @throws {$protobuf.util.ProtocolError} If required fields are missing
           */
          MsgSend.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
          };

          /**
           * Verifies a MsgSend message.
           * @function verify
           * @memberof hermes.hermes.v1beta1.types.MsgSend
           * @static
           * @param {Object.<string,*>} message Plain object to verify
           * @returns {string|null} `null` if valid, otherwise the reason why it is not
           */
          MsgSend.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
              return "object expected";
            if (
              message.fromAddress != null &&
              message.hasOwnProperty("fromAddress")
            )
              if (
                !(
                  (message.fromAddress &&
                    typeof message.fromAddress.length === "number") ||
                  $util.isString(message.fromAddress)
                )
              )
                return "fromAddress: buffer expected";
            if (
              message.toAddress != null &&
              message.hasOwnProperty("toAddress")
            )
              if (
                !(
                  (message.toAddress &&
                    typeof message.toAddress.length === "number") ||
                  $util.isString(message.toAddress)
                )
              )
                return "toAddress: buffer expected";
            if (message.amount != null && message.hasOwnProperty("amount")) {
              if (!Array.isArray(message.amount))
                return "amount: array expected";
              for (var i = 0; i < message.amount.length; ++i) {
                var error = $root.cosmos.base.v1beta1.Coin.verify(
                  message.amount[i]
                );
                if (error) return "amount." + error;
              }
            }
            return null;
          };

          /**
           * Creates a MsgSend message from a plain object. Also converts values to their respective internal types.
           * @function fromObject
           * @memberof hermes.hermes.v1beta1.types.MsgSend
           * @static
           * @param {Object.<string,*>} object Plain object
           * @returns {hermes.hermes.v1beta1.types.MsgSend} MsgSend
           */
          MsgSend.fromObject = function fromObject(object) {
            if (object instanceof $root.hermes.hermes.v1beta1.types.MsgSend)
              return object;
            var message = new $root.hermes.hermes.v1beta1.types.MsgSend();
            if (object.fromAddress != null)
              if (typeof object.fromAddress === "string")
                $util.base64.decode(
                  object.fromAddress,
                  (message.fromAddress = $util.newBuffer(
                    $util.base64.length(object.fromAddress)
                  )),
                  0
                );
              else if (object.fromAddress.length >= 0)
                message.fromAddress = object.fromAddress;
            if (object.toAddress != null)
              if (typeof object.toAddress === "string")
                $util.base64.decode(
                  object.toAddress,
                  (message.toAddress = $util.newBuffer(
                    $util.base64.length(object.toAddress)
                  )),
                  0
                );
              else if (object.toAddress.length >= 0)
                message.toAddress = object.toAddress;
            if (object.amount) {
              if (!Array.isArray(object.amount))
                throw TypeError(
                  ".hermes.hermes.v1beta1.types.MsgSend.amount: array expected"
                );
              message.amount = [];
              for (var i = 0; i < object.amount.length; ++i) {
                if (typeof object.amount[i] !== "object")
                  throw TypeError(
                    ".hermes.hermes.v1beta1.types.MsgSend.amount: object expected"
                  );
                message.amount[i] = $root.cosmos.base.v1beta1.Coin.fromObject(
                  object.amount[i]
                );
              }
            }
            return message;
          };

          /**
           * Creates a plain object from a MsgSend message. Also converts values to other types if specified.
           * @function toObject
           * @memberof hermes.hermes.v1beta1.types.MsgSend
           * @static
           * @param {hermes.hermes.v1beta1.types.MsgSend} message MsgSend
           * @param {$protobuf.IConversionOptions} [options] Conversion options
           * @returns {Object.<string,*>} Plain object
           */
          MsgSend.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (options.arrays || options.defaults) object.amount = [];
            if (options.defaults) {
              if (options.bytes === String) object.fromAddress = "";
              else {
                object.fromAddress = [];
                if (options.bytes !== Array)
                  object.fromAddress = $util.newBuffer(object.fromAddress);
              }
              if (options.bytes === String) object.toAddress = "";
              else {
                object.toAddress = [];
                if (options.bytes !== Array)
                  object.toAddress = $util.newBuffer(object.toAddress);
              }
            }
            if (
              message.fromAddress != null &&
              message.hasOwnProperty("fromAddress")
            )
              object.fromAddress =
                options.bytes === String
                  ? $util.base64.encode(
                      message.fromAddress,
                      0,
                      message.fromAddress.length
                    )
                  : options.bytes === Array
                  ? Array.prototype.slice.call(message.fromAddress)
                  : message.fromAddress;
            if (
              message.toAddress != null &&
              message.hasOwnProperty("toAddress")
            )
              object.toAddress =
                options.bytes === String
                  ? $util.base64.encode(
                      message.toAddress,
                      0,
                      message.toAddress.length
                    )
                  : options.bytes === Array
                  ? Array.prototype.slice.call(message.toAddress)
                  : message.toAddress;
            if (message.amount && message.amount.length) {
              object.amount = [];
              for (var j = 0; j < message.amount.length; ++j)
                object.amount[j] = $root.cosmos.base.v1beta1.Coin.toObject(
                  message.amount[j],
                  options
                );
            }
            return object;
          };

          /**
           * Converts this MsgSend to JSON.
           * @function toJSON
           * @memberof hermes.hermes.v1beta1.types.MsgSend
           * @instance
           * @returns {Object.<string,*>} JSON object
           */
          MsgSend.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(
              this,
              $protobuf.util.toJSONOptions
            );
          };

          /**
           * Gets the default type url for MsgSend
           * @function getTypeUrl
           * @memberof hermes.hermes.v1beta1.types.MsgSend
           * @static
           * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
           * @returns {string} The default type url
           */
          MsgSend.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
              typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/hermes.hermes.v1beta1.types.MsgSend";
          };

          return MsgSend;
        })();

        types.MsgSetIPAddress = (function () {
          /**
           * Properties of a MsgSetIPAddress.
           * @memberof hermes.hermes.v1beta1.types
           * @interface IMsgSetIPAddress
           * @property {string|null} [ipAddress] MsgSetIPAddress ipAddress
           * @property {Uint8Array|null} [signer] MsgSetIPAddress signer
           */

          /**
           * Constructs a new MsgSetIPAddress.
           * @memberof hermes.hermes.v1beta1.types
           * @classdesc Represents a MsgSetIPAddress.
           * @implements IMsgSetIPAddress
           * @constructor
           * @param {hermes.hermes.v1beta1.types.IMsgSetIPAddress=} [properties] Properties to set
           */
          function MsgSetIPAddress(properties) {
            if (properties)
              for (
                var keys = Object.keys(properties), i = 0;
                i < keys.length;
                ++i
              )
                if (properties[keys[i]] != null)
                  this[keys[i]] = properties[keys[i]];
          }

          /**
           * MsgSetIPAddress ipAddress.
           * @member {string} ipAddress
           * @memberof hermes.hermes.v1beta1.types.MsgSetIPAddress
           * @instance
           */
          MsgSetIPAddress.prototype.ipAddress = "";

          /**
           * MsgSetIPAddress signer.
           * @member {Uint8Array} signer
           * @memberof hermes.hermes.v1beta1.types.MsgSetIPAddress
           * @instance
           */
          MsgSetIPAddress.prototype.signer = $util.newBuffer([]);

          /**
           * Creates a new MsgSetIPAddress instance using the specified properties.
           * @function create
           * @memberof hermes.hermes.v1beta1.types.MsgSetIPAddress
           * @static
           * @param {hermes.hermes.v1beta1.types.IMsgSetIPAddress=} [properties] Properties to set
           * @returns {hermes.hermes.v1beta1.types.MsgSetIPAddress} MsgSetIPAddress instance
           */
          MsgSetIPAddress.create = function create(properties) {
            return new MsgSetIPAddress(properties);
          };

          /**
           * Encodes the specified MsgSetIPAddress message. Does not implicitly {@link hermes.hermes.v1beta1.types.MsgSetIPAddress.verify|verify} messages.
           * @function encode
           * @memberof hermes.hermes.v1beta1.types.MsgSetIPAddress
           * @static
           * @param {hermes.hermes.v1beta1.types.IMsgSetIPAddress} message MsgSetIPAddress message or plain object to encode
           * @param {$protobuf.Writer} [writer] Writer to encode to
           * @returns {$protobuf.Writer} Writer
           */
          MsgSetIPAddress.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (
              message.ipAddress != null &&
              Object.hasOwnProperty.call(message, "ipAddress")
            )
              writer
                .uint32(/* id 1, wireType 2 =*/ 10)
                .string(message.ipAddress);
            if (
              message.signer != null &&
              Object.hasOwnProperty.call(message, "signer")
            )
              writer.uint32(/* id 2, wireType 2 =*/ 18).bytes(message.signer);
            return writer;
          };

          /**
           * Encodes the specified MsgSetIPAddress message, length delimited. Does not implicitly {@link hermes.hermes.v1beta1.types.MsgSetIPAddress.verify|verify} messages.
           * @function encodeDelimited
           * @memberof hermes.hermes.v1beta1.types.MsgSetIPAddress
           * @static
           * @param {hermes.hermes.v1beta1.types.IMsgSetIPAddress} message MsgSetIPAddress message or plain object to encode
           * @param {$protobuf.Writer} [writer] Writer to encode to
           * @returns {$protobuf.Writer} Writer
           */
          MsgSetIPAddress.encodeDelimited = function encodeDelimited(
            message,
            writer
          ) {
            return this.encode(message, writer).ldelim();
          };

          /**
           * Decodes a MsgSetIPAddress message from the specified reader or buffer.
           * @function decode
           * @memberof hermes.hermes.v1beta1.types.MsgSetIPAddress
           * @static
           * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
           * @param {number} [length] Message length if known beforehand
           * @returns {hermes.hermes.v1beta1.types.MsgSetIPAddress} MsgSetIPAddress
           * @throws {Error} If the payload is not a reader or valid buffer
           * @throws {$protobuf.util.ProtocolError} If required fields are missing
           */
          MsgSetIPAddress.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
              message = new $root.hermes.hermes.v1beta1.types.MsgSetIPAddress();
            while (reader.pos < end) {
              var tag = reader.uint32();
              switch (tag >>> 3) {
                case 1: {
                  message.ipAddress = reader.string();
                  break;
                }
                case 2: {
                  message.signer = reader.bytes();
                  break;
                }
                default:
                  reader.skipType(tag & 7);
                  break;
              }
            }
            return message;
          };

          /**
           * Decodes a MsgSetIPAddress message from the specified reader or buffer, length delimited.
           * @function decodeDelimited
           * @memberof hermes.hermes.v1beta1.types.MsgSetIPAddress
           * @static
           * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
           * @returns {hermes.hermes.v1beta1.types.MsgSetIPAddress} MsgSetIPAddress
           * @throws {Error} If the payload is not a reader or valid buffer
           * @throws {$protobuf.util.ProtocolError} If required fields are missing
           */
          MsgSetIPAddress.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
          };

          /**
           * Verifies a MsgSetIPAddress message.
           * @function verify
           * @memberof hermes.hermes.v1beta1.types.MsgSetIPAddress
           * @static
           * @param {Object.<string,*>} message Plain object to verify
           * @returns {string|null} `null` if valid, otherwise the reason why it is not
           */
          MsgSetIPAddress.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
              return "object expected";
            if (
              message.ipAddress != null &&
              message.hasOwnProperty("ipAddress")
            )
              if (!$util.isString(message.ipAddress))
                return "ipAddress: string expected";
            if (message.signer != null && message.hasOwnProperty("signer"))
              if (
                !(
                  (message.signer &&
                    typeof message.signer.length === "number") ||
                  $util.isString(message.signer)
                )
              )
                return "signer: buffer expected";
            return null;
          };

          /**
           * Creates a MsgSetIPAddress message from a plain object. Also converts values to their respective internal types.
           * @function fromObject
           * @memberof hermes.hermes.v1beta1.types.MsgSetIPAddress
           * @static
           * @param {Object.<string,*>} object Plain object
           * @returns {hermes.hermes.v1beta1.types.MsgSetIPAddress} MsgSetIPAddress
           */
          MsgSetIPAddress.fromObject = function fromObject(object) {
            if (
              object instanceof
              $root.hermes.hermes.v1beta1.types.MsgSetIPAddress
            )
              return object;
            var message =
              new $root.hermes.hermes.v1beta1.types.MsgSetIPAddress();
            if (object.ipAddress != null)
              message.ipAddress = String(object.ipAddress);
            if (object.signer != null)
              if (typeof object.signer === "string")
                $util.base64.decode(
                  object.signer,
                  (message.signer = $util.newBuffer(
                    $util.base64.length(object.signer)
                  )),
                  0
                );
              else if (object.signer.length >= 0)
                message.signer = object.signer;
            return message;
          };

          /**
           * Creates a plain object from a MsgSetIPAddress message. Also converts values to other types if specified.
           * @function toObject
           * @memberof hermes.hermes.v1beta1.types.MsgSetIPAddress
           * @static
           * @param {hermes.hermes.v1beta1.types.MsgSetIPAddress} message MsgSetIPAddress
           * @param {$protobuf.IConversionOptions} [options] Conversion options
           * @returns {Object.<string,*>} Plain object
           */
          MsgSetIPAddress.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (options.defaults) {
              object.ipAddress = "";
              if (options.bytes === String) object.signer = "";
              else {
                object.signer = [];
                if (options.bytes !== Array)
                  object.signer = $util.newBuffer(object.signer);
              }
            }
            if (
              message.ipAddress != null &&
              message.hasOwnProperty("ipAddress")
            )
              object.ipAddress = message.ipAddress;
            if (message.signer != null && message.hasOwnProperty("signer"))
              object.signer =
                options.bytes === String
                  ? $util.base64.encode(
                      message.signer,
                      0,
                      message.signer.length
                    )
                  : options.bytes === Array
                  ? Array.prototype.slice.call(message.signer)
                  : message.signer;
            return object;
          };

          /**
           * Converts this MsgSetIPAddress to JSON.
           * @function toJSON
           * @memberof hermes.hermes.v1beta1.types.MsgSetIPAddress
           * @instance
           * @returns {Object.<string,*>} JSON object
           */
          MsgSetIPAddress.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(
              this,
              $protobuf.util.toJSONOptions
            );
          };

          /**
           * Gets the default type url for MsgSetIPAddress
           * @function getTypeUrl
           * @memberof hermes.hermes.v1beta1.types.MsgSetIPAddress
           * @static
           * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
           * @returns {string} The default type url
           */
          MsgSetIPAddress.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
              typeUrlPrefix = "type.googleapis.com";
            }
            return (
              typeUrlPrefix + "/hermes.hermes.v1beta1.types.MsgSetIPAddress"
            );
          };

          return MsgSetIPAddress;
        })();

        types.MsgSetNodeKeys = (function () {
          /**
           * Properties of a MsgSetNodeKeys.
           * @memberof hermes.hermes.v1beta1.types
           * @interface IMsgSetNodeKeys
           * @property {common.IPubKeySet|null} [pubKeySetSet] MsgSetNodeKeys pubKeySetSet
           * @property {string|null} [validatorConsPubKey] MsgSetNodeKeys validatorConsPubKey
           * @property {Uint8Array|null} [signer] MsgSetNodeKeys signer
           * @property {common.IDcAddress|null} [dcValidatorAddress] MsgSetNodeKeys dcValidatorAddress
           */

          /**
           * Constructs a new MsgSetNodeKeys.
           * @memberof hermes.hermes.v1beta1.types
           * @classdesc Represents a MsgSetNodeKeys.
           * @implements IMsgSetNodeKeys
           * @constructor
           * @param {hermes.hermes.v1beta1.types.IMsgSetNodeKeys=} [properties] Properties to set
           */
          function MsgSetNodeKeys(properties) {
            if (properties)
              for (
                var keys = Object.keys(properties), i = 0;
                i < keys.length;
                ++i
              )
                if (properties[keys[i]] != null)
                  this[keys[i]] = properties[keys[i]];
          }

          /**
           * MsgSetNodeKeys pubKeySetSet.
           * @member {common.IPubKeySet|null|undefined} pubKeySetSet
           * @memberof hermes.hermes.v1beta1.types.MsgSetNodeKeys
           * @instance
           */
          MsgSetNodeKeys.prototype.pubKeySetSet = null;

          /**
           * MsgSetNodeKeys validatorConsPubKey.
           * @member {string} validatorConsPubKey
           * @memberof hermes.hermes.v1beta1.types.MsgSetNodeKeys
           * @instance
           */
          MsgSetNodeKeys.prototype.validatorConsPubKey = "";

          /**
           * MsgSetNodeKeys signer.
           * @member {Uint8Array} signer
           * @memberof hermes.hermes.v1beta1.types.MsgSetNodeKeys
           * @instance
           */
          MsgSetNodeKeys.prototype.signer = $util.newBuffer([]);

          /**
           * MsgSetNodeKeys dcValidatorAddress.
           * @member {common.IDcAddress|null|undefined} dcValidatorAddress
           * @memberof hermes.hermes.v1beta1.types.MsgSetNodeKeys
           * @instance
           */
          MsgSetNodeKeys.prototype.dcValidatorAddress = null;

          /**
           * Creates a new MsgSetNodeKeys instance using the specified properties.
           * @function create
           * @memberof hermes.hermes.v1beta1.types.MsgSetNodeKeys
           * @static
           * @param {hermes.hermes.v1beta1.types.IMsgSetNodeKeys=} [properties] Properties to set
           * @returns {hermes.hermes.v1beta1.types.MsgSetNodeKeys} MsgSetNodeKeys instance
           */
          MsgSetNodeKeys.create = function create(properties) {
            return new MsgSetNodeKeys(properties);
          };

          /**
           * Encodes the specified MsgSetNodeKeys message. Does not implicitly {@link hermes.hermes.v1beta1.types.MsgSetNodeKeys.verify|verify} messages.
           * @function encode
           * @memberof hermes.hermes.v1beta1.types.MsgSetNodeKeys
           * @static
           * @param {hermes.hermes.v1beta1.types.IMsgSetNodeKeys} message MsgSetNodeKeys message or plain object to encode
           * @param {$protobuf.Writer} [writer] Writer to encode to
           * @returns {$protobuf.Writer} Writer
           */
          MsgSetNodeKeys.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (
              message.pubKeySetSet != null &&
              Object.hasOwnProperty.call(message, "pubKeySetSet")
            )
              $root.common.PubKeySet.encode(
                message.pubKeySetSet,
                writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
              ).ldelim();
            if (
              message.validatorConsPubKey != null &&
              Object.hasOwnProperty.call(message, "validatorConsPubKey")
            )
              writer
                .uint32(/* id 2, wireType 2 =*/ 18)
                .string(message.validatorConsPubKey);
            if (
              message.signer != null &&
              Object.hasOwnProperty.call(message, "signer")
            )
              writer.uint32(/* id 3, wireType 2 =*/ 26).bytes(message.signer);
            if (
              message.dcValidatorAddress != null &&
              Object.hasOwnProperty.call(message, "dcValidatorAddress")
            )
              $root.common.DcAddress.encode(
                message.dcValidatorAddress,
                writer.uint32(/* id 4, wireType 2 =*/ 34).fork()
              ).ldelim();
            return writer;
          };

          /**
           * Encodes the specified MsgSetNodeKeys message, length delimited. Does not implicitly {@link hermes.hermes.v1beta1.types.MsgSetNodeKeys.verify|verify} messages.
           * @function encodeDelimited
           * @memberof hermes.hermes.v1beta1.types.MsgSetNodeKeys
           * @static
           * @param {hermes.hermes.v1beta1.types.IMsgSetNodeKeys} message MsgSetNodeKeys message or plain object to encode
           * @param {$protobuf.Writer} [writer] Writer to encode to
           * @returns {$protobuf.Writer} Writer
           */
          MsgSetNodeKeys.encodeDelimited = function encodeDelimited(
            message,
            writer
          ) {
            return this.encode(message, writer).ldelim();
          };

          /**
           * Decodes a MsgSetNodeKeys message from the specified reader or buffer.
           * @function decode
           * @memberof hermes.hermes.v1beta1.types.MsgSetNodeKeys
           * @static
           * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
           * @param {number} [length] Message length if known beforehand
           * @returns {hermes.hermes.v1beta1.types.MsgSetNodeKeys} MsgSetNodeKeys
           * @throws {Error} If the payload is not a reader or valid buffer
           * @throws {$protobuf.util.ProtocolError} If required fields are missing
           */
          MsgSetNodeKeys.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
              message = new $root.hermes.hermes.v1beta1.types.MsgSetNodeKeys();
            while (reader.pos < end) {
              var tag = reader.uint32();
              switch (tag >>> 3) {
                case 1: {
                  message.pubKeySetSet = $root.common.PubKeySet.decode(
                    reader,
                    reader.uint32()
                  );
                  break;
                }
                case 2: {
                  message.validatorConsPubKey = reader.string();
                  break;
                }
                case 3: {
                  message.signer = reader.bytes();
                  break;
                }
                case 4: {
                  message.dcValidatorAddress = $root.common.DcAddress.decode(
                    reader,
                    reader.uint32()
                  );
                  break;
                }
                default:
                  reader.skipType(tag & 7);
                  break;
              }
            }
            return message;
          };

          /**
           * Decodes a MsgSetNodeKeys message from the specified reader or buffer, length delimited.
           * @function decodeDelimited
           * @memberof hermes.hermes.v1beta1.types.MsgSetNodeKeys
           * @static
           * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
           * @returns {hermes.hermes.v1beta1.types.MsgSetNodeKeys} MsgSetNodeKeys
           * @throws {Error} If the payload is not a reader or valid buffer
           * @throws {$protobuf.util.ProtocolError} If required fields are missing
           */
          MsgSetNodeKeys.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
          };

          /**
           * Verifies a MsgSetNodeKeys message.
           * @function verify
           * @memberof hermes.hermes.v1beta1.types.MsgSetNodeKeys
           * @static
           * @param {Object.<string,*>} message Plain object to verify
           * @returns {string|null} `null` if valid, otherwise the reason why it is not
           */
          MsgSetNodeKeys.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
              return "object expected";
            if (
              message.pubKeySetSet != null &&
              message.hasOwnProperty("pubKeySetSet")
            ) {
              var error = $root.common.PubKeySet.verify(message.pubKeySetSet);
              if (error) return "pubKeySetSet." + error;
            }
            if (
              message.validatorConsPubKey != null &&
              message.hasOwnProperty("validatorConsPubKey")
            )
              if (!$util.isString(message.validatorConsPubKey))
                return "validatorConsPubKey: string expected";
            if (message.signer != null && message.hasOwnProperty("signer"))
              if (
                !(
                  (message.signer &&
                    typeof message.signer.length === "number") ||
                  $util.isString(message.signer)
                )
              )
                return "signer: buffer expected";
            if (
              message.dcValidatorAddress != null &&
              message.hasOwnProperty("dcValidatorAddress")
            ) {
              var error = $root.common.DcAddress.verify(
                message.dcValidatorAddress
              );
              if (error) return "dcValidatorAddress." + error;
            }
            return null;
          };

          /**
           * Creates a MsgSetNodeKeys message from a plain object. Also converts values to their respective internal types.
           * @function fromObject
           * @memberof hermes.hermes.v1beta1.types.MsgSetNodeKeys
           * @static
           * @param {Object.<string,*>} object Plain object
           * @returns {hermes.hermes.v1beta1.types.MsgSetNodeKeys} MsgSetNodeKeys
           */
          MsgSetNodeKeys.fromObject = function fromObject(object) {
            if (
              object instanceof $root.hermes.hermes.v1beta1.types.MsgSetNodeKeys
            )
              return object;
            var message =
              new $root.hermes.hermes.v1beta1.types.MsgSetNodeKeys();
            if (object.pubKeySetSet != null) {
              if (typeof object.pubKeySetSet !== "object")
                throw TypeError(
                  ".hermes.hermes.v1beta1.types.MsgSetNodeKeys.pubKeySetSet: object expected"
                );
              message.pubKeySetSet = $root.common.PubKeySet.fromObject(
                object.pubKeySetSet
              );
            }
            if (object.validatorConsPubKey != null)
              message.validatorConsPubKey = String(object.validatorConsPubKey);
            if (object.signer != null)
              if (typeof object.signer === "string")
                $util.base64.decode(
                  object.signer,
                  (message.signer = $util.newBuffer(
                    $util.base64.length(object.signer)
                  )),
                  0
                );
              else if (object.signer.length >= 0)
                message.signer = object.signer;
            if (object.dcValidatorAddress != null) {
              if (typeof object.dcValidatorAddress !== "object")
                throw TypeError(
                  ".hermes.hermes.v1beta1.types.MsgSetNodeKeys.dcValidatorAddress: object expected"
                );
              message.dcValidatorAddress = $root.common.DcAddress.fromObject(
                object.dcValidatorAddress
              );
            }
            return message;
          };

          /**
           * Creates a plain object from a MsgSetNodeKeys message. Also converts values to other types if specified.
           * @function toObject
           * @memberof hermes.hermes.v1beta1.types.MsgSetNodeKeys
           * @static
           * @param {hermes.hermes.v1beta1.types.MsgSetNodeKeys} message MsgSetNodeKeys
           * @param {$protobuf.IConversionOptions} [options] Conversion options
           * @returns {Object.<string,*>} Plain object
           */
          MsgSetNodeKeys.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (options.defaults) {
              object.pubKeySetSet = null;
              object.validatorConsPubKey = "";
              if (options.bytes === String) object.signer = "";
              else {
                object.signer = [];
                if (options.bytes !== Array)
                  object.signer = $util.newBuffer(object.signer);
              }
              object.dcValidatorAddress = null;
            }
            if (
              message.pubKeySetSet != null &&
              message.hasOwnProperty("pubKeySetSet")
            )
              object.pubKeySetSet = $root.common.PubKeySet.toObject(
                message.pubKeySetSet,
                options
              );
            if (
              message.validatorConsPubKey != null &&
              message.hasOwnProperty("validatorConsPubKey")
            )
              object.validatorConsPubKey = message.validatorConsPubKey;
            if (message.signer != null && message.hasOwnProperty("signer"))
              object.signer =
                options.bytes === String
                  ? $util.base64.encode(
                      message.signer,
                      0,
                      message.signer.length
                    )
                  : options.bytes === Array
                  ? Array.prototype.slice.call(message.signer)
                  : message.signer;
            if (
              message.dcValidatorAddress != null &&
              message.hasOwnProperty("dcValidatorAddress")
            )
              object.dcValidatorAddress = $root.common.DcAddress.toObject(
                message.dcValidatorAddress,
                options
              );
            return object;
          };

          /**
           * Converts this MsgSetNodeKeys to JSON.
           * @function toJSON
           * @memberof hermes.hermes.v1beta1.types.MsgSetNodeKeys
           * @instance
           * @returns {Object.<string,*>} JSON object
           */
          MsgSetNodeKeys.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(
              this,
              $protobuf.util.toJSONOptions
            );
          };

          /**
           * Gets the default type url for MsgSetNodeKeys
           * @function getTypeUrl
           * @memberof hermes.hermes.v1beta1.types.MsgSetNodeKeys
           * @static
           * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
           * @returns {string} The default type url
           */
          MsgSetNodeKeys.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
              typeUrlPrefix = "type.googleapis.com";
            }
            return (
              typeUrlPrefix + "/hermes.hermes.v1beta1.types.MsgSetNodeKeys"
            );
          };

          return MsgSetNodeKeys;
        })();

        types.MsgSetVersion = (function () {
          /**
           * Properties of a MsgSetVersion.
           * @memberof hermes.hermes.v1beta1.types
           * @interface IMsgSetVersion
           * @property {string|null} [version] MsgSetVersion version
           * @property {Uint8Array|null} [signer] MsgSetVersion signer
           */

          /**
           * Constructs a new MsgSetVersion.
           * @memberof hermes.hermes.v1beta1.types
           * @classdesc Represents a MsgSetVersion.
           * @implements IMsgSetVersion
           * @constructor
           * @param {hermes.hermes.v1beta1.types.IMsgSetVersion=} [properties] Properties to set
           */
          function MsgSetVersion(properties) {
            if (properties)
              for (
                var keys = Object.keys(properties), i = 0;
                i < keys.length;
                ++i
              )
                if (properties[keys[i]] != null)
                  this[keys[i]] = properties[keys[i]];
          }

          /**
           * MsgSetVersion version.
           * @member {string} version
           * @memberof hermes.hermes.v1beta1.types.MsgSetVersion
           * @instance
           */
          MsgSetVersion.prototype.version = "";

          /**
           * MsgSetVersion signer.
           * @member {Uint8Array} signer
           * @memberof hermes.hermes.v1beta1.types.MsgSetVersion
           * @instance
           */
          MsgSetVersion.prototype.signer = $util.newBuffer([]);

          /**
           * Creates a new MsgSetVersion instance using the specified properties.
           * @function create
           * @memberof hermes.hermes.v1beta1.types.MsgSetVersion
           * @static
           * @param {hermes.hermes.v1beta1.types.IMsgSetVersion=} [properties] Properties to set
           * @returns {hermes.hermes.v1beta1.types.MsgSetVersion} MsgSetVersion instance
           */
          MsgSetVersion.create = function create(properties) {
            return new MsgSetVersion(properties);
          };

          /**
           * Encodes the specified MsgSetVersion message. Does not implicitly {@link hermes.hermes.v1beta1.types.MsgSetVersion.verify|verify} messages.
           * @function encode
           * @memberof hermes.hermes.v1beta1.types.MsgSetVersion
           * @static
           * @param {hermes.hermes.v1beta1.types.IMsgSetVersion} message MsgSetVersion message or plain object to encode
           * @param {$protobuf.Writer} [writer] Writer to encode to
           * @returns {$protobuf.Writer} Writer
           */
          MsgSetVersion.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (
              message.version != null &&
              Object.hasOwnProperty.call(message, "version")
            )
              writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.version);
            if (
              message.signer != null &&
              Object.hasOwnProperty.call(message, "signer")
            )
              writer.uint32(/* id 2, wireType 2 =*/ 18).bytes(message.signer);
            return writer;
          };

          /**
           * Encodes the specified MsgSetVersion message, length delimited. Does not implicitly {@link hermes.hermes.v1beta1.types.MsgSetVersion.verify|verify} messages.
           * @function encodeDelimited
           * @memberof hermes.hermes.v1beta1.types.MsgSetVersion
           * @static
           * @param {hermes.hermes.v1beta1.types.IMsgSetVersion} message MsgSetVersion message or plain object to encode
           * @param {$protobuf.Writer} [writer] Writer to encode to
           * @returns {$protobuf.Writer} Writer
           */
          MsgSetVersion.encodeDelimited = function encodeDelimited(
            message,
            writer
          ) {
            return this.encode(message, writer).ldelim();
          };

          /**
           * Decodes a MsgSetVersion message from the specified reader or buffer.
           * @function decode
           * @memberof hermes.hermes.v1beta1.types.MsgSetVersion
           * @static
           * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
           * @param {number} [length] Message length if known beforehand
           * @returns {hermes.hermes.v1beta1.types.MsgSetVersion} MsgSetVersion
           * @throws {Error} If the payload is not a reader or valid buffer
           * @throws {$protobuf.util.ProtocolError} If required fields are missing
           */
          MsgSetVersion.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
              message = new $root.hermes.hermes.v1beta1.types.MsgSetVersion();
            while (reader.pos < end) {
              var tag = reader.uint32();
              switch (tag >>> 3) {
                case 1: {
                  message.version = reader.string();
                  break;
                }
                case 2: {
                  message.signer = reader.bytes();
                  break;
                }
                default:
                  reader.skipType(tag & 7);
                  break;
              }
            }
            return message;
          };

          /**
           * Decodes a MsgSetVersion message from the specified reader or buffer, length delimited.
           * @function decodeDelimited
           * @memberof hermes.hermes.v1beta1.types.MsgSetVersion
           * @static
           * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
           * @returns {hermes.hermes.v1beta1.types.MsgSetVersion} MsgSetVersion
           * @throws {Error} If the payload is not a reader or valid buffer
           * @throws {$protobuf.util.ProtocolError} If required fields are missing
           */
          MsgSetVersion.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
          };

          /**
           * Verifies a MsgSetVersion message.
           * @function verify
           * @memberof hermes.hermes.v1beta1.types.MsgSetVersion
           * @static
           * @param {Object.<string,*>} message Plain object to verify
           * @returns {string|null} `null` if valid, otherwise the reason why it is not
           */
          MsgSetVersion.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
              return "object expected";
            if (message.version != null && message.hasOwnProperty("version"))
              if (!$util.isString(message.version))
                return "version: string expected";
            if (message.signer != null && message.hasOwnProperty("signer"))
              if (
                !(
                  (message.signer &&
                    typeof message.signer.length === "number") ||
                  $util.isString(message.signer)
                )
              )
                return "signer: buffer expected";
            return null;
          };

          /**
           * Creates a MsgSetVersion message from a plain object. Also converts values to their respective internal types.
           * @function fromObject
           * @memberof hermes.hermes.v1beta1.types.MsgSetVersion
           * @static
           * @param {Object.<string,*>} object Plain object
           * @returns {hermes.hermes.v1beta1.types.MsgSetVersion} MsgSetVersion
           */
          MsgSetVersion.fromObject = function fromObject(object) {
            if (
              object instanceof $root.hermes.hermes.v1beta1.types.MsgSetVersion
            )
              return object;
            var message = new $root.hermes.hermes.v1beta1.types.MsgSetVersion();
            if (object.version != null)
              message.version = String(object.version);
            if (object.signer != null)
              if (typeof object.signer === "string")
                $util.base64.decode(
                  object.signer,
                  (message.signer = $util.newBuffer(
                    $util.base64.length(object.signer)
                  )),
                  0
                );
              else if (object.signer.length >= 0)
                message.signer = object.signer;
            return message;
          };

          /**
           * Creates a plain object from a MsgSetVersion message. Also converts values to other types if specified.
           * @function toObject
           * @memberof hermes.hermes.v1beta1.types.MsgSetVersion
           * @static
           * @param {hermes.hermes.v1beta1.types.MsgSetVersion} message MsgSetVersion
           * @param {$protobuf.IConversionOptions} [options] Conversion options
           * @returns {Object.<string,*>} Plain object
           */
          MsgSetVersion.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (options.defaults) {
              object.version = "";
              if (options.bytes === String) object.signer = "";
              else {
                object.signer = [];
                if (options.bytes !== Array)
                  object.signer = $util.newBuffer(object.signer);
              }
            }
            if (message.version != null && message.hasOwnProperty("version"))
              object.version = message.version;
            if (message.signer != null && message.hasOwnProperty("signer"))
              object.signer =
                options.bytes === String
                  ? $util.base64.encode(
                      message.signer,
                      0,
                      message.signer.length
                    )
                  : options.bytes === Array
                  ? Array.prototype.slice.call(message.signer)
                  : message.signer;
            return object;
          };

          /**
           * Converts this MsgSetVersion to JSON.
           * @function toJSON
           * @memberof hermes.hermes.v1beta1.types.MsgSetVersion
           * @instance
           * @returns {Object.<string,*>} JSON object
           */
          MsgSetVersion.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(
              this,
              $protobuf.util.toJSONOptions
            );
          };

          /**
           * Gets the default type url for MsgSetVersion
           * @function getTypeUrl
           * @memberof hermes.hermes.v1beta1.types.MsgSetVersion
           * @static
           * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
           * @returns {string} The default type url
           */
          MsgSetVersion.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
              typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/hermes.hermes.v1beta1.types.MsgSetVersion";
          };

          return MsgSetVersion;
        })();

        return types;
      })();

      return v1beta1;
    })();

    return hermes;
  })();

  hermes.operatorstaking = (function () {
    /**
     * Namespace operatorstaking.
     * @memberof hermes
     * @namespace
     */
    var operatorstaking = {};

    operatorstaking.v1beta1 = (function () {
      /**
       * Namespace v1beta1.
       * @memberof hermes.operatorstaking
       * @namespace
       */
      var v1beta1 = {};

      v1beta1.Msg = (function () {
        /**
         * Constructs a new Msg service.
         * @memberof hermes.operatorstaking.v1beta1
         * @classdesc Represents a Msg
         * @extends $protobuf.rpc.Service
         * @constructor
         * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
         * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
         * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
         */
        function Msg(rpcImpl, requestDelimited, responseDelimited) {
          $protobuf.rpc.Service.call(
            this,
            rpcImpl,
            requestDelimited,
            responseDelimited
          );
        }

        (Msg.prototype = Object.create(
          $protobuf.rpc.Service.prototype
        )).constructor = Msg;

        /**
         * Creates new Msg service using the specified rpc implementation.
         * @function create
         * @memberof hermes.operatorstaking.v1beta1.Msg
         * @static
         * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
         * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
         * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
         * @returns {Msg} RPC service. Useful where requests and/or responses are streamed.
         */
        Msg.create = function create(
          rpcImpl,
          requestDelimited,
          responseDelimited
        ) {
          return new this(rpcImpl, requestDelimited, responseDelimited);
        };

        /**
         * Callback as used by {@link hermes.operatorstaking.v1beta1.Msg#createOperator}.
         * @memberof hermes.operatorstaking.v1beta1.Msg
         * @typedef CreateOperatorCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {hermes.operatorstaking.v1beta1.MsgCreateOperatorResponse} [response] MsgCreateOperatorResponse
         */

        /**
         * Calls CreateOperator.
         * @function createOperator
         * @memberof hermes.operatorstaking.v1beta1.Msg
         * @instance
         * @param {hermes.operatorstaking.v1beta1.IMsgCreateOperator} request MsgCreateOperator message or plain object
         * @param {hermes.operatorstaking.v1beta1.Msg.CreateOperatorCallback} callback Node-style callback called with the error, if any, and MsgCreateOperatorResponse
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(
          (Msg.prototype.createOperator = function createOperator(
            request,
            callback
          ) {
            return this.rpcCall(
              createOperator,
              $root.hermes.operatorstaking.v1beta1.MsgCreateOperator,
              $root.hermes.operatorstaking.v1beta1.MsgCreateOperatorResponse,
              request,
              callback
            );
          }),
          "name",
          { value: "CreateOperator" }
        );

        /**
         * Calls CreateOperator.
         * @function createOperator
         * @memberof hermes.operatorstaking.v1beta1.Msg
         * @instance
         * @param {hermes.operatorstaking.v1beta1.IMsgCreateOperator} request MsgCreateOperator message or plain object
         * @returns {Promise<hermes.operatorstaking.v1beta1.MsgCreateOperatorResponse>} Promise
         * @variation 2
         */

        return Msg;
      })();

      v1beta1.MsgCreateOperator = (function () {
        /**
         * Properties of a MsgCreateOperator.
         * @memberof hermes.operatorstaking.v1beta1
         * @interface IMsgCreateOperator
         * @property {number|Long|null} [stake] MsgCreateOperator stake
         * @property {string|null} [server] MsgCreateOperator server
         * @property {number|Long|null} [computeunits] MsgCreateOperator computeunits
         * @property {Uint8Array|null} [signer] MsgCreateOperator signer
         */

        /**
         * Constructs a new MsgCreateOperator.
         * @memberof hermes.operatorstaking.v1beta1
         * @classdesc Represents a MsgCreateOperator.
         * @implements IMsgCreateOperator
         * @constructor
         * @param {hermes.operatorstaking.v1beta1.IMsgCreateOperator=} [properties] Properties to set
         */
        function MsgCreateOperator(properties) {
          if (properties)
            for (
              var keys = Object.keys(properties), i = 0;
              i < keys.length;
              ++i
            )
              if (properties[keys[i]] != null)
                this[keys[i]] = properties[keys[i]];
        }

        /**
         * MsgCreateOperator stake.
         * @member {number|Long} stake
         * @memberof hermes.operatorstaking.v1beta1.MsgCreateOperator
         * @instance
         */
        MsgCreateOperator.prototype.stake = $util.Long
          ? $util.Long.fromBits(0, 0, true)
          : 0;

        /**
         * MsgCreateOperator server.
         * @member {string} server
         * @memberof hermes.operatorstaking.v1beta1.MsgCreateOperator
         * @instance
         */
        MsgCreateOperator.prototype.server = "";

        /**
         * MsgCreateOperator computeunits.
         * @member {number|Long} computeunits
         * @memberof hermes.operatorstaking.v1beta1.MsgCreateOperator
         * @instance
         */
        MsgCreateOperator.prototype.computeunits = $util.Long
          ? $util.Long.fromBits(0, 0, true)
          : 0;

        /**
         * MsgCreateOperator signer.
         * @member {Uint8Array} signer
         * @memberof hermes.operatorstaking.v1beta1.MsgCreateOperator
         * @instance
         */
        MsgCreateOperator.prototype.signer = $util.newBuffer([]);

        /**
         * Creates a new MsgCreateOperator instance using the specified properties.
         * @function create
         * @memberof hermes.operatorstaking.v1beta1.MsgCreateOperator
         * @static
         * @param {hermes.operatorstaking.v1beta1.IMsgCreateOperator=} [properties] Properties to set
         * @returns {hermes.operatorstaking.v1beta1.MsgCreateOperator} MsgCreateOperator instance
         */
        MsgCreateOperator.create = function create(properties) {
          return new MsgCreateOperator(properties);
        };

        /**
         * Encodes the specified MsgCreateOperator message. Does not implicitly {@link hermes.operatorstaking.v1beta1.MsgCreateOperator.verify|verify} messages.
         * @function encode
         * @memberof hermes.operatorstaking.v1beta1.MsgCreateOperator
         * @static
         * @param {hermes.operatorstaking.v1beta1.IMsgCreateOperator} message MsgCreateOperator message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MsgCreateOperator.encode = function encode(message, writer) {
          if (!writer) writer = $Writer.create();
          if (
            message.stake != null &&
            Object.hasOwnProperty.call(message, "stake")
          )
            writer.uint32(/* id 1, wireType 0 =*/ 8).uint64(message.stake);
          if (
            message.server != null &&
            Object.hasOwnProperty.call(message, "server")
          )
            writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.server);
          if (
            message.computeunits != null &&
            Object.hasOwnProperty.call(message, "computeunits")
          )
            writer
              .uint32(/* id 3, wireType 0 =*/ 24)
              .uint64(message.computeunits);
          if (
            message.signer != null &&
            Object.hasOwnProperty.call(message, "signer")
          )
            writer.uint32(/* id 4, wireType 2 =*/ 34).bytes(message.signer);
          return writer;
        };

        /**
         * Encodes the specified MsgCreateOperator message, length delimited. Does not implicitly {@link hermes.operatorstaking.v1beta1.MsgCreateOperator.verify|verify} messages.
         * @function encodeDelimited
         * @memberof hermes.operatorstaking.v1beta1.MsgCreateOperator
         * @static
         * @param {hermes.operatorstaking.v1beta1.IMsgCreateOperator} message MsgCreateOperator message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MsgCreateOperator.encodeDelimited = function encodeDelimited(
          message,
          writer
        ) {
          return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MsgCreateOperator message from the specified reader or buffer.
         * @function decode
         * @memberof hermes.operatorstaking.v1beta1.MsgCreateOperator
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {hermes.operatorstaking.v1beta1.MsgCreateOperator} MsgCreateOperator
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MsgCreateOperator.decode = function decode(reader, length) {
          if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
          var end = length === undefined ? reader.len : reader.pos + length,
            message =
              new $root.hermes.operatorstaking.v1beta1.MsgCreateOperator();
          while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
              case 1: {
                message.stake = reader.uint64();
                break;
              }
              case 2: {
                message.server = reader.string();
                break;
              }
              case 3: {
                message.computeunits = reader.uint64();
                break;
              }
              case 4: {
                message.signer = reader.bytes();
                break;
              }
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        };

        /**
         * Decodes a MsgCreateOperator message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof hermes.operatorstaking.v1beta1.MsgCreateOperator
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {hermes.operatorstaking.v1beta1.MsgCreateOperator} MsgCreateOperator
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MsgCreateOperator.decodeDelimited = function decodeDelimited(reader) {
          if (!(reader instanceof $Reader)) reader = new $Reader(reader);
          return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MsgCreateOperator message.
         * @function verify
         * @memberof hermes.operatorstaking.v1beta1.MsgCreateOperator
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MsgCreateOperator.verify = function verify(message) {
          if (typeof message !== "object" || message === null)
            return "object expected";
          if (message.stake != null && message.hasOwnProperty("stake"))
            if (
              !$util.isInteger(message.stake) &&
              !(
                message.stake &&
                $util.isInteger(message.stake.low) &&
                $util.isInteger(message.stake.high)
              )
            )
              return "stake: integer|Long expected";
          if (message.server != null && message.hasOwnProperty("server"))
            if (!$util.isString(message.server))
              return "server: string expected";
          if (
            message.computeunits != null &&
            message.hasOwnProperty("computeunits")
          )
            if (
              !$util.isInteger(message.computeunits) &&
              !(
                message.computeunits &&
                $util.isInteger(message.computeunits.low) &&
                $util.isInteger(message.computeunits.high)
              )
            )
              return "computeunits: integer|Long expected";
          if (message.signer != null && message.hasOwnProperty("signer"))
            if (
              !(
                (message.signer && typeof message.signer.length === "number") ||
                $util.isString(message.signer)
              )
            )
              return "signer: buffer expected";
          return null;
        };

        /**
         * Creates a MsgCreateOperator message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof hermes.operatorstaking.v1beta1.MsgCreateOperator
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {hermes.operatorstaking.v1beta1.MsgCreateOperator} MsgCreateOperator
         */
        MsgCreateOperator.fromObject = function fromObject(object) {
          if (
            object instanceof
            $root.hermes.operatorstaking.v1beta1.MsgCreateOperator
          )
            return object;
          var message =
            new $root.hermes.operatorstaking.v1beta1.MsgCreateOperator();
          if (object.stake != null)
            if ($util.Long)
              (message.stake = $util.Long.fromValue(
                object.stake
              )).unsigned = true;
            else if (typeof object.stake === "string")
              message.stake = parseInt(object.stake, 10);
            else if (typeof object.stake === "number")
              message.stake = object.stake;
            else if (typeof object.stake === "object")
              message.stake = new $util.LongBits(
                object.stake.low >>> 0,
                object.stake.high >>> 0
              ).toNumber(true);
          if (object.server != null) message.server = String(object.server);
          if (object.computeunits != null)
            if ($util.Long)
              (message.computeunits = $util.Long.fromValue(
                object.computeunits
              )).unsigned = true;
            else if (typeof object.computeunits === "string")
              message.computeunits = parseInt(object.computeunits, 10);
            else if (typeof object.computeunits === "number")
              message.computeunits = object.computeunits;
            else if (typeof object.computeunits === "object")
              message.computeunits = new $util.LongBits(
                object.computeunits.low >>> 0,
                object.computeunits.high >>> 0
              ).toNumber(true);
          if (object.signer != null)
            if (typeof object.signer === "string")
              $util.base64.decode(
                object.signer,
                (message.signer = $util.newBuffer(
                  $util.base64.length(object.signer)
                )),
                0
              );
            else if (object.signer.length >= 0) message.signer = object.signer;
          return message;
        };

        /**
         * Creates a plain object from a MsgCreateOperator message. Also converts values to other types if specified.
         * @function toObject
         * @memberof hermes.operatorstaking.v1beta1.MsgCreateOperator
         * @static
         * @param {hermes.operatorstaking.v1beta1.MsgCreateOperator} message MsgCreateOperator
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MsgCreateOperator.toObject = function toObject(message, options) {
          if (!options) options = {};
          var object = {};
          if (options.defaults) {
            if ($util.Long) {
              var long = new $util.Long(0, 0, true);
              object.stake =
                options.longs === String
                  ? long.toString()
                  : options.longs === Number
                  ? long.toNumber()
                  : long;
            } else object.stake = options.longs === String ? "0" : 0;
            object.server = "";
            if ($util.Long) {
              var long = new $util.Long(0, 0, true);
              object.computeunits =
                options.longs === String
                  ? long.toString()
                  : options.longs === Number
                  ? long.toNumber()
                  : long;
            } else object.computeunits = options.longs === String ? "0" : 0;
            if (options.bytes === String) object.signer = "";
            else {
              object.signer = [];
              if (options.bytes !== Array)
                object.signer = $util.newBuffer(object.signer);
            }
          }
          if (message.stake != null && message.hasOwnProperty("stake"))
            if (typeof message.stake === "number")
              object.stake =
                options.longs === String
                  ? String(message.stake)
                  : message.stake;
            else
              object.stake =
                options.longs === String
                  ? $util.Long.prototype.toString.call(message.stake)
                  : options.longs === Number
                  ? new $util.LongBits(
                      message.stake.low >>> 0,
                      message.stake.high >>> 0
                    ).toNumber(true)
                  : message.stake;
          if (message.server != null && message.hasOwnProperty("server"))
            object.server = message.server;
          if (
            message.computeunits != null &&
            message.hasOwnProperty("computeunits")
          )
            if (typeof message.computeunits === "number")
              object.computeunits =
                options.longs === String
                  ? String(message.computeunits)
                  : message.computeunits;
            else
              object.computeunits =
                options.longs === String
                  ? $util.Long.prototype.toString.call(message.computeunits)
                  : options.longs === Number
                  ? new $util.LongBits(
                      message.computeunits.low >>> 0,
                      message.computeunits.high >>> 0
                    ).toNumber(true)
                  : message.computeunits;
          if (message.signer != null && message.hasOwnProperty("signer"))
            object.signer =
              options.bytes === String
                ? $util.base64.encode(message.signer, 0, message.signer.length)
                : options.bytes === Array
                ? Array.prototype.slice.call(message.signer)
                : message.signer;
          return object;
        };

        /**
         * Converts this MsgCreateOperator to JSON.
         * @function toJSON
         * @memberof hermes.operatorstaking.v1beta1.MsgCreateOperator
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MsgCreateOperator.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for MsgCreateOperator
         * @function getTypeUrl
         * @memberof hermes.operatorstaking.v1beta1.MsgCreateOperator
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        MsgCreateOperator.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
          if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
          }
          return (
            typeUrlPrefix + "/hermes.operatorstaking.v1beta1.MsgCreateOperator"
          );
        };

        return MsgCreateOperator;
      })();

      v1beta1.MsgCreateOperatorResponse = (function () {
        /**
         * Properties of a MsgCreateOperatorResponse.
         * @memberof hermes.operatorstaking.v1beta1
         * @interface IMsgCreateOperatorResponse
         * @property {boolean|null} [created] MsgCreateOperatorResponse created
         */

        /**
         * Constructs a new MsgCreateOperatorResponse.
         * @memberof hermes.operatorstaking.v1beta1
         * @classdesc Represents a MsgCreateOperatorResponse.
         * @implements IMsgCreateOperatorResponse
         * @constructor
         * @param {hermes.operatorstaking.v1beta1.IMsgCreateOperatorResponse=} [properties] Properties to set
         */
        function MsgCreateOperatorResponse(properties) {
          if (properties)
            for (
              var keys = Object.keys(properties), i = 0;
              i < keys.length;
              ++i
            )
              if (properties[keys[i]] != null)
                this[keys[i]] = properties[keys[i]];
        }

        /**
         * MsgCreateOperatorResponse created.
         * @member {boolean} created
         * @memberof hermes.operatorstaking.v1beta1.MsgCreateOperatorResponse
         * @instance
         */
        MsgCreateOperatorResponse.prototype.created = false;

        /**
         * Creates a new MsgCreateOperatorResponse instance using the specified properties.
         * @function create
         * @memberof hermes.operatorstaking.v1beta1.MsgCreateOperatorResponse
         * @static
         * @param {hermes.operatorstaking.v1beta1.IMsgCreateOperatorResponse=} [properties] Properties to set
         * @returns {hermes.operatorstaking.v1beta1.MsgCreateOperatorResponse} MsgCreateOperatorResponse instance
         */
        MsgCreateOperatorResponse.create = function create(properties) {
          return new MsgCreateOperatorResponse(properties);
        };

        /**
         * Encodes the specified MsgCreateOperatorResponse message. Does not implicitly {@link hermes.operatorstaking.v1beta1.MsgCreateOperatorResponse.verify|verify} messages.
         * @function encode
         * @memberof hermes.operatorstaking.v1beta1.MsgCreateOperatorResponse
         * @static
         * @param {hermes.operatorstaking.v1beta1.IMsgCreateOperatorResponse} message MsgCreateOperatorResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MsgCreateOperatorResponse.encode = function encode(message, writer) {
          if (!writer) writer = $Writer.create();
          if (
            message.created != null &&
            Object.hasOwnProperty.call(message, "created")
          )
            writer.uint32(/* id 1, wireType 0 =*/ 8).bool(message.created);
          return writer;
        };

        /**
         * Encodes the specified MsgCreateOperatorResponse message, length delimited. Does not implicitly {@link hermes.operatorstaking.v1beta1.MsgCreateOperatorResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof hermes.operatorstaking.v1beta1.MsgCreateOperatorResponse
         * @static
         * @param {hermes.operatorstaking.v1beta1.IMsgCreateOperatorResponse} message MsgCreateOperatorResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MsgCreateOperatorResponse.encodeDelimited = function encodeDelimited(
          message,
          writer
        ) {
          return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MsgCreateOperatorResponse message from the specified reader or buffer.
         * @function decode
         * @memberof hermes.operatorstaking.v1beta1.MsgCreateOperatorResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {hermes.operatorstaking.v1beta1.MsgCreateOperatorResponse} MsgCreateOperatorResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MsgCreateOperatorResponse.decode = function decode(reader, length) {
          if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
          var end = length === undefined ? reader.len : reader.pos + length,
            message =
              new $root.hermes.operatorstaking.v1beta1.MsgCreateOperatorResponse();
          while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
              case 1: {
                message.created = reader.bool();
                break;
              }
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        };

        /**
         * Decodes a MsgCreateOperatorResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof hermes.operatorstaking.v1beta1.MsgCreateOperatorResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {hermes.operatorstaking.v1beta1.MsgCreateOperatorResponse} MsgCreateOperatorResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MsgCreateOperatorResponse.decodeDelimited = function decodeDelimited(
          reader
        ) {
          if (!(reader instanceof $Reader)) reader = new $Reader(reader);
          return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MsgCreateOperatorResponse message.
         * @function verify
         * @memberof hermes.operatorstaking.v1beta1.MsgCreateOperatorResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MsgCreateOperatorResponse.verify = function verify(message) {
          if (typeof message !== "object" || message === null)
            return "object expected";
          if (message.created != null && message.hasOwnProperty("created"))
            if (typeof message.created !== "boolean")
              return "created: boolean expected";
          return null;
        };

        /**
         * Creates a MsgCreateOperatorResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof hermes.operatorstaking.v1beta1.MsgCreateOperatorResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {hermes.operatorstaking.v1beta1.MsgCreateOperatorResponse} MsgCreateOperatorResponse
         */
        MsgCreateOperatorResponse.fromObject = function fromObject(object) {
          if (
            object instanceof
            $root.hermes.operatorstaking.v1beta1.MsgCreateOperatorResponse
          )
            return object;
          var message =
            new $root.hermes.operatorstaking.v1beta1.MsgCreateOperatorResponse();
          if (object.created != null) message.created = Boolean(object.created);
          return message;
        };

        /**
         * Creates a plain object from a MsgCreateOperatorResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof hermes.operatorstaking.v1beta1.MsgCreateOperatorResponse
         * @static
         * @param {hermes.operatorstaking.v1beta1.MsgCreateOperatorResponse} message MsgCreateOperatorResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MsgCreateOperatorResponse.toObject = function toObject(
          message,
          options
        ) {
          if (!options) options = {};
          var object = {};
          if (options.defaults) object.created = false;
          if (message.created != null && message.hasOwnProperty("created"))
            object.created = message.created;
          return object;
        };

        /**
         * Converts this MsgCreateOperatorResponse to JSON.
         * @function toJSON
         * @memberof hermes.operatorstaking.v1beta1.MsgCreateOperatorResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MsgCreateOperatorResponse.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for MsgCreateOperatorResponse
         * @function getTypeUrl
         * @memberof hermes.operatorstaking.v1beta1.MsgCreateOperatorResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        MsgCreateOperatorResponse.getTypeUrl = function getTypeUrl(
          typeUrlPrefix
        ) {
          if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
          }
          return (
            typeUrlPrefix +
            "/hermes.operatorstaking.v1beta1.MsgCreateOperatorResponse"
          );
        };

        return MsgCreateOperatorResponse;
      })();

      return v1beta1;
    })();

    return operatorstaking;
  })();

  hermes.chainlist = (function () {
    /**
     * Namespace chainlist.
     * @memberof hermes
     * @namespace
     */
    var chainlist = {};

    chainlist.v1beta1 = (function () {
      /**
       * Namespace v1beta1.
       * @memberof hermes.chainlist
       * @namespace
       */
      var v1beta1 = {};

      v1beta1.Msg = (function () {
        /**
         * Constructs a new Msg service.
         * @memberof hermes.chainlist.v1beta1
         * @classdesc Represents a Msg
         * @extends $protobuf.rpc.Service
         * @constructor
         * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
         * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
         * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
         */
        function Msg(rpcImpl, requestDelimited, responseDelimited) {
          $protobuf.rpc.Service.call(
            this,
            rpcImpl,
            requestDelimited,
            responseDelimited
          );
        }

        (Msg.prototype = Object.create(
          $protobuf.rpc.Service.prototype
        )).constructor = Msg;

        /**
         * Creates new Msg service using the specified rpc implementation.
         * @function create
         * @memberof hermes.chainlist.v1beta1.Msg
         * @static
         * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
         * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
         * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
         * @returns {Msg} RPC service. Useful where requests and/or responses are streamed.
         */
        Msg.create = function create(
          rpcImpl,
          requestDelimited,
          responseDelimited
        ) {
          return new this(rpcImpl, requestDelimited, responseDelimited);
        };

        /**
         * Callback as used by {@link hermes.chainlist.v1beta1.Msg#submitOptrWork}.
         * @memberof hermes.chainlist.v1beta1.Msg
         * @typedef SubmitOptrWorkCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {hermes.chainlist.v1beta1.MsgSubmitOptrWorkResponse} [response] MsgSubmitOptrWorkResponse
         */

        /**
         * Calls SubmitOptrWork.
         * @function submitOptrWork
         * @memberof hermes.chainlist.v1beta1.Msg
         * @instance
         * @param {hermes.chainlist.v1beta1.IMsgSubmitOptrWorkRequest} request MsgSubmitOptrWorkRequest message or plain object
         * @param {hermes.chainlist.v1beta1.Msg.SubmitOptrWorkCallback} callback Node-style callback called with the error, if any, and MsgSubmitOptrWorkResponse
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(
          (Msg.prototype.submitOptrWork = function submitOptrWork(
            request,
            callback
          ) {
            return this.rpcCall(
              submitOptrWork,
              $root.hermes.chainlist.v1beta1.MsgSubmitOptrWorkRequest,
              $root.hermes.chainlist.v1beta1.MsgSubmitOptrWorkResponse,
              request,
              callback
            );
          }),
          "name",
          { value: "SubmitOptrWork" }
        );

        /**
         * Calls SubmitOptrWork.
         * @function submitOptrWork
         * @memberof hermes.chainlist.v1beta1.Msg
         * @instance
         * @param {hermes.chainlist.v1beta1.IMsgSubmitOptrWorkRequest} request MsgSubmitOptrWorkRequest message or plain object
         * @returns {Promise<hermes.chainlist.v1beta1.MsgSubmitOptrWorkResponse>} Promise
         * @variation 2
         */

        /**
         * Callback as used by {@link hermes.chainlist.v1beta1.Msg#registerChain}.
         * @memberof hermes.chainlist.v1beta1.Msg
         * @typedef RegisterChainCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {hermes.chainlist.v1beta1.MsgRegisterChainWithCUResponse} [response] MsgRegisterChainWithCUResponse
         */

        /**
         * Calls RegisterChain.
         * @function registerChain
         * @memberof hermes.chainlist.v1beta1.Msg
         * @instance
         * @param {hermes.chainlist.v1beta1.IMsgRegisterChainWithCU} request MsgRegisterChainWithCU message or plain object
         * @param {hermes.chainlist.v1beta1.Msg.RegisterChainCallback} callback Node-style callback called with the error, if any, and MsgRegisterChainWithCUResponse
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(
          (Msg.prototype.registerChain = function registerChain(
            request,
            callback
          ) {
            return this.rpcCall(
              registerChain,
              $root.hermes.chainlist.v1beta1.MsgRegisterChainWithCU,
              $root.hermes.chainlist.v1beta1.MsgRegisterChainWithCUResponse,
              request,
              callback
            );
          }),
          "name",
          { value: "RegisterChain" }
        );

        /**
         * Calls RegisterChain.
         * @function registerChain
         * @memberof hermes.chainlist.v1beta1.Msg
         * @instance
         * @param {hermes.chainlist.v1beta1.IMsgRegisterChainWithCU} request MsgRegisterChainWithCU message or plain object
         * @returns {Promise<hermes.chainlist.v1beta1.MsgRegisterChainWithCUResponse>} Promise
         * @variation 2
         */

        /**
         * Callback as used by {@link hermes.chainlist.v1beta1.Msg#voteForChainCU}.
         * @memberof hermes.chainlist.v1beta1.Msg
         * @typedef VoteForChainCUCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {hermes.chainlist.v1beta1.MsgVoteForChainCUResponse} [response] MsgVoteForChainCUResponse
         */

        /**
         * Calls VoteForChainCU.
         * @function voteForChainCU
         * @memberof hermes.chainlist.v1beta1.Msg
         * @instance
         * @param {hermes.chainlist.v1beta1.IMsgVoteForChainCURequest} request MsgVoteForChainCURequest message or plain object
         * @param {hermes.chainlist.v1beta1.Msg.VoteForChainCUCallback} callback Node-style callback called with the error, if any, and MsgVoteForChainCUResponse
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(
          (Msg.prototype.voteForChainCU = function voteForChainCU(
            request,
            callback
          ) {
            return this.rpcCall(
              voteForChainCU,
              $root.hermes.chainlist.v1beta1.MsgVoteForChainCURequest,
              $root.hermes.chainlist.v1beta1.MsgVoteForChainCUResponse,
              request,
              callback
            );
          }),
          "name",
          { value: "VoteForChainCU" }
        );

        /**
         * Calls VoteForChainCU.
         * @function voteForChainCU
         * @memberof hermes.chainlist.v1beta1.Msg
         * @instance
         * @param {hermes.chainlist.v1beta1.IMsgVoteForChainCURequest} request MsgVoteForChainCURequest message or plain object
         * @returns {Promise<hermes.chainlist.v1beta1.MsgVoteForChainCUResponse>} Promise
         * @variation 2
         */

        /**
         * Callback as used by {@link hermes.chainlist.v1beta1.Msg#createEndpoint}.
         * @memberof hermes.chainlist.v1beta1.Msg
         * @typedef CreateEndpointCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {hermes.chainlist.v1beta1.MsgCreateEndpointResponse} [response] MsgCreateEndpointResponse
         */

        /**
         * Calls CreateEndpoint.
         * @function createEndpoint
         * @memberof hermes.chainlist.v1beta1.Msg
         * @instance
         * @param {hermes.chainlist.v1beta1.IMsgCreateEndpoint} request MsgCreateEndpoint message or plain object
         * @param {hermes.chainlist.v1beta1.Msg.CreateEndpointCallback} callback Node-style callback called with the error, if any, and MsgCreateEndpointResponse
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(
          (Msg.prototype.createEndpoint = function createEndpoint(
            request,
            callback
          ) {
            return this.rpcCall(
              createEndpoint,
              $root.hermes.chainlist.v1beta1.MsgCreateEndpoint,
              $root.hermes.chainlist.v1beta1.MsgCreateEndpointResponse,
              request,
              callback
            );
          }),
          "name",
          { value: "CreateEndpoint" }
        );

        /**
         * Calls CreateEndpoint.
         * @function createEndpoint
         * @memberof hermes.chainlist.v1beta1.Msg
         * @instance
         * @param {hermes.chainlist.v1beta1.IMsgCreateEndpoint} request MsgCreateEndpoint message or plain object
         * @returns {Promise<hermes.chainlist.v1beta1.MsgCreateEndpointResponse>} Promise
         * @variation 2
         */

        /**
         * Callback as used by {@link hermes.chainlist.v1beta1.Msg#createPairingList}.
         * @memberof hermes.chainlist.v1beta1.Msg
         * @typedef CreatePairingListCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {hermes.chainlist.v1beta1.MsgCreatePairingListResponse} [response] MsgCreatePairingListResponse
         */

        /**
         * Calls CreatePairingList.
         * @function createPairingList
         * @memberof hermes.chainlist.v1beta1.Msg
         * @instance
         * @param {hermes.chainlist.v1beta1.IMsgCreatePairingList} request MsgCreatePairingList message or plain object
         * @param {hermes.chainlist.v1beta1.Msg.CreatePairingListCallback} callback Node-style callback called with the error, if any, and MsgCreatePairingListResponse
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(
          (Msg.prototype.createPairingList = function createPairingList(
            request,
            callback
          ) {
            return this.rpcCall(
              createPairingList,
              $root.hermes.chainlist.v1beta1.MsgCreatePairingList,
              $root.hermes.chainlist.v1beta1.MsgCreatePairingListResponse,
              request,
              callback
            );
          }),
          "name",
          { value: "CreatePairingList" }
        );

        /**
         * Calls CreatePairingList.
         * @function createPairingList
         * @memberof hermes.chainlist.v1beta1.Msg
         * @instance
         * @param {hermes.chainlist.v1beta1.IMsgCreatePairingList} request MsgCreatePairingList message or plain object
         * @returns {Promise<hermes.chainlist.v1beta1.MsgCreatePairingListResponse>} Promise
         * @variation 2
         */

        /**
         * Callback as used by {@link hermes.chainlist.v1beta1.Msg#intializePairinglist}.
         * @memberof hermes.chainlist.v1beta1.Msg
         * @typedef IntializePairinglistCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {hermes.chainlist.v1beta1.MsgInitializePairingListResponse} [response] MsgInitializePairingListResponse
         */

        /**
         * Calls IntializePairinglist.
         * @function intializePairinglist
         * @memberof hermes.chainlist.v1beta1.Msg
         * @instance
         * @param {hermes.chainlist.v1beta1.IMsgInitializePairingList} request MsgInitializePairingList message or plain object
         * @param {hermes.chainlist.v1beta1.Msg.IntializePairinglistCallback} callback Node-style callback called with the error, if any, and MsgInitializePairingListResponse
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(
          (Msg.prototype.intializePairinglist = function intializePairinglist(
            request,
            callback
          ) {
            return this.rpcCall(
              intializePairinglist,
              $root.hermes.chainlist.v1beta1.MsgInitializePairingList,
              $root.hermes.chainlist.v1beta1.MsgInitializePairingListResponse,
              request,
              callback
            );
          }),
          "name",
          { value: "IntializePairinglist" }
        );

        /**
         * Calls IntializePairinglist.
         * @function intializePairinglist
         * @memberof hermes.chainlist.v1beta1.Msg
         * @instance
         * @param {hermes.chainlist.v1beta1.IMsgInitializePairingList} request MsgInitializePairingList message or plain object
         * @returns {Promise<hermes.chainlist.v1beta1.MsgInitializePairingListResponse>} Promise
         * @variation 2
         */

        /**
         * Callback as used by {@link hermes.chainlist.v1beta1.Msg#registerCrawlerIp}.
         * @memberof hermes.chainlist.v1beta1.Msg
         * @typedef RegisterCrawlerIpCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {hermes.chainlist.v1beta1.MsgRegisterCrawlerIPResponse} [response] MsgRegisterCrawlerIPResponse
         */

        /**
         * Calls RegisterCrawlerIp.
         * @function registerCrawlerIp
         * @memberof hermes.chainlist.v1beta1.Msg
         * @instance
         * @param {hermes.chainlist.v1beta1.IMsgRegisterCrawlerIp} request MsgRegisterCrawlerIp message or plain object
         * @param {hermes.chainlist.v1beta1.Msg.RegisterCrawlerIpCallback} callback Node-style callback called with the error, if any, and MsgRegisterCrawlerIPResponse
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(
          (Msg.prototype.registerCrawlerIp = function registerCrawlerIp(
            request,
            callback
          ) {
            return this.rpcCall(
              registerCrawlerIp,
              $root.hermes.chainlist.v1beta1.MsgRegisterCrawlerIp,
              $root.hermes.chainlist.v1beta1.MsgRegisterCrawlerIPResponse,
              request,
              callback
            );
          }),
          "name",
          { value: "RegisterCrawlerIp" }
        );

        /**
         * Calls RegisterCrawlerIp.
         * @function registerCrawlerIp
         * @memberof hermes.chainlist.v1beta1.Msg
         * @instance
         * @param {hermes.chainlist.v1beta1.IMsgRegisterCrawlerIp} request MsgRegisterCrawlerIp message or plain object
         * @returns {Promise<hermes.chainlist.v1beta1.MsgRegisterCrawlerIPResponse>} Promise
         * @variation 2
         */

        return Msg;
      })();

      v1beta1.MsgRegisterCrawlerIp = (function () {
        /**
         * Properties of a MsgRegisterCrawlerIp.
         * @memberof hermes.chainlist.v1beta1
         * @interface IMsgRegisterCrawlerIp
         * @property {string|null} [Ip] MsgRegisterCrawlerIp Ip
         * @property {Uint8Array|null} [signer] MsgRegisterCrawlerIp signer
         */

        /**
         * Constructs a new MsgRegisterCrawlerIp.
         * @memberof hermes.chainlist.v1beta1
         * @classdesc Represents a MsgRegisterCrawlerIp.
         * @implements IMsgRegisterCrawlerIp
         * @constructor
         * @param {hermes.chainlist.v1beta1.IMsgRegisterCrawlerIp=} [properties] Properties to set
         */
        function MsgRegisterCrawlerIp(properties) {
          if (properties)
            for (
              var keys = Object.keys(properties), i = 0;
              i < keys.length;
              ++i
            )
              if (properties[keys[i]] != null)
                this[keys[i]] = properties[keys[i]];
        }

        /**
         * MsgRegisterCrawlerIp Ip.
         * @member {string} Ip
         * @memberof hermes.chainlist.v1beta1.MsgRegisterCrawlerIp
         * @instance
         */
        MsgRegisterCrawlerIp.prototype.Ip = "";

        /**
         * MsgRegisterCrawlerIp signer.
         * @member {Uint8Array} signer
         * @memberof hermes.chainlist.v1beta1.MsgRegisterCrawlerIp
         * @instance
         */
        MsgRegisterCrawlerIp.prototype.signer = $util.newBuffer([]);

        /**
         * Creates a new MsgRegisterCrawlerIp instance using the specified properties.
         * @function create
         * @memberof hermes.chainlist.v1beta1.MsgRegisterCrawlerIp
         * @static
         * @param {hermes.chainlist.v1beta1.IMsgRegisterCrawlerIp=} [properties] Properties to set
         * @returns {hermes.chainlist.v1beta1.MsgRegisterCrawlerIp} MsgRegisterCrawlerIp instance
         */
        MsgRegisterCrawlerIp.create = function create(properties) {
          return new MsgRegisterCrawlerIp(properties);
        };

        /**
         * Encodes the specified MsgRegisterCrawlerIp message. Does not implicitly {@link hermes.chainlist.v1beta1.MsgRegisterCrawlerIp.verify|verify} messages.
         * @function encode
         * @memberof hermes.chainlist.v1beta1.MsgRegisterCrawlerIp
         * @static
         * @param {hermes.chainlist.v1beta1.IMsgRegisterCrawlerIp} message MsgRegisterCrawlerIp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MsgRegisterCrawlerIp.encode = function encode(message, writer) {
          if (!writer) writer = $Writer.create();
          if (message.Ip != null && Object.hasOwnProperty.call(message, "Ip"))
            writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.Ip);
          if (
            message.signer != null &&
            Object.hasOwnProperty.call(message, "signer")
          )
            writer.uint32(/* id 2, wireType 2 =*/ 18).bytes(message.signer);
          return writer;
        };

        /**
         * Encodes the specified MsgRegisterCrawlerIp message, length delimited. Does not implicitly {@link hermes.chainlist.v1beta1.MsgRegisterCrawlerIp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof hermes.chainlist.v1beta1.MsgRegisterCrawlerIp
         * @static
         * @param {hermes.chainlist.v1beta1.IMsgRegisterCrawlerIp} message MsgRegisterCrawlerIp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MsgRegisterCrawlerIp.encodeDelimited = function encodeDelimited(
          message,
          writer
        ) {
          return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MsgRegisterCrawlerIp message from the specified reader or buffer.
         * @function decode
         * @memberof hermes.chainlist.v1beta1.MsgRegisterCrawlerIp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {hermes.chainlist.v1beta1.MsgRegisterCrawlerIp} MsgRegisterCrawlerIp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MsgRegisterCrawlerIp.decode = function decode(reader, length) {
          if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
          var end = length === undefined ? reader.len : reader.pos + length,
            message = new $root.hermes.chainlist.v1beta1.MsgRegisterCrawlerIp();
          while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
              case 1: {
                message.Ip = reader.string();
                break;
              }
              case 2: {
                message.signer = reader.bytes();
                break;
              }
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        };

        /**
         * Decodes a MsgRegisterCrawlerIp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof hermes.chainlist.v1beta1.MsgRegisterCrawlerIp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {hermes.chainlist.v1beta1.MsgRegisterCrawlerIp} MsgRegisterCrawlerIp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MsgRegisterCrawlerIp.decodeDelimited = function decodeDelimited(
          reader
        ) {
          if (!(reader instanceof $Reader)) reader = new $Reader(reader);
          return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MsgRegisterCrawlerIp message.
         * @function verify
         * @memberof hermes.chainlist.v1beta1.MsgRegisterCrawlerIp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MsgRegisterCrawlerIp.verify = function verify(message) {
          if (typeof message !== "object" || message === null)
            return "object expected";
          if (message.Ip != null && message.hasOwnProperty("Ip"))
            if (!$util.isString(message.Ip)) return "Ip: string expected";
          if (message.signer != null && message.hasOwnProperty("signer"))
            if (
              !(
                (message.signer && typeof message.signer.length === "number") ||
                $util.isString(message.signer)
              )
            )
              return "signer: buffer expected";
          return null;
        };

        /**
         * Creates a MsgRegisterCrawlerIp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof hermes.chainlist.v1beta1.MsgRegisterCrawlerIp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {hermes.chainlist.v1beta1.MsgRegisterCrawlerIp} MsgRegisterCrawlerIp
         */
        MsgRegisterCrawlerIp.fromObject = function fromObject(object) {
          if (
            object instanceof
            $root.hermes.chainlist.v1beta1.MsgRegisterCrawlerIp
          )
            return object;
          var message =
            new $root.hermes.chainlist.v1beta1.MsgRegisterCrawlerIp();
          if (object.Ip != null) message.Ip = String(object.Ip);
          if (object.signer != null)
            if (typeof object.signer === "string")
              $util.base64.decode(
                object.signer,
                (message.signer = $util.newBuffer(
                  $util.base64.length(object.signer)
                )),
                0
              );
            else if (object.signer.length >= 0) message.signer = object.signer;
          return message;
        };

        /**
         * Creates a plain object from a MsgRegisterCrawlerIp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof hermes.chainlist.v1beta1.MsgRegisterCrawlerIp
         * @static
         * @param {hermes.chainlist.v1beta1.MsgRegisterCrawlerIp} message MsgRegisterCrawlerIp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MsgRegisterCrawlerIp.toObject = function toObject(message, options) {
          if (!options) options = {};
          var object = {};
          if (options.defaults) {
            object.Ip = "";
            if (options.bytes === String) object.signer = "";
            else {
              object.signer = [];
              if (options.bytes !== Array)
                object.signer = $util.newBuffer(object.signer);
            }
          }
          if (message.Ip != null && message.hasOwnProperty("Ip"))
            object.Ip = message.Ip;
          if (message.signer != null && message.hasOwnProperty("signer"))
            object.signer =
              options.bytes === String
                ? $util.base64.encode(message.signer, 0, message.signer.length)
                : options.bytes === Array
                ? Array.prototype.slice.call(message.signer)
                : message.signer;
          return object;
        };

        /**
         * Converts this MsgRegisterCrawlerIp to JSON.
         * @function toJSON
         * @memberof hermes.chainlist.v1beta1.MsgRegisterCrawlerIp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MsgRegisterCrawlerIp.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for MsgRegisterCrawlerIp
         * @function getTypeUrl
         * @memberof hermes.chainlist.v1beta1.MsgRegisterCrawlerIp
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        MsgRegisterCrawlerIp.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
          if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
          }
          return (
            typeUrlPrefix + "/hermes.chainlist.v1beta1.MsgRegisterCrawlerIp"
          );
        };

        return MsgRegisterCrawlerIp;
      })();

      v1beta1.MsgRegisterCrawlerIPResponse = (function () {
        /**
         * Properties of a MsgRegisterCrawlerIPResponse.
         * @memberof hermes.chainlist.v1beta1
         * @interface IMsgRegisterCrawlerIPResponse
         */

        /**
         * Constructs a new MsgRegisterCrawlerIPResponse.
         * @memberof hermes.chainlist.v1beta1
         * @classdesc Represents a MsgRegisterCrawlerIPResponse.
         * @implements IMsgRegisterCrawlerIPResponse
         * @constructor
         * @param {hermes.chainlist.v1beta1.IMsgRegisterCrawlerIPResponse=} [properties] Properties to set
         */
        function MsgRegisterCrawlerIPResponse(properties) {
          if (properties)
            for (
              var keys = Object.keys(properties), i = 0;
              i < keys.length;
              ++i
            )
              if (properties[keys[i]] != null)
                this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new MsgRegisterCrawlerIPResponse instance using the specified properties.
         * @function create
         * @memberof hermes.chainlist.v1beta1.MsgRegisterCrawlerIPResponse
         * @static
         * @param {hermes.chainlist.v1beta1.IMsgRegisterCrawlerIPResponse=} [properties] Properties to set
         * @returns {hermes.chainlist.v1beta1.MsgRegisterCrawlerIPResponse} MsgRegisterCrawlerIPResponse instance
         */
        MsgRegisterCrawlerIPResponse.create = function create(properties) {
          return new MsgRegisterCrawlerIPResponse(properties);
        };

        /**
         * Encodes the specified MsgRegisterCrawlerIPResponse message. Does not implicitly {@link hermes.chainlist.v1beta1.MsgRegisterCrawlerIPResponse.verify|verify} messages.
         * @function encode
         * @memberof hermes.chainlist.v1beta1.MsgRegisterCrawlerIPResponse
         * @static
         * @param {hermes.chainlist.v1beta1.IMsgRegisterCrawlerIPResponse} message MsgRegisterCrawlerIPResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MsgRegisterCrawlerIPResponse.encode = function encode(message, writer) {
          if (!writer) writer = $Writer.create();
          return writer;
        };

        /**
         * Encodes the specified MsgRegisterCrawlerIPResponse message, length delimited. Does not implicitly {@link hermes.chainlist.v1beta1.MsgRegisterCrawlerIPResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof hermes.chainlist.v1beta1.MsgRegisterCrawlerIPResponse
         * @static
         * @param {hermes.chainlist.v1beta1.IMsgRegisterCrawlerIPResponse} message MsgRegisterCrawlerIPResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MsgRegisterCrawlerIPResponse.encodeDelimited = function encodeDelimited(
          message,
          writer
        ) {
          return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MsgRegisterCrawlerIPResponse message from the specified reader or buffer.
         * @function decode
         * @memberof hermes.chainlist.v1beta1.MsgRegisterCrawlerIPResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {hermes.chainlist.v1beta1.MsgRegisterCrawlerIPResponse} MsgRegisterCrawlerIPResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MsgRegisterCrawlerIPResponse.decode = function decode(reader, length) {
          if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
          var end = length === undefined ? reader.len : reader.pos + length,
            message =
              new $root.hermes.chainlist.v1beta1.MsgRegisterCrawlerIPResponse();
          while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        };

        /**
         * Decodes a MsgRegisterCrawlerIPResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof hermes.chainlist.v1beta1.MsgRegisterCrawlerIPResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {hermes.chainlist.v1beta1.MsgRegisterCrawlerIPResponse} MsgRegisterCrawlerIPResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MsgRegisterCrawlerIPResponse.decodeDelimited = function decodeDelimited(
          reader
        ) {
          if (!(reader instanceof $Reader)) reader = new $Reader(reader);
          return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MsgRegisterCrawlerIPResponse message.
         * @function verify
         * @memberof hermes.chainlist.v1beta1.MsgRegisterCrawlerIPResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MsgRegisterCrawlerIPResponse.verify = function verify(message) {
          if (typeof message !== "object" || message === null)
            return "object expected";
          return null;
        };

        /**
         * Creates a MsgRegisterCrawlerIPResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof hermes.chainlist.v1beta1.MsgRegisterCrawlerIPResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {hermes.chainlist.v1beta1.MsgRegisterCrawlerIPResponse} MsgRegisterCrawlerIPResponse
         */
        MsgRegisterCrawlerIPResponse.fromObject = function fromObject(object) {
          if (
            object instanceof
            $root.hermes.chainlist.v1beta1.MsgRegisterCrawlerIPResponse
          )
            return object;
          return new $root.hermes.chainlist.v1beta1.MsgRegisterCrawlerIPResponse();
        };

        /**
         * Creates a plain object from a MsgRegisterCrawlerIPResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof hermes.chainlist.v1beta1.MsgRegisterCrawlerIPResponse
         * @static
         * @param {hermes.chainlist.v1beta1.MsgRegisterCrawlerIPResponse} message MsgRegisterCrawlerIPResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MsgRegisterCrawlerIPResponse.toObject = function toObject() {
          return {};
        };

        /**
         * Converts this MsgRegisterCrawlerIPResponse to JSON.
         * @function toJSON
         * @memberof hermes.chainlist.v1beta1.MsgRegisterCrawlerIPResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MsgRegisterCrawlerIPResponse.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for MsgRegisterCrawlerIPResponse
         * @function getTypeUrl
         * @memberof hermes.chainlist.v1beta1.MsgRegisterCrawlerIPResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        MsgRegisterCrawlerIPResponse.getTypeUrl = function getTypeUrl(
          typeUrlPrefix
        ) {
          if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
          }
          return (
            typeUrlPrefix +
            "/hermes.chainlist.v1beta1.MsgRegisterCrawlerIPResponse"
          );
        };

        return MsgRegisterCrawlerIPResponse;
      })();

      v1beta1.MsgSubmitOptrWorkRequest = (function () {
        /**
         * Properties of a MsgSubmitOptrWorkRequest.
         * @memberof hermes.chainlist.v1beta1
         * @interface IMsgSubmitOptrWorkRequest
         * @property {Array.<hermes.chainlist.v1beta1.IWorkdoneForChain>|null} [workdoneForChains] MsgSubmitOptrWorkRequest workdoneForChains
         * @property {Uint8Array|null} [signer] MsgSubmitOptrWorkRequest signer
         */

        /**
         * Constructs a new MsgSubmitOptrWorkRequest.
         * @memberof hermes.chainlist.v1beta1
         * @classdesc Represents a MsgSubmitOptrWorkRequest.
         * @implements IMsgSubmitOptrWorkRequest
         * @constructor
         * @param {hermes.chainlist.v1beta1.IMsgSubmitOptrWorkRequest=} [properties] Properties to set
         */
        function MsgSubmitOptrWorkRequest(properties) {
          this.workdoneForChains = [];
          if (properties)
            for (
              var keys = Object.keys(properties), i = 0;
              i < keys.length;
              ++i
            )
              if (properties[keys[i]] != null)
                this[keys[i]] = properties[keys[i]];
        }

        /**
         * MsgSubmitOptrWorkRequest workdoneForChains.
         * @member {Array.<hermes.chainlist.v1beta1.IWorkdoneForChain>} workdoneForChains
         * @memberof hermes.chainlist.v1beta1.MsgSubmitOptrWorkRequest
         * @instance
         */
        MsgSubmitOptrWorkRequest.prototype.workdoneForChains = $util.emptyArray;

        /**
         * MsgSubmitOptrWorkRequest signer.
         * @member {Uint8Array} signer
         * @memberof hermes.chainlist.v1beta1.MsgSubmitOptrWorkRequest
         * @instance
         */
        MsgSubmitOptrWorkRequest.prototype.signer = $util.newBuffer([]);

        /**
         * Creates a new MsgSubmitOptrWorkRequest instance using the specified properties.
         * @function create
         * @memberof hermes.chainlist.v1beta1.MsgSubmitOptrWorkRequest
         * @static
         * @param {hermes.chainlist.v1beta1.IMsgSubmitOptrWorkRequest=} [properties] Properties to set
         * @returns {hermes.chainlist.v1beta1.MsgSubmitOptrWorkRequest} MsgSubmitOptrWorkRequest instance
         */
        MsgSubmitOptrWorkRequest.create = function create(properties) {
          return new MsgSubmitOptrWorkRequest(properties);
        };

        /**
         * Encodes the specified MsgSubmitOptrWorkRequest message. Does not implicitly {@link hermes.chainlist.v1beta1.MsgSubmitOptrWorkRequest.verify|verify} messages.
         * @function encode
         * @memberof hermes.chainlist.v1beta1.MsgSubmitOptrWorkRequest
         * @static
         * @param {hermes.chainlist.v1beta1.IMsgSubmitOptrWorkRequest} message MsgSubmitOptrWorkRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MsgSubmitOptrWorkRequest.encode = function encode(message, writer) {
          if (!writer) writer = $Writer.create();
          if (
            message.workdoneForChains != null &&
            message.workdoneForChains.length
          )
            for (var i = 0; i < message.workdoneForChains.length; ++i)
              $root.hermes.chainlist.v1beta1.WorkdoneForChain.encode(
                message.workdoneForChains[i],
                writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
              ).ldelim();
          if (
            message.signer != null &&
            Object.hasOwnProperty.call(message, "signer")
          )
            writer.uint32(/* id 2, wireType 2 =*/ 18).bytes(message.signer);
          return writer;
        };

        /**
         * Encodes the specified MsgSubmitOptrWorkRequest message, length delimited. Does not implicitly {@link hermes.chainlist.v1beta1.MsgSubmitOptrWorkRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof hermes.chainlist.v1beta1.MsgSubmitOptrWorkRequest
         * @static
         * @param {hermes.chainlist.v1beta1.IMsgSubmitOptrWorkRequest} message MsgSubmitOptrWorkRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MsgSubmitOptrWorkRequest.encodeDelimited = function encodeDelimited(
          message,
          writer
        ) {
          return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MsgSubmitOptrWorkRequest message from the specified reader or buffer.
         * @function decode
         * @memberof hermes.chainlist.v1beta1.MsgSubmitOptrWorkRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {hermes.chainlist.v1beta1.MsgSubmitOptrWorkRequest} MsgSubmitOptrWorkRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MsgSubmitOptrWorkRequest.decode = function decode(reader, length) {
          if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
          var end = length === undefined ? reader.len : reader.pos + length,
            message =
              new $root.hermes.chainlist.v1beta1.MsgSubmitOptrWorkRequest();
          while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
              case 1: {
                if (
                  !(
                    message.workdoneForChains &&
                    message.workdoneForChains.length
                  )
                )
                  message.workdoneForChains = [];
                message.workdoneForChains.push(
                  $root.hermes.chainlist.v1beta1.WorkdoneForChain.decode(
                    reader,
                    reader.uint32()
                  )
                );
                break;
              }
              case 2: {
                message.signer = reader.bytes();
                break;
              }
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        };

        /**
         * Decodes a MsgSubmitOptrWorkRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof hermes.chainlist.v1beta1.MsgSubmitOptrWorkRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {hermes.chainlist.v1beta1.MsgSubmitOptrWorkRequest} MsgSubmitOptrWorkRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MsgSubmitOptrWorkRequest.decodeDelimited = function decodeDelimited(
          reader
        ) {
          if (!(reader instanceof $Reader)) reader = new $Reader(reader);
          return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MsgSubmitOptrWorkRequest message.
         * @function verify
         * @memberof hermes.chainlist.v1beta1.MsgSubmitOptrWorkRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MsgSubmitOptrWorkRequest.verify = function verify(message) {
          if (typeof message !== "object" || message === null)
            return "object expected";
          if (
            message.workdoneForChains != null &&
            message.hasOwnProperty("workdoneForChains")
          ) {
            if (!Array.isArray(message.workdoneForChains))
              return "workdoneForChains: array expected";
            for (var i = 0; i < message.workdoneForChains.length; ++i) {
              var error =
                $root.hermes.chainlist.v1beta1.WorkdoneForChain.verify(
                  message.workdoneForChains[i]
                );
              if (error) return "workdoneForChains." + error;
            }
          }
          if (message.signer != null && message.hasOwnProperty("signer"))
            if (
              !(
                (message.signer && typeof message.signer.length === "number") ||
                $util.isString(message.signer)
              )
            )
              return "signer: buffer expected";
          return null;
        };

        /**
         * Creates a MsgSubmitOptrWorkRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof hermes.chainlist.v1beta1.MsgSubmitOptrWorkRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {hermes.chainlist.v1beta1.MsgSubmitOptrWorkRequest} MsgSubmitOptrWorkRequest
         */
        MsgSubmitOptrWorkRequest.fromObject = function fromObject(object) {
          if (
            object instanceof
            $root.hermes.chainlist.v1beta1.MsgSubmitOptrWorkRequest
          )
            return object;
          var message =
            new $root.hermes.chainlist.v1beta1.MsgSubmitOptrWorkRequest();
          if (object.workdoneForChains) {
            if (!Array.isArray(object.workdoneForChains))
              throw TypeError(
                ".hermes.chainlist.v1beta1.MsgSubmitOptrWorkRequest.workdoneForChains: array expected"
              );
            message.workdoneForChains = [];
            for (var i = 0; i < object.workdoneForChains.length; ++i) {
              if (typeof object.workdoneForChains[i] !== "object")
                throw TypeError(
                  ".hermes.chainlist.v1beta1.MsgSubmitOptrWorkRequest.workdoneForChains: object expected"
                );
              message.workdoneForChains[i] =
                $root.hermes.chainlist.v1beta1.WorkdoneForChain.fromObject(
                  object.workdoneForChains[i]
                );
            }
          }
          if (object.signer != null)
            if (typeof object.signer === "string")
              $util.base64.decode(
                object.signer,
                (message.signer = $util.newBuffer(
                  $util.base64.length(object.signer)
                )),
                0
              );
            else if (object.signer.length >= 0) message.signer = object.signer;
          return message;
        };

        /**
         * Creates a plain object from a MsgSubmitOptrWorkRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof hermes.chainlist.v1beta1.MsgSubmitOptrWorkRequest
         * @static
         * @param {hermes.chainlist.v1beta1.MsgSubmitOptrWorkRequest} message MsgSubmitOptrWorkRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MsgSubmitOptrWorkRequest.toObject = function toObject(
          message,
          options
        ) {
          if (!options) options = {};
          var object = {};
          if (options.arrays || options.defaults) object.workdoneForChains = [];
          if (options.defaults)
            if (options.bytes === String) object.signer = "";
            else {
              object.signer = [];
              if (options.bytes !== Array)
                object.signer = $util.newBuffer(object.signer);
            }
          if (message.workdoneForChains && message.workdoneForChains.length) {
            object.workdoneForChains = [];
            for (var j = 0; j < message.workdoneForChains.length; ++j)
              object.workdoneForChains[j] =
                $root.hermes.chainlist.v1beta1.WorkdoneForChain.toObject(
                  message.workdoneForChains[j],
                  options
                );
          }
          if (message.signer != null && message.hasOwnProperty("signer"))
            object.signer =
              options.bytes === String
                ? $util.base64.encode(message.signer, 0, message.signer.length)
                : options.bytes === Array
                ? Array.prototype.slice.call(message.signer)
                : message.signer;
          return object;
        };

        /**
         * Converts this MsgSubmitOptrWorkRequest to JSON.
         * @function toJSON
         * @memberof hermes.chainlist.v1beta1.MsgSubmitOptrWorkRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MsgSubmitOptrWorkRequest.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for MsgSubmitOptrWorkRequest
         * @function getTypeUrl
         * @memberof hermes.chainlist.v1beta1.MsgSubmitOptrWorkRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        MsgSubmitOptrWorkRequest.getTypeUrl = function getTypeUrl(
          typeUrlPrefix
        ) {
          if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
          }
          return (
            typeUrlPrefix + "/hermes.chainlist.v1beta1.MsgSubmitOptrWorkRequest"
          );
        };

        return MsgSubmitOptrWorkRequest;
      })();

      v1beta1.MsgSubmitOptrWorkResponse = (function () {
        /**
         * Properties of a MsgSubmitOptrWorkResponse.
         * @memberof hermes.chainlist.v1beta1
         * @interface IMsgSubmitOptrWorkResponse
         */

        /**
         * Constructs a new MsgSubmitOptrWorkResponse.
         * @memberof hermes.chainlist.v1beta1
         * @classdesc Represents a MsgSubmitOptrWorkResponse.
         * @implements IMsgSubmitOptrWorkResponse
         * @constructor
         * @param {hermes.chainlist.v1beta1.IMsgSubmitOptrWorkResponse=} [properties] Properties to set
         */
        function MsgSubmitOptrWorkResponse(properties) {
          if (properties)
            for (
              var keys = Object.keys(properties), i = 0;
              i < keys.length;
              ++i
            )
              if (properties[keys[i]] != null)
                this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new MsgSubmitOptrWorkResponse instance using the specified properties.
         * @function create
         * @memberof hermes.chainlist.v1beta1.MsgSubmitOptrWorkResponse
         * @static
         * @param {hermes.chainlist.v1beta1.IMsgSubmitOptrWorkResponse=} [properties] Properties to set
         * @returns {hermes.chainlist.v1beta1.MsgSubmitOptrWorkResponse} MsgSubmitOptrWorkResponse instance
         */
        MsgSubmitOptrWorkResponse.create = function create(properties) {
          return new MsgSubmitOptrWorkResponse(properties);
        };

        /**
         * Encodes the specified MsgSubmitOptrWorkResponse message. Does not implicitly {@link hermes.chainlist.v1beta1.MsgSubmitOptrWorkResponse.verify|verify} messages.
         * @function encode
         * @memberof hermes.chainlist.v1beta1.MsgSubmitOptrWorkResponse
         * @static
         * @param {hermes.chainlist.v1beta1.IMsgSubmitOptrWorkResponse} message MsgSubmitOptrWorkResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MsgSubmitOptrWorkResponse.encode = function encode(message, writer) {
          if (!writer) writer = $Writer.create();
          return writer;
        };

        /**
         * Encodes the specified MsgSubmitOptrWorkResponse message, length delimited. Does not implicitly {@link hermes.chainlist.v1beta1.MsgSubmitOptrWorkResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof hermes.chainlist.v1beta1.MsgSubmitOptrWorkResponse
         * @static
         * @param {hermes.chainlist.v1beta1.IMsgSubmitOptrWorkResponse} message MsgSubmitOptrWorkResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MsgSubmitOptrWorkResponse.encodeDelimited = function encodeDelimited(
          message,
          writer
        ) {
          return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MsgSubmitOptrWorkResponse message from the specified reader or buffer.
         * @function decode
         * @memberof hermes.chainlist.v1beta1.MsgSubmitOptrWorkResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {hermes.chainlist.v1beta1.MsgSubmitOptrWorkResponse} MsgSubmitOptrWorkResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MsgSubmitOptrWorkResponse.decode = function decode(reader, length) {
          if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
          var end = length === undefined ? reader.len : reader.pos + length,
            message =
              new $root.hermes.chainlist.v1beta1.MsgSubmitOptrWorkResponse();
          while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        };

        /**
         * Decodes a MsgSubmitOptrWorkResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof hermes.chainlist.v1beta1.MsgSubmitOptrWorkResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {hermes.chainlist.v1beta1.MsgSubmitOptrWorkResponse} MsgSubmitOptrWorkResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MsgSubmitOptrWorkResponse.decodeDelimited = function decodeDelimited(
          reader
        ) {
          if (!(reader instanceof $Reader)) reader = new $Reader(reader);
          return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MsgSubmitOptrWorkResponse message.
         * @function verify
         * @memberof hermes.chainlist.v1beta1.MsgSubmitOptrWorkResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MsgSubmitOptrWorkResponse.verify = function verify(message) {
          if (typeof message !== "object" || message === null)
            return "object expected";
          return null;
        };

        /**
         * Creates a MsgSubmitOptrWorkResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof hermes.chainlist.v1beta1.MsgSubmitOptrWorkResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {hermes.chainlist.v1beta1.MsgSubmitOptrWorkResponse} MsgSubmitOptrWorkResponse
         */
        MsgSubmitOptrWorkResponse.fromObject = function fromObject(object) {
          if (
            object instanceof
            $root.hermes.chainlist.v1beta1.MsgSubmitOptrWorkResponse
          )
            return object;
          return new $root.hermes.chainlist.v1beta1.MsgSubmitOptrWorkResponse();
        };

        /**
         * Creates a plain object from a MsgSubmitOptrWorkResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof hermes.chainlist.v1beta1.MsgSubmitOptrWorkResponse
         * @static
         * @param {hermes.chainlist.v1beta1.MsgSubmitOptrWorkResponse} message MsgSubmitOptrWorkResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MsgSubmitOptrWorkResponse.toObject = function toObject() {
          return {};
        };

        /**
         * Converts this MsgSubmitOptrWorkResponse to JSON.
         * @function toJSON
         * @memberof hermes.chainlist.v1beta1.MsgSubmitOptrWorkResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MsgSubmitOptrWorkResponse.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for MsgSubmitOptrWorkResponse
         * @function getTypeUrl
         * @memberof hermes.chainlist.v1beta1.MsgSubmitOptrWorkResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        MsgSubmitOptrWorkResponse.getTypeUrl = function getTypeUrl(
          typeUrlPrefix
        ) {
          if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
          }
          return (
            typeUrlPrefix +
            "/hermes.chainlist.v1beta1.MsgSubmitOptrWorkResponse"
          );
        };

        return MsgSubmitOptrWorkResponse;
      })();

      v1beta1.MsgRegisterChainWithCU = (function () {
        /**
         * Properties of a MsgRegisterChainWithCU.
         * @memberof hermes.chainlist.v1beta1
         * @interface IMsgRegisterChainWithCU
         * @property {hermes.chainlist.v1beta1.IChain|null} [Chain] MsgRegisterChainWithCU Chain
         * @property {hermes.chainlist.v1beta1.IComputeUnits|null} [Cu] MsgRegisterChainWithCU Cu
         * @property {Uint8Array|null} [signer] MsgRegisterChainWithCU signer
         */

        /**
         * Constructs a new MsgRegisterChainWithCU.
         * @memberof hermes.chainlist.v1beta1
         * @classdesc Represents a MsgRegisterChainWithCU.
         * @implements IMsgRegisterChainWithCU
         * @constructor
         * @param {hermes.chainlist.v1beta1.IMsgRegisterChainWithCU=} [properties] Properties to set
         */
        function MsgRegisterChainWithCU(properties) {
          if (properties)
            for (
              var keys = Object.keys(properties), i = 0;
              i < keys.length;
              ++i
            )
              if (properties[keys[i]] != null)
                this[keys[i]] = properties[keys[i]];
        }

        /**
         * MsgRegisterChainWithCU Chain.
         * @member {hermes.chainlist.v1beta1.IChain|null|undefined} Chain
         * @memberof hermes.chainlist.v1beta1.MsgRegisterChainWithCU
         * @instance
         */
        MsgRegisterChainWithCU.prototype.Chain = null;

        /**
         * MsgRegisterChainWithCU Cu.
         * @member {hermes.chainlist.v1beta1.IComputeUnits|null|undefined} Cu
         * @memberof hermes.chainlist.v1beta1.MsgRegisterChainWithCU
         * @instance
         */
        MsgRegisterChainWithCU.prototype.Cu = null;

        /**
         * MsgRegisterChainWithCU signer.
         * @member {Uint8Array} signer
         * @memberof hermes.chainlist.v1beta1.MsgRegisterChainWithCU
         * @instance
         */
        MsgRegisterChainWithCU.prototype.signer = $util.newBuffer([]);

        /**
         * Creates a new MsgRegisterChainWithCU instance using the specified properties.
         * @function create
         * @memberof hermes.chainlist.v1beta1.MsgRegisterChainWithCU
         * @static
         * @param {hermes.chainlist.v1beta1.IMsgRegisterChainWithCU=} [properties] Properties to set
         * @returns {hermes.chainlist.v1beta1.MsgRegisterChainWithCU} MsgRegisterChainWithCU instance
         */
        MsgRegisterChainWithCU.create = function create(properties) {
          return new MsgRegisterChainWithCU(properties);
        };

        /**
         * Encodes the specified MsgRegisterChainWithCU message. Does not implicitly {@link hermes.chainlist.v1beta1.MsgRegisterChainWithCU.verify|verify} messages.
         * @function encode
         * @memberof hermes.chainlist.v1beta1.MsgRegisterChainWithCU
         * @static
         * @param {hermes.chainlist.v1beta1.IMsgRegisterChainWithCU} message MsgRegisterChainWithCU message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MsgRegisterChainWithCU.encode = function encode(message, writer) {
          if (!writer) writer = $Writer.create();
          if (
            message.Chain != null &&
            Object.hasOwnProperty.call(message, "Chain")
          )
            $root.hermes.chainlist.v1beta1.Chain.encode(
              message.Chain,
              writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
            ).ldelim();
          if (message.Cu != null && Object.hasOwnProperty.call(message, "Cu"))
            $root.hermes.chainlist.v1beta1.ComputeUnits.encode(
              message.Cu,
              writer.uint32(/* id 2, wireType 2 =*/ 18).fork()
            ).ldelim();
          if (
            message.signer != null &&
            Object.hasOwnProperty.call(message, "signer")
          )
            writer.uint32(/* id 3, wireType 2 =*/ 26).bytes(message.signer);
          return writer;
        };

        /**
         * Encodes the specified MsgRegisterChainWithCU message, length delimited. Does not implicitly {@link hermes.chainlist.v1beta1.MsgRegisterChainWithCU.verify|verify} messages.
         * @function encodeDelimited
         * @memberof hermes.chainlist.v1beta1.MsgRegisterChainWithCU
         * @static
         * @param {hermes.chainlist.v1beta1.IMsgRegisterChainWithCU} message MsgRegisterChainWithCU message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MsgRegisterChainWithCU.encodeDelimited = function encodeDelimited(
          message,
          writer
        ) {
          return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MsgRegisterChainWithCU message from the specified reader or buffer.
         * @function decode
         * @memberof hermes.chainlist.v1beta1.MsgRegisterChainWithCU
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {hermes.chainlist.v1beta1.MsgRegisterChainWithCU} MsgRegisterChainWithCU
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MsgRegisterChainWithCU.decode = function decode(reader, length) {
          if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
          var end = length === undefined ? reader.len : reader.pos + length,
            message =
              new $root.hermes.chainlist.v1beta1.MsgRegisterChainWithCU();
          while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
              case 1: {
                message.Chain = $root.hermes.chainlist.v1beta1.Chain.decode(
                  reader,
                  reader.uint32()
                );
                break;
              }
              case 2: {
                message.Cu = $root.hermes.chainlist.v1beta1.ComputeUnits.decode(
                  reader,
                  reader.uint32()
                );
                break;
              }
              case 3: {
                message.signer = reader.bytes();
                break;
              }
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        };

        /**
         * Decodes a MsgRegisterChainWithCU message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof hermes.chainlist.v1beta1.MsgRegisterChainWithCU
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {hermes.chainlist.v1beta1.MsgRegisterChainWithCU} MsgRegisterChainWithCU
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MsgRegisterChainWithCU.decodeDelimited = function decodeDelimited(
          reader
        ) {
          if (!(reader instanceof $Reader)) reader = new $Reader(reader);
          return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MsgRegisterChainWithCU message.
         * @function verify
         * @memberof hermes.chainlist.v1beta1.MsgRegisterChainWithCU
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MsgRegisterChainWithCU.verify = function verify(message) {
          if (typeof message !== "object" || message === null)
            return "object expected";
          if (message.Chain != null && message.hasOwnProperty("Chain")) {
            var error = $root.hermes.chainlist.v1beta1.Chain.verify(
              message.Chain
            );
            if (error) return "Chain." + error;
          }
          if (message.Cu != null && message.hasOwnProperty("Cu")) {
            var error = $root.hermes.chainlist.v1beta1.ComputeUnits.verify(
              message.Cu
            );
            if (error) return "Cu." + error;
          }
          if (message.signer != null && message.hasOwnProperty("signer"))
            if (
              !(
                (message.signer && typeof message.signer.length === "number") ||
                $util.isString(message.signer)
              )
            )
              return "signer: buffer expected";
          return null;
        };

        /**
         * Creates a MsgRegisterChainWithCU message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof hermes.chainlist.v1beta1.MsgRegisterChainWithCU
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {hermes.chainlist.v1beta1.MsgRegisterChainWithCU} MsgRegisterChainWithCU
         */
        MsgRegisterChainWithCU.fromObject = function fromObject(object) {
          if (
            object instanceof
            $root.hermes.chainlist.v1beta1.MsgRegisterChainWithCU
          )
            return object;
          var message =
            new $root.hermes.chainlist.v1beta1.MsgRegisterChainWithCU();
          if (object.Chain != null) {
            if (typeof object.Chain !== "object")
              throw TypeError(
                ".hermes.chainlist.v1beta1.MsgRegisterChainWithCU.Chain: object expected"
              );
            message.Chain = $root.hermes.chainlist.v1beta1.Chain.fromObject(
              object.Chain
            );
          }
          if (object.Cu != null) {
            if (typeof object.Cu !== "object")
              throw TypeError(
                ".hermes.chainlist.v1beta1.MsgRegisterChainWithCU.Cu: object expected"
              );
            message.Cu = $root.hermes.chainlist.v1beta1.ComputeUnits.fromObject(
              object.Cu
            );
          }
          if (object.signer != null)
            if (typeof object.signer === "string")
              $util.base64.decode(
                object.signer,
                (message.signer = $util.newBuffer(
                  $util.base64.length(object.signer)
                )),
                0
              );
            else if (object.signer.length >= 0) message.signer = object.signer;
          return message;
        };

        /**
         * Creates a plain object from a MsgRegisterChainWithCU message. Also converts values to other types if specified.
         * @function toObject
         * @memberof hermes.chainlist.v1beta1.MsgRegisterChainWithCU
         * @static
         * @param {hermes.chainlist.v1beta1.MsgRegisterChainWithCU} message MsgRegisterChainWithCU
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MsgRegisterChainWithCU.toObject = function toObject(message, options) {
          if (!options) options = {};
          var object = {};
          if (options.defaults) {
            object.Chain = null;
            object.Cu = null;
            if (options.bytes === String) object.signer = "";
            else {
              object.signer = [];
              if (options.bytes !== Array)
                object.signer = $util.newBuffer(object.signer);
            }
          }
          if (message.Chain != null && message.hasOwnProperty("Chain"))
            object.Chain = $root.hermes.chainlist.v1beta1.Chain.toObject(
              message.Chain,
              options
            );
          if (message.Cu != null && message.hasOwnProperty("Cu"))
            object.Cu = $root.hermes.chainlist.v1beta1.ComputeUnits.toObject(
              message.Cu,
              options
            );
          if (message.signer != null && message.hasOwnProperty("signer"))
            object.signer =
              options.bytes === String
                ? $util.base64.encode(message.signer, 0, message.signer.length)
                : options.bytes === Array
                ? Array.prototype.slice.call(message.signer)
                : message.signer;
          return object;
        };

        /**
         * Converts this MsgRegisterChainWithCU to JSON.
         * @function toJSON
         * @memberof hermes.chainlist.v1beta1.MsgRegisterChainWithCU
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MsgRegisterChainWithCU.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for MsgRegisterChainWithCU
         * @function getTypeUrl
         * @memberof hermes.chainlist.v1beta1.MsgRegisterChainWithCU
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        MsgRegisterChainWithCU.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
          if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
          }
          return (
            typeUrlPrefix + "/hermes.chainlist.v1beta1.MsgRegisterChainWithCU"
          );
        };

        return MsgRegisterChainWithCU;
      })();

      v1beta1.MsgRegisterChainWithCUResponse = (function () {
        /**
         * Properties of a MsgRegisterChainWithCUResponse.
         * @memberof hermes.chainlist.v1beta1
         * @interface IMsgRegisterChainWithCUResponse
         */

        /**
         * Constructs a new MsgRegisterChainWithCUResponse.
         * @memberof hermes.chainlist.v1beta1
         * @classdesc Represents a MsgRegisterChainWithCUResponse.
         * @implements IMsgRegisterChainWithCUResponse
         * @constructor
         * @param {hermes.chainlist.v1beta1.IMsgRegisterChainWithCUResponse=} [properties] Properties to set
         */
        function MsgRegisterChainWithCUResponse(properties) {
          if (properties)
            for (
              var keys = Object.keys(properties), i = 0;
              i < keys.length;
              ++i
            )
              if (properties[keys[i]] != null)
                this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new MsgRegisterChainWithCUResponse instance using the specified properties.
         * @function create
         * @memberof hermes.chainlist.v1beta1.MsgRegisterChainWithCUResponse
         * @static
         * @param {hermes.chainlist.v1beta1.IMsgRegisterChainWithCUResponse=} [properties] Properties to set
         * @returns {hermes.chainlist.v1beta1.MsgRegisterChainWithCUResponse} MsgRegisterChainWithCUResponse instance
         */
        MsgRegisterChainWithCUResponse.create = function create(properties) {
          return new MsgRegisterChainWithCUResponse(properties);
        };

        /**
         * Encodes the specified MsgRegisterChainWithCUResponse message. Does not implicitly {@link hermes.chainlist.v1beta1.MsgRegisterChainWithCUResponse.verify|verify} messages.
         * @function encode
         * @memberof hermes.chainlist.v1beta1.MsgRegisterChainWithCUResponse
         * @static
         * @param {hermes.chainlist.v1beta1.IMsgRegisterChainWithCUResponse} message MsgRegisterChainWithCUResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MsgRegisterChainWithCUResponse.encode = function encode(
          message,
          writer
        ) {
          if (!writer) writer = $Writer.create();
          return writer;
        };

        /**
         * Encodes the specified MsgRegisterChainWithCUResponse message, length delimited. Does not implicitly {@link hermes.chainlist.v1beta1.MsgRegisterChainWithCUResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof hermes.chainlist.v1beta1.MsgRegisterChainWithCUResponse
         * @static
         * @param {hermes.chainlist.v1beta1.IMsgRegisterChainWithCUResponse} message MsgRegisterChainWithCUResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MsgRegisterChainWithCUResponse.encodeDelimited =
          function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
          };

        /**
         * Decodes a MsgRegisterChainWithCUResponse message from the specified reader or buffer.
         * @function decode
         * @memberof hermes.chainlist.v1beta1.MsgRegisterChainWithCUResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {hermes.chainlist.v1beta1.MsgRegisterChainWithCUResponse} MsgRegisterChainWithCUResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MsgRegisterChainWithCUResponse.decode = function decode(
          reader,
          length
        ) {
          if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
          var end = length === undefined ? reader.len : reader.pos + length,
            message =
              new $root.hermes.chainlist.v1beta1.MsgRegisterChainWithCUResponse();
          while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        };

        /**
         * Decodes a MsgRegisterChainWithCUResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof hermes.chainlist.v1beta1.MsgRegisterChainWithCUResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {hermes.chainlist.v1beta1.MsgRegisterChainWithCUResponse} MsgRegisterChainWithCUResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MsgRegisterChainWithCUResponse.decodeDelimited =
          function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
          };

        /**
         * Verifies a MsgRegisterChainWithCUResponse message.
         * @function verify
         * @memberof hermes.chainlist.v1beta1.MsgRegisterChainWithCUResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MsgRegisterChainWithCUResponse.verify = function verify(message) {
          if (typeof message !== "object" || message === null)
            return "object expected";
          return null;
        };

        /**
         * Creates a MsgRegisterChainWithCUResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof hermes.chainlist.v1beta1.MsgRegisterChainWithCUResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {hermes.chainlist.v1beta1.MsgRegisterChainWithCUResponse} MsgRegisterChainWithCUResponse
         */
        MsgRegisterChainWithCUResponse.fromObject = function fromObject(
          object
        ) {
          if (
            object instanceof
            $root.hermes.chainlist.v1beta1.MsgRegisterChainWithCUResponse
          )
            return object;
          return new $root.hermes.chainlist.v1beta1.MsgRegisterChainWithCUResponse();
        };

        /**
         * Creates a plain object from a MsgRegisterChainWithCUResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof hermes.chainlist.v1beta1.MsgRegisterChainWithCUResponse
         * @static
         * @param {hermes.chainlist.v1beta1.MsgRegisterChainWithCUResponse} message MsgRegisterChainWithCUResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MsgRegisterChainWithCUResponse.toObject = function toObject() {
          return {};
        };

        /**
         * Converts this MsgRegisterChainWithCUResponse to JSON.
         * @function toJSON
         * @memberof hermes.chainlist.v1beta1.MsgRegisterChainWithCUResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MsgRegisterChainWithCUResponse.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for MsgRegisterChainWithCUResponse
         * @function getTypeUrl
         * @memberof hermes.chainlist.v1beta1.MsgRegisterChainWithCUResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        MsgRegisterChainWithCUResponse.getTypeUrl = function getTypeUrl(
          typeUrlPrefix
        ) {
          if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
          }
          return (
            typeUrlPrefix +
            "/hermes.chainlist.v1beta1.MsgRegisterChainWithCUResponse"
          );
        };

        return MsgRegisterChainWithCUResponse;
      })();

      v1beta1.MsgVoteForChainCURequest = (function () {
        /**
         * Properties of a MsgVoteForChainCURequest.
         * @memberof hermes.chainlist.v1beta1
         * @interface IMsgVoteForChainCURequest
         * @property {hermes.chainlist.v1beta1.IChain|null} [Chain] MsgVoteForChainCURequest Chain
         * @property {Uint8Array|null} [signer] MsgVoteForChainCURequest signer
         */

        /**
         * Constructs a new MsgVoteForChainCURequest.
         * @memberof hermes.chainlist.v1beta1
         * @classdesc Represents a MsgVoteForChainCURequest.
         * @implements IMsgVoteForChainCURequest
         * @constructor
         * @param {hermes.chainlist.v1beta1.IMsgVoteForChainCURequest=} [properties] Properties to set
         */
        function MsgVoteForChainCURequest(properties) {
          if (properties)
            for (
              var keys = Object.keys(properties), i = 0;
              i < keys.length;
              ++i
            )
              if (properties[keys[i]] != null)
                this[keys[i]] = properties[keys[i]];
        }

        /**
         * MsgVoteForChainCURequest Chain.
         * @member {hermes.chainlist.v1beta1.IChain|null|undefined} Chain
         * @memberof hermes.chainlist.v1beta1.MsgVoteForChainCURequest
         * @instance
         */
        MsgVoteForChainCURequest.prototype.Chain = null;

        /**
         * MsgVoteForChainCURequest signer.
         * @member {Uint8Array} signer
         * @memberof hermes.chainlist.v1beta1.MsgVoteForChainCURequest
         * @instance
         */
        MsgVoteForChainCURequest.prototype.signer = $util.newBuffer([]);

        /**
         * Creates a new MsgVoteForChainCURequest instance using the specified properties.
         * @function create
         * @memberof hermes.chainlist.v1beta1.MsgVoteForChainCURequest
         * @static
         * @param {hermes.chainlist.v1beta1.IMsgVoteForChainCURequest=} [properties] Properties to set
         * @returns {hermes.chainlist.v1beta1.MsgVoteForChainCURequest} MsgVoteForChainCURequest instance
         */
        MsgVoteForChainCURequest.create = function create(properties) {
          return new MsgVoteForChainCURequest(properties);
        };

        /**
         * Encodes the specified MsgVoteForChainCURequest message. Does not implicitly {@link hermes.chainlist.v1beta1.MsgVoteForChainCURequest.verify|verify} messages.
         * @function encode
         * @memberof hermes.chainlist.v1beta1.MsgVoteForChainCURequest
         * @static
         * @param {hermes.chainlist.v1beta1.IMsgVoteForChainCURequest} message MsgVoteForChainCURequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MsgVoteForChainCURequest.encode = function encode(message, writer) {
          if (!writer) writer = $Writer.create();
          if (
            message.Chain != null &&
            Object.hasOwnProperty.call(message, "Chain")
          )
            $root.hermes.chainlist.v1beta1.Chain.encode(
              message.Chain,
              writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
            ).ldelim();
          if (
            message.signer != null &&
            Object.hasOwnProperty.call(message, "signer")
          )
            writer.uint32(/* id 3, wireType 2 =*/ 26).bytes(message.signer);
          return writer;
        };

        /**
         * Encodes the specified MsgVoteForChainCURequest message, length delimited. Does not implicitly {@link hermes.chainlist.v1beta1.MsgVoteForChainCURequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof hermes.chainlist.v1beta1.MsgVoteForChainCURequest
         * @static
         * @param {hermes.chainlist.v1beta1.IMsgVoteForChainCURequest} message MsgVoteForChainCURequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MsgVoteForChainCURequest.encodeDelimited = function encodeDelimited(
          message,
          writer
        ) {
          return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MsgVoteForChainCURequest message from the specified reader or buffer.
         * @function decode
         * @memberof hermes.chainlist.v1beta1.MsgVoteForChainCURequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {hermes.chainlist.v1beta1.MsgVoteForChainCURequest} MsgVoteForChainCURequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MsgVoteForChainCURequest.decode = function decode(reader, length) {
          if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
          var end = length === undefined ? reader.len : reader.pos + length,
            message =
              new $root.hermes.chainlist.v1beta1.MsgVoteForChainCURequest();
          while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
              case 1: {
                message.Chain = $root.hermes.chainlist.v1beta1.Chain.decode(
                  reader,
                  reader.uint32()
                );
                break;
              }
              case 3: {
                message.signer = reader.bytes();
                break;
              }
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        };

        /**
         * Decodes a MsgVoteForChainCURequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof hermes.chainlist.v1beta1.MsgVoteForChainCURequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {hermes.chainlist.v1beta1.MsgVoteForChainCURequest} MsgVoteForChainCURequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MsgVoteForChainCURequest.decodeDelimited = function decodeDelimited(
          reader
        ) {
          if (!(reader instanceof $Reader)) reader = new $Reader(reader);
          return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MsgVoteForChainCURequest message.
         * @function verify
         * @memberof hermes.chainlist.v1beta1.MsgVoteForChainCURequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MsgVoteForChainCURequest.verify = function verify(message) {
          if (typeof message !== "object" || message === null)
            return "object expected";
          if (message.Chain != null && message.hasOwnProperty("Chain")) {
            var error = $root.hermes.chainlist.v1beta1.Chain.verify(
              message.Chain
            );
            if (error) return "Chain." + error;
          }
          if (message.signer != null && message.hasOwnProperty("signer"))
            if (
              !(
                (message.signer && typeof message.signer.length === "number") ||
                $util.isString(message.signer)
              )
            )
              return "signer: buffer expected";
          return null;
        };

        /**
         * Creates a MsgVoteForChainCURequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof hermes.chainlist.v1beta1.MsgVoteForChainCURequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {hermes.chainlist.v1beta1.MsgVoteForChainCURequest} MsgVoteForChainCURequest
         */
        MsgVoteForChainCURequest.fromObject = function fromObject(object) {
          if (
            object instanceof
            $root.hermes.chainlist.v1beta1.MsgVoteForChainCURequest
          )
            return object;
          var message =
            new $root.hermes.chainlist.v1beta1.MsgVoteForChainCURequest();
          if (object.Chain != null) {
            if (typeof object.Chain !== "object")
              throw TypeError(
                ".hermes.chainlist.v1beta1.MsgVoteForChainCURequest.Chain: object expected"
              );
            message.Chain = $root.hermes.chainlist.v1beta1.Chain.fromObject(
              object.Chain
            );
          }
          if (object.signer != null)
            if (typeof object.signer === "string")
              $util.base64.decode(
                object.signer,
                (message.signer = $util.newBuffer(
                  $util.base64.length(object.signer)
                )),
                0
              );
            else if (object.signer.length >= 0) message.signer = object.signer;
          return message;
        };

        /**
         * Creates a plain object from a MsgVoteForChainCURequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof hermes.chainlist.v1beta1.MsgVoteForChainCURequest
         * @static
         * @param {hermes.chainlist.v1beta1.MsgVoteForChainCURequest} message MsgVoteForChainCURequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MsgVoteForChainCURequest.toObject = function toObject(
          message,
          options
        ) {
          if (!options) options = {};
          var object = {};
          if (options.defaults) {
            object.Chain = null;
            if (options.bytes === String) object.signer = "";
            else {
              object.signer = [];
              if (options.bytes !== Array)
                object.signer = $util.newBuffer(object.signer);
            }
          }
          if (message.Chain != null && message.hasOwnProperty("Chain"))
            object.Chain = $root.hermes.chainlist.v1beta1.Chain.toObject(
              message.Chain,
              options
            );
          if (message.signer != null && message.hasOwnProperty("signer"))
            object.signer =
              options.bytes === String
                ? $util.base64.encode(message.signer, 0, message.signer.length)
                : options.bytes === Array
                ? Array.prototype.slice.call(message.signer)
                : message.signer;
          return object;
        };

        /**
         * Converts this MsgVoteForChainCURequest to JSON.
         * @function toJSON
         * @memberof hermes.chainlist.v1beta1.MsgVoteForChainCURequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MsgVoteForChainCURequest.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for MsgVoteForChainCURequest
         * @function getTypeUrl
         * @memberof hermes.chainlist.v1beta1.MsgVoteForChainCURequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        MsgVoteForChainCURequest.getTypeUrl = function getTypeUrl(
          typeUrlPrefix
        ) {
          if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
          }
          return (
            typeUrlPrefix + "/hermes.chainlist.v1beta1.MsgVoteForChainCURequest"
          );
        };

        return MsgVoteForChainCURequest;
      })();

      v1beta1.MsgVoteForChainCUResponse = (function () {
        /**
         * Properties of a MsgVoteForChainCUResponse.
         * @memberof hermes.chainlist.v1beta1
         * @interface IMsgVoteForChainCUResponse
         */

        /**
         * Constructs a new MsgVoteForChainCUResponse.
         * @memberof hermes.chainlist.v1beta1
         * @classdesc Represents a MsgVoteForChainCUResponse.
         * @implements IMsgVoteForChainCUResponse
         * @constructor
         * @param {hermes.chainlist.v1beta1.IMsgVoteForChainCUResponse=} [properties] Properties to set
         */
        function MsgVoteForChainCUResponse(properties) {
          if (properties)
            for (
              var keys = Object.keys(properties), i = 0;
              i < keys.length;
              ++i
            )
              if (properties[keys[i]] != null)
                this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new MsgVoteForChainCUResponse instance using the specified properties.
         * @function create
         * @memberof hermes.chainlist.v1beta1.MsgVoteForChainCUResponse
         * @static
         * @param {hermes.chainlist.v1beta1.IMsgVoteForChainCUResponse=} [properties] Properties to set
         * @returns {hermes.chainlist.v1beta1.MsgVoteForChainCUResponse} MsgVoteForChainCUResponse instance
         */
        MsgVoteForChainCUResponse.create = function create(properties) {
          return new MsgVoteForChainCUResponse(properties);
        };

        /**
         * Encodes the specified MsgVoteForChainCUResponse message. Does not implicitly {@link hermes.chainlist.v1beta1.MsgVoteForChainCUResponse.verify|verify} messages.
         * @function encode
         * @memberof hermes.chainlist.v1beta1.MsgVoteForChainCUResponse
         * @static
         * @param {hermes.chainlist.v1beta1.IMsgVoteForChainCUResponse} message MsgVoteForChainCUResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MsgVoteForChainCUResponse.encode = function encode(message, writer) {
          if (!writer) writer = $Writer.create();
          return writer;
        };

        /**
         * Encodes the specified MsgVoteForChainCUResponse message, length delimited. Does not implicitly {@link hermes.chainlist.v1beta1.MsgVoteForChainCUResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof hermes.chainlist.v1beta1.MsgVoteForChainCUResponse
         * @static
         * @param {hermes.chainlist.v1beta1.IMsgVoteForChainCUResponse} message MsgVoteForChainCUResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MsgVoteForChainCUResponse.encodeDelimited = function encodeDelimited(
          message,
          writer
        ) {
          return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MsgVoteForChainCUResponse message from the specified reader or buffer.
         * @function decode
         * @memberof hermes.chainlist.v1beta1.MsgVoteForChainCUResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {hermes.chainlist.v1beta1.MsgVoteForChainCUResponse} MsgVoteForChainCUResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MsgVoteForChainCUResponse.decode = function decode(reader, length) {
          if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
          var end = length === undefined ? reader.len : reader.pos + length,
            message =
              new $root.hermes.chainlist.v1beta1.MsgVoteForChainCUResponse();
          while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        };

        /**
         * Decodes a MsgVoteForChainCUResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof hermes.chainlist.v1beta1.MsgVoteForChainCUResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {hermes.chainlist.v1beta1.MsgVoteForChainCUResponse} MsgVoteForChainCUResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MsgVoteForChainCUResponse.decodeDelimited = function decodeDelimited(
          reader
        ) {
          if (!(reader instanceof $Reader)) reader = new $Reader(reader);
          return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MsgVoteForChainCUResponse message.
         * @function verify
         * @memberof hermes.chainlist.v1beta1.MsgVoteForChainCUResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MsgVoteForChainCUResponse.verify = function verify(message) {
          if (typeof message !== "object" || message === null)
            return "object expected";
          return null;
        };

        /**
         * Creates a MsgVoteForChainCUResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof hermes.chainlist.v1beta1.MsgVoteForChainCUResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {hermes.chainlist.v1beta1.MsgVoteForChainCUResponse} MsgVoteForChainCUResponse
         */
        MsgVoteForChainCUResponse.fromObject = function fromObject(object) {
          if (
            object instanceof
            $root.hermes.chainlist.v1beta1.MsgVoteForChainCUResponse
          )
            return object;
          return new $root.hermes.chainlist.v1beta1.MsgVoteForChainCUResponse();
        };

        /**
         * Creates a plain object from a MsgVoteForChainCUResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof hermes.chainlist.v1beta1.MsgVoteForChainCUResponse
         * @static
         * @param {hermes.chainlist.v1beta1.MsgVoteForChainCUResponse} message MsgVoteForChainCUResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MsgVoteForChainCUResponse.toObject = function toObject() {
          return {};
        };

        /**
         * Converts this MsgVoteForChainCUResponse to JSON.
         * @function toJSON
         * @memberof hermes.chainlist.v1beta1.MsgVoteForChainCUResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MsgVoteForChainCUResponse.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for MsgVoteForChainCUResponse
         * @function getTypeUrl
         * @memberof hermes.chainlist.v1beta1.MsgVoteForChainCUResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        MsgVoteForChainCUResponse.getTypeUrl = function getTypeUrl(
          typeUrlPrefix
        ) {
          if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
          }
          return (
            typeUrlPrefix +
            "/hermes.chainlist.v1beta1.MsgVoteForChainCUResponse"
          );
        };

        return MsgVoteForChainCUResponse;
      })();

      v1beta1.MsgCreateEndpoint = (function () {
        /**
         * Properties of a MsgCreateEndpoint.
         * @memberof hermes.chainlist.v1beta1
         * @interface IMsgCreateEndpoint
         * @property {hermes.chainlist.v1beta1.IChain|null} [Chain] MsgCreateEndpoint Chain
         * @property {string|null} [Rpc] MsgCreateEndpoint Rpc
         * @property {string|null} [Ws] MsgCreateEndpoint Ws
         * @property {Uint8Array|null} [signer] MsgCreateEndpoint signer
         */

        /**
         * Constructs a new MsgCreateEndpoint.
         * @memberof hermes.chainlist.v1beta1
         * @classdesc Represents a MsgCreateEndpoint.
         * @implements IMsgCreateEndpoint
         * @constructor
         * @param {hermes.chainlist.v1beta1.IMsgCreateEndpoint=} [properties] Properties to set
         */
        function MsgCreateEndpoint(properties) {
          if (properties)
            for (
              var keys = Object.keys(properties), i = 0;
              i < keys.length;
              ++i
            )
              if (properties[keys[i]] != null)
                this[keys[i]] = properties[keys[i]];
        }

        /**
         * MsgCreateEndpoint Chain.
         * @member {hermes.chainlist.v1beta1.IChain|null|undefined} Chain
         * @memberof hermes.chainlist.v1beta1.MsgCreateEndpoint
         * @instance
         */
        MsgCreateEndpoint.prototype.Chain = null;

        /**
         * MsgCreateEndpoint Rpc.
         * @member {string} Rpc
         * @memberof hermes.chainlist.v1beta1.MsgCreateEndpoint
         * @instance
         */
        MsgCreateEndpoint.prototype.Rpc = "";

        /**
         * MsgCreateEndpoint Ws.
         * @member {string} Ws
         * @memberof hermes.chainlist.v1beta1.MsgCreateEndpoint
         * @instance
         */
        MsgCreateEndpoint.prototype.Ws = "";

        /**
         * MsgCreateEndpoint signer.
         * @member {Uint8Array} signer
         * @memberof hermes.chainlist.v1beta1.MsgCreateEndpoint
         * @instance
         */
        MsgCreateEndpoint.prototype.signer = $util.newBuffer([]);

        /**
         * Creates a new MsgCreateEndpoint instance using the specified properties.
         * @function create
         * @memberof hermes.chainlist.v1beta1.MsgCreateEndpoint
         * @static
         * @param {hermes.chainlist.v1beta1.IMsgCreateEndpoint=} [properties] Properties to set
         * @returns {hermes.chainlist.v1beta1.MsgCreateEndpoint} MsgCreateEndpoint instance
         */
        MsgCreateEndpoint.create = function create(properties) {
          return new MsgCreateEndpoint(properties);
        };

        /**
         * Encodes the specified MsgCreateEndpoint message. Does not implicitly {@link hermes.chainlist.v1beta1.MsgCreateEndpoint.verify|verify} messages.
         * @function encode
         * @memberof hermes.chainlist.v1beta1.MsgCreateEndpoint
         * @static
         * @param {hermes.chainlist.v1beta1.IMsgCreateEndpoint} message MsgCreateEndpoint message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MsgCreateEndpoint.encode = function encode(message, writer) {
          if (!writer) writer = $Writer.create();
          if (
            message.Chain != null &&
            Object.hasOwnProperty.call(message, "Chain")
          )
            $root.hermes.chainlist.v1beta1.Chain.encode(
              message.Chain,
              writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
            ).ldelim();
          if (message.Rpc != null && Object.hasOwnProperty.call(message, "Rpc"))
            writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.Rpc);
          if (message.Ws != null && Object.hasOwnProperty.call(message, "Ws"))
            writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.Ws);
          if (
            message.signer != null &&
            Object.hasOwnProperty.call(message, "signer")
          )
            writer.uint32(/* id 4, wireType 2 =*/ 34).bytes(message.signer);
          return writer;
        };

        /**
         * Encodes the specified MsgCreateEndpoint message, length delimited. Does not implicitly {@link hermes.chainlist.v1beta1.MsgCreateEndpoint.verify|verify} messages.
         * @function encodeDelimited
         * @memberof hermes.chainlist.v1beta1.MsgCreateEndpoint
         * @static
         * @param {hermes.chainlist.v1beta1.IMsgCreateEndpoint} message MsgCreateEndpoint message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MsgCreateEndpoint.encodeDelimited = function encodeDelimited(
          message,
          writer
        ) {
          return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MsgCreateEndpoint message from the specified reader or buffer.
         * @function decode
         * @memberof hermes.chainlist.v1beta1.MsgCreateEndpoint
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {hermes.chainlist.v1beta1.MsgCreateEndpoint} MsgCreateEndpoint
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MsgCreateEndpoint.decode = function decode(reader, length) {
          if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
          var end = length === undefined ? reader.len : reader.pos + length,
            message = new $root.hermes.chainlist.v1beta1.MsgCreateEndpoint();
          while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
              case 1: {
                message.Chain = $root.hermes.chainlist.v1beta1.Chain.decode(
                  reader,
                  reader.uint32()
                );
                break;
              }
              case 2: {
                message.Rpc = reader.string();
                break;
              }
              case 3: {
                message.Ws = reader.string();
                break;
              }
              case 4: {
                message.signer = reader.bytes();
                break;
              }
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        };

        /**
         * Decodes a MsgCreateEndpoint message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof hermes.chainlist.v1beta1.MsgCreateEndpoint
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {hermes.chainlist.v1beta1.MsgCreateEndpoint} MsgCreateEndpoint
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MsgCreateEndpoint.decodeDelimited = function decodeDelimited(reader) {
          if (!(reader instanceof $Reader)) reader = new $Reader(reader);
          return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MsgCreateEndpoint message.
         * @function verify
         * @memberof hermes.chainlist.v1beta1.MsgCreateEndpoint
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MsgCreateEndpoint.verify = function verify(message) {
          if (typeof message !== "object" || message === null)
            return "object expected";
          if (message.Chain != null && message.hasOwnProperty("Chain")) {
            var error = $root.hermes.chainlist.v1beta1.Chain.verify(
              message.Chain
            );
            if (error) return "Chain." + error;
          }
          if (message.Rpc != null && message.hasOwnProperty("Rpc"))
            if (!$util.isString(message.Rpc)) return "Rpc: string expected";
          if (message.Ws != null && message.hasOwnProperty("Ws"))
            if (!$util.isString(message.Ws)) return "Ws: string expected";
          if (message.signer != null && message.hasOwnProperty("signer"))
            if (
              !(
                (message.signer && typeof message.signer.length === "number") ||
                $util.isString(message.signer)
              )
            )
              return "signer: buffer expected";
          return null;
        };

        /**
         * Creates a MsgCreateEndpoint message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof hermes.chainlist.v1beta1.MsgCreateEndpoint
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {hermes.chainlist.v1beta1.MsgCreateEndpoint} MsgCreateEndpoint
         */
        MsgCreateEndpoint.fromObject = function fromObject(object) {
          if (
            object instanceof $root.hermes.chainlist.v1beta1.MsgCreateEndpoint
          )
            return object;
          var message = new $root.hermes.chainlist.v1beta1.MsgCreateEndpoint();
          if (object.Chain != null) {
            if (typeof object.Chain !== "object")
              throw TypeError(
                ".hermes.chainlist.v1beta1.MsgCreateEndpoint.Chain: object expected"
              );
            message.Chain = $root.hermes.chainlist.v1beta1.Chain.fromObject(
              object.Chain
            );
          }
          if (object.Rpc != null) message.Rpc = String(object.Rpc);
          if (object.Ws != null) message.Ws = String(object.Ws);
          if (object.signer != null)
            if (typeof object.signer === "string")
              $util.base64.decode(
                object.signer,
                (message.signer = $util.newBuffer(
                  $util.base64.length(object.signer)
                )),
                0
              );
            else if (object.signer.length >= 0) message.signer = object.signer;
          return message;
        };

        /**
         * Creates a plain object from a MsgCreateEndpoint message. Also converts values to other types if specified.
         * @function toObject
         * @memberof hermes.chainlist.v1beta1.MsgCreateEndpoint
         * @static
         * @param {hermes.chainlist.v1beta1.MsgCreateEndpoint} message MsgCreateEndpoint
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MsgCreateEndpoint.toObject = function toObject(message, options) {
          if (!options) options = {};
          var object = {};
          if (options.defaults) {
            object.Chain = null;
            object.Rpc = "";
            object.Ws = "";
            if (options.bytes === String) object.signer = "";
            else {
              object.signer = [];
              if (options.bytes !== Array)
                object.signer = $util.newBuffer(object.signer);
            }
          }
          if (message.Chain != null && message.hasOwnProperty("Chain"))
            object.Chain = $root.hermes.chainlist.v1beta1.Chain.toObject(
              message.Chain,
              options
            );
          if (message.Rpc != null && message.hasOwnProperty("Rpc"))
            object.Rpc = message.Rpc;
          if (message.Ws != null && message.hasOwnProperty("Ws"))
            object.Ws = message.Ws;
          if (message.signer != null && message.hasOwnProperty("signer"))
            object.signer =
              options.bytes === String
                ? $util.base64.encode(message.signer, 0, message.signer.length)
                : options.bytes === Array
                ? Array.prototype.slice.call(message.signer)
                : message.signer;
          return object;
        };

        /**
         * Converts this MsgCreateEndpoint to JSON.
         * @function toJSON
         * @memberof hermes.chainlist.v1beta1.MsgCreateEndpoint
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MsgCreateEndpoint.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for MsgCreateEndpoint
         * @function getTypeUrl
         * @memberof hermes.chainlist.v1beta1.MsgCreateEndpoint
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        MsgCreateEndpoint.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
          if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
          }
          return typeUrlPrefix + "/hermes.chainlist.v1beta1.MsgCreateEndpoint";
        };

        return MsgCreateEndpoint;
      })();

      v1beta1.MsgCreateEndpointResponse = (function () {
        /**
         * Properties of a MsgCreateEndpointResponse.
         * @memberof hermes.chainlist.v1beta1
         * @interface IMsgCreateEndpointResponse
         */

        /**
         * Constructs a new MsgCreateEndpointResponse.
         * @memberof hermes.chainlist.v1beta1
         * @classdesc Represents a MsgCreateEndpointResponse.
         * @implements IMsgCreateEndpointResponse
         * @constructor
         * @param {hermes.chainlist.v1beta1.IMsgCreateEndpointResponse=} [properties] Properties to set
         */
        function MsgCreateEndpointResponse(properties) {
          if (properties)
            for (
              var keys = Object.keys(properties), i = 0;
              i < keys.length;
              ++i
            )
              if (properties[keys[i]] != null)
                this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new MsgCreateEndpointResponse instance using the specified properties.
         * @function create
         * @memberof hermes.chainlist.v1beta1.MsgCreateEndpointResponse
         * @static
         * @param {hermes.chainlist.v1beta1.IMsgCreateEndpointResponse=} [properties] Properties to set
         * @returns {hermes.chainlist.v1beta1.MsgCreateEndpointResponse} MsgCreateEndpointResponse instance
         */
        MsgCreateEndpointResponse.create = function create(properties) {
          return new MsgCreateEndpointResponse(properties);
        };

        /**
         * Encodes the specified MsgCreateEndpointResponse message. Does not implicitly {@link hermes.chainlist.v1beta1.MsgCreateEndpointResponse.verify|verify} messages.
         * @function encode
         * @memberof hermes.chainlist.v1beta1.MsgCreateEndpointResponse
         * @static
         * @param {hermes.chainlist.v1beta1.IMsgCreateEndpointResponse} message MsgCreateEndpointResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MsgCreateEndpointResponse.encode = function encode(message, writer) {
          if (!writer) writer = $Writer.create();
          return writer;
        };

        /**
         * Encodes the specified MsgCreateEndpointResponse message, length delimited. Does not implicitly {@link hermes.chainlist.v1beta1.MsgCreateEndpointResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof hermes.chainlist.v1beta1.MsgCreateEndpointResponse
         * @static
         * @param {hermes.chainlist.v1beta1.IMsgCreateEndpointResponse} message MsgCreateEndpointResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MsgCreateEndpointResponse.encodeDelimited = function encodeDelimited(
          message,
          writer
        ) {
          return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MsgCreateEndpointResponse message from the specified reader or buffer.
         * @function decode
         * @memberof hermes.chainlist.v1beta1.MsgCreateEndpointResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {hermes.chainlist.v1beta1.MsgCreateEndpointResponse} MsgCreateEndpointResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MsgCreateEndpointResponse.decode = function decode(reader, length) {
          if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
          var end = length === undefined ? reader.len : reader.pos + length,
            message =
              new $root.hermes.chainlist.v1beta1.MsgCreateEndpointResponse();
          while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        };

        /**
         * Decodes a MsgCreateEndpointResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof hermes.chainlist.v1beta1.MsgCreateEndpointResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {hermes.chainlist.v1beta1.MsgCreateEndpointResponse} MsgCreateEndpointResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MsgCreateEndpointResponse.decodeDelimited = function decodeDelimited(
          reader
        ) {
          if (!(reader instanceof $Reader)) reader = new $Reader(reader);
          return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MsgCreateEndpointResponse message.
         * @function verify
         * @memberof hermes.chainlist.v1beta1.MsgCreateEndpointResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MsgCreateEndpointResponse.verify = function verify(message) {
          if (typeof message !== "object" || message === null)
            return "object expected";
          return null;
        };

        /**
         * Creates a MsgCreateEndpointResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof hermes.chainlist.v1beta1.MsgCreateEndpointResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {hermes.chainlist.v1beta1.MsgCreateEndpointResponse} MsgCreateEndpointResponse
         */
        MsgCreateEndpointResponse.fromObject = function fromObject(object) {
          if (
            object instanceof
            $root.hermes.chainlist.v1beta1.MsgCreateEndpointResponse
          )
            return object;
          return new $root.hermes.chainlist.v1beta1.MsgCreateEndpointResponse();
        };

        /**
         * Creates a plain object from a MsgCreateEndpointResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof hermes.chainlist.v1beta1.MsgCreateEndpointResponse
         * @static
         * @param {hermes.chainlist.v1beta1.MsgCreateEndpointResponse} message MsgCreateEndpointResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MsgCreateEndpointResponse.toObject = function toObject() {
          return {};
        };

        /**
         * Converts this MsgCreateEndpointResponse to JSON.
         * @function toJSON
         * @memberof hermes.chainlist.v1beta1.MsgCreateEndpointResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MsgCreateEndpointResponse.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for MsgCreateEndpointResponse
         * @function getTypeUrl
         * @memberof hermes.chainlist.v1beta1.MsgCreateEndpointResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        MsgCreateEndpointResponse.getTypeUrl = function getTypeUrl(
          typeUrlPrefix
        ) {
          if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
          }
          return (
            typeUrlPrefix +
            "/hermes.chainlist.v1beta1.MsgCreateEndpointResponse"
          );
        };

        return MsgCreateEndpointResponse;
      })();

      v1beta1.MsgCreatePairingList = (function () {
        /**
         * Properties of a MsgCreatePairingList.
         * @memberof hermes.chainlist.v1beta1
         * @interface IMsgCreatePairingList
         * @property {Array.<hermes.chainlist.v1beta1.IChainPairingList>|null} [ChainsPL] MsgCreatePairingList ChainsPL
         * @property {Uint8Array|null} [signer] MsgCreatePairingList signer
         */

        /**
         * Constructs a new MsgCreatePairingList.
         * @memberof hermes.chainlist.v1beta1
         * @classdesc Represents a MsgCreatePairingList.
         * @implements IMsgCreatePairingList
         * @constructor
         * @param {hermes.chainlist.v1beta1.IMsgCreatePairingList=} [properties] Properties to set
         */
        function MsgCreatePairingList(properties) {
          this.ChainsPL = [];
          if (properties)
            for (
              var keys = Object.keys(properties), i = 0;
              i < keys.length;
              ++i
            )
              if (properties[keys[i]] != null)
                this[keys[i]] = properties[keys[i]];
        }

        /**
         * MsgCreatePairingList ChainsPL.
         * @member {Array.<hermes.chainlist.v1beta1.IChainPairingList>} ChainsPL
         * @memberof hermes.chainlist.v1beta1.MsgCreatePairingList
         * @instance
         */
        MsgCreatePairingList.prototype.ChainsPL = $util.emptyArray;

        /**
         * MsgCreatePairingList signer.
         * @member {Uint8Array} signer
         * @memberof hermes.chainlist.v1beta1.MsgCreatePairingList
         * @instance
         */
        MsgCreatePairingList.prototype.signer = $util.newBuffer([]);

        /**
         * Creates a new MsgCreatePairingList instance using the specified properties.
         * @function create
         * @memberof hermes.chainlist.v1beta1.MsgCreatePairingList
         * @static
         * @param {hermes.chainlist.v1beta1.IMsgCreatePairingList=} [properties] Properties to set
         * @returns {hermes.chainlist.v1beta1.MsgCreatePairingList} MsgCreatePairingList instance
         */
        MsgCreatePairingList.create = function create(properties) {
          return new MsgCreatePairingList(properties);
        };

        /**
         * Encodes the specified MsgCreatePairingList message. Does not implicitly {@link hermes.chainlist.v1beta1.MsgCreatePairingList.verify|verify} messages.
         * @function encode
         * @memberof hermes.chainlist.v1beta1.MsgCreatePairingList
         * @static
         * @param {hermes.chainlist.v1beta1.IMsgCreatePairingList} message MsgCreatePairingList message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MsgCreatePairingList.encode = function encode(message, writer) {
          if (!writer) writer = $Writer.create();
          if (message.ChainsPL != null && message.ChainsPL.length)
            for (var i = 0; i < message.ChainsPL.length; ++i)
              $root.hermes.chainlist.v1beta1.ChainPairingList.encode(
                message.ChainsPL[i],
                writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
              ).ldelim();
          if (
            message.signer != null &&
            Object.hasOwnProperty.call(message, "signer")
          )
            writer.uint32(/* id 2, wireType 2 =*/ 18).bytes(message.signer);
          return writer;
        };

        /**
         * Encodes the specified MsgCreatePairingList message, length delimited. Does not implicitly {@link hermes.chainlist.v1beta1.MsgCreatePairingList.verify|verify} messages.
         * @function encodeDelimited
         * @memberof hermes.chainlist.v1beta1.MsgCreatePairingList
         * @static
         * @param {hermes.chainlist.v1beta1.IMsgCreatePairingList} message MsgCreatePairingList message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MsgCreatePairingList.encodeDelimited = function encodeDelimited(
          message,
          writer
        ) {
          return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MsgCreatePairingList message from the specified reader or buffer.
         * @function decode
         * @memberof hermes.chainlist.v1beta1.MsgCreatePairingList
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {hermes.chainlist.v1beta1.MsgCreatePairingList} MsgCreatePairingList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MsgCreatePairingList.decode = function decode(reader, length) {
          if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
          var end = length === undefined ? reader.len : reader.pos + length,
            message = new $root.hermes.chainlist.v1beta1.MsgCreatePairingList();
          while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
              case 1: {
                if (!(message.ChainsPL && message.ChainsPL.length))
                  message.ChainsPL = [];
                message.ChainsPL.push(
                  $root.hermes.chainlist.v1beta1.ChainPairingList.decode(
                    reader,
                    reader.uint32()
                  )
                );
                break;
              }
              case 2: {
                message.signer = reader.bytes();
                break;
              }
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        };

        /**
         * Decodes a MsgCreatePairingList message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof hermes.chainlist.v1beta1.MsgCreatePairingList
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {hermes.chainlist.v1beta1.MsgCreatePairingList} MsgCreatePairingList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MsgCreatePairingList.decodeDelimited = function decodeDelimited(
          reader
        ) {
          if (!(reader instanceof $Reader)) reader = new $Reader(reader);
          return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MsgCreatePairingList message.
         * @function verify
         * @memberof hermes.chainlist.v1beta1.MsgCreatePairingList
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MsgCreatePairingList.verify = function verify(message) {
          if (typeof message !== "object" || message === null)
            return "object expected";
          if (message.ChainsPL != null && message.hasOwnProperty("ChainsPL")) {
            if (!Array.isArray(message.ChainsPL))
              return "ChainsPL: array expected";
            for (var i = 0; i < message.ChainsPL.length; ++i) {
              var error =
                $root.hermes.chainlist.v1beta1.ChainPairingList.verify(
                  message.ChainsPL[i]
                );
              if (error) return "ChainsPL." + error;
            }
          }
          if (message.signer != null && message.hasOwnProperty("signer"))
            if (
              !(
                (message.signer && typeof message.signer.length === "number") ||
                $util.isString(message.signer)
              )
            )
              return "signer: buffer expected";
          return null;
        };

        /**
         * Creates a MsgCreatePairingList message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof hermes.chainlist.v1beta1.MsgCreatePairingList
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {hermes.chainlist.v1beta1.MsgCreatePairingList} MsgCreatePairingList
         */
        MsgCreatePairingList.fromObject = function fromObject(object) {
          if (
            object instanceof
            $root.hermes.chainlist.v1beta1.MsgCreatePairingList
          )
            return object;
          var message =
            new $root.hermes.chainlist.v1beta1.MsgCreatePairingList();
          if (object.ChainsPL) {
            if (!Array.isArray(object.ChainsPL))
              throw TypeError(
                ".hermes.chainlist.v1beta1.MsgCreatePairingList.ChainsPL: array expected"
              );
            message.ChainsPL = [];
            for (var i = 0; i < object.ChainsPL.length; ++i) {
              if (typeof object.ChainsPL[i] !== "object")
                throw TypeError(
                  ".hermes.chainlist.v1beta1.MsgCreatePairingList.ChainsPL: object expected"
                );
              message.ChainsPL[i] =
                $root.hermes.chainlist.v1beta1.ChainPairingList.fromObject(
                  object.ChainsPL[i]
                );
            }
          }
          if (object.signer != null)
            if (typeof object.signer === "string")
              $util.base64.decode(
                object.signer,
                (message.signer = $util.newBuffer(
                  $util.base64.length(object.signer)
                )),
                0
              );
            else if (object.signer.length >= 0) message.signer = object.signer;
          return message;
        };

        /**
         * Creates a plain object from a MsgCreatePairingList message. Also converts values to other types if specified.
         * @function toObject
         * @memberof hermes.chainlist.v1beta1.MsgCreatePairingList
         * @static
         * @param {hermes.chainlist.v1beta1.MsgCreatePairingList} message MsgCreatePairingList
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MsgCreatePairingList.toObject = function toObject(message, options) {
          if (!options) options = {};
          var object = {};
          if (options.arrays || options.defaults) object.ChainsPL = [];
          if (options.defaults)
            if (options.bytes === String) object.signer = "";
            else {
              object.signer = [];
              if (options.bytes !== Array)
                object.signer = $util.newBuffer(object.signer);
            }
          if (message.ChainsPL && message.ChainsPL.length) {
            object.ChainsPL = [];
            for (var j = 0; j < message.ChainsPL.length; ++j)
              object.ChainsPL[j] =
                $root.hermes.chainlist.v1beta1.ChainPairingList.toObject(
                  message.ChainsPL[j],
                  options
                );
          }
          if (message.signer != null && message.hasOwnProperty("signer"))
            object.signer =
              options.bytes === String
                ? $util.base64.encode(message.signer, 0, message.signer.length)
                : options.bytes === Array
                ? Array.prototype.slice.call(message.signer)
                : message.signer;
          return object;
        };

        /**
         * Converts this MsgCreatePairingList to JSON.
         * @function toJSON
         * @memberof hermes.chainlist.v1beta1.MsgCreatePairingList
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MsgCreatePairingList.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for MsgCreatePairingList
         * @function getTypeUrl
         * @memberof hermes.chainlist.v1beta1.MsgCreatePairingList
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        MsgCreatePairingList.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
          if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
          }
          return (
            typeUrlPrefix + "/hermes.chainlist.v1beta1.MsgCreatePairingList"
          );
        };

        return MsgCreatePairingList;
      })();

      v1beta1.MsgInitializePairingList = (function () {
        /**
         * Properties of a MsgInitializePairingList.
         * @memberof hermes.chainlist.v1beta1
         * @interface IMsgInitializePairingList
         * @property {Array.<hermes.chainlist.v1beta1.IChainPairingList>|null} [ChainsPL] MsgInitializePairingList ChainsPL
         * @property {Uint8Array|null} [signer] MsgInitializePairingList signer
         */

        /**
         * Constructs a new MsgInitializePairingList.
         * @memberof hermes.chainlist.v1beta1
         * @classdesc Represents a MsgInitializePairingList.
         * @implements IMsgInitializePairingList
         * @constructor
         * @param {hermes.chainlist.v1beta1.IMsgInitializePairingList=} [properties] Properties to set
         */
        function MsgInitializePairingList(properties) {
          this.ChainsPL = [];
          if (properties)
            for (
              var keys = Object.keys(properties), i = 0;
              i < keys.length;
              ++i
            )
              if (properties[keys[i]] != null)
                this[keys[i]] = properties[keys[i]];
        }

        /**
         * MsgInitializePairingList ChainsPL.
         * @member {Array.<hermes.chainlist.v1beta1.IChainPairingList>} ChainsPL
         * @memberof hermes.chainlist.v1beta1.MsgInitializePairingList
         * @instance
         */
        MsgInitializePairingList.prototype.ChainsPL = $util.emptyArray;

        /**
         * MsgInitializePairingList signer.
         * @member {Uint8Array} signer
         * @memberof hermes.chainlist.v1beta1.MsgInitializePairingList
         * @instance
         */
        MsgInitializePairingList.prototype.signer = $util.newBuffer([]);

        /**
         * Creates a new MsgInitializePairingList instance using the specified properties.
         * @function create
         * @memberof hermes.chainlist.v1beta1.MsgInitializePairingList
         * @static
         * @param {hermes.chainlist.v1beta1.IMsgInitializePairingList=} [properties] Properties to set
         * @returns {hermes.chainlist.v1beta1.MsgInitializePairingList} MsgInitializePairingList instance
         */
        MsgInitializePairingList.create = function create(properties) {
          return new MsgInitializePairingList(properties);
        };

        /**
         * Encodes the specified MsgInitializePairingList message. Does not implicitly {@link hermes.chainlist.v1beta1.MsgInitializePairingList.verify|verify} messages.
         * @function encode
         * @memberof hermes.chainlist.v1beta1.MsgInitializePairingList
         * @static
         * @param {hermes.chainlist.v1beta1.IMsgInitializePairingList} message MsgInitializePairingList message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MsgInitializePairingList.encode = function encode(message, writer) {
          if (!writer) writer = $Writer.create();
          if (message.ChainsPL != null && message.ChainsPL.length)
            for (var i = 0; i < message.ChainsPL.length; ++i)
              $root.hermes.chainlist.v1beta1.ChainPairingList.encode(
                message.ChainsPL[i],
                writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
              ).ldelim();
          if (
            message.signer != null &&
            Object.hasOwnProperty.call(message, "signer")
          )
            writer.uint32(/* id 2, wireType 2 =*/ 18).bytes(message.signer);
          return writer;
        };

        /**
         * Encodes the specified MsgInitializePairingList message, length delimited. Does not implicitly {@link hermes.chainlist.v1beta1.MsgInitializePairingList.verify|verify} messages.
         * @function encodeDelimited
         * @memberof hermes.chainlist.v1beta1.MsgInitializePairingList
         * @static
         * @param {hermes.chainlist.v1beta1.IMsgInitializePairingList} message MsgInitializePairingList message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MsgInitializePairingList.encodeDelimited = function encodeDelimited(
          message,
          writer
        ) {
          return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MsgInitializePairingList message from the specified reader or buffer.
         * @function decode
         * @memberof hermes.chainlist.v1beta1.MsgInitializePairingList
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {hermes.chainlist.v1beta1.MsgInitializePairingList} MsgInitializePairingList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MsgInitializePairingList.decode = function decode(reader, length) {
          if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
          var end = length === undefined ? reader.len : reader.pos + length,
            message =
              new $root.hermes.chainlist.v1beta1.MsgInitializePairingList();
          while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
              case 1: {
                if (!(message.ChainsPL && message.ChainsPL.length))
                  message.ChainsPL = [];
                message.ChainsPL.push(
                  $root.hermes.chainlist.v1beta1.ChainPairingList.decode(
                    reader,
                    reader.uint32()
                  )
                );
                break;
              }
              case 2: {
                message.signer = reader.bytes();
                break;
              }
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        };

        /**
         * Decodes a MsgInitializePairingList message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof hermes.chainlist.v1beta1.MsgInitializePairingList
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {hermes.chainlist.v1beta1.MsgInitializePairingList} MsgInitializePairingList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MsgInitializePairingList.decodeDelimited = function decodeDelimited(
          reader
        ) {
          if (!(reader instanceof $Reader)) reader = new $Reader(reader);
          return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MsgInitializePairingList message.
         * @function verify
         * @memberof hermes.chainlist.v1beta1.MsgInitializePairingList
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MsgInitializePairingList.verify = function verify(message) {
          if (typeof message !== "object" || message === null)
            return "object expected";
          if (message.ChainsPL != null && message.hasOwnProperty("ChainsPL")) {
            if (!Array.isArray(message.ChainsPL))
              return "ChainsPL: array expected";
            for (var i = 0; i < message.ChainsPL.length; ++i) {
              var error =
                $root.hermes.chainlist.v1beta1.ChainPairingList.verify(
                  message.ChainsPL[i]
                );
              if (error) return "ChainsPL." + error;
            }
          }
          if (message.signer != null && message.hasOwnProperty("signer"))
            if (
              !(
                (message.signer && typeof message.signer.length === "number") ||
                $util.isString(message.signer)
              )
            )
              return "signer: buffer expected";
          return null;
        };

        /**
         * Creates a MsgInitializePairingList message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof hermes.chainlist.v1beta1.MsgInitializePairingList
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {hermes.chainlist.v1beta1.MsgInitializePairingList} MsgInitializePairingList
         */
        MsgInitializePairingList.fromObject = function fromObject(object) {
          if (
            object instanceof
            $root.hermes.chainlist.v1beta1.MsgInitializePairingList
          )
            return object;
          var message =
            new $root.hermes.chainlist.v1beta1.MsgInitializePairingList();
          if (object.ChainsPL) {
            if (!Array.isArray(object.ChainsPL))
              throw TypeError(
                ".hermes.chainlist.v1beta1.MsgInitializePairingList.ChainsPL: array expected"
              );
            message.ChainsPL = [];
            for (var i = 0; i < object.ChainsPL.length; ++i) {
              if (typeof object.ChainsPL[i] !== "object")
                throw TypeError(
                  ".hermes.chainlist.v1beta1.MsgInitializePairingList.ChainsPL: object expected"
                );
              message.ChainsPL[i] =
                $root.hermes.chainlist.v1beta1.ChainPairingList.fromObject(
                  object.ChainsPL[i]
                );
            }
          }
          if (object.signer != null)
            if (typeof object.signer === "string")
              $util.base64.decode(
                object.signer,
                (message.signer = $util.newBuffer(
                  $util.base64.length(object.signer)
                )),
                0
              );
            else if (object.signer.length >= 0) message.signer = object.signer;
          return message;
        };

        /**
         * Creates a plain object from a MsgInitializePairingList message. Also converts values to other types if specified.
         * @function toObject
         * @memberof hermes.chainlist.v1beta1.MsgInitializePairingList
         * @static
         * @param {hermes.chainlist.v1beta1.MsgInitializePairingList} message MsgInitializePairingList
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MsgInitializePairingList.toObject = function toObject(
          message,
          options
        ) {
          if (!options) options = {};
          var object = {};
          if (options.arrays || options.defaults) object.ChainsPL = [];
          if (options.defaults)
            if (options.bytes === String) object.signer = "";
            else {
              object.signer = [];
              if (options.bytes !== Array)
                object.signer = $util.newBuffer(object.signer);
            }
          if (message.ChainsPL && message.ChainsPL.length) {
            object.ChainsPL = [];
            for (var j = 0; j < message.ChainsPL.length; ++j)
              object.ChainsPL[j] =
                $root.hermes.chainlist.v1beta1.ChainPairingList.toObject(
                  message.ChainsPL[j],
                  options
                );
          }
          if (message.signer != null && message.hasOwnProperty("signer"))
            object.signer =
              options.bytes === String
                ? $util.base64.encode(message.signer, 0, message.signer.length)
                : options.bytes === Array
                ? Array.prototype.slice.call(message.signer)
                : message.signer;
          return object;
        };

        /**
         * Converts this MsgInitializePairingList to JSON.
         * @function toJSON
         * @memberof hermes.chainlist.v1beta1.MsgInitializePairingList
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MsgInitializePairingList.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for MsgInitializePairingList
         * @function getTypeUrl
         * @memberof hermes.chainlist.v1beta1.MsgInitializePairingList
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        MsgInitializePairingList.getTypeUrl = function getTypeUrl(
          typeUrlPrefix
        ) {
          if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
          }
          return (
            typeUrlPrefix + "/hermes.chainlist.v1beta1.MsgInitializePairingList"
          );
        };

        return MsgInitializePairingList;
      })();

      v1beta1.ChainPairingList = (function () {
        /**
         * Properties of a ChainPairingList.
         * @memberof hermes.chainlist.v1beta1
         * @interface IChainPairingList
         * @property {hermes.chainlist.v1beta1.IChain|null} [Chain] ChainPairingList Chain
         * @property {Array.<string>|null} [OperatorList] ChainPairingList OperatorList
         * @property {Array.<string>|null} [CrawlerList] ChainPairingList CrawlerList
         */

        /**
         * Constructs a new ChainPairingList.
         * @memberof hermes.chainlist.v1beta1
         * @classdesc Represents a ChainPairingList.
         * @implements IChainPairingList
         * @constructor
         * @param {hermes.chainlist.v1beta1.IChainPairingList=} [properties] Properties to set
         */
        function ChainPairingList(properties) {
          this.OperatorList = [];
          this.CrawlerList = [];
          if (properties)
            for (
              var keys = Object.keys(properties), i = 0;
              i < keys.length;
              ++i
            )
              if (properties[keys[i]] != null)
                this[keys[i]] = properties[keys[i]];
        }

        /**
         * ChainPairingList Chain.
         * @member {hermes.chainlist.v1beta1.IChain|null|undefined} Chain
         * @memberof hermes.chainlist.v1beta1.ChainPairingList
         * @instance
         */
        ChainPairingList.prototype.Chain = null;

        /**
         * ChainPairingList OperatorList.
         * @member {Array.<string>} OperatorList
         * @memberof hermes.chainlist.v1beta1.ChainPairingList
         * @instance
         */
        ChainPairingList.prototype.OperatorList = $util.emptyArray;

        /**
         * ChainPairingList CrawlerList.
         * @member {Array.<string>} CrawlerList
         * @memberof hermes.chainlist.v1beta1.ChainPairingList
         * @instance
         */
        ChainPairingList.prototype.CrawlerList = $util.emptyArray;

        /**
         * Creates a new ChainPairingList instance using the specified properties.
         * @function create
         * @memberof hermes.chainlist.v1beta1.ChainPairingList
         * @static
         * @param {hermes.chainlist.v1beta1.IChainPairingList=} [properties] Properties to set
         * @returns {hermes.chainlist.v1beta1.ChainPairingList} ChainPairingList instance
         */
        ChainPairingList.create = function create(properties) {
          return new ChainPairingList(properties);
        };

        /**
         * Encodes the specified ChainPairingList message. Does not implicitly {@link hermes.chainlist.v1beta1.ChainPairingList.verify|verify} messages.
         * @function encode
         * @memberof hermes.chainlist.v1beta1.ChainPairingList
         * @static
         * @param {hermes.chainlist.v1beta1.IChainPairingList} message ChainPairingList message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ChainPairingList.encode = function encode(message, writer) {
          if (!writer) writer = $Writer.create();
          if (
            message.Chain != null &&
            Object.hasOwnProperty.call(message, "Chain")
          )
            $root.hermes.chainlist.v1beta1.Chain.encode(
              message.Chain,
              writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
            ).ldelim();
          if (message.OperatorList != null && message.OperatorList.length)
            for (var i = 0; i < message.OperatorList.length; ++i)
              writer
                .uint32(/* id 2, wireType 2 =*/ 18)
                .string(message.OperatorList[i]);
          if (message.CrawlerList != null && message.CrawlerList.length)
            for (var i = 0; i < message.CrawlerList.length; ++i)
              writer
                .uint32(/* id 3, wireType 2 =*/ 26)
                .string(message.CrawlerList[i]);
          return writer;
        };

        /**
         * Encodes the specified ChainPairingList message, length delimited. Does not implicitly {@link hermes.chainlist.v1beta1.ChainPairingList.verify|verify} messages.
         * @function encodeDelimited
         * @memberof hermes.chainlist.v1beta1.ChainPairingList
         * @static
         * @param {hermes.chainlist.v1beta1.IChainPairingList} message ChainPairingList message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ChainPairingList.encodeDelimited = function encodeDelimited(
          message,
          writer
        ) {
          return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ChainPairingList message from the specified reader or buffer.
         * @function decode
         * @memberof hermes.chainlist.v1beta1.ChainPairingList
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {hermes.chainlist.v1beta1.ChainPairingList} ChainPairingList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ChainPairingList.decode = function decode(reader, length) {
          if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
          var end = length === undefined ? reader.len : reader.pos + length,
            message = new $root.hermes.chainlist.v1beta1.ChainPairingList();
          while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
              case 1: {
                message.Chain = $root.hermes.chainlist.v1beta1.Chain.decode(
                  reader,
                  reader.uint32()
                );
                break;
              }
              case 2: {
                if (!(message.OperatorList && message.OperatorList.length))
                  message.OperatorList = [];
                message.OperatorList.push(reader.string());
                break;
              }
              case 3: {
                if (!(message.CrawlerList && message.CrawlerList.length))
                  message.CrawlerList = [];
                message.CrawlerList.push(reader.string());
                break;
              }
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        };

        /**
         * Decodes a ChainPairingList message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof hermes.chainlist.v1beta1.ChainPairingList
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {hermes.chainlist.v1beta1.ChainPairingList} ChainPairingList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ChainPairingList.decodeDelimited = function decodeDelimited(reader) {
          if (!(reader instanceof $Reader)) reader = new $Reader(reader);
          return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ChainPairingList message.
         * @function verify
         * @memberof hermes.chainlist.v1beta1.ChainPairingList
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ChainPairingList.verify = function verify(message) {
          if (typeof message !== "object" || message === null)
            return "object expected";
          if (message.Chain != null && message.hasOwnProperty("Chain")) {
            var error = $root.hermes.chainlist.v1beta1.Chain.verify(
              message.Chain
            );
            if (error) return "Chain." + error;
          }
          if (
            message.OperatorList != null &&
            message.hasOwnProperty("OperatorList")
          ) {
            if (!Array.isArray(message.OperatorList))
              return "OperatorList: array expected";
            for (var i = 0; i < message.OperatorList.length; ++i)
              if (!$util.isString(message.OperatorList[i]))
                return "OperatorList: string[] expected";
          }
          if (
            message.CrawlerList != null &&
            message.hasOwnProperty("CrawlerList")
          ) {
            if (!Array.isArray(message.CrawlerList))
              return "CrawlerList: array expected";
            for (var i = 0; i < message.CrawlerList.length; ++i)
              if (!$util.isString(message.CrawlerList[i]))
                return "CrawlerList: string[] expected";
          }
          return null;
        };

        /**
         * Creates a ChainPairingList message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof hermes.chainlist.v1beta1.ChainPairingList
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {hermes.chainlist.v1beta1.ChainPairingList} ChainPairingList
         */
        ChainPairingList.fromObject = function fromObject(object) {
          if (object instanceof $root.hermes.chainlist.v1beta1.ChainPairingList)
            return object;
          var message = new $root.hermes.chainlist.v1beta1.ChainPairingList();
          if (object.Chain != null) {
            if (typeof object.Chain !== "object")
              throw TypeError(
                ".hermes.chainlist.v1beta1.ChainPairingList.Chain: object expected"
              );
            message.Chain = $root.hermes.chainlist.v1beta1.Chain.fromObject(
              object.Chain
            );
          }
          if (object.OperatorList) {
            if (!Array.isArray(object.OperatorList))
              throw TypeError(
                ".hermes.chainlist.v1beta1.ChainPairingList.OperatorList: array expected"
              );
            message.OperatorList = [];
            for (var i = 0; i < object.OperatorList.length; ++i)
              message.OperatorList[i] = String(object.OperatorList[i]);
          }
          if (object.CrawlerList) {
            if (!Array.isArray(object.CrawlerList))
              throw TypeError(
                ".hermes.chainlist.v1beta1.ChainPairingList.CrawlerList: array expected"
              );
            message.CrawlerList = [];
            for (var i = 0; i < object.CrawlerList.length; ++i)
              message.CrawlerList[i] = String(object.CrawlerList[i]);
          }
          return message;
        };

        /**
         * Creates a plain object from a ChainPairingList message. Also converts values to other types if specified.
         * @function toObject
         * @memberof hermes.chainlist.v1beta1.ChainPairingList
         * @static
         * @param {hermes.chainlist.v1beta1.ChainPairingList} message ChainPairingList
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ChainPairingList.toObject = function toObject(message, options) {
          if (!options) options = {};
          var object = {};
          if (options.arrays || options.defaults) {
            object.OperatorList = [];
            object.CrawlerList = [];
          }
          if (options.defaults) object.Chain = null;
          if (message.Chain != null && message.hasOwnProperty("Chain"))
            object.Chain = $root.hermes.chainlist.v1beta1.Chain.toObject(
              message.Chain,
              options
            );
          if (message.OperatorList && message.OperatorList.length) {
            object.OperatorList = [];
            for (var j = 0; j < message.OperatorList.length; ++j)
              object.OperatorList[j] = message.OperatorList[j];
          }
          if (message.CrawlerList && message.CrawlerList.length) {
            object.CrawlerList = [];
            for (var j = 0; j < message.CrawlerList.length; ++j)
              object.CrawlerList[j] = message.CrawlerList[j];
          }
          return object;
        };

        /**
         * Converts this ChainPairingList to JSON.
         * @function toJSON
         * @memberof hermes.chainlist.v1beta1.ChainPairingList
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ChainPairingList.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ChainPairingList
         * @function getTypeUrl
         * @memberof hermes.chainlist.v1beta1.ChainPairingList
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ChainPairingList.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
          if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
          }
          return typeUrlPrefix + "/hermes.chainlist.v1beta1.ChainPairingList";
        };

        return ChainPairingList;
      })();

      v1beta1.MsgCreatePairingListResponse = (function () {
        /**
         * Properties of a MsgCreatePairingListResponse.
         * @memberof hermes.chainlist.v1beta1
         * @interface IMsgCreatePairingListResponse
         */

        /**
         * Constructs a new MsgCreatePairingListResponse.
         * @memberof hermes.chainlist.v1beta1
         * @classdesc Represents a MsgCreatePairingListResponse.
         * @implements IMsgCreatePairingListResponse
         * @constructor
         * @param {hermes.chainlist.v1beta1.IMsgCreatePairingListResponse=} [properties] Properties to set
         */
        function MsgCreatePairingListResponse(properties) {
          if (properties)
            for (
              var keys = Object.keys(properties), i = 0;
              i < keys.length;
              ++i
            )
              if (properties[keys[i]] != null)
                this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new MsgCreatePairingListResponse instance using the specified properties.
         * @function create
         * @memberof hermes.chainlist.v1beta1.MsgCreatePairingListResponse
         * @static
         * @param {hermes.chainlist.v1beta1.IMsgCreatePairingListResponse=} [properties] Properties to set
         * @returns {hermes.chainlist.v1beta1.MsgCreatePairingListResponse} MsgCreatePairingListResponse instance
         */
        MsgCreatePairingListResponse.create = function create(properties) {
          return new MsgCreatePairingListResponse(properties);
        };

        /**
         * Encodes the specified MsgCreatePairingListResponse message. Does not implicitly {@link hermes.chainlist.v1beta1.MsgCreatePairingListResponse.verify|verify} messages.
         * @function encode
         * @memberof hermes.chainlist.v1beta1.MsgCreatePairingListResponse
         * @static
         * @param {hermes.chainlist.v1beta1.IMsgCreatePairingListResponse} message MsgCreatePairingListResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MsgCreatePairingListResponse.encode = function encode(message, writer) {
          if (!writer) writer = $Writer.create();
          return writer;
        };

        /**
         * Encodes the specified MsgCreatePairingListResponse message, length delimited. Does not implicitly {@link hermes.chainlist.v1beta1.MsgCreatePairingListResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof hermes.chainlist.v1beta1.MsgCreatePairingListResponse
         * @static
         * @param {hermes.chainlist.v1beta1.IMsgCreatePairingListResponse} message MsgCreatePairingListResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MsgCreatePairingListResponse.encodeDelimited = function encodeDelimited(
          message,
          writer
        ) {
          return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MsgCreatePairingListResponse message from the specified reader or buffer.
         * @function decode
         * @memberof hermes.chainlist.v1beta1.MsgCreatePairingListResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {hermes.chainlist.v1beta1.MsgCreatePairingListResponse} MsgCreatePairingListResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MsgCreatePairingListResponse.decode = function decode(reader, length) {
          if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
          var end = length === undefined ? reader.len : reader.pos + length,
            message =
              new $root.hermes.chainlist.v1beta1.MsgCreatePairingListResponse();
          while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        };

        /**
         * Decodes a MsgCreatePairingListResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof hermes.chainlist.v1beta1.MsgCreatePairingListResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {hermes.chainlist.v1beta1.MsgCreatePairingListResponse} MsgCreatePairingListResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MsgCreatePairingListResponse.decodeDelimited = function decodeDelimited(
          reader
        ) {
          if (!(reader instanceof $Reader)) reader = new $Reader(reader);
          return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MsgCreatePairingListResponse message.
         * @function verify
         * @memberof hermes.chainlist.v1beta1.MsgCreatePairingListResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MsgCreatePairingListResponse.verify = function verify(message) {
          if (typeof message !== "object" || message === null)
            return "object expected";
          return null;
        };

        /**
         * Creates a MsgCreatePairingListResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof hermes.chainlist.v1beta1.MsgCreatePairingListResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {hermes.chainlist.v1beta1.MsgCreatePairingListResponse} MsgCreatePairingListResponse
         */
        MsgCreatePairingListResponse.fromObject = function fromObject(object) {
          if (
            object instanceof
            $root.hermes.chainlist.v1beta1.MsgCreatePairingListResponse
          )
            return object;
          return new $root.hermes.chainlist.v1beta1.MsgCreatePairingListResponse();
        };

        /**
         * Creates a plain object from a MsgCreatePairingListResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof hermes.chainlist.v1beta1.MsgCreatePairingListResponse
         * @static
         * @param {hermes.chainlist.v1beta1.MsgCreatePairingListResponse} message MsgCreatePairingListResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MsgCreatePairingListResponse.toObject = function toObject() {
          return {};
        };

        /**
         * Converts this MsgCreatePairingListResponse to JSON.
         * @function toJSON
         * @memberof hermes.chainlist.v1beta1.MsgCreatePairingListResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MsgCreatePairingListResponse.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for MsgCreatePairingListResponse
         * @function getTypeUrl
         * @memberof hermes.chainlist.v1beta1.MsgCreatePairingListResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        MsgCreatePairingListResponse.getTypeUrl = function getTypeUrl(
          typeUrlPrefix
        ) {
          if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
          }
          return (
            typeUrlPrefix +
            "/hermes.chainlist.v1beta1.MsgCreatePairingListResponse"
          );
        };

        return MsgCreatePairingListResponse;
      })();

      v1beta1.MsgInitializePairingListResponse = (function () {
        /**
         * Properties of a MsgInitializePairingListResponse.
         * @memberof hermes.chainlist.v1beta1
         * @interface IMsgInitializePairingListResponse
         */

        /**
         * Constructs a new MsgInitializePairingListResponse.
         * @memberof hermes.chainlist.v1beta1
         * @classdesc Represents a MsgInitializePairingListResponse.
         * @implements IMsgInitializePairingListResponse
         * @constructor
         * @param {hermes.chainlist.v1beta1.IMsgInitializePairingListResponse=} [properties] Properties to set
         */
        function MsgInitializePairingListResponse(properties) {
          if (properties)
            for (
              var keys = Object.keys(properties), i = 0;
              i < keys.length;
              ++i
            )
              if (properties[keys[i]] != null)
                this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new MsgInitializePairingListResponse instance using the specified properties.
         * @function create
         * @memberof hermes.chainlist.v1beta1.MsgInitializePairingListResponse
         * @static
         * @param {hermes.chainlist.v1beta1.IMsgInitializePairingListResponse=} [properties] Properties to set
         * @returns {hermes.chainlist.v1beta1.MsgInitializePairingListResponse} MsgInitializePairingListResponse instance
         */
        MsgInitializePairingListResponse.create = function create(properties) {
          return new MsgInitializePairingListResponse(properties);
        };

        /**
         * Encodes the specified MsgInitializePairingListResponse message. Does not implicitly {@link hermes.chainlist.v1beta1.MsgInitializePairingListResponse.verify|verify} messages.
         * @function encode
         * @memberof hermes.chainlist.v1beta1.MsgInitializePairingListResponse
         * @static
         * @param {hermes.chainlist.v1beta1.IMsgInitializePairingListResponse} message MsgInitializePairingListResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MsgInitializePairingListResponse.encode = function encode(
          message,
          writer
        ) {
          if (!writer) writer = $Writer.create();
          return writer;
        };

        /**
         * Encodes the specified MsgInitializePairingListResponse message, length delimited. Does not implicitly {@link hermes.chainlist.v1beta1.MsgInitializePairingListResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof hermes.chainlist.v1beta1.MsgInitializePairingListResponse
         * @static
         * @param {hermes.chainlist.v1beta1.IMsgInitializePairingListResponse} message MsgInitializePairingListResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MsgInitializePairingListResponse.encodeDelimited =
          function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
          };

        /**
         * Decodes a MsgInitializePairingListResponse message from the specified reader or buffer.
         * @function decode
         * @memberof hermes.chainlist.v1beta1.MsgInitializePairingListResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {hermes.chainlist.v1beta1.MsgInitializePairingListResponse} MsgInitializePairingListResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MsgInitializePairingListResponse.decode = function decode(
          reader,
          length
        ) {
          if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
          var end = length === undefined ? reader.len : reader.pos + length,
            message =
              new $root.hermes.chainlist.v1beta1.MsgInitializePairingListResponse();
          while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        };

        /**
         * Decodes a MsgInitializePairingListResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof hermes.chainlist.v1beta1.MsgInitializePairingListResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {hermes.chainlist.v1beta1.MsgInitializePairingListResponse} MsgInitializePairingListResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MsgInitializePairingListResponse.decodeDelimited =
          function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
          };

        /**
         * Verifies a MsgInitializePairingListResponse message.
         * @function verify
         * @memberof hermes.chainlist.v1beta1.MsgInitializePairingListResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MsgInitializePairingListResponse.verify = function verify(message) {
          if (typeof message !== "object" || message === null)
            return "object expected";
          return null;
        };

        /**
         * Creates a MsgInitializePairingListResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof hermes.chainlist.v1beta1.MsgInitializePairingListResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {hermes.chainlist.v1beta1.MsgInitializePairingListResponse} MsgInitializePairingListResponse
         */
        MsgInitializePairingListResponse.fromObject = function fromObject(
          object
        ) {
          if (
            object instanceof
            $root.hermes.chainlist.v1beta1.MsgInitializePairingListResponse
          )
            return object;
          return new $root.hermes.chainlist.v1beta1.MsgInitializePairingListResponse();
        };

        /**
         * Creates a plain object from a MsgInitializePairingListResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof hermes.chainlist.v1beta1.MsgInitializePairingListResponse
         * @static
         * @param {hermes.chainlist.v1beta1.MsgInitializePairingListResponse} message MsgInitializePairingListResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MsgInitializePairingListResponse.toObject = function toObject() {
          return {};
        };

        /**
         * Converts this MsgInitializePairingListResponse to JSON.
         * @function toJSON
         * @memberof hermes.chainlist.v1beta1.MsgInitializePairingListResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MsgInitializePairingListResponse.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for MsgInitializePairingListResponse
         * @function getTypeUrl
         * @memberof hermes.chainlist.v1beta1.MsgInitializePairingListResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        MsgInitializePairingListResponse.getTypeUrl = function getTypeUrl(
          typeUrlPrefix
        ) {
          if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
          }
          return (
            typeUrlPrefix +
            "/hermes.chainlist.v1beta1.MsgInitializePairingListResponse"
          );
        };

        return MsgInitializePairingListResponse;
      })();

      v1beta1.ComputeUnits = (function () {
        /**
         * Properties of a ComputeUnits.
         * @memberof hermes.chainlist.v1beta1
         * @interface IComputeUnits
         * @property {number|Long|null} [blockunits] ComputeUnits blockunits
         * @property {number|Long|null} [transactionunits] ComputeUnits transactionunits
         */

        /**
         * Constructs a new ComputeUnits.
         * @memberof hermes.chainlist.v1beta1
         * @classdesc Represents a ComputeUnits.
         * @implements IComputeUnits
         * @constructor
         * @param {hermes.chainlist.v1beta1.IComputeUnits=} [properties] Properties to set
         */
        function ComputeUnits(properties) {
          if (properties)
            for (
              var keys = Object.keys(properties), i = 0;
              i < keys.length;
              ++i
            )
              if (properties[keys[i]] != null)
                this[keys[i]] = properties[keys[i]];
        }

        /**
         * ComputeUnits blockunits.
         * @member {number|Long} blockunits
         * @memberof hermes.chainlist.v1beta1.ComputeUnits
         * @instance
         */
        ComputeUnits.prototype.blockunits = $util.Long
          ? $util.Long.fromBits(0, 0, true)
          : 0;

        /**
         * ComputeUnits transactionunits.
         * @member {number|Long} transactionunits
         * @memberof hermes.chainlist.v1beta1.ComputeUnits
         * @instance
         */
        ComputeUnits.prototype.transactionunits = $util.Long
          ? $util.Long.fromBits(0, 0, true)
          : 0;

        /**
         * Creates a new ComputeUnits instance using the specified properties.
         * @function create
         * @memberof hermes.chainlist.v1beta1.ComputeUnits
         * @static
         * @param {hermes.chainlist.v1beta1.IComputeUnits=} [properties] Properties to set
         * @returns {hermes.chainlist.v1beta1.ComputeUnits} ComputeUnits instance
         */
        ComputeUnits.create = function create(properties) {
          return new ComputeUnits(properties);
        };

        /**
         * Encodes the specified ComputeUnits message. Does not implicitly {@link hermes.chainlist.v1beta1.ComputeUnits.verify|verify} messages.
         * @function encode
         * @memberof hermes.chainlist.v1beta1.ComputeUnits
         * @static
         * @param {hermes.chainlist.v1beta1.IComputeUnits} message ComputeUnits message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ComputeUnits.encode = function encode(message, writer) {
          if (!writer) writer = $Writer.create();
          if (
            message.blockunits != null &&
            Object.hasOwnProperty.call(message, "blockunits")
          )
            writer.uint32(/* id 1, wireType 0 =*/ 8).uint64(message.blockunits);
          if (
            message.transactionunits != null &&
            Object.hasOwnProperty.call(message, "transactionunits")
          )
            writer
              .uint32(/* id 2, wireType 0 =*/ 16)
              .uint64(message.transactionunits);
          return writer;
        };

        /**
         * Encodes the specified ComputeUnits message, length delimited. Does not implicitly {@link hermes.chainlist.v1beta1.ComputeUnits.verify|verify} messages.
         * @function encodeDelimited
         * @memberof hermes.chainlist.v1beta1.ComputeUnits
         * @static
         * @param {hermes.chainlist.v1beta1.IComputeUnits} message ComputeUnits message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ComputeUnits.encodeDelimited = function encodeDelimited(
          message,
          writer
        ) {
          return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ComputeUnits message from the specified reader or buffer.
         * @function decode
         * @memberof hermes.chainlist.v1beta1.ComputeUnits
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {hermes.chainlist.v1beta1.ComputeUnits} ComputeUnits
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ComputeUnits.decode = function decode(reader, length) {
          if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
          var end = length === undefined ? reader.len : reader.pos + length,
            message = new $root.hermes.chainlist.v1beta1.ComputeUnits();
          while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
              case 1: {
                message.blockunits = reader.uint64();
                break;
              }
              case 2: {
                message.transactionunits = reader.uint64();
                break;
              }
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        };

        /**
         * Decodes a ComputeUnits message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof hermes.chainlist.v1beta1.ComputeUnits
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {hermes.chainlist.v1beta1.ComputeUnits} ComputeUnits
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ComputeUnits.decodeDelimited = function decodeDelimited(reader) {
          if (!(reader instanceof $Reader)) reader = new $Reader(reader);
          return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ComputeUnits message.
         * @function verify
         * @memberof hermes.chainlist.v1beta1.ComputeUnits
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ComputeUnits.verify = function verify(message) {
          if (typeof message !== "object" || message === null)
            return "object expected";
          if (
            message.blockunits != null &&
            message.hasOwnProperty("blockunits")
          )
            if (
              !$util.isInteger(message.blockunits) &&
              !(
                message.blockunits &&
                $util.isInteger(message.blockunits.low) &&
                $util.isInteger(message.blockunits.high)
              )
            )
              return "blockunits: integer|Long expected";
          if (
            message.transactionunits != null &&
            message.hasOwnProperty("transactionunits")
          )
            if (
              !$util.isInteger(message.transactionunits) &&
              !(
                message.transactionunits &&
                $util.isInteger(message.transactionunits.low) &&
                $util.isInteger(message.transactionunits.high)
              )
            )
              return "transactionunits: integer|Long expected";
          return null;
        };

        /**
         * Creates a ComputeUnits message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof hermes.chainlist.v1beta1.ComputeUnits
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {hermes.chainlist.v1beta1.ComputeUnits} ComputeUnits
         */
        ComputeUnits.fromObject = function fromObject(object) {
          if (object instanceof $root.hermes.chainlist.v1beta1.ComputeUnits)
            return object;
          var message = new $root.hermes.chainlist.v1beta1.ComputeUnits();
          if (object.blockunits != null)
            if ($util.Long)
              (message.blockunits = $util.Long.fromValue(
                object.blockunits
              )).unsigned = true;
            else if (typeof object.blockunits === "string")
              message.blockunits = parseInt(object.blockunits, 10);
            else if (typeof object.blockunits === "number")
              message.blockunits = object.blockunits;
            else if (typeof object.blockunits === "object")
              message.blockunits = new $util.LongBits(
                object.blockunits.low >>> 0,
                object.blockunits.high >>> 0
              ).toNumber(true);
          if (object.transactionunits != null)
            if ($util.Long)
              (message.transactionunits = $util.Long.fromValue(
                object.transactionunits
              )).unsigned = true;
            else if (typeof object.transactionunits === "string")
              message.transactionunits = parseInt(object.transactionunits, 10);
            else if (typeof object.transactionunits === "number")
              message.transactionunits = object.transactionunits;
            else if (typeof object.transactionunits === "object")
              message.transactionunits = new $util.LongBits(
                object.transactionunits.low >>> 0,
                object.transactionunits.high >>> 0
              ).toNumber(true);
          return message;
        };

        /**
         * Creates a plain object from a ComputeUnits message. Also converts values to other types if specified.
         * @function toObject
         * @memberof hermes.chainlist.v1beta1.ComputeUnits
         * @static
         * @param {hermes.chainlist.v1beta1.ComputeUnits} message ComputeUnits
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ComputeUnits.toObject = function toObject(message, options) {
          if (!options) options = {};
          var object = {};
          if (options.defaults) {
            if ($util.Long) {
              var long = new $util.Long(0, 0, true);
              object.blockunits =
                options.longs === String
                  ? long.toString()
                  : options.longs === Number
                  ? long.toNumber()
                  : long;
            } else object.blockunits = options.longs === String ? "0" : 0;
            if ($util.Long) {
              var long = new $util.Long(0, 0, true);
              object.transactionunits =
                options.longs === String
                  ? long.toString()
                  : options.longs === Number
                  ? long.toNumber()
                  : long;
            } else object.transactionunits = options.longs === String ? "0" : 0;
          }
          if (
            message.blockunits != null &&
            message.hasOwnProperty("blockunits")
          )
            if (typeof message.blockunits === "number")
              object.blockunits =
                options.longs === String
                  ? String(message.blockunits)
                  : message.blockunits;
            else
              object.blockunits =
                options.longs === String
                  ? $util.Long.prototype.toString.call(message.blockunits)
                  : options.longs === Number
                  ? new $util.LongBits(
                      message.blockunits.low >>> 0,
                      message.blockunits.high >>> 0
                    ).toNumber(true)
                  : message.blockunits;
          if (
            message.transactionunits != null &&
            message.hasOwnProperty("transactionunits")
          )
            if (typeof message.transactionunits === "number")
              object.transactionunits =
                options.longs === String
                  ? String(message.transactionunits)
                  : message.transactionunits;
            else
              object.transactionunits =
                options.longs === String
                  ? $util.Long.prototype.toString.call(message.transactionunits)
                  : options.longs === Number
                  ? new $util.LongBits(
                      message.transactionunits.low >>> 0,
                      message.transactionunits.high >>> 0
                    ).toNumber(true)
                  : message.transactionunits;
          return object;
        };

        /**
         * Converts this ComputeUnits to JSON.
         * @function toJSON
         * @memberof hermes.chainlist.v1beta1.ComputeUnits
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ComputeUnits.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ComputeUnits
         * @function getTypeUrl
         * @memberof hermes.chainlist.v1beta1.ComputeUnits
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ComputeUnits.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
          if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
          }
          return typeUrlPrefix + "/hermes.chainlist.v1beta1.ComputeUnits";
        };

        return ComputeUnits;
      })();

      v1beta1.Chain = (function () {
        /**
         * Properties of a Chain.
         * @memberof hermes.chainlist.v1beta1
         * @interface IChain
         * @property {string|null} [Name] Chain Name
         * @property {string|null} [Ticker] Chain Ticker
         * @property {string|null} [Id] Chain Id
         */

        /**
         * Constructs a new Chain.
         * @memberof hermes.chainlist.v1beta1
         * @classdesc Represents a Chain.
         * @implements IChain
         * @constructor
         * @param {hermes.chainlist.v1beta1.IChain=} [properties] Properties to set
         */
        function Chain(properties) {
          if (properties)
            for (
              var keys = Object.keys(properties), i = 0;
              i < keys.length;
              ++i
            )
              if (properties[keys[i]] != null)
                this[keys[i]] = properties[keys[i]];
        }

        /**
         * Chain Name.
         * @member {string} Name
         * @memberof hermes.chainlist.v1beta1.Chain
         * @instance
         */
        Chain.prototype.Name = "";

        /**
         * Chain Ticker.
         * @member {string} Ticker
         * @memberof hermes.chainlist.v1beta1.Chain
         * @instance
         */
        Chain.prototype.Ticker = "";

        /**
         * Chain Id.
         * @member {string} Id
         * @memberof hermes.chainlist.v1beta1.Chain
         * @instance
         */
        Chain.prototype.Id = "";

        /**
         * Creates a new Chain instance using the specified properties.
         * @function create
         * @memberof hermes.chainlist.v1beta1.Chain
         * @static
         * @param {hermes.chainlist.v1beta1.IChain=} [properties] Properties to set
         * @returns {hermes.chainlist.v1beta1.Chain} Chain instance
         */
        Chain.create = function create(properties) {
          return new Chain(properties);
        };

        /**
         * Encodes the specified Chain message. Does not implicitly {@link hermes.chainlist.v1beta1.Chain.verify|verify} messages.
         * @function encode
         * @memberof hermes.chainlist.v1beta1.Chain
         * @static
         * @param {hermes.chainlist.v1beta1.IChain} message Chain message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Chain.encode = function encode(message, writer) {
          if (!writer) writer = $Writer.create();
          if (
            message.Name != null &&
            Object.hasOwnProperty.call(message, "Name")
          )
            writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.Name);
          if (
            message.Ticker != null &&
            Object.hasOwnProperty.call(message, "Ticker")
          )
            writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.Ticker);
          if (message.Id != null && Object.hasOwnProperty.call(message, "Id"))
            writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.Id);
          return writer;
        };

        /**
         * Encodes the specified Chain message, length delimited. Does not implicitly {@link hermes.chainlist.v1beta1.Chain.verify|verify} messages.
         * @function encodeDelimited
         * @memberof hermes.chainlist.v1beta1.Chain
         * @static
         * @param {hermes.chainlist.v1beta1.IChain} message Chain message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Chain.encodeDelimited = function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Chain message from the specified reader or buffer.
         * @function decode
         * @memberof hermes.chainlist.v1beta1.Chain
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {hermes.chainlist.v1beta1.Chain} Chain
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Chain.decode = function decode(reader, length) {
          if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
          var end = length === undefined ? reader.len : reader.pos + length,
            message = new $root.hermes.chainlist.v1beta1.Chain();
          while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
              case 1: {
                message.Name = reader.string();
                break;
              }
              case 2: {
                message.Ticker = reader.string();
                break;
              }
              case 3: {
                message.Id = reader.string();
                break;
              }
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        };

        /**
         * Decodes a Chain message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof hermes.chainlist.v1beta1.Chain
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {hermes.chainlist.v1beta1.Chain} Chain
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Chain.decodeDelimited = function decodeDelimited(reader) {
          if (!(reader instanceof $Reader)) reader = new $Reader(reader);
          return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Chain message.
         * @function verify
         * @memberof hermes.chainlist.v1beta1.Chain
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Chain.verify = function verify(message) {
          if (typeof message !== "object" || message === null)
            return "object expected";
          if (message.Name != null && message.hasOwnProperty("Name"))
            if (!$util.isString(message.Name)) return "Name: string expected";
          if (message.Ticker != null && message.hasOwnProperty("Ticker"))
            if (!$util.isString(message.Ticker))
              return "Ticker: string expected";
          if (message.Id != null && message.hasOwnProperty("Id"))
            if (!$util.isString(message.Id)) return "Id: string expected";
          return null;
        };

        /**
         * Creates a Chain message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof hermes.chainlist.v1beta1.Chain
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {hermes.chainlist.v1beta1.Chain} Chain
         */
        Chain.fromObject = function fromObject(object) {
          if (object instanceof $root.hermes.chainlist.v1beta1.Chain)
            return object;
          var message = new $root.hermes.chainlist.v1beta1.Chain();
          if (object.Name != null) message.Name = String(object.Name);
          if (object.Ticker != null) message.Ticker = String(object.Ticker);
          if (object.Id != null) message.Id = String(object.Id);
          return message;
        };

        /**
         * Creates a plain object from a Chain message. Also converts values to other types if specified.
         * @function toObject
         * @memberof hermes.chainlist.v1beta1.Chain
         * @static
         * @param {hermes.chainlist.v1beta1.Chain} message Chain
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Chain.toObject = function toObject(message, options) {
          if (!options) options = {};
          var object = {};
          if (options.defaults) {
            object.Name = "";
            object.Ticker = "";
            object.Id = "";
          }
          if (message.Name != null && message.hasOwnProperty("Name"))
            object.Name = message.Name;
          if (message.Ticker != null && message.hasOwnProperty("Ticker"))
            object.Ticker = message.Ticker;
          if (message.Id != null && message.hasOwnProperty("Id"))
            object.Id = message.Id;
          return object;
        };

        /**
         * Converts this Chain to JSON.
         * @function toJSON
         * @memberof hermes.chainlist.v1beta1.Chain
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Chain.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Chain
         * @function getTypeUrl
         * @memberof hermes.chainlist.v1beta1.Chain
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Chain.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
          if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
          }
          return typeUrlPrefix + "/hermes.chainlist.v1beta1.Chain";
        };

        return Chain;
      })();

      v1beta1.WorkdoneForChain = (function () {
        /**
         * Properties of a WorkdoneForChain.
         * @memberof hermes.chainlist.v1beta1
         * @interface IWorkdoneForChain
         * @property {hermes.chainlist.v1beta1.IChain|null} [chain] WorkdoneForChain chain
         * @property {number|Long|null} [blocks] WorkdoneForChain blocks
         * @property {number|Long|null} [transactions] WorkdoneForChain transactions
         */

        /**
         * Constructs a new WorkdoneForChain.
         * @memberof hermes.chainlist.v1beta1
         * @classdesc Represents a WorkdoneForChain.
         * @implements IWorkdoneForChain
         * @constructor
         * @param {hermes.chainlist.v1beta1.IWorkdoneForChain=} [properties] Properties to set
         */
        function WorkdoneForChain(properties) {
          if (properties)
            for (
              var keys = Object.keys(properties), i = 0;
              i < keys.length;
              ++i
            )
              if (properties[keys[i]] != null)
                this[keys[i]] = properties[keys[i]];
        }

        /**
         * WorkdoneForChain chain.
         * @member {hermes.chainlist.v1beta1.IChain|null|undefined} chain
         * @memberof hermes.chainlist.v1beta1.WorkdoneForChain
         * @instance
         */
        WorkdoneForChain.prototype.chain = null;

        /**
         * WorkdoneForChain blocks.
         * @member {number|Long} blocks
         * @memberof hermes.chainlist.v1beta1.WorkdoneForChain
         * @instance
         */
        WorkdoneForChain.prototype.blocks = $util.Long
          ? $util.Long.fromBits(0, 0, true)
          : 0;

        /**
         * WorkdoneForChain transactions.
         * @member {number|Long} transactions
         * @memberof hermes.chainlist.v1beta1.WorkdoneForChain
         * @instance
         */
        WorkdoneForChain.prototype.transactions = $util.Long
          ? $util.Long.fromBits(0, 0, true)
          : 0;

        /**
         * Creates a new WorkdoneForChain instance using the specified properties.
         * @function create
         * @memberof hermes.chainlist.v1beta1.WorkdoneForChain
         * @static
         * @param {hermes.chainlist.v1beta1.IWorkdoneForChain=} [properties] Properties to set
         * @returns {hermes.chainlist.v1beta1.WorkdoneForChain} WorkdoneForChain instance
         */
        WorkdoneForChain.create = function create(properties) {
          return new WorkdoneForChain(properties);
        };

        /**
         * Encodes the specified WorkdoneForChain message. Does not implicitly {@link hermes.chainlist.v1beta1.WorkdoneForChain.verify|verify} messages.
         * @function encode
         * @memberof hermes.chainlist.v1beta1.WorkdoneForChain
         * @static
         * @param {hermes.chainlist.v1beta1.IWorkdoneForChain} message WorkdoneForChain message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        WorkdoneForChain.encode = function encode(message, writer) {
          if (!writer) writer = $Writer.create();
          if (
            message.chain != null &&
            Object.hasOwnProperty.call(message, "chain")
          )
            $root.hermes.chainlist.v1beta1.Chain.encode(
              message.chain,
              writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
            ).ldelim();
          if (
            message.blocks != null &&
            Object.hasOwnProperty.call(message, "blocks")
          )
            writer.uint32(/* id 2, wireType 0 =*/ 16).uint64(message.blocks);
          if (
            message.transactions != null &&
            Object.hasOwnProperty.call(message, "transactions")
          )
            writer
              .uint32(/* id 3, wireType 0 =*/ 24)
              .uint64(message.transactions);
          return writer;
        };

        /**
         * Encodes the specified WorkdoneForChain message, length delimited. Does not implicitly {@link hermes.chainlist.v1beta1.WorkdoneForChain.verify|verify} messages.
         * @function encodeDelimited
         * @memberof hermes.chainlist.v1beta1.WorkdoneForChain
         * @static
         * @param {hermes.chainlist.v1beta1.IWorkdoneForChain} message WorkdoneForChain message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        WorkdoneForChain.encodeDelimited = function encodeDelimited(
          message,
          writer
        ) {
          return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a WorkdoneForChain message from the specified reader or buffer.
         * @function decode
         * @memberof hermes.chainlist.v1beta1.WorkdoneForChain
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {hermes.chainlist.v1beta1.WorkdoneForChain} WorkdoneForChain
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        WorkdoneForChain.decode = function decode(reader, length) {
          if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
          var end = length === undefined ? reader.len : reader.pos + length,
            message = new $root.hermes.chainlist.v1beta1.WorkdoneForChain();
          while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
              case 1: {
                message.chain = $root.hermes.chainlist.v1beta1.Chain.decode(
                  reader,
                  reader.uint32()
                );
                break;
              }
              case 2: {
                message.blocks = reader.uint64();
                break;
              }
              case 3: {
                message.transactions = reader.uint64();
                break;
              }
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        };

        /**
         * Decodes a WorkdoneForChain message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof hermes.chainlist.v1beta1.WorkdoneForChain
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {hermes.chainlist.v1beta1.WorkdoneForChain} WorkdoneForChain
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        WorkdoneForChain.decodeDelimited = function decodeDelimited(reader) {
          if (!(reader instanceof $Reader)) reader = new $Reader(reader);
          return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a WorkdoneForChain message.
         * @function verify
         * @memberof hermes.chainlist.v1beta1.WorkdoneForChain
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        WorkdoneForChain.verify = function verify(message) {
          if (typeof message !== "object" || message === null)
            return "object expected";
          if (message.chain != null && message.hasOwnProperty("chain")) {
            var error = $root.hermes.chainlist.v1beta1.Chain.verify(
              message.chain
            );
            if (error) return "chain." + error;
          }
          if (message.blocks != null && message.hasOwnProperty("blocks"))
            if (
              !$util.isInteger(message.blocks) &&
              !(
                message.blocks &&
                $util.isInteger(message.blocks.low) &&
                $util.isInteger(message.blocks.high)
              )
            )
              return "blocks: integer|Long expected";
          if (
            message.transactions != null &&
            message.hasOwnProperty("transactions")
          )
            if (
              !$util.isInteger(message.transactions) &&
              !(
                message.transactions &&
                $util.isInteger(message.transactions.low) &&
                $util.isInteger(message.transactions.high)
              )
            )
              return "transactions: integer|Long expected";
          return null;
        };

        /**
         * Creates a WorkdoneForChain message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof hermes.chainlist.v1beta1.WorkdoneForChain
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {hermes.chainlist.v1beta1.WorkdoneForChain} WorkdoneForChain
         */
        WorkdoneForChain.fromObject = function fromObject(object) {
          if (object instanceof $root.hermes.chainlist.v1beta1.WorkdoneForChain)
            return object;
          var message = new $root.hermes.chainlist.v1beta1.WorkdoneForChain();
          if (object.chain != null) {
            if (typeof object.chain !== "object")
              throw TypeError(
                ".hermes.chainlist.v1beta1.WorkdoneForChain.chain: object expected"
              );
            message.chain = $root.hermes.chainlist.v1beta1.Chain.fromObject(
              object.chain
            );
          }
          if (object.blocks != null)
            if ($util.Long)
              (message.blocks = $util.Long.fromValue(
                object.blocks
              )).unsigned = true;
            else if (typeof object.blocks === "string")
              message.blocks = parseInt(object.blocks, 10);
            else if (typeof object.blocks === "number")
              message.blocks = object.blocks;
            else if (typeof object.blocks === "object")
              message.blocks = new $util.LongBits(
                object.blocks.low >>> 0,
                object.blocks.high >>> 0
              ).toNumber(true);
          if (object.transactions != null)
            if ($util.Long)
              (message.transactions = $util.Long.fromValue(
                object.transactions
              )).unsigned = true;
            else if (typeof object.transactions === "string")
              message.transactions = parseInt(object.transactions, 10);
            else if (typeof object.transactions === "number")
              message.transactions = object.transactions;
            else if (typeof object.transactions === "object")
              message.transactions = new $util.LongBits(
                object.transactions.low >>> 0,
                object.transactions.high >>> 0
              ).toNumber(true);
          return message;
        };

        /**
         * Creates a plain object from a WorkdoneForChain message. Also converts values to other types if specified.
         * @function toObject
         * @memberof hermes.chainlist.v1beta1.WorkdoneForChain
         * @static
         * @param {hermes.chainlist.v1beta1.WorkdoneForChain} message WorkdoneForChain
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        WorkdoneForChain.toObject = function toObject(message, options) {
          if (!options) options = {};
          var object = {};
          if (options.defaults) {
            object.chain = null;
            if ($util.Long) {
              var long = new $util.Long(0, 0, true);
              object.blocks =
                options.longs === String
                  ? long.toString()
                  : options.longs === Number
                  ? long.toNumber()
                  : long;
            } else object.blocks = options.longs === String ? "0" : 0;
            if ($util.Long) {
              var long = new $util.Long(0, 0, true);
              object.transactions =
                options.longs === String
                  ? long.toString()
                  : options.longs === Number
                  ? long.toNumber()
                  : long;
            } else object.transactions = options.longs === String ? "0" : 0;
          }
          if (message.chain != null && message.hasOwnProperty("chain"))
            object.chain = $root.hermes.chainlist.v1beta1.Chain.toObject(
              message.chain,
              options
            );
          if (message.blocks != null && message.hasOwnProperty("blocks"))
            if (typeof message.blocks === "number")
              object.blocks =
                options.longs === String
                  ? String(message.blocks)
                  : message.blocks;
            else
              object.blocks =
                options.longs === String
                  ? $util.Long.prototype.toString.call(message.blocks)
                  : options.longs === Number
                  ? new $util.LongBits(
                      message.blocks.low >>> 0,
                      message.blocks.high >>> 0
                    ).toNumber(true)
                  : message.blocks;
          if (
            message.transactions != null &&
            message.hasOwnProperty("transactions")
          )
            if (typeof message.transactions === "number")
              object.transactions =
                options.longs === String
                  ? String(message.transactions)
                  : message.transactions;
            else
              object.transactions =
                options.longs === String
                  ? $util.Long.prototype.toString.call(message.transactions)
                  : options.longs === Number
                  ? new $util.LongBits(
                      message.transactions.low >>> 0,
                      message.transactions.high >>> 0
                    ).toNumber(true)
                  : message.transactions;
          return object;
        };

        /**
         * Converts this WorkdoneForChain to JSON.
         * @function toJSON
         * @memberof hermes.chainlist.v1beta1.WorkdoneForChain
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        WorkdoneForChain.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for WorkdoneForChain
         * @function getTypeUrl
         * @memberof hermes.chainlist.v1beta1.WorkdoneForChain
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        WorkdoneForChain.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
          if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
          }
          return typeUrlPrefix + "/hermes.chainlist.v1beta1.WorkdoneForChain";
        };

        return WorkdoneForChain;
      })();

      return v1beta1;
    })();

    return chainlist;
  })();

  return hermes;
})();

$root.cosmos = (function () {
  /**
   * Namespace cosmos.
   * @exports cosmos
   * @namespace
   */
  var cosmos = {};

  cosmos.base = (function () {
    /**
     * Namespace base.
     * @memberof cosmos
     * @namespace
     */
    var base = {};

    base.v1beta1 = (function () {
      /**
       * Namespace v1beta1.
       * @memberof cosmos.base
       * @namespace
       */
      var v1beta1 = {};

      v1beta1.Coin = (function () {
        /**
         * Properties of a Coin.
         * @memberof cosmos.base.v1beta1
         * @interface ICoin
         * @property {string|null} [denom] Coin denom
         * @property {string|null} [amount] Coin amount
         */

        /**
         * Constructs a new Coin.
         * @memberof cosmos.base.v1beta1
         * @classdesc Represents a Coin.
         * @implements ICoin
         * @constructor
         * @param {cosmos.base.v1beta1.ICoin=} [properties] Properties to set
         */
        function Coin(properties) {
          if (properties)
            for (
              var keys = Object.keys(properties), i = 0;
              i < keys.length;
              ++i
            )
              if (properties[keys[i]] != null)
                this[keys[i]] = properties[keys[i]];
        }

        /**
         * Coin denom.
         * @member {string} denom
         * @memberof cosmos.base.v1beta1.Coin
         * @instance
         */
        Coin.prototype.denom = "";

        /**
         * Coin amount.
         * @member {string} amount
         * @memberof cosmos.base.v1beta1.Coin
         * @instance
         */
        Coin.prototype.amount = "";

        /**
         * Creates a new Coin instance using the specified properties.
         * @function create
         * @memberof cosmos.base.v1beta1.Coin
         * @static
         * @param {cosmos.base.v1beta1.ICoin=} [properties] Properties to set
         * @returns {cosmos.base.v1beta1.Coin} Coin instance
         */
        Coin.create = function create(properties) {
          return new Coin(properties);
        };

        /**
         * Encodes the specified Coin message. Does not implicitly {@link cosmos.base.v1beta1.Coin.verify|verify} messages.
         * @function encode
         * @memberof cosmos.base.v1beta1.Coin
         * @static
         * @param {cosmos.base.v1beta1.ICoin} message Coin message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Coin.encode = function encode(message, writer) {
          if (!writer) writer = $Writer.create();
          if (
            message.denom != null &&
            Object.hasOwnProperty.call(message, "denom")
          )
            writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.denom);
          if (
            message.amount != null &&
            Object.hasOwnProperty.call(message, "amount")
          )
            writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.amount);
          return writer;
        };

        /**
         * Encodes the specified Coin message, length delimited. Does not implicitly {@link cosmos.base.v1beta1.Coin.verify|verify} messages.
         * @function encodeDelimited
         * @memberof cosmos.base.v1beta1.Coin
         * @static
         * @param {cosmos.base.v1beta1.ICoin} message Coin message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Coin.encodeDelimited = function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Coin message from the specified reader or buffer.
         * @function decode
         * @memberof cosmos.base.v1beta1.Coin
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {cosmos.base.v1beta1.Coin} Coin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Coin.decode = function decode(reader, length) {
          if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
          var end = length === undefined ? reader.len : reader.pos + length,
            message = new $root.cosmos.base.v1beta1.Coin();
          while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
              case 1: {
                message.denom = reader.string();
                break;
              }
              case 2: {
                message.amount = reader.string();
                break;
              }
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        };

        /**
         * Decodes a Coin message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof cosmos.base.v1beta1.Coin
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {cosmos.base.v1beta1.Coin} Coin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Coin.decodeDelimited = function decodeDelimited(reader) {
          if (!(reader instanceof $Reader)) reader = new $Reader(reader);
          return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Coin message.
         * @function verify
         * @memberof cosmos.base.v1beta1.Coin
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Coin.verify = function verify(message) {
          if (typeof message !== "object" || message === null)
            return "object expected";
          if (message.denom != null && message.hasOwnProperty("denom"))
            if (!$util.isString(message.denom)) return "denom: string expected";
          if (message.amount != null && message.hasOwnProperty("amount"))
            if (!$util.isString(message.amount))
              return "amount: string expected";
          return null;
        };

        /**
         * Creates a Coin message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof cosmos.base.v1beta1.Coin
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {cosmos.base.v1beta1.Coin} Coin
         */
        Coin.fromObject = function fromObject(object) {
          if (object instanceof $root.cosmos.base.v1beta1.Coin) return object;
          var message = new $root.cosmos.base.v1beta1.Coin();
          if (object.denom != null) message.denom = String(object.denom);
          if (object.amount != null) message.amount = String(object.amount);
          return message;
        };

        /**
         * Creates a plain object from a Coin message. Also converts values to other types if specified.
         * @function toObject
         * @memberof cosmos.base.v1beta1.Coin
         * @static
         * @param {cosmos.base.v1beta1.Coin} message Coin
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Coin.toObject = function toObject(message, options) {
          if (!options) options = {};
          var object = {};
          if (options.defaults) {
            object.denom = "";
            object.amount = "";
          }
          if (message.denom != null && message.hasOwnProperty("denom"))
            object.denom = message.denom;
          if (message.amount != null && message.hasOwnProperty("amount"))
            object.amount = message.amount;
          return object;
        };

        /**
         * Converts this Coin to JSON.
         * @function toJSON
         * @memberof cosmos.base.v1beta1.Coin
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Coin.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Coin
         * @function getTypeUrl
         * @memberof cosmos.base.v1beta1.Coin
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Coin.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
          if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
          }
          return typeUrlPrefix + "/cosmos.base.v1beta1.Coin";
        };

        return Coin;
      })();

      v1beta1.DecCoin = (function () {
        /**
         * Properties of a DecCoin.
         * @memberof cosmos.base.v1beta1
         * @interface IDecCoin
         * @property {string|null} [denom] DecCoin denom
         * @property {string|null} [amount] DecCoin amount
         */

        /**
         * Constructs a new DecCoin.
         * @memberof cosmos.base.v1beta1
         * @classdesc Represents a DecCoin.
         * @implements IDecCoin
         * @constructor
         * @param {cosmos.base.v1beta1.IDecCoin=} [properties] Properties to set
         */
        function DecCoin(properties) {
          if (properties)
            for (
              var keys = Object.keys(properties), i = 0;
              i < keys.length;
              ++i
            )
              if (properties[keys[i]] != null)
                this[keys[i]] = properties[keys[i]];
        }

        /**
         * DecCoin denom.
         * @member {string} denom
         * @memberof cosmos.base.v1beta1.DecCoin
         * @instance
         */
        DecCoin.prototype.denom = "";

        /**
         * DecCoin amount.
         * @member {string} amount
         * @memberof cosmos.base.v1beta1.DecCoin
         * @instance
         */
        DecCoin.prototype.amount = "";

        /**
         * Creates a new DecCoin instance using the specified properties.
         * @function create
         * @memberof cosmos.base.v1beta1.DecCoin
         * @static
         * @param {cosmos.base.v1beta1.IDecCoin=} [properties] Properties to set
         * @returns {cosmos.base.v1beta1.DecCoin} DecCoin instance
         */
        DecCoin.create = function create(properties) {
          return new DecCoin(properties);
        };

        /**
         * Encodes the specified DecCoin message. Does not implicitly {@link cosmos.base.v1beta1.DecCoin.verify|verify} messages.
         * @function encode
         * @memberof cosmos.base.v1beta1.DecCoin
         * @static
         * @param {cosmos.base.v1beta1.IDecCoin} message DecCoin message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DecCoin.encode = function encode(message, writer) {
          if (!writer) writer = $Writer.create();
          if (
            message.denom != null &&
            Object.hasOwnProperty.call(message, "denom")
          )
            writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.denom);
          if (
            message.amount != null &&
            Object.hasOwnProperty.call(message, "amount")
          )
            writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.amount);
          return writer;
        };

        /**
         * Encodes the specified DecCoin message, length delimited. Does not implicitly {@link cosmos.base.v1beta1.DecCoin.verify|verify} messages.
         * @function encodeDelimited
         * @memberof cosmos.base.v1beta1.DecCoin
         * @static
         * @param {cosmos.base.v1beta1.IDecCoin} message DecCoin message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DecCoin.encodeDelimited = function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a DecCoin message from the specified reader or buffer.
         * @function decode
         * @memberof cosmos.base.v1beta1.DecCoin
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {cosmos.base.v1beta1.DecCoin} DecCoin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DecCoin.decode = function decode(reader, length) {
          if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
          var end = length === undefined ? reader.len : reader.pos + length,
            message = new $root.cosmos.base.v1beta1.DecCoin();
          while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
              case 1: {
                message.denom = reader.string();
                break;
              }
              case 2: {
                message.amount = reader.string();
                break;
              }
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        };

        /**
         * Decodes a DecCoin message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof cosmos.base.v1beta1.DecCoin
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {cosmos.base.v1beta1.DecCoin} DecCoin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DecCoin.decodeDelimited = function decodeDelimited(reader) {
          if (!(reader instanceof $Reader)) reader = new $Reader(reader);
          return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a DecCoin message.
         * @function verify
         * @memberof cosmos.base.v1beta1.DecCoin
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DecCoin.verify = function verify(message) {
          if (typeof message !== "object" || message === null)
            return "object expected";
          if (message.denom != null && message.hasOwnProperty("denom"))
            if (!$util.isString(message.denom)) return "denom: string expected";
          if (message.amount != null && message.hasOwnProperty("amount"))
            if (!$util.isString(message.amount))
              return "amount: string expected";
          return null;
        };

        /**
         * Creates a DecCoin message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof cosmos.base.v1beta1.DecCoin
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {cosmos.base.v1beta1.DecCoin} DecCoin
         */
        DecCoin.fromObject = function fromObject(object) {
          if (object instanceof $root.cosmos.base.v1beta1.DecCoin)
            return object;
          var message = new $root.cosmos.base.v1beta1.DecCoin();
          if (object.denom != null) message.denom = String(object.denom);
          if (object.amount != null) message.amount = String(object.amount);
          return message;
        };

        /**
         * Creates a plain object from a DecCoin message. Also converts values to other types if specified.
         * @function toObject
         * @memberof cosmos.base.v1beta1.DecCoin
         * @static
         * @param {cosmos.base.v1beta1.DecCoin} message DecCoin
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DecCoin.toObject = function toObject(message, options) {
          if (!options) options = {};
          var object = {};
          if (options.defaults) {
            object.denom = "";
            object.amount = "";
          }
          if (message.denom != null && message.hasOwnProperty("denom"))
            object.denom = message.denom;
          if (message.amount != null && message.hasOwnProperty("amount"))
            object.amount = message.amount;
          return object;
        };

        /**
         * Converts this DecCoin to JSON.
         * @function toJSON
         * @memberof cosmos.base.v1beta1.DecCoin
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DecCoin.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for DecCoin
         * @function getTypeUrl
         * @memberof cosmos.base.v1beta1.DecCoin
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        DecCoin.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
          if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
          }
          return typeUrlPrefix + "/cosmos.base.v1beta1.DecCoin";
        };

        return DecCoin;
      })();

      v1beta1.IntProto = (function () {
        /**
         * Properties of an IntProto.
         * @memberof cosmos.base.v1beta1
         * @interface IIntProto
         * @property {string|null} [int] IntProto int
         */

        /**
         * Constructs a new IntProto.
         * @memberof cosmos.base.v1beta1
         * @classdesc Represents an IntProto.
         * @implements IIntProto
         * @constructor
         * @param {cosmos.base.v1beta1.IIntProto=} [properties] Properties to set
         */
        function IntProto(properties) {
          if (properties)
            for (
              var keys = Object.keys(properties), i = 0;
              i < keys.length;
              ++i
            )
              if (properties[keys[i]] != null)
                this[keys[i]] = properties[keys[i]];
        }

        /**
         * IntProto int.
         * @member {string} int
         * @memberof cosmos.base.v1beta1.IntProto
         * @instance
         */
        IntProto.prototype.int = "";

        /**
         * Creates a new IntProto instance using the specified properties.
         * @function create
         * @memberof cosmos.base.v1beta1.IntProto
         * @static
         * @param {cosmos.base.v1beta1.IIntProto=} [properties] Properties to set
         * @returns {cosmos.base.v1beta1.IntProto} IntProto instance
         */
        IntProto.create = function create(properties) {
          return new IntProto(properties);
        };

        /**
         * Encodes the specified IntProto message. Does not implicitly {@link cosmos.base.v1beta1.IntProto.verify|verify} messages.
         * @function encode
         * @memberof cosmos.base.v1beta1.IntProto
         * @static
         * @param {cosmos.base.v1beta1.IIntProto} message IntProto message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        IntProto.encode = function encode(message, writer) {
          if (!writer) writer = $Writer.create();
          if (message.int != null && Object.hasOwnProperty.call(message, "int"))
            writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.int);
          return writer;
        };

        /**
         * Encodes the specified IntProto message, length delimited. Does not implicitly {@link cosmos.base.v1beta1.IntProto.verify|verify} messages.
         * @function encodeDelimited
         * @memberof cosmos.base.v1beta1.IntProto
         * @static
         * @param {cosmos.base.v1beta1.IIntProto} message IntProto message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        IntProto.encodeDelimited = function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an IntProto message from the specified reader or buffer.
         * @function decode
         * @memberof cosmos.base.v1beta1.IntProto
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {cosmos.base.v1beta1.IntProto} IntProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        IntProto.decode = function decode(reader, length) {
          if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
          var end = length === undefined ? reader.len : reader.pos + length,
            message = new $root.cosmos.base.v1beta1.IntProto();
          while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
              case 1: {
                message.int = reader.string();
                break;
              }
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        };

        /**
         * Decodes an IntProto message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof cosmos.base.v1beta1.IntProto
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {cosmos.base.v1beta1.IntProto} IntProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        IntProto.decodeDelimited = function decodeDelimited(reader) {
          if (!(reader instanceof $Reader)) reader = new $Reader(reader);
          return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an IntProto message.
         * @function verify
         * @memberof cosmos.base.v1beta1.IntProto
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        IntProto.verify = function verify(message) {
          if (typeof message !== "object" || message === null)
            return "object expected";
          if (message.int != null && message.hasOwnProperty("int"))
            if (!$util.isString(message.int)) return "int: string expected";
          return null;
        };

        /**
         * Creates an IntProto message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof cosmos.base.v1beta1.IntProto
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {cosmos.base.v1beta1.IntProto} IntProto
         */
        IntProto.fromObject = function fromObject(object) {
          if (object instanceof $root.cosmos.base.v1beta1.IntProto)
            return object;
          var message = new $root.cosmos.base.v1beta1.IntProto();
          if (object.int != null) message.int = String(object.int);
          return message;
        };

        /**
         * Creates a plain object from an IntProto message. Also converts values to other types if specified.
         * @function toObject
         * @memberof cosmos.base.v1beta1.IntProto
         * @static
         * @param {cosmos.base.v1beta1.IntProto} message IntProto
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        IntProto.toObject = function toObject(message, options) {
          if (!options) options = {};
          var object = {};
          if (options.defaults) object.int = "";
          if (message.int != null && message.hasOwnProperty("int"))
            object.int = message.int;
          return object;
        };

        /**
         * Converts this IntProto to JSON.
         * @function toJSON
         * @memberof cosmos.base.v1beta1.IntProto
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        IntProto.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for IntProto
         * @function getTypeUrl
         * @memberof cosmos.base.v1beta1.IntProto
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        IntProto.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
          if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
          }
          return typeUrlPrefix + "/cosmos.base.v1beta1.IntProto";
        };

        return IntProto;
      })();

      v1beta1.DecProto = (function () {
        /**
         * Properties of a DecProto.
         * @memberof cosmos.base.v1beta1
         * @interface IDecProto
         * @property {string|null} [dec] DecProto dec
         */

        /**
         * Constructs a new DecProto.
         * @memberof cosmos.base.v1beta1
         * @classdesc Represents a DecProto.
         * @implements IDecProto
         * @constructor
         * @param {cosmos.base.v1beta1.IDecProto=} [properties] Properties to set
         */
        function DecProto(properties) {
          if (properties)
            for (
              var keys = Object.keys(properties), i = 0;
              i < keys.length;
              ++i
            )
              if (properties[keys[i]] != null)
                this[keys[i]] = properties[keys[i]];
        }

        /**
         * DecProto dec.
         * @member {string} dec
         * @memberof cosmos.base.v1beta1.DecProto
         * @instance
         */
        DecProto.prototype.dec = "";

        /**
         * Creates a new DecProto instance using the specified properties.
         * @function create
         * @memberof cosmos.base.v1beta1.DecProto
         * @static
         * @param {cosmos.base.v1beta1.IDecProto=} [properties] Properties to set
         * @returns {cosmos.base.v1beta1.DecProto} DecProto instance
         */
        DecProto.create = function create(properties) {
          return new DecProto(properties);
        };

        /**
         * Encodes the specified DecProto message. Does not implicitly {@link cosmos.base.v1beta1.DecProto.verify|verify} messages.
         * @function encode
         * @memberof cosmos.base.v1beta1.DecProto
         * @static
         * @param {cosmos.base.v1beta1.IDecProto} message DecProto message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DecProto.encode = function encode(message, writer) {
          if (!writer) writer = $Writer.create();
          if (message.dec != null && Object.hasOwnProperty.call(message, "dec"))
            writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.dec);
          return writer;
        };

        /**
         * Encodes the specified DecProto message, length delimited. Does not implicitly {@link cosmos.base.v1beta1.DecProto.verify|verify} messages.
         * @function encodeDelimited
         * @memberof cosmos.base.v1beta1.DecProto
         * @static
         * @param {cosmos.base.v1beta1.IDecProto} message DecProto message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DecProto.encodeDelimited = function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a DecProto message from the specified reader or buffer.
         * @function decode
         * @memberof cosmos.base.v1beta1.DecProto
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {cosmos.base.v1beta1.DecProto} DecProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DecProto.decode = function decode(reader, length) {
          if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
          var end = length === undefined ? reader.len : reader.pos + length,
            message = new $root.cosmos.base.v1beta1.DecProto();
          while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
              case 1: {
                message.dec = reader.string();
                break;
              }
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        };

        /**
         * Decodes a DecProto message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof cosmos.base.v1beta1.DecProto
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {cosmos.base.v1beta1.DecProto} DecProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DecProto.decodeDelimited = function decodeDelimited(reader) {
          if (!(reader instanceof $Reader)) reader = new $Reader(reader);
          return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a DecProto message.
         * @function verify
         * @memberof cosmos.base.v1beta1.DecProto
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DecProto.verify = function verify(message) {
          if (typeof message !== "object" || message === null)
            return "object expected";
          if (message.dec != null && message.hasOwnProperty("dec"))
            if (!$util.isString(message.dec)) return "dec: string expected";
          return null;
        };

        /**
         * Creates a DecProto message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof cosmos.base.v1beta1.DecProto
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {cosmos.base.v1beta1.DecProto} DecProto
         */
        DecProto.fromObject = function fromObject(object) {
          if (object instanceof $root.cosmos.base.v1beta1.DecProto)
            return object;
          var message = new $root.cosmos.base.v1beta1.DecProto();
          if (object.dec != null) message.dec = String(object.dec);
          return message;
        };

        /**
         * Creates a plain object from a DecProto message. Also converts values to other types if specified.
         * @function toObject
         * @memberof cosmos.base.v1beta1.DecProto
         * @static
         * @param {cosmos.base.v1beta1.DecProto} message DecProto
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DecProto.toObject = function toObject(message, options) {
          if (!options) options = {};
          var object = {};
          if (options.defaults) object.dec = "";
          if (message.dec != null && message.hasOwnProperty("dec"))
            object.dec = message.dec;
          return object;
        };

        /**
         * Converts this DecProto to JSON.
         * @function toJSON
         * @memberof cosmos.base.v1beta1.DecProto
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DecProto.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for DecProto
         * @function getTypeUrl
         * @memberof cosmos.base.v1beta1.DecProto
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        DecProto.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
          if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
          }
          return typeUrlPrefix + "/cosmos.base.v1beta1.DecProto";
        };

        return DecProto;
      })();

      return v1beta1;
    })();

    return base;
  })();

  return cosmos;
})();

module.exports = $root;
