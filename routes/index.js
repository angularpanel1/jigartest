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
var isLoggedInPolicie = require('../policies/isLoggedIn.js');
var isUserAuthenticatedPolicy = require('../policies/isUserAuthenticated.js');
var moment = require('moment');
var qs = require('qs');
var config = require('../config/global');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

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

setInterval(function setup() {
  let sqlsss = "SELECT * FROM app_data";
  connection.query(sqlsss, async function (err, appData) {
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
          console.log('data: ', data);

          request({
            uri: "https://api-v2.upstox.com/order/place",
            method: "POST",
            body: JSON.stringify(data),
            headers: requestHeaders1
          }, async (err, response, success) => {
            if (err) {
              await teleStockMsg("BuySellApi candle data featch failed");
              await logUser("BuySellApi candle data featch failed");
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
                await teleStockMsg("BuySellApi candle data featch failed")
                await logUser("BuySellApi candle data featch failed")
                return nextCall({
                  "message": "something went wrong",
                  "data": finalData
                });
              } else {
                await teleStockMsg("BuySellApi candle data featch successfully")
                await logUser("BuySellApi candle data featch successfully")
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
      message: "Historical data get successfully",
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
            uri: "https://api-v2.upstox.com/historical-candle/intraday/" + req.query.instrumentKey + "/" + req.query.interval,
            method: "GET",
            headers: requestHeaders1
          }, async (err, response, success) => {
            if (err) {
              await teleStockMsg("Intraday candle data featch failed");
              await logUser("Intraday candle data featch failed");
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
                await teleStockMsg("Intraday candle data featch failed")
                await logUser("Intraday candle data featch failed")
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
                await teleStockMsg("Intraday candle data featch successfully")
                await logUser("Intraday candle data featch successfully")
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

router.all('/api/*', isUserAuthenticatedPolicy, isLoggedInPolicie);

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