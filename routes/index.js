var express = require('express');
var router = express.Router();
var async = require('async');
var nodeTelegramBotApi = require("node-telegram-bot-api");
let request = require("request");
var config = require('../config/global');
var connection = require('../config/connection');
const BitlyClient = require('bitly').BitlyClient;
const axios = require('axios');
var _ = require('underscore');
var moment = require('moment-timezone');
var qs = require('qs');
var config = require('../config/global');
// Import required modules
var UpstoxClient = require("upstox-js-sdk");
const WebSocket = require("ws").WebSocket;

const zlib = require('zlib');
const util = require('util');
const gunzip = util.promisify(zlib.gunzip);

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

 // Initialize the Upstox client and set the OAuth2 access token
 ORDER_TAG = "PLACE_SL";
 SL_PRCNT = 8.5;
 let defaultClient = UpstoxClient.ApiClient.instance;
 let apiVersion = "2.0";
 let OAUTH2 = defaultClient.authentications["OAUTH2"];

// Define an asynchronous function to get PortfolioFeedUrl from the Upstox server
const getPortfolioFeedUrl = async () => {
  return new Promise((resolve, reject) => {
    // Initialize a Websocket API instance
    let apiInstance = new UpstoxClient.WebsocketApi();

    // Request to get the portfolio stream feed authorization
    apiInstance.getPortfolioStreamFeedAuthorize(
      apiVersion,
      (error, data, response) => {
        if (error) {
          // If there's an error, log it and reject the promise
          reject(error);
        } else {
          // If no error, log the returned data and resolve the promise
          resolve(data.data.authorizedRedirectUri);
        }
      }
    );
  });
};

// Define an asynchronous function to connect to the websocket
const connectWebSocket = async (wsUrl) => {
  return new Promise((resolve, reject) => {
    // Initialize a WebSocket instance with the authorized URL and appropriate headers
    const ws = new WebSocket(wsUrl, {
      headers: {
        "Api-Version": apiVersion,
        Authorization: "Bearer " + OAUTH2.accessToken,
      },
      followRedirects: true,
    });

    // Set up WebSocket event handlers
    ws.on("open", function open() {
      console.log("connected");
      resolve(ws); // Resolve the promise when the WebSocket is opened
    });

    ws.on("close", function close() {
      console.log("disconnected");
    });

    ws.on("message", function message(data) {
      console.log("data received", data.toString());
    });

    ws.on("error", function onError(error) {
      console.log("error:", error);
      reject(error); // Reject the promise when there's an error
    });
  });
};

// Execute the async functions to get PortfolioFeedUrl and connect to WebSocket
// (async () => {
//   try {
//     console.log('try: ');
//     let sqlsss = "SELECT * FROM plateform_login";
//     connection.query(sqlsss, async function (err, appData) {
//       if (err) {
//         await logUser("App data fetch api failed websocket");
//       } else {
//         OAUTH2.accessToken = appData[0].access_token;
//         console.log('appData2222: ', appData[0].access_token);
//         const wsUrl = await getPortfolioFeedUrl(); // First, get the authorization
//         const ws = await connectWebSocket(wsUrl); // Then, connect to the WebSocket using the authorized URL
//       }
//     })
//   } catch (error) {
//     // Catch and log any errors
//     console.error("An error occurred:", error);
//   }
// })();

router.get('/tradedata', function (req, res) {
  async.waterfall([
    function (nextCall) {
      let data = {
        "status": "success",
        "data": {
          "candles": [
            {
              "date": "2023-09-29T00:00:00+05:30",
              "open": 52.15,
              "high": 53.8,
              "low": 52.15,
              "close": 52.8,
              "vol": 34377987,
              "oi": 0
            },
            {
              "date": "2023-09-28T00:00:00+05:30",
              "open": 52.3,
              "high": 52.75,
              "low": 51.6,
              "close": 51.9,
              "vol": 30832380,
              "oi": 0
            },
            {
              "date": "2023-09-27T00:00:00+05:30",
              "open": 51.8,
              "high": 52.4,
              "low": 51.1,
              "close": 52,
              "vol": 30241826,
              "oi": 0
            },
            {
              "date": "2023-09-26T00:00:00+05:30",
              "open": 52.4,
              "high": 52.8,
              "low": 51.45,
              "close": 51.6,
              "vol": 21271205,
              "oi": 0
            },
            {
              "date": "2023-09-25T00:00:00+05:30",
              "open": 52.45,
              "high": 52.7,
              "low": 51.5,
              "close": 52.25,
              "vol": 22810402,
              "oi": 0
            },
            {
              "date": "2023-09-22T00:00:00+05:30",
              "open": 52.6,
              "high": 53.9,
              "low": 51.85,
              "close": 52.05,
              "vol": 53675534,
              "oi": 0
            },
            {
              "date": "2023-09-21T00:00:00+05:30",
              "open": 54.45,
              "high": 55.4,
              "low": 51.75,
              "close": 52.35,
              "vol": 50891570,
              "oi": 0
            },
            {
              "date": "2023-09-20T00:00:00+05:30",
              "open": 53.9,
              "high": 56.35,
              "low": 52.9,
              "close": 55.5,
              "vol": 64391050,
              "oi": 0
            },
            {
              "date": "2023-09-18T00:00:00+05:30",
              "open": 54.8,
              "high": 55.45,
              "low": 53.85,
              "close": 54.2,
              "vol": 43412811,
              "oi": 0
            },
            {
              "date": "2023-09-15T00:00:00+05:30",
              "open": 56.5,
              "high": 56.6,
              "low": 54.1,
              "close": 54.8,
              "vol": 56993750,
              "oi": 0
            },
            {
              "date": "2023-09-14T00:00:00+05:30",
              "open": 52.35,
              "high": 56.85,
              "low": 51.6,
              "close": 55.9,
              "vol": 112962101,
              "oi": 0
            },
            {
              "date": "2023-09-13T00:00:00+05:30",
              "open": 50.5,
              "high": 52.2,
              "low": 49.35,
              "close": 51.9,
              "vol": 51861783,
              "oi": 0
            },
            {
              "date": "2023-09-12T00:00:00+05:30",
              "open": 55.2,
              "high": 55.7,
              "low": 50.15,
              "close": 50.7,
              "vol": 78423300,
              "oi": 0
            },
            {
              "date": "2023-09-11T00:00:00+05:30",
              "open": 53.45,
              "high": 55,
              "low": 52.55,
              "close": 54.7,
              "vol": 111372704,
              "oi": 0
            },
            {
              "date": "2023-09-08T00:00:00+05:30",
              "open": 54,
              "high": 54.25,
              "low": 52.2,
              "close": 52.8,
              "vol": 32792462,
              "oi": 0
            },
            {
              "date": "2023-09-07T00:00:00+05:30",
              "open": 53.55,
              "high": 54.35,
              "low": 53,
              "close": 53.95,
              "vol": 34030394,
              "oi": 0
            },
            {
              "date": "2023-09-06T00:00:00+05:30",
              "open": 53.25,
              "high": 53.6,
              "low": 52.15,
              "close": 53.3,
              "vol": 35282390,
              "oi": 0
            },
            {
              "date": "2023-09-05T00:00:00+05:30",
              "open": 52,
              "high": 53.7,
              "low": 51.6,
              "close": 52.7,
              "vol": 86754268,
              "oi": 0
            },
            {
              "date": "2023-09-04T00:00:00+05:30",
              "open": 50.8,
              "high": 52.35,
              "low": 50.6,
              "close": 51.3,
              "vol": 37020654,
              "oi": 0
            },
            {
              "date": "2023-09-01T00:00:00+05:30",
              "open": 50.35,
              "high": 51.05,
              "low": 49.9,
              "close": 50.25,
              "vol": 15600040,
              "oi": 0
            }
          ]
        }
      }
      nextCall(null, data);
    }
  ], function (err, response) {
    if (err) {
      return res.send({
        status_api: err.code ? err.code : 400,
        message: (err && err.msg) || "someyhing went wrong"
      });
    }
    return res.send({
      status_api: 200,
      message: "Single recored sucessfully",
      data: response
    });
  });
});

function filterTradingData(data, monthYearPattern) {
  // Convert monthYearPattern (e.g., "03/25") to regex-friendly format
  const [month, year] = monthYearPattern.split('/');
  const monthNames = {
      '01': 'JAN',
      '02': 'FEB',
      '03': 'MAR',
      '04': 'APR',
      '05': 'MAY',
      '06': 'JUN',
      '07': 'JUL',
      '08': 'AUG',
      '09': 'SEP',
      '10': 'OCT',
      '11': 'NOV',
      '12': 'DEC'
  };

  // Get the month name for the pattern
  const monthName = monthNames[month.padStart(2, '0')];
  
  // Filter the data
  return data.filter(item => {
      // Extract month and year from trading_symbol
      // Format example: "NIFTY 23800 PE 13 MAR 25"
      const symbolParts = item.trading_symbol.split(' ');
      const symbolMonth = symbolParts[symbolParts.length - 2]; // Get month part
      const symbolYear = symbolParts[symbolParts.length - 1];  // Get year part
      
      return symbolMonth === monthName && symbolYear === year;
  });
}

/** get Instruments apis with filters */
router.get('/instruments-get-data', function (req, res) {
  async.waterfall([
      function (nextCall) {
          // Start with base query
          let sqlQuery = "SELECT * FROM instrument_data WHERE 1=1";
          let queryParams = [];

          // Add filters based on query parameters

           if (req.query.segment) {
              sqlQuery += " AND segment = ?";
              queryParams.push(req.query.segment);
          }
        
          if (req.query.asset_symbol) {
              sqlQuery += " AND asset_symbol = ?";
              queryParams.push(req.query.asset_symbol);
          }

          if (req.query.instrument_type) {
              sqlQuery += " AND instrument_type = ?";
              queryParams.push(req.query.instrument_type);
          }

          if (req.query.strike_price) {
            const strikePrice = parseFloat(req.query.strike_price);
            
            if (req.query.offset) {
                // If offset is provided, create a range query
                const offset = parseFloat(req.query.offset);
                const lowerBound = strikePrice - offset;
                const upperBound = strikePrice + offset ;
                
                sqlQuery += " AND strike_price BETWEEN ? AND ?";
                queryParams.push(lowerBound);
                queryParams.push(upperBound);
                
            } else {
                // If no offset, use exact match
                sqlQuery += " AND strike_price = ?";
                queryParams.push(strikePrice);
            }
        }

          // Execute query with filters
          connection.query(sqlQuery, queryParams, async function (err, instrumentData) {
              if (err) {
                  await teleStockMsg("Instrument data fetch api failed");
                  await logUser("Instrument data fetch api failed");
                  return nextCall(err);
              }

              // Return the filtered data
              let filteredData;
              if(req.query.date){
                 filteredData = filterTradingData(instrumentData, req.query.date);
              }else{
                filteredData = instrumentData;
              }

              // Return the formatted response
              nextCall(null, {
              status: "success",
              data: {
                  candles: filteredData // Wrapping the array inside `candles`
              }
              });
          });
      }
  ], function (err, response) {
      if (err) {
          return res.status(err.code || 400).json({
              status_api: err.code || 400,
              message: (err && err.message) || "Something went wrong",
              data: err.data || null
          });
      }
      return res.status(200).json({
          status_api: 200,
          message: "Instruments data fetched successfully",
          data: response
      });
  });
});

/** instruments-data apis */
router.get('/instruments-data', function (req, res) {
  async.waterfall([
      // Step 1: Delete existing records
      function(nextCall) {
          const deleteQuery = "TRUNCATE TABLE instrument_data";
          connection.query(deleteQuery, function(err) {
              if (err) {
                  console.error('Error deleting records:', err);
                  return nextCall(err);
              }
              console.log('Successfully deleted all existing records');
              nextCall(null);
              
          });
      },
      // Step 2: Fetch and process new data
      function(nextCall) {
          axios({
              method: 'get',
              url: 'https://assets.upstox.com/market-quote/instruments/exchange/complete.json.gz',
              responseType: 'arraybuffer'
          })
          .then(response => {
              return gunzip(response.data);
          })
          .then(unzippedData => {
              const jsonData = JSON.parse(unzippedData.toString());
              
              // Filter data for NSE_FO segment and INDEX underlying_type
              // const filteredData = jsonData.filter(item => 
              //     item.segment === "NSE_FO" && 
              //     item.underlying_type === "INDEX"
              // );

            const filteredData = jsonData;
            const values = filteredData.map(item => [
              item.weekly || '',
              item.segment || '',
              item.name || '',
              item.exchange || '',
              item.expiry || '',
              item.instrument_type || '',
              item.asset_symbol || '',
              item.underlying_symbol || '',
              item.instrument_key || '',
              item.lot_size || '',
              item.freeze_quantity || '',
              item.exchange_token || '',
              item.minimum_lot || '',
              item.asset_key || '',
              item.underlying_key || '',
              item.tick_size || '',
              item.asset_type || '',
              item.underlying_type || '',
              item.trading_symbol || '',
              item.strike_price || '',
              item.qty_multiplier || '',
              item.isin || '',
              item.last_trading_date || '',
              item.price_quote_unit || '',
              item.security_type || '',
              item.short_name || ''
            ]);
            

              // SQL query for bulk insert
              const insertQuery = `
                  INSERT INTO instrument_data (
                      weekly,
                      segment,
                      name,
                      exchange,
                      expiry,
                      instrument_type,
                      asset_symbol,
                      underlying_symbol,
                      instrument_key,
                      lot_size,
                      freeze_quantity,
                      exchange_token,
                      minimum_lot,
                      asset_key,
                      underlying_key,
                      tick_size,
                      asset_type,
                      underlying_type,
                      trading_symbol,
                      strike_price,
                      qty_multiplier,
                      isin,
                      last_trading_date,
                      price_quote_unit,
                      security_type,
                      short_name
                  ) VALUES ?
              `;

              // Execute bulk insert
              connection.query(insertQuery, [values], function(err, result) {
                  if (err) {
                      console.error('Error inserting records:', err);
                      return nextCall(err);
                  }
                  console.log(`Successfully inserted ${result.affectedRows} new records`);
                  nextCall(null, `Successfully inserted ${result.affectedRows} new records`);
              });
          })
          .catch(error => {
              console.error('Error processing data:', error);
              nextCall(error);
          });
      }
  ], function(err, response) {
      if (err) {
          return res.status(err.code || 400).json({
              status_api: err.code || 400,
              message: (err && err.message) || "Something went wrong",
              data: err.data || null
          });
      }
      return res.status(200).json({
          status_api: 200,
          message: "Instruments data refreshed successfully",
          data: response
      });
  });
});
setInterval(function setup() {
  let sqlsss = "SELECT * FROM app_data";
  connection.query(sqlsss, async function (err, appData) {
    console.log('appData: ', appData);
    if (err) {
      await logUser("App data fetch api failed");
    } else {
     
      testServer();
      console.log('appData: ', appData[0]);
    }
  })
}, 19000)

function testServer(){   
  request({
    uri: "https://stockbot-wkri.onrender.com/",
    method: "GET",
  }, (err, response, body) => {
    console.log('body: ', body);
  })
}

/** Authentication apis */
router.get('/login', function (req, res) {
  async.waterfall([
    function (nextCall) {
      // let requestHeaders = {
      //   "accept": "application/json",
      //   "Api-Version": "2.0"
      // }
      // request({
      //   uri: "https://api-v2.upstox.com/login/authorization/dialog?client_id="+ req.params.client_id +"&redirect_uri="+ req.params.redirect_uri,
      //   method: "GET",
      //   headers: requestHeaders
      // }, (err, response, body) => {
      //   console.log('body: ', body);
      // })
      let sqlsss = "SELECT * FROM app_data";
      connection.query(sqlsss, async function (err, appData) {
        console.log('appData: ', appData);
        if (err) {
          await teleStockMsg("App data fetch api failed");
          await logUser("App data fetch api failed");
        } else {

          let requestHeaders1 = {
            "accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
            "Api-Version": "2.0"
          }

          let data = {
            'client_id': appData[0].client_id,
            'client_secret': appData[0].client_secret,
            'code': req.query.code,
            'grant_type': "authorization_code",
            'redirect_uri': appData[0].redirect_uri
          }

          request({
            uri: "https://api-v2.upstox.com/login/authorization/token",
            method: "POST",
            body: qs.stringify(data),
            headers: requestHeaders1
          }, async (err, response, success) => {
            if (err) {
              await teleStockMsg("upstox login failed");
              await logUser("upstox login failed");
              return nextCall({
                "message": "something went wrong",
                "data": null
              });
            } else {
              let finalData = JSON.parse(success);
              finalData.client_id = data.client_id;
              finalData.client_secret = data.client_secret;
              finalData.redirect_uri = data.redirect_uri;
              if (finalData.status && finalData.status == "error") {
                finalData.status1 = "logout";
                await updateLoginUser(finalData)
                await teleStockMsg("upstox login failed")
                await logUser("upstox login failed")
                return nextCall({
                  "message": "something went wrong",
                  "data": finalData
                });
              } else {
                finalData.status1 = "login";
                await checkloginUser(finalData)
                nextCall(null, finalData);
              }
            }
          })
        }
      })
    },
  ], function (err, response) {
    if (err) {
      return res.send({
        status_api: err.code ? err.code : 400,
        message: (err && err.message) || "someyhing went wrong",
        data: err.data ? err.data : null
      });
    }
    return res.send({
      status_api: 200,
      message: "Auth generate successfully",
      data: response
    });
  });
});

/** historical-data apis */
router.get('/historical-data', function (req, res) {
  async.waterfall([
    function (nextCall) {
      let sqlsss = "SELECT * FROM plateform_login";
      connection.query(sqlsss, async function (err, appData) {
        if (err) {
          await teleStockMsg("App data fetch api failed");
          await logUser("App data fetch api failed");
        } else {
          let requestHeaders1 = {
            "accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
            "Api-Version": "2.0",
            "Authorization": "Bearer " + appData[0].access_token
          }

          request({
            uri: "https://api-v2.upstox.com/historical-candle/" + req.query.instrumentKey + "/" + req.query.interval + "/" + req.query.to_date + "/" + req.query.from_date,
            method: "GET",
            headers: requestHeaders1
          }, async (err, response, success) => {
            if (err) {
              await teleStockMsg("Historical candle data featch failed");
              await logUser("Historical candle data featch failed");
              return nextCall({
                "message": "something went wrong",
                "data": null
              });
            } else {
              let finalData = JSON.parse(success);
              if (finalData.status && finalData.status == "error") {
                finalData.client_secret = appData[0].client_secret;
                finalData.status1 = "logout";
                await updateLoginUser(finalData)
                await teleStockMsg("Historical candle data featch failed")
                await logUser("Historical candle data featch failed")
                return nextCall({
                  "message": "something went wrong",
                  "data": finalData
                });
              } else {
                let originalCandles = finalData.data.candles;
                let convertedCandles = originalCandles.map(candle => {
                  return {
                    "date": candle[0],
                    "open": candle[1],
                    "high": candle[2],
                    "low": candle[3],
                    "close": candle[4],
                    "vol": candle[5],
                    "oi": candle[6]
                  };
                });
                let desiredFormat = {
                  "status": "success",
                  "data": {
                    "candles": convertedCandles
                  }
                };
                await teleStockMsg("Historical candle data featch successfully")
                await logUser("Historical candle data featch successfully")
                nextCall(null, desiredFormat);
              }
            }
          })
        }
      })
    },
  ], function (err, response) {
    if (err) {
      return res.send({
        status_api: err.code ? err.code : 400,
        message: (err && err.message) || "someyhing went wrong",
        data: err.data ? err.data : null
      });
    }
    return res.send({
      status_api: 200,
      message: "Historical data get successfully",
      data: response
    });
  });
});

/** Buy/sell apis */
router.get('/buySellApi', function (req, res) {
  async.waterfall([
    function (nextCall) {
      let sqlsss = "SELECT * FROM plateform_login";
      connection.query(sqlsss, async function (err, appData) {
        let finalDate =  moment.tz('Asia/Kolkata').format('HH:mm ss:SSS');
        let finalDateTime =  moment.tz('Asia/Kolkata').format('DD-MM-YYYY HH:mm ss:SSS');
        if (err) {
          await teleStockMsg("App data fetch api failed");
          await logUser("App data fetch api failed");
        } else {
          if(req.query.live_trade == 'true' || req.query.live_trade == 'TRUE'){
          let requestHeaders1 = {
            "accept": "application/json",
            "Content-Type": "application/json",
            "Api-Version": "2.0",
            "Authorization": "Bearer " + appData[0].access_token
          }

          let data = {
            'quantity': Number(req.query.quantity),
            'product': req.query.product,
            'validity': req.query.validity,
            'price': Number(req.query.price),
            'tag': req.query.tag,
            'order_type': req.query.order_type,
            'instrument_token': req.query.instrument_token,
            'transaction_type': req.query.transaction_type,
            'disclosed_quantity': Number(req.query.disclosed_quantity),
            'trigger_price': Number(req.query.trigger_price),
            'is_amo': req.query.is_amo = 'false' ? false : true
          }

          request({
            uri: "https://api-v2.upstox.com/order/place",
            method: "POST",
            body: JSON.stringify(data),
            headers: requestHeaders1
          }, async (err, response, success) => {
            if (err) {
              await teleStockMsg("<b>SS</b>😔 BuySellApi candle data failed "+ finalDate);
              await logUser("BuySellApi candle data failed");
              return nextCall({
                "message": "something went wrong",
                "data": null
              });
            } else {
              let finalData = JSON.parse(success);
              if (finalData.status && finalData.status == "error") {
                finalData.client_secret = appData[0].client_secret;
                finalData.status1 = "logout";
                await updateLoginUser(finalData)
                await teleStockMsg("<b>SS</b>😔 BuySellApi candle data failed "+ finalDate)
                await logUser("BuySellApi candle data failed")
                return nextCall({
                  "message": "something went wrong",
                  "data": finalData
                });
              } else {
                req.query.order_id = finalData.data.order_id;
                req.query.user_id = appData[0].user_id;
                // await orderBookDb(req.query);
                let html;
                if(req.query.order_type != 'SL' && req.query.order_type != 'SL-M'){
                  html = '<b>Account Id : </b> Sonal <b>[Upstock]</b> \n\n' +
                 '🔀 <b>Direction : </b> <b> ' + req.query.transaction_type + '</b>'+(req.query.transaction_type == 'BUY'? '🟢' : '🔴')+'\n' +
                 '🌐 <b>Script : </b> ' + req.query.instrument_token + '\n' +
                 '💰 <b>Price : ₹</b> ' + req.query.price + '\n' +
                 '🚫 <b>Qty : </b> ' + req.query.quantity + '\n' +
                 '📈 <b>Mode : </b> ' + req.query.order_type + '\n' +
                 '🕙 <b>Trade Time : </b> ' + finalDateTime + '\n' +
                 '📋 <b>Order Id : </b> ' + req.query.order_id + '\n' ;
                }else{
                  html = '<b>Account Id : </b> Sonal <b>[Upstock]</b> \n\n' +
                 '🔀 <b>Direction : </b> <b> ' + req.query.transaction_type + '</b>'+(req.query.transaction_type == 'BUY'? '🟢' : '🔴')+'\n' +
                 '🌐 <b>Script : </b> ' + req.query.instrument_token + '\n' +
                 '💰 <b>Price : ₹</b> ' + req.query.price + '\n' +
                 '🚫 <b>Qty : </b> ' + req.query.quantity + '\n' +
                 '📈 <b>Mode : </b> ' + req.query.order_type + '\n' +
                 '👉 <b>Trigger Price : </b> ' + req.query.trigger_price + '\n' +
                 '🕙 <b>Trade Time : </b> ' + finalDateTime + '\n' +
                 '📋 <b>Order Id : </b> ' + req.query.order_id + '\n' ;
                }
                // '🟢 <b>High Value : </b> <i> ' + finalData.high_value + '</i>\n' +
                // '🔴 <b>Low Value : </b> <i> ' + finalData.low_value + '</i>\n';
                await teleStockMsg(html);
                await teleAnotherStockMsg(html);
                await logUser("BuySellApi candle data featch successfully")
                nextCall(null, finalData);
              }
            }
          })
         }else{
          await teleStockMsg("<b>SS</b>🏷️ "+req.query.order_type +" api featch but no order")
          await logUser(req.query.order_type +" api featch but no order")
          // await orderModify(req.query);
          nextCall(null, req.query);
         }
        }
      })
    },
  ], function (err, response) {
    if (err) {
      return res.send({
        status_api: err.code ? err.code : 400,
        message: (err && err.message) || "someyhing went wrong",
        data: err.data ? err.data : null
      });
    }
    return res.send({
      status_api: 200,
      message: "BuySellApi Order successfully",
      data: response
    });
  });
});

router.get('/gttBuySellApi', function (req, res) {
  async.waterfall([
    function (nextCall) {
      let sqlsss = "SELECT * FROM plateform_login";
      connection.query(sqlsss, async function (err, appData) {
        let finalDate = moment.tz('Asia/Kolkata').format('HH:mm ss:SSS');
        let finalDateTime = moment.tz('Asia/Kolkata').format('DD-MM-YYYY HH:mm ss:SSS');
        
        if (err) {
          await teleStockMsg("App data fetch api failed");
          await logUser("App data fetch api failed");
        } else {
          if (req.query.live_trade == 'true' || req.query.live_trade == 'TRUE') {
            let requestHeaders1 = {
              "accept": "application/json",
              "Content-Type": "application/json",
              "Api-Version": "2.0",
              "Authorization": "Bearer " + appData[0].access_token
            }

            // Get base price from the request (current price)
            const basePrice = Number(req.query.price);

            // Calculate take profit (TP) price based on provided parameters
            let targetTriggerPrice;
            if (req.query.tp_name === 'percent') {
              targetTriggerPrice = basePrice + (basePrice * Number(req.query.tp_value) / 100);  // Calculate % above the base price
            } else if (req.query.tp_name === 'price') {
              targetTriggerPrice = Number(req.query.tp_value);  // Use the exact value provided for TP
            }else{
              targetTriggerPrice = basePrice + Number(req.query.tp_value);  // Use the exact value provided for TP
            }

            // Calculate stop loss (SL) price based on provided parameters
            let stoplossTriggerPrice;
            if (req.query.sl_name === 'percent') {
              stoplossTriggerPrice = basePrice - (basePrice * Number(req.query.sl_value) / 100);  // Calculate % below the base price
            } else if (req.query.sl_name === 'price') {
              stoplossTriggerPrice = Number(req.query.sl_value);  // Use the exact value provided for SL
            }else{
              stoplossTriggerPrice = basePrice - Number(req.query.sl_value);  // Use the exact value provided for TP
            }

            // Adjust ENTRY trigger for Buy or Sell orders
            let entryTriggerPrice = (req.query.transaction_type === 'BUY') ? basePrice : basePrice;

            // If it's a SELL order, reverse TP and SL calculations
            if (req.query.transaction_type === 'SELL') {
              targetTriggerPrice = (req.query.tp_name === 'percent') ? basePrice - (basePrice * Number(req.query.tp_value) / 100) : ((req.query.tp_name === 'price') ? Number(req.query.tp_value) : basePrice - Number(req.query.tp_value));
              stoplossTriggerPrice = (req.query.sl_name === 'percent') ? basePrice + (basePrice * Number(req.query.sl_value) / 100) : ((req.query.sl_name === 'price') ? Number(req.query.sl_value) : basePrice + Number(req.query.sl_value));
            }

            let gttOrderData = {
              'type': 'MULTIPLE',  // Multiple strategy type
              'quantity': Number(req.query.quantity),
              'product': req.query.product,  // 'D' for delivery, 'M' for margin
              'instrument_token': req.query.instrument_token,
              'transaction_type': req.query.transaction_type,  // 'BUY' or 'SELL'
              'rules': [
                {
                  "strategy": "ENTRY",  // Entry rule
                  "trigger_type": "IMMEDIATE",  // Below price trigger for Buy and Sell
                  "trigger_price": entryTriggerPrice  // Entry price
                },
                {
                  "strategy": "TARGET",  // Target rule
                  "trigger_type": "IMMEDIATE",  // Immediate execution
                  "trigger_price": targetTriggerPrice  // Calculated target price
                },
                {
                  "strategy": "STOPLOSS",  // Stop loss rule
                  "trigger_type": "IMMEDIATE",  // Immediate execution
                  "trigger_price": stoplossTriggerPrice  // Calculated stoploss price
                }
              ]
            }

            axios.post('https://api.upstox.com/v3/order/gtt/place', gttOrderData, { headers: requestHeaders1 })
              .then(async (response) => {
                let finalData = response.data;
                if (finalData.status && finalData.status == "error") {
                  finalData.client_secret = appData[0].client_secret;
                  finalData.status1 = "logout";
                  await updateLoginUser(finalData);
                  await teleStockMsg("<b>SS</b> GTT Order failed " + finalDate);
                  await logUser("GTT Order failed");
                  return nextCall({
                    "message": "something went wrong",
                    "data": finalData
                  });
                } else {
                  req.query.order_id = finalData.data.gtt_order_ids[0];
                  req.query.user_id = appData[0].user_id;
                // await orderBookDb(req.query);

                  let html = '<b>Account Id : </b> Sonal <b>[Upstock]</b> \n\n' +
                    '🔀 <b>Direction : </b> <b> ' + req.query.transaction_type + '</b>' + (req.query.transaction_type == 'BUY' ? '🟢' : '🔴') + '\n' +
                    '🌐 <b>Script : </b> ' + req.query.instrument_token + '\n' +
                    '💰 <b>Price : ₹</b> ' + req.query.price + '\n' +
                    '🚫 <b>Qty : </b> ' + req.query.quantity + '\n' +
                    '📈 <b>Mode : </b> ' + req.query.order_type + '\n' +
                    '👉 <b>Trigger Price : </b> ' + req.query.trigger_price + '\n' +
                    '🕙 <b>Trade Time : </b> ' + finalDateTime + '\n' +
                    '📋 <b>Order Id : </b> ' + req.query.order_id + '\n';

                  await teleStockMsg(html);
                  await teleAnotherStockMsg(html);
                  await logUser("GTT Order placed successfully");
                  nextCall(null, finalData);
                }
              })
              .catch(async (err) => {
                await teleStockMsg("<b>SS</b> GTT Order failed " + finalDate);
                await logUser("GTT Order failed");
                return nextCall({
                  "message": "something went wrong",
                  "data": err
                });
              });
          } else {
            await teleStockMsg("<b>SS</b> GTT API fetched but no order placed");
            await logUser("GTT API fetched but no order placed");
            nextCall(null, req.query);
          }
        }
      });
    },
  ], function (err, response) {
    if (err) {
      return res.send({
        status_api: err.code ? err.code : 400,
        message: (err && err.message) || "something went wrong",
        data: err.data ? err.data : null
      });
    }
    return res.send({
      status_api: 200,
      message: "GTT Order successfully placed",
      data: response
    });
  });
});

/** Gtt Order cancel apis */
router.get('/gttOrderCancel', function (req, res) {
  async.waterfall([
    function (nextCall) {
      let sqlsss = "SELECT * FROM plateform_login";
      connection.query(sqlsss, async function (err, appData) {
        if (err) {
          await teleStockMsg("App data fetch API failed");
          await logUser("App data fetch API failed");
          return nextCall({ message: "Database error", data: null });
        } else {
          const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + appData[0].access_token
          };

          const data = {
            gtt_order_id: req.query.order_id
          };

          try {
            const response = await axios.delete("https://api.upstox.com/v3/order/gtt/cancel", {
              headers,
              data
            });

            const finalData = response.data;

            if (finalData.status && finalData.status === "error") {
              finalData.client_secret = appData[0].client_secret;
              finalData.status1 = "logout";
              await updateLoginUser(finalData);
              await teleStockMsg("GTT Order cancel fetch failed");
              await logUser("GTT Order cancel fetch failed");
              return nextCall({
                message: "Something went wrong",
                data: finalData
              });
            } else {
              await logUser("GTT order cancelled successfully");
              return nextCall(null, finalData);
            }
          } catch (error) {
            await teleStockMsg("GTT Order cancel fetch failed");
            await logUser("GTT Order cancel fetch failed");
            return nextCall({
              message: error?.response?.data?.message || "Something went wrong",
              data: error?.response?.data || null
            });
          }
        }
      });
    }
  ], function (err, response) {
    if (err) {
      return res.send({
        status_api: err.code ? err.code : 400,
        message: err.message || "Something went wrong",
        data: err.data || null
      });
    }
    return res.send({
      status_api: 200,
      message: "Order cancelled successfully",
      data: response
    });
  });
});

/** Order modify apis */
router.get('/orderModifyApi', function (req, res) {
  async.waterfall([
    function (nextCall) {
      let sqlsss = "SELECT * FROM plateform_login";
      connection.query(sqlsss, async function (err, appData) {
        if (err) {
          await teleStockMsg("App data fetch api failed");
          await logUser("App data fetch api failed");
        } else {
          let requestHeaders1 = {
            "accept": "application/json",
            "Content-Type": "application/json",
            "Api-Version": "2.0",
            "Authorization": "Bearer " + appData[0].access_token
          }

          let data = {
            'quantity': Number(req.query.quantity),
            'order_id': req.query.order_id,
            'validity': req.query.validity,
            'price': Number(req.query.price),
            'order_type': req.query.order_type,
            'disclosed_quantity': Number(req.query.disclosed_quantity),
            'trigger_price': Number(req.query.trigger_price)
          }

          request({
            uri: "https://api-v2.upstox.com/order/modify",
            method: "POST",
            body: JSON.stringify(data),
            headers: requestHeaders1
          }, async (err, response, success) => {
            if (err) {
              await teleStockMsg("Order modify apis candle data featch failed");
              await logUser("Order modify apis candle data featch failed");
              return nextCall({
                "message": "something went wrong",
                "data": null
              });
            } else {
              let finalData = JSON.parse(success);
              if (finalData.status && finalData.status == "error") {
                finalData.client_secret = appData[0].client_secret;
                finalData.status1 = "logout";
                await updateLoginUser(finalData)
                await teleStockMsg("Order modify apis candle data featch failed")
                await logUser("Order modify apis candle data featch failed")
                return nextCall({
                  "message": "something went wrong",
                  "data": finalData
                });
              } else {
                await teleStockMsg("Order modify apis candle data featch successfully")
                await logUser("Order modify apis candle data featch successfully")
                nextCall(null, finalData);
              }
            }
          })
        }
      })
    },
  ], function (err, response) {
    if (err) {
      return res.send({
        status_api: err.code ? err.code : 400,
        message: (err && err.message) || "someyhing went wrong",
        data: err.data ? err.data : null
      });
    }
    return res.send({
      status_api: 200,
      message: "Order modify apis successfully",
      data: response
    });
  });
});


/** intraday apis */
router.get('/intraday', function (req, res) {
  async.waterfall([
    function (nextCall) {
      let sqlsss = "SELECT * FROM plateform_login";
      connection.query(sqlsss, async function (err, appData) {
        let finalDate =  moment.tz('Asia/Kolkata').format('HH:mm ss:SSS');
        if (err) {
          await teleStockMsg("<b>SS</b>🔴 App data candle data featch failed "+ finalDate);
          await logUser("App data fetch api failed");
        } else {
          let requestHeaders1 = {
            "accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
            "Api-Version": "2.0",
            "Authorization": "Bearer " + appData[0].access_token
          }

          request({
            uri: "https://api-v2.upstox.com/historical-candle/intraday/" + req.query.instrumentKey + "/" + req.query.interval,
            method: "GET",
            headers: requestHeaders1
          }, async (err, response, success) => {
            if (err) {
              await teleStockMsg("<b>SS</b>🔴 Intraday candle featch failed "+ finalDate);
              await logUser("Intraday candle featch failed");
              return nextCall({
                "message": "something went wrong",
                "data": null
              });
            } else {
              let finalData = JSON.parse(success);
              if (finalData.status && finalData.status == "error") {
                finalData.client_secret = appData[0].client_secret;
                finalData.status1 = "logout";
                await updateLoginUser(finalData)
                await teleStockMsg("<b>SS</b>🔴 Intraday candle featch failed "+ finalDate)
                await logUser("Intraday candle featch failed")
                return nextCall({
                  "message": "something went wrong",
                  "data": finalData
                });
              } else {
                let originalCandles = finalData.data.candles;
                let convertedCandles = originalCandles.map(candle => {
                  return {
                    "date": candle[0],
                    "open": candle[1],
                    "high": candle[2],
                    "low": candle[3],
                    "close": candle[4],
                    "vol": candle[5],
                    "oi": candle[6]
                  };
                });
                let desiredFormat = {
                  "status": "success",
                  "data": {
                    "candles": convertedCandles
                  }
                };
                await teleStockMsg('<b>SS</b>🟢 Intraday candle : '+ finalDate)
                await logUser("Intraday candle featch successfully")
                nextCall(null, desiredFormat);
              }
            }
          })
        }
      })
    },
  ], function (err, response) {
    if (err) {
      return res.send({
        status_api: err.code ? err.code : 400,
        message: (err && err.message) || "someyhing went wrong",
        data: err.data ? err.data : null
      });
    }
    return res.send({
      status_api: 200,
      message: "Intraday data get successfully",
      data: response
    });
  });
});

/** Order book list apis */
router.get('/orderBookList', function (req, res) {
  async.waterfall([
    function (nextCall) {
      let sqlsss = "SELECT * FROM plateform_login";
      connection.query(sqlsss, async function (err, appData) {
        if (err) {
          await teleStockMsg("App data fetch api failed");
          await logUser("App data fetch api failed");
        } else {
          let requestHeaders1 = {
            "accept": "application/json",
            "Api-Version": "2.0",
            "Authorization": "Bearer " + appData[0].access_token
          }

          request({
            uri: "https://api-v2.upstox.com/order/retrieve-all",
            method: "GET",
            headers: requestHeaders1
          }, async (err, response, success) => {
            if (err) {
              await teleStockMsg("Order book list data featch failed");
              await logUser("Order book list data featch failed");
              return nextCall({
                "message": "something went wrong",
                "data": null
              });
            } else {
              let finalData = JSON.parse(success);
              if (finalData.status && finalData.status == "error") {
                finalData.client_secret = appData[0].client_secret;
                finalData.status1 = "logout";
                await updateLoginUser(finalData)
                await teleStockMsg("Order book list data featch failed")
                await logUser("Order book list data featch failed")
                return nextCall({
                  "message": "something went wrong",
                  "data": finalData
                });
              } else {
                await logUser("Order book list candle data featch successfully")
                nextCall(null, finalData);
              }
            }
          })
        }
      })
    },
  ], function (err, response) {
    if (err) {
      return res.send({
        status_api: err.code ? err.code : 400,
        message: (err && err.message) || "someyhing went wrong",
        data: err.data ? err.data : null
      });
    }
    return res.send({
      status_api: 200,
      message: "Order book list get successfully",
      data: response
    });
  });
});

/** Order cancel apis */
router.get('/orderCancel', function (req, res) {
  async.waterfall([
    function (nextCall) {
      let sqlsss = "SELECT * FROM plateform_login";
      connection.query(sqlsss, async function (err, appData) {
        if (err) {
          await teleStockMsg("App data fetch api failed");
          await logUser("App data fetch api failed");
        } else {
          let requestHeaders1 = {
            "accept": "application/json",
            "Api-Version": "2.0",
            "Authorization": "Bearer " + appData[0].access_token
          }

          request({
            uri: "https://api-v2.upstox.com/order/cancel?order_id="+ req.query.order_id,
            method: "DELETE",
            headers: requestHeaders1
          }, async (err, response, success) => {
            if (err) {
              await teleStockMsg("Order cancel featch failed");
              await logUser("Order cancel featch failed");
              return nextCall({
                "message": "something went wrong",
                "data": null
              });
            } else {
              let finalData = JSON.parse(success);
              if (finalData.status && finalData.status == "error") {
                finalData.client_secret = appData[0].client_secret;
                finalData.status1 = "logout";
                await updateLoginUser(finalData)
                await teleStockMsg("Order cancel featch failed")
                await logUser("Order cancel featch failed")
                return nextCall({
                  "message": "something went wrong",
                  "data": finalData
                });
              } else {
                await logUser("Order book list candle data featch successfully")
                nextCall(null, finalData);
              }
            }
          })
        }
      })
    },
  ], function (err, response) {
    if (err) {
      return res.send({
        status_api: err.code ? err.code : 400,
        message: (err && err.message) || "someyhing went wrong",
        data: err.data ? err.data : null
      });
    }
    return res.send({
      status_api: 200,
      message: "Order cancel successfully",
      data: response
    });
  });
});

/** Market quotes LTP . apis */
router.get('/marketQuotesLTP', function (req, res) {
  async.waterfall([
    function (nextCall) {
      let sqlsss = "SELECT * FROM plateform_login";
      connection.query(sqlsss, async function (err, appData) {
        if (err) {
          await teleStockMsg("App data fetch api failed");
          await logUser("App data fetch api failed");
        } else {
          let requestHeaders1 = {
            "accept": "application/json",
            "Api-Version": "2.0",
            "Authorization": "Bearer " + appData[0].access_token
          }

          request({
            uri: "https://api-v2.upstox.com/market-quote/ltp?instrument_key="+ req.query.instrument_key,
            method: "GET",
            headers: requestHeaders1
          }, async (err, response, success) => {
            if (err) {
              await teleStockMsg("Market quotes LTP featch failed");
              await logUser("Market quotes LTP featch failed");
              return nextCall({
                "message": "something went wrong",
                "data": null
              });
            } else {
              let finalData = JSON.parse(success);
              if (finalData.status && finalData.status == "error") {
                finalData.client_secret = appData[0].client_secret;
                finalData.status1 = "logout";
                await updateLoginUser(finalData)
                await teleStockMsg("Market quotes LTP featch failed")
                await logUser("Market quotes LTP featch failed")
                return nextCall({
                  "message": "something went wrong",
                  "data": finalData
                });
              } else {
                let originalCandles = finalData.data;
                let convertedCandles =  Object.entries(originalCandles).map(([key, value]) => ({
                  "name": key,
                  "last_price": value.last_price,
                  "instrument_token": value.instrument_token
                }))
                let desiredFormat = {
                  "status": "success",
                  "data": {
                    "instrument": convertedCandles
                  }
                };
                await logUser("Market quotes LTP featch successfully")
                nextCall(null, desiredFormat);
              }
            }
          })
        }
      })
    },
  ], function (err, response) {
    if (err) {
      return res.send({
        status_api: err.code ? err.code : 400,
        message: (err && err.message) || "someyhing went wrong",
        data: err.data ? err.data : null
      });
    }
    return res.send({
      status_api: 200,
      message: "Market quotes LTP successfully",
      data: response
    });
  });
});

/** getHolding apis */
router.get('/getHolding', function (req, res) {
  async.waterfall([
    function (nextCall) {
      let sqlsss = "SELECT * FROM plateform_login";
      connection.query(sqlsss, async function (err, appData) {
        if (err) {
          await teleStockMsg("App data fetch api failed");
          await logUser("App data fetch api failed");
        } else {
          let requestHeaders1 = {
            "accept": "application/json",
            "Api-Version": "2.0",
            "Authorization": "Bearer " + appData[0].access_token
          }

          request({
            uri: "https://api.upstox.com/v2/portfolio/long-term-holdings",
            method: "GET",
            headers: requestHeaders1
          }, async (err, response, success) => {
            if (err) {
              await teleStockMsg("getHolding data featch failed");
              await logUser("getHolding data featch failed");
              return nextCall({
                "message": "something went wrong",
                "data": null
              });
            } else {
              let finalData = JSON.parse(success);
              if (finalData.status && finalData.status == "error") {
                finalData.client_secret = appData[0].client_secret;
                finalData.status1 = "logout";
                await updateLoginUser(finalData)
                await teleStockMsg("getHolding data featch failed")
                await logUser("getHolding data featch failed")
                return nextCall({
                  "message": "something went wrong",
                  "data": finalData
                });
              } else {
                await logUser("getHolding candle data featch successfully")
                nextCall(null, finalData);
              }
            }
          })
        }
      })
    },
  ], function (err, response) {
    if (err) {
      return res.send({
        status_api: err.code ? err.code : 400,
        message: (err && err.message) || "someyhing went wrong",
        data: err.data ? err.data : null
      });
    }
    return res.send({
      status_api: 200,
      message: "getHolding get successfully",
      data: response
    });
  });
});

/** getFundsAndMargin apis */
router.get('/getFundsAndMargin', function (req, res) {
  async.waterfall([
    function (nextCall) {
      let sqlsss = "SELECT * FROM plateform_login";
      connection.query(sqlsss, async function (err, appData) {
        if (err) {
          await teleStockMsg("App data fetch api failed");
          await logUser("App data fetch api failed");
        } else {
          let requestHeaders1 = {
            "accept": "application/json",
            "Api-Version": "2.0",
            "Authorization": "Bearer " + appData[0].access_token
          }

            // Base URL
          let apiUrl = "https://api.upstox.com/v2/user/get-funds-and-margin";
          
          // Append segment if provided
          if (req.query.segment) {
            apiUrl += `?segment=${req.query.segment}`;
          }

          request({
            uri: apiUrl,
            method: "GET",
            headers: requestHeaders1
          }, async (err, response, success) => {
            if (err) {
              await teleStockMsg("getFundsAndMargin data featch failed");
              await logUser("getFundsAndMargin data featch failed");
              return nextCall({
                "message": "something went wrong",
                "data": null
              });
            } else {
              let finalData = JSON.parse(success);
              if (finalData.status && finalData.status == "error") {
                finalData.client_secret = appData[0].client_secret;
                finalData.status1 = "logout";
                await updateLoginUser(finalData)
                await teleStockMsg("getFundsAndMargin data featch failed")
                await logUser("getFundsAndMargin data featch failed")
                return nextCall({
                  "message": "something went wrong",
                  "data": finalData
                });
              } else {
                await logUser("getFundsAndMargin data featch successfully")
                nextCall(null, finalData);
              }
            }
          })
        }
      })
    },
  ], function (err, response) {
    if (err) {
      return res.send({
        status_api: err.code ? err.code : 400,
        message: (err && err.message) || "someyhing went wrong",
        data: err.data ? err.data : null
      });
    }
    return res.send({
      status_api: 200,
      message: "getFundsAndMargin get successfully",
      data: response
    });
  });
});

/** getOptionGreeks apis */
router.get('/getOptionGreeks', function (req, res) {
  async.waterfall([
    function (nextCall) {
      let sqlsss = "SELECT * FROM plateform_login";
      connection.query(sqlsss, async function (err, appData) {
        if (err) {
          await teleStockMsg("App data fetch api failed");
          await logUser("App data fetch api failed");
        } else {
          let requestHeaders1 = {
            "accept": "application/json",
            "Api-Version": "2.0",
            "Authorization": "Bearer " + appData[0].access_token
          }

            // Base URL
          let apiUrl = "https://api.upstox.com/v3/market-quote/option-greek";
          
          // Append instrument_key if provided
          if (req.query.instrument_key) {
            apiUrl += `?instrument_key=${req.query.instrument_key}`;
          }

          request({
            uri: apiUrl,
            method: "GET",
            headers: requestHeaders1
          }, async (err, response, success) => {
            if (err) {
              await teleStockMsg("getOptionGreeks data featch failed");
              await logUser("getOptionGreeks data featch failed");
              return nextCall({
                "message": "something went wrong",
                "data": null
              });
            } else {
              let finalData = JSON.parse(success);
              if (finalData.status && finalData.status == "error") {
                finalData.client_secret = appData[0].client_secret;
                finalData.status1 = "logout";
                await updateLoginUser(finalData)
                await teleStockMsg("getOptionGreeks data featch failed")
                await logUser("getOptionGreeks data featch failed")
                return nextCall({
                  "message": "something went wrong",
                  "data": finalData
                });
              } else {
                await logUser("getOptionGreeks data featch successfully")
                nextCall(null, finalData);
              }
            }
          })
        }
      })
    },
  ], function (err, response) {
    if (err) {
      return res.send({
        status_api: err.code ? err.code : 400,
        message: (err && err.message) || "someyhing went wrong",
        data: err.data ? err.data : null
      });
    }
    return res.send({
      status_api: 200,
      message: "getOptionGreeks get successfully",
      data: response
    });
  });
});

/** getPutCallOptionChain apis */
router.get('/getPutCallOptionChain', function (req, res) {
  async.waterfall([
    function (nextCall) {
      let sqlsss = "SELECT * FROM plateform_login";
      connection.query(sqlsss, async function (err, appData) {
        if (err) {
          await teleStockMsg("App data fetch api failed");
          await logUser("App data fetch api failed");
        } else {
          let requestHeaders1 = {
            "accept": "application/json",
            "Api-Version": "2.0",
            "Authorization": "Bearer " + appData[0].access_token
          }

            // Base URL
          let apiUrl = "https://api.upstox.com/v2/option/chain";
          
          // Append instrument_key if provided
          if (req.query.instrument_key && req.query.expiry_date) {
            apiUrl += `?instrument_key=${req.query.instrument_key}&expiry_date=${req.query.expiry_date}`;
          }

          request({
            uri: apiUrl,
            method: "GET",
            headers: requestHeaders1
          }, async (err, response, success) => {
            if (err) {
              await teleStockMsg("getPutCallOptionChain data featch failed");
              await logUser("getPutCallOptionChain data featch failed");
              return nextCall({
                "message": "something went wrong",
                "data": null
              });
            } else {
              let finalData = JSON.parse(success);
              if (finalData.status && finalData.status == "error") {
                finalData.client_secret = appData[0].client_secret;
                finalData.status1 = "logout";
                await updateLoginUser(finalData)
                await teleStockMsg("getPutCallOptionChain data featch failed")
                await logUser("getPutCallOptionChain data featch failed")
                return nextCall({
                  "message": "something went wrong",
                  "data": finalData
                });
              } else {
                await logUser("getPutCallOptionChain data featch successfully")
                nextCall(null, finalData);
              }
            }
          })
        }
      })
    },
  ], function (err, response) {
    if (err) {
      return res.send({
        status_api: err.code ? err.code : 400,
        message: (err && err.message) || "someyhing went wrong",
        data: err.data ? err.data : null
      });
    }
    return res.send({
      status_api: 200,
      message: "getPutCallOptionChain get successfully",
      data: response
    });
  });
});

/** getMarginDetails apis */
router.get('/getMarginDetails', function (req, res) {
  async.waterfall([
    function (nextCall) {
      let sqlsss = "SELECT * FROM plateform_login";
      connection.query(sqlsss, async function (err, appData) {
        if (err) {
          await teleStockMsg("App data fetch api failed");
          await logUser("App data fetch api failed");
        } else {
          let requestHeaders1 = {
            "accept": "application/json",
            "Api-Version": "2.0",
            "Authorization": "Bearer " + appData[0].access_token,
            "Content-Type": "application/json"
          }

          const data = {
            instruments: [
              {
                instrument_key: req.query.instrument_key,
                quantity: req.query.quantity,
                transaction_type: req.query.transaction_type,
                product: req.query.product
              }
            ]
          };

          // Base URL
          let apiUrl = "https://api.upstox.com/v2/charges/margin";
          
          request({
            uri: apiUrl,
            method: "POST",
            body: qs.stringify(data),
            headers: requestHeaders1
          }, async (err, response, success) => {
            if (err) {
              await teleStockMsg("getMarginDetails data featch failed");
              await logUser("getMarginDetails data featch failed");
              return nextCall({
                "message": "something went wrong",
                "data": null
              });
            } else {
              let finalData = JSON.parse(success);
              if (finalData.status && finalData.status == "error") {
                finalData.client_secret = appData[0].client_secret;
                finalData.status1 = "logout";
                await updateLoginUser(finalData)
                await teleStockMsg("getMarginDetails data featch failed")
                await logUser("getMarginDetails data featch failed")
                return nextCall({
                  "message": "something went wrong",
                  "data": finalData
                });
              } else {
                await logUser("getMarginDetails data featch successfully")
                nextCall(null, finalData);
              }
            }
          })
        }
      })
    },
  ], function (err, response) {
    if (err) {
      return res.send({
        status_api: err.code ? err.code : 400,
        message: (err && err.message) || "someyhing went wrong",
        data: err.data ? err.data : null
      });
    }
    return res.send({
      status_api: 200,
      message: "getMarginDetails get successfully",
      data: response
    });
  });
});

/** getBrokerageDetails apis */
router.get('/getBrokerageDetails', function (req, res) {
  async.waterfall([
    function (nextCall) {
      let sqlsss = "SELECT * FROM plateform_login";
      connection.query(sqlsss, async function (err, appData) {
        if (err) {
          await teleStockMsg("App data fetch api failed");
          await logUser("App data fetch api failed");
        } else {
          let requestHeaders1 = {
            "accept": "application/json",
            "Api-Version": "2.0",
            "Authorization": "Bearer " + appData[0].access_token
          }

            // Base URL
          let apiUrl = "https://api.upstox.com/v2/charges/brokerage";
          
          // Append instrument_token if provided
          if (req.query.instrument_token && req.query.quantity && req.query.product && req.query.transaction_type && req.query.price) {
            apiUrl += `?instrument_token=${req.query.instrument_token}&quantity=${req.query.quantity}&product=${req.query.product}&transaction_type=${req.query.transaction_type}&price=${req.query.price}`;
          }

          request({
            uri: apiUrl,
            method: "GET",
            headers: requestHeaders1
          }, async (err, response, success) => {
            if (err) {
              await teleStockMsg("getBrokerageDetails data featch failed");
              await logUser("getBrokerageDetails data featch failed");
              return nextCall({
                "message": "something went wrong",
                "data": null
              });
            } else {
              let finalData = JSON.parse(success);
              if (finalData.status && finalData.status == "error") {
                finalData.client_secret = appData[0].client_secret;
                finalData.status1 = "logout";
                await updateLoginUser(finalData)
                await teleStockMsg("getBrokerageDetails data featch failed")
                await logUser("getBrokerageDetails data featch failed")
                return nextCall({
                  "message": "something went wrong",
                  "data": finalData
                });
              } else {
                await logUser("getBrokerageDetails data featch successfully")
                nextCall(null, finalData);
              }
            }
          })
        }
      })
    },
  ], function (err, response) {
    if (err) {
      return res.send({
        status_api: err.code ? err.code : 400,
        message: (err && err.message) || "someyhing went wrong",
        data: err.data ? err.data : null
      });
    }
    return res.send({
      status_api: 200,
      message: "getBrokerageDetails get successfully",
      data: response
    });
  });
});

/** logout apis */
router.get('/logout', function (req, res) {
  async.waterfall([
    function (nextCall) {
      let sqlsss = "SELECT * FROM plateform_login";
      connection.query(sqlsss, async function (err, appData) {
        if (err) {
          await teleStockMsg("App data fetch api failed");
          await logUser("App data fetch api failed");
        } else {
          let requestHeaders1 = {
            "accept": "application/json",
            "Api-Version": "2.0",
            "Authorization": "Bearer " + appData[0].access_token
          }

          request({
            uri: "https://api.upstox.com/v2/logout",
            method: "DELETE",
            headers: requestHeaders1
          }, async (err, response, success) => {
            if (err) {
              await teleStockMsg("logout data featch failed");
              await logUser("logout data featch failed");
              return nextCall({
                "message": "something went wrong",
                "data": null
              });
            } else {
              let finalData = JSON.parse(success);
              if (finalData.status && finalData.status == "error") {
                finalData.client_secret = appData[0].client_secret;
                finalData.status1 = "logout";
                await updateLoginUser(finalData)
                await teleStockMsg("logout data featch failed")
                await logUser("logout data featch failed")
                return nextCall({
                  "message": "something went wrong",
                  "data": finalData
                });
              } else {
                await logUser("logout candle data featch successfully")
                nextCall(null, finalData);
              }
            }
          })
        }
      })
    },
  ], function (err, response) {
    if (err) {
      return res.send({
        status_api: err.code ? err.code : 400,
        message: (err && err.message) || "someyhing went wrong",
        data: err.data ? err.data : null
      });
    }
    return res.send({
      status_api: 200,
      message: "logout get successfully",
      data: response
    });
  });
});

/** getPositions apis */
router.get('/getPositions', function (req, res) {
  async.waterfall([
    function (nextCall) {
      let sqlsss = "SELECT * FROM plateform_login";
      connection.query(sqlsss, async function (err, appData) {
        if (err) {
          await teleStockMsg("App data fetch api failed");
          await logUser("App data fetch api failed");
        } else {
          let requestHeaders1 = {
            "accept": "application/json",
            "Api-Version": "2.0",
            "Authorization": "Bearer " + appData[0].access_token
          }

          request({
            uri: "https://api-v2.upstox.com/portfolio/short-term-positions",
            method: "GET",
            headers: requestHeaders1
          }, async (err, response, success) => {
            if (err) {
              await teleStockMsg("getPositions data featch failed");
              await logUser("getPositions data featch failed");
              return nextCall({
                "message": "something went wrong",
                "data": null
              });
            } else {
              let finalData = JSON.parse(success);
              if (finalData.status && finalData.status == "error") {
                finalData.client_secret = appData[0].client_secret;
                finalData.status1 = "logout";
                await updateLoginUser(finalData)
                await teleStockMsg("getPositions data featch failed")
                await logUser("getPositions data featch failed")
                return nextCall({
                  "message": "something went wrong",
                  "data": finalData
                });
              } else {
                await logUser("getPositions candle data featch successfully")
                nextCall(null, finalData);
              }
            }
          })
        }
      })
    },
  ], function (err, response) {
    if (err) {
      return res.send({
        status_api: err.code ? err.code : 400,
        message: (err && err.message) || "someyhing went wrong",
        data: err.data ? err.data : null
      });
    }
    return res.send({
      status_api: 200,
      message: "getPositions get successfully",
      data: response
    });
  });
});

/** BotStatus apis */
router.get('/botStatus', function (req, res) {
  async.waterfall([
    function (nextCall) {
      let sqlsss = "SELECT * FROM plateform_login";
      connection.query(sqlsss, async function (err, appData) {
        if (err) {
          await teleStockMsg("App data fetch api failed");
          await logUser("App data fetch api failed");
        } else {
          let requestHeaders1 = {
            "accept": "application/json",
            "Api-Version": "2.0",
            "Authorization": "Bearer " + appData[0].access_token
          }

          request({
            uri: "https://api-v2.upstox.com/user/profile",
            method: "GET",
            headers: requestHeaders1
          }, async (err, response, success) => {
            if (err) {
              await teleStockMsg("BotStatus data featch failed");
              await logUser("BotStatus data featch failed");
              return nextCall({
                "message": "something went wrong",
                "data": null
              });
            } else {
              let finalData = JSON.parse(success);
              if (finalData.status && finalData.status == "error") {
                finalData.client_secret = appData[0].client_secret;
                finalData.status1 = "logout";
                await updateLoginUser(finalData)
                await teleStockMsg("BotStatus data featch failed")
                await logUser("BotStatus data featch failed")
                return nextCall({
                  "message": "something went wrong",
                  "data": finalData
                });
              } else {
                await logUser("BotStatus candle data featch successfully")
                nextCall(null, finalData);
              }
            }
          })
        }
      })
    },
  ], function (err, response) {
    if (err) {
      return res.send({
        status_api: err.code ? err.code : 400,
        message: (err && err.message) || "someyhing went wrong",
        data: err.data ? err.data : null
      });
    }
    return res.send({
      status_api: 200,
      message: "BotStatus get successfully",
      data: response
    });
  });
});

/** Get trades for day apis */
router.get('/get-trades-for-day', function (req, res) {
  async.waterfall([
    function (nextCall) {
      let sqlsss = "SELECT * FROM plateform_login";
      connection.query(sqlsss, async function (err, appData) {
        if (err) {
          await teleStockMsg("Get trades for day fetch api failed");
          await logUser("Get trades for day fetch api failed");
        } else {
          let requestHeaders1 = {
            "accept": "application/json",
            "Api-Version": "2.0",
            "Authorization": "Bearer " + appData[0].access_token
          }

          request({
            uri: "https://api-v2.upstox.com/order/trades/get-trades-for-day",
            method: "GET",
            headers: requestHeaders1
          }, async (err, response, success) => {
            if (err) {
              await teleStockMsg("Get trades for day featch failed");
              await logUser("Get trades for day featch failed");
              return nextCall({
                "message": "something went wrong",
                "data": null
              });
            } else {
              let finalData = JSON.parse(success);
              if (finalData.status && finalData.status == "error") {
                finalData.client_secret = appData[0].client_secret;
                finalData.status1 = "logout";
                await updateLoginUser(finalData)
                await teleStockMsg("Get trades for day featch failed")
                await logUser("Get trades for day featch failed")
                return nextCall({
                  "message": "something went wrong",
                  "data": finalData
                });
              } else {
                await logUser("Get trades for day data featch successfully")
                nextCall(null, finalData);
              }
            }
          })
        }
      })
    },
  ], function (err, response) {
    if (err) {
      return res.send({
        status_api: err.code ? err.code : 400,
        message: (err && err.message) || "someyhing went wrong",
        data: err.data ? err.data : null
      });
    }
    return res.send({
      status_api: 200,
      message: "Get trades for day data get successfully",
      data: response
    });
  });
});

/** Get order book apis */
router.get('/all-book-order', function (req, res) {
  async.waterfall([
    function (nextCall) {
      let sqlsss = "SELECT * FROM plateform_login";
      connection.query(sqlsss, async function (err, appData) {
        if (err) {
          await teleStockMsg("Get order book fetch api failed");
          await logUser("Get order book fetch api failed");
        } else {
          let requestHeaders1 = {
            "accept": "application/json",
            "Api-Version": "2.0",
            "Authorization": "Bearer " + appData[0].access_token
          }

          request({
            uri: "https://api-v2.upstox.com/order/retrieve-all",
            method: "GET",
            headers: requestHeaders1
          }, async (err, response, success) => {
            if (err) {
              await teleStockMsg("Get order book featch failed");
              await logUser("Get order book featch failed");
              return nextCall({
                "message": "something went wrong",
                "data": null
              });
            } else {
              let finalData = JSON.parse(success);
              if (finalData.status && finalData.status == "error") {
                finalData.client_secret = appData[0].client_secret;
                finalData.status1 = "logout";
                await updateLoginUser(finalData)
                await teleStockMsg("Get order book featch failed")
                await logUser("Get order book featch failed")
                return nextCall({
                  "message": "something went wrong",
                  "data": finalData
                });
              } else {
                await logUser("Get order book data featch successfully")
                nextCall(null, finalData);
              }
            }
          })
        }
      })
    },
  ], function (err, response) {
    if (err) {
      return res.send({
        status_api: err.code ? err.code : 400,
        message: (err && err.message) || "someyhing went wrong",
        data: err.data ? err.data : null
      });
    }
    return res.send({
      status_api: 200,
      message: "Get order book data get successfully",
      data: response
    });
  });
});

function checkloginUser(data) {
  let sqlss = "SELECT COUNT(*) as cnt FROM plateform_login WHERE user_id=" + JSON.stringify(data.user_id);
  connection.query(sqlss, async function (err, dataLogin) {
    if (err) {
      await teleStockMsg("check login User detail failed")
      await logUser("check login User detail failed")
    } else {
      if (dataLogin[0].cnt == 0) {
        await loginUser(data)
      } else {
        await updateLoginUser(data)
      }
    }
  })
}

function loginUser(data) {
  values = [[
    data.user_id,
    data.user_name,
    data.email,
    data.broker,
    data.client_id,
    data.client_secret,
    data.redirect_uri,
    data.status1,
    data.access_token,
  ]]

  let sqlss = "INSERT INTO plateform_login (user_id,user_name,email,broker,client_id,client_secret,redirect_uri,status,access_token) VALUES ?";
  connection.query(sqlss, [values], async function (err, data) {
    if (err) {
      await teleStockMsg("new user login failed")
      await logUser("new user login failed")
    } else {
      await teleStockMsg("new  user login successfully")
      await logUser("new  user login successfully")
    }
  })
}

function updateLoginUser(data) {
  if(data.status1 == 'login'){
    values = [
      data.status1,
      data.access_token ? data.access_token : ""
    ]
    var sqlss = "UPDATE plateform_login set status =? ,access_token =? WHERE client_secret =" + JSON.stringify(data.client_secret);
    connection.query(sqlss, values, async function (err, data) {
      if (err) {
        await teleStockMsg("old user login failed")
        await logUser("old user login failed")
      } else {
        await teleStockMsg("old user login successfully")
        await logUser("old user login successfully")
      }
    })
  }else{
    values = [
      data.status1
    ]
    var sqlss = "UPDATE plateform_login set status =? WHERE client_secret =" + JSON.stringify(data.client_secret);
    connection.query(sqlss, values, async function (err, data) {
      if (err) {
        await teleStockMsg("old user login failed")
        await logUser("old user login failed")
      } else {
        await teleStockMsg("old user login successfully")
        await logUser("old user login successfully")
      }
    })
  }
}

function logUser(msg) {
  values = [[
    msg,
    moment().format('YYYY-MM-DD hh:mm:ss')
  ]]

  let sqlss = "INSERT INTO log_details(message,date) VALUES ?";
  connection.query(sqlss, [values], function (err, data) {
    if (err) {
      console.log('err: 1', err);
    } else {
      console.log('data: ', data);
    }
  })
}

router.post('/register', function (req, res) {
  async.waterfall([
    function (nextCall) {
      let sql = 'SELECT COUNT(*) as cnt FROM login WHERE login.email ="' + req.body.email + '"';
      connection.query(sql, function (err, rides) {
        if (err) {
          return nextCall({
            "message": "something went wrong",
          });
        }
        else if (rides[0].cnt == 0) {
          nextCall(null, rides[0].cnt);
        } else {
          return nextCall({
            "message": "User is alerady Register",
          });
        }
      })
    }, function (admin, nextCall) {
      values = [[
        req.body.Username,
        req.body.email,
        req.body.Phonenumber,
        req.body.password,
        "Pendding",
        " ",
        " "
      ]]

      let sqlss = "INSERT INTO login (username,email,phonenubmer,password,status,auth_token,tag_id) VALUES ?";
      connection.query(sqlss, [values], function (err, rides) {
        if (err) {
          return nextCall({
            "message": "something went wrong",
          });
        }
        nextCall(null, rides[0]);
      })
    }
  ], function (err, response) {
    if (err) {
      return res.send({
        status: err.code ? err.code : 400,
        message: (err && err.msg) || "someyhing went wrong"
      });
    }
    return res.send({
      status: 200,
      message: "user register sucessfully now wait account conformation.",
      data: response
    });
  });
});

router.post('/api/addAllInOneData', function (req, res) {
  async.waterfall([
    function (nextCall) {
      values = [[
        //  req.body.storeIcon,
        req.body.sNLink,
        req.body.sALink,
        req.body.storeN,
        req.body.isAffiliated,
        req.body.storeID,
      ]]
      let sqlss = "INSERT INTO diff_net_posts (short_url,Landing_Page,Brand,active_flag,domain_url) VALUES ?";
      connection.query(sqlss, [values], function (err, rides) {
        if (err) {
          return nextCall({
            "message": "something went wrong",
          });
        }
        nextCall(null, rides[0]);
      })
    }
  ], function (err, response) {
    if (err) {
      return res.send({
        status: err.code ? err.code : 400,
        message: (err && err.msg) || "someyhing went wrong"
      });
    }
    return res.send({
      status: 200,
      message: "add post create sucessfully",
      data: response
    });
  });
});

router.post('/api/autoPhotoPostFlags', function (req, res) {
  async.waterfall([
    function (nextCall) {
      values = [
        req.body.autopost_flag_tele,
        req.body.delay,
      ]
      var sqlss = "UPDATE post_flags set autopost_flag_tele =? ,delay =? WHERE id = 1";
      connection.query(sqlss, values, function (err, rides) {
        if (err) {
          return nextCall({
            "message": "something went wrong",
          });
        }
        nextCall(null, rides[0]);
      })
    }
  ], function (err, response) {
    if (err) {
      return res.send({
        status: err.code ? err.code : 400,
        message: (err && err.msg) || "someyhing went wrong"
      });
    }
    return res.send({
      status: 200,
      message: "Edit post flag update sucessfully",
      data: response
    });
  });
});

router.post('/api/addtokenData', function (req, res) {
  async.waterfall([
    function (nextCall) {
      values = [[
        req.body.sNLink
      ]]
      let sqlss = "INSERT INTO bitly_token (token) VALUES ?";
      connection.query(sqlss, [values], function (err, rides) {
        if (err) {
          return nextCall({
            "message": "something went wrong",
          });
        }
        nextCall(null, rides);
      })
    }
  ], function (err, response) {
    if (err) {
      return res.send({
        status: err.code ? err.code : 400,
        message: (err && err.msg) || "someyhing went wrong"
      });
    }
    return res.send({
      status: 200,
      message: "add token sucessfully",
      data: response
    });
  });
});

router.post('/api/editAllInOneData', function (req, res) {
  async.waterfall([
    function (nextCall) {
      values = [
        //  req.body.storeIcon,
        req.body.sNLink,
        req.body.sALink,
        req.body.storeN,
        req.body.isAffiliated,
        req.body.storeID,
        req.body.id,
      ]
      var sqlss = "UPDATE diff_net_posts set short_url =? ,Landing_Page =? , Brand =?,active_flag =? , domain_url =?  WHERE id = ?";
      connection.query(sqlss, values, function (err, rides) {
        if (err) {
          return nextCall({
            "message": "something went wrong",
          });
        }
        nextCall(null, rides[0]);
      })
    }
  ], function (err, response) {
    if (err) {
      return res.send({
        status: err.code ? err.code : 400,
        message: (err && err.msg) || "someyhing went wrong"
      });
    }
    return res.send({
      status: 200,
      message: "Edit post create sucessfully",
      data: response
    });
  });
});

router.post('/api/editpostFlags', function (req, res) {
  async.waterfall([
    function (nextCall) {
      values = [
        req.body.tele_flag,
        req.body.watts_flag,
      ]
      var sqlss = "UPDATE post_flags set tele_flag =? , watts_flag =?  WHERE id = 1";
      connection.query(sqlss, values, function (err, rides) {
        if (err) {
          return nextCall({
            "message": "something went wrong",
          });
        }
        nextCall(null, rides[0]);
      })
    }
  ], function (err, response) {
    if (err) {
      return res.send({
        status: err.code ? err.code : 400,
        message: (err && err.msg) || "someyhing went wrong"
      });
    }
    return res.send({
      status: 200,
      message: "Edit post flag update sucessfully",
      data: response
    });
  });
});

router.get('/api/singlepostFlags', function (req, res) {
  async.waterfall([
    function (nextCall) {
      var sqlss = " SELECT * FROM post_flags WHERE id = 1";
      connection.query(sqlss, function (err, rides) {
        if (err) {
          return nextCall({
            "message": "something went wrong",
          });
        }
        nextCall(null, rides[0]);
      })
    }
  ], function (err, response) {
    if (err) {
      return res.send({
        status: err.code ? err.code : 400,
        message: (err && err.msg) || "someyhing went wrong"
      });
    }
    return res.send({
      status: 200,
      message: "Single recored sucessfully",
      data: response
    });
  });
});

router.post('/api/editFlipkartFlags', function (req, res) {
  async.waterfall([
    function (nextCall) {
      let values;
      let sqlss;
      if (req.body.value == 'dirflipkart') {
        //         values =  [ req.body.value, req.body.tag]
        //         sqlss = "UPDATE post_flags set flipkart_server =? , flipkart_tag =? WHERE id = 1";
        values = [req.body.value, req.body.tag, "3dac9368527d6192b0ac6b01f3c4460ea2b4cc42"]
        sqlss = "UPDATE post_flags set flipkart_server =? , flipkart_tag =?,current_bitly  =? WHERE id = 1";

      } else {
        values = [req.body.value]
        sqlss = "UPDATE post_flags set flipkart_server =? WHERE id = 1";
      }
      connection.query(sqlss, values, function (err, rides) {
        if (err) {
          return nextCall({
            "message": "something went wrong",
          });
        }
        nextCall(null, rides[0]);
      })
    }
  ], function (err, response) {
    if (err) {
      return res.send({
        status: err.code ? err.code : 400,
        message: (err && err.msg) || "someyhing went wrong"
      });
    }
    return res.send({
      status: 200,
      message: "Edit post flag update sucessfully",
      data: response
    });
  });
});

function teleStockMsg(msg) {
  bot = new nodeTelegramBotApi(config.token);
  bot.sendMessage(config.channelId, "→ "+msg, {
    parse_mode: "HTML",
    disable_web_page_preview: true
  })
}

function teleAnotherStockMsg(msg) {
  bot = new nodeTelegramBotApi(config.token);
  bot.sendMessage(config.channelId2, "→ "+msg, {
    parse_mode: "HTML",
    disable_web_page_preview: true
  })
}

router.get('/api/singleAllInOneData/:id', function (req, res) {
  async.waterfall([
    function (nextCall) {
      var sqlss = " SELECT * FROM diff_net_posts WHERE id =" + req.params.id;
      connection.query(sqlss, function (err, rides) {
        if (err) {
          return nextCall({
            "message": "something went wrong",
          });
        }
        nextCall(null, rides[0]);
      })
    }
  ], function (err, response) {
    if (err) {
      return res.send({
        status: err.code ? err.code : 400,
        message: (err && err.msg) || "someyhing went wrong"
      });
    }
    return res.send({
      status: 200,
      message: "Single recored sucessfully",
      data: response
    });
  });
});

router.get('/api/singleBitlyData', function (req, res) {
  async.waterfall([
    function (nextCall) {
      var sqlss = " SELECT * FROM bitly_token";
      connection.query(sqlss, function (err, rides) {
        // console.log('rides: ', _.last(rides));
        if (err) {
          return nextCall({
            "message": "something went wrong",
          });
        }
        nextCall(null, rides);
      })
    }
  ], function (err, response) {
    if (err) {
      return res.send({
        status: err.code ? err.code : 400,
        message: (err && err.msg) || "someyhing went wrong"
      });
    }
    return res.send({
      status: 200,
      message: "Single recored sucessfully",
      data: response
    });
  });
});

router.delete('/api/deleteAllInOneData/:id', function (req, res) {
  async.waterfall([
    function (nextCall) {
      var sqlss = " DELETE FROM diff_net_posts WHERE id =" + req.params.id;
      connection.query(sqlss, function (err, rides) {
        if (err) {
          return nextCall({
            "message": "something went wrong",
          });
        }
        nextCall(null, rides[0]);
      })
    }
  ], function (err, response) {
    if (err) {
      return res.send({
        status: err.code ? err.code : 400,
        message: (err && err.msg) || "someyhing went wrong"
      });
    }
    return res.send({
      status: 200,
      message: "deleted recored sucessfully",
      data: response
    });
  });
});

router.post('/api/getAllInOneData', function (req, res) {
  var response = {
    "draw": req.body.draw || 0,
    "recordsTotal": 0,
    "recordsFiltered": 0,
    "data": []
  };
  async.waterfall([
    function (nextCall) {
      var sql = "Select count(*) as TotalCount from ??";
      // connection.query(sql, ['all_in_one'], function (err, rides) {
      connection.query(sql, ['diff_net_posts'], function (err, rides) {
        if (err) {
          console.log('11');
          return nextCall({
            "message": "something went wrong",
          });
        }
        response.recordsTotal = rides[0].TotalCount;
        response.recordsFiltered = rides[0].TotalCount
        nextCall(null, rides[0].TotalCount);
      })
    }, function (counts, nextCall) {
      startNum = parseInt(req.body.start) || 0;
      LimitNum = parseInt(req.body.length) || 10;
      var query = "Select * from ?? WHERE " + req.body.columns[req.body.order[0].column].data + " LIKE '%" + req.body.search.value + "%' ORDER BY " + req.body.columns[req.body.order[0].column].data + ' ' + req.body.order[0].dir + " limit ? OFFSET ?";
      connection.query(query, ["diff_net_posts", LimitNum, startNum], function (err, ridess) {
        if (err) {
          return nextCall({
            "message": "something went wrong",
          });
        } else if (ridess.length > 0) {
          response.data = ridess;
          nextCall();
        } else {
          return nextCall({
            "message": "something went wrong",
          });
        }
      })
    }
  ], function (err) {
    if (err) {
      return res.send({
        status: err.code ? err.code : 400,
        message: (err && err.msg) || "someyhing went wrong"
      });
    }
    return res.send(response);
  });
});


module.exports = router;
