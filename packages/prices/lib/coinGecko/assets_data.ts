import axios from "axios";
import moment from "moment";
import { AssetsIdList } from "./utils/assetIds";
import { CurrencyList, DisplayOrderList } from "./utils/lists";
import {
  AssetsCurrentMarketDataResult,
  AssetsDetailedCurrentMarketDataResult,
  DayPriceData,
  DayPriceDataResult,
  PriceHistoryDataByDate,
  PriceHistoryDataByDays,
  PriceHistoryDataByDaysResult,
  PriceHistoryResult,
} from "./utils/types";

export interface CurrentMarketDataOptions {
  assets?: string;
  resCurrency?: CurrencyList;
  sortOrder?: DisplayOrderList;
  valuesPerPage?: number;
  page?: number;
}

export default class CoinGecko {
  api: string;
  constructor() {
    this.api = "https://api.coingecko.com/api/v3";
  }

  convertDateToTimestamp(date: string) {
    const timestamp = moment(date).format("X"); // lowercase 'x' for timestamp in milliseconds
    return Number(timestamp);
  }

  convertTimestampToDate(timestamp: number) {
    const date = moment(timestamp).toDate().toUTCString();
    return date;
  }

  convertISOtoUTC(date: string) {
    const utcDate = new Date(date).toUTCString();
    return utcDate;
  }

  // Obtain all the coins' id in order to make API calls
  //   async getAssetsList() {
  //     let requestApi = `${this.api}/coins/list`;
  //     try {

  //     } catch (error) {

  //     }
  //   }

  // all the coins market data (price, market cap, volume)
  // 'assets' - ids of the coin, comma separated crytocurrency symbols (base) [Ex : 'bitcoin,ethereum,...']
  // 'resCurrency' - target currency of market data (usd, eur, jpy, etc.)
  // 'sortOrder' - Order of result display . Default 'market_cap_desc'
  // 'valuesPerPage' - Total results per page: 1 - 250
  async getDetailedAssestsCurrentMarketData(
    options?: CurrentMarketDataOptions
  ) {
    let requestApi = `${this.api}/coins/markets`;
    if (options !== undefined && options.resCurrency) {
      requestApi += `?vs_currency=${options.resCurrency}`;
    } else {
      requestApi += `?vs_currency=usd`;
    }
    if (options !== undefined && options.assets) {
      requestApi += `&ids=${options.assets}`;
    }
    if (options !== undefined && options.sortOrder) {
      requestApi += `&order=${options.sortOrder}`;
    } else {
      requestApi += `&order=market_cap_desc`;
    }
    if (options !== undefined && options.valuesPerPage) {
      requestApi += `&per_page=${options.valuesPerPage}`;
    } else {
      requestApi += `&per_page=250`;
    }
    if (options !== undefined && options.page) {
      requestApi += `&page=${options.page}`;
    } else {
      requestApi += `&page=1`;
    }

    try {
      let response = await axios.get(requestApi);
      if (response.status == 200) {
        let result: AssetsDetailedCurrentMarketDataResult[] = response.data;
        if (result !== (null || undefined)) {
          let finalResult: AssetsDetailedCurrentMarketDataResult[] = [];
          result.map((res) => {
            const values = {
              id: res.id,
              symbol: res.symbol,
              name: res.name,
              image: res.image,
              current_price: res.current_price,
              market_cap: res.market_cap,
              market_cap_rank: res.market_cap_rank,
              fully_diluted_valuation: res.fully_diluted_valuation,
              total_volume: res.total_volume,
              high_24h: res.high_24h,
              low_24h: res.low_24h,
              price_change_24h: res.price_change_24h,
              price_change_percentage_24h: res.price_change_percentage_24h,
              market_cap_change_24h: res.market_cap_change_24h,
              market_cap_change_percentage_24h:
                res.market_cap_change_percentage_24h,
              circulating_supply: res.circulating_supply,
              total_supply: res.total_supply,
              max_supply: res.max_supply,
              ath: res.ath,
              ath_change_percentage: res.ath_change_percentage,
              ath_date: this.convertISOtoUTC(res.ath_date),
              atl: res.atl,
              atl_change_percentage: res.atl_change_percentage,
              atl_date: this.convertISOtoUTC(res.atl_date),
              roi: res.roi,
              last_updated: this.convertISOtoUTC(res.last_updated),
            };
            finalResult.push(values);
          });
          return finalResult;
        } else {
          return null;
        }
      } else {
        return null;
      }
    } catch (error) {
      throw new Error("Something went wrong");
    }
  }

  async getAssestsCurrentMarketData(options?: CurrentMarketDataOptions) {
    let requestApi = `${this.api}/coins/markets`;
    if (options !== undefined && options.resCurrency) {
      requestApi += `?vs_currency=${options.resCurrency}`;
    } else {
      requestApi += `?vs_currency=usd`;
    }
    if (options !== undefined && options.assets) {
      requestApi += `&ids=${options.assets}`;
    }
    if (options !== undefined && options.sortOrder) {
      requestApi += `&order=${options.sortOrder}`;
    } else {
      requestApi += `&order=market_cap_desc`;
    }
    if (options !== undefined && options.valuesPerPage) {
      requestApi += `&per_page=${options.valuesPerPage}`;
    } else {
      requestApi += `&per_page=250`;
    }
    if (options !== undefined && options.page) {
      requestApi += `&page=${options.page}`;
    } else {
      requestApi += `&page=1`;
    }

    try {
      let response = await axios.get(requestApi);
      if (response.status == 200) {
        let result: AssetsDetailedCurrentMarketDataResult = response.data[0];
        if (result !== (null || undefined)) {
          const finalResult: AssetsCurrentMarketDataResult = {
            current_price: result.current_price,
            market_cap: result.market_cap,
            total_volume: result.total_volume,
            circulating_supply: result.circulating_supply,
            total_supply: result.total_supply,
            max_supply: result.max_supply,
            ath: result.ath,
            ath_change_percentage: result.ath_change_percentage,
            ath_date: this.convertISOtoUTC(result.ath_date),
            atl: result.atl,
            atl_change_percentage: result.atl_change_percentage,
            atl_date: this.convertISOtoUTC(result.atl_date),
          };
          return finalResult;
        } else {
          return null;
        }
      } else {
        return null;
      }
    } catch (error) {
      throw new Error("Something went wrong");
    }
  }

  // Get historical data (name, price, market, stats) at a given date for a coin
  // By default made use of 'usd' as return value
  // 'date' input should be of format 'DD-MM-YYYY'
  async getAssetHistoryPriceByDate(asset: AssetsIdList, date: string) {
    let requestApi = `${this.api}/coins/${asset}/history?date=${date}`;
    try {
      let response = await axios.get(requestApi);
      if (response.status == 200) {
        let result: PriceHistoryDataByDate = response.data;
        let finalResult: PriceHistoryResult[] = [];
        if (
          result !== (null || undefined) &&
          result.market_data !== (null || undefined)
        ) {
          const data = {
            current_price: result.market_data.current_price.usd,
            market_cap: result.market_data.market_cap.usd,
            total_volume: result.market_data.total_volume.usd,
          };
          finalResult.push(data);
        }
        return finalResult;
      } else {
        return null;
      }
    } catch (error) {
      throw new Error("Something went wrong");
    }
  }

  // Get historical market data include price, market cap, and 24h volume (granularity auto)
  // Minutely data will be used for duration within 1 day,
  // Hourly data will be used for duration between 1 day and 10 days,
  // Daily data will be used for duration above 10 days.
  async getAssetHistoryPriceByNoOfDays(
    asset: AssetsIdList,
    noOfDays: number,
    resCurrency: CurrencyList
  ) {
    let requestApi = `${this.api}/coins/${asset}/market_chart`;
    if (resCurrency) {
      requestApi += `?vs_currency=${resCurrency}`;
    } else {
      requestApi += `?vs_currency=usd`;
    }
    if (noOfDays > 10) {
      requestApi += `&days=${noOfDays}&interval=daily`;
    } else if (noOfDays <= 10 && noOfDays > 1) {
      requestApi += `&days=${noOfDays}&interval=hourly`;
    } else {
      requestApi += `&days=${noOfDays}`;
    }

    try {
      let response = await axios.get(requestApi);
      if (response.status == 200) {
        let result: PriceHistoryDataByDays = response.data;
        let pricesResult: DayPriceDataResult[] = [];
        let marketCapResult: DayPriceDataResult[] = [];
        let totalVolumeResult: DayPriceDataResult[] = [];
        if (result !== (null || undefined)) {
          if (result.prices !== (null || undefined)) {
            result.prices.map((res: DayPriceData) => {
              const data = {
                date: this.convertTimestampToDate(res[0]),
                price: res[1],
              };
              pricesResult.push(data);
            });
          }
          if (result.market_caps !== (null || undefined)) {
            result.market_caps.map((res: DayPriceData) => {
              const data = {
                date: this.convertTimestampToDate(res[0]),
                price: res[1],
              };
              marketCapResult.push(data);
            });
          }
          if (result.total_volumes !== (null || undefined)) {
            result.total_volumes.map((res: DayPriceData) => {
              const data = {
                date: this.convertTimestampToDate(res[0]),
                price: res[1],
              };
              totalVolumeResult.push(data);
            });
          }
        }
        let finalResult: PriceHistoryDataByDaysResult[] = [];
        finalResult = [
          {
            prices: pricesResult,
            market_cap: marketCapResult,
            total_volume: totalVolumeResult,
          },
        ];
        return finalResult;
      } else {
        return null;
      }
    } catch (error) {
      throw new Error("Something went wrong");
    }
  }

  // Get historical market data include price, market cap, and 24h volume within a range of timestamp (granularity auto)
  // Data granularity is automatic (cannot be adjusted)
  // 1 day from query time = 5 minute interval data
  // 1 - 90 days from query time = hourly data
  // above 90 days from query time = daily data (00:00 UTC)
  async getAssetHistoryPriceByDateRange(
    asset: AssetsIdList,
    fromDate: string,
    thruDate: string,
    resCurrency?: CurrencyList
  ) {
    const from = this.convertDateToTimestamp(fromDate);
    const to = this.convertDateToTimestamp(thruDate);
    let requestApi = `${this.api}/coins/${asset}/market_chart/range`;
    if (resCurrency) {
      requestApi += `?vs_currency=${resCurrency}`;
    } else {
      requestApi += `?vs_currency=usd`;
    }
    requestApi += `&from=${from}&to=${to}`;
    try {
      let response = await axios.get(requestApi);
      if (response.status == 200) {
        let result: PriceHistoryDataByDays = response.data;
        let pricesResult: DayPriceDataResult[] = [];
        let marketCapResult: DayPriceDataResult[] = [];
        let totalVolumeResult: DayPriceDataResult[] = [];
        if (result !== (null || undefined)) {
          if (result.prices !== (null || undefined)) {
            result.prices.map((res: DayPriceData) => {
              const data = {
                date: this.convertTimestampToDate(res[0]),
                price: res[1],
              };
              pricesResult.push(data);
            });
          }
          if (result.market_caps !== (null || undefined)) {
            result.market_caps.map((res: DayPriceData) => {
              const data = {
                date: this.convertTimestampToDate(res[0]),
                price: res[1],
              };
              marketCapResult.push(data);
            });
          }
          if (result.total_volumes !== (null || undefined)) {
            result.total_volumes.map((res: DayPriceData) => {
              const data = {
                date: this.convertTimestampToDate(res[0]),
                price: res[1],
              };
              totalVolumeResult.push(data);
            });
          }
        }
        let finalResult: PriceHistoryDataByDaysResult[] = [];
        finalResult = [
          {
            prices: pricesResult,
            market_cap: marketCapResult,
            total_volume: totalVolumeResult,
          },
        ];
        // console.log(finalResult);
        return finalResult;
      } else {
        return null;
      }
    } catch (error) {
      throw new Error("Something went wrong");
    }
  }
}
