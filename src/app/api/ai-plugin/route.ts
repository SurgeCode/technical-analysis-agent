import { NextResponse } from "next/server";
import { DEPLOYMENT_URL } from "vercel-url";

 function GET() {
  const pluginData = {
    openapi: "3.0.0",
    info: {
      title: "Crypto Technical Analysis",
      description:
        "API for performing technical analysis on cryptocurrency pairs",
      version: "1.0.0",
    },
    servers: [
      {
        url:DEPLOYMENT_URL || "http://localhost:3000",
      },
    ],
    "x-mb": {
      "account-id": "surgecode.near",
      assistant: {
        name: "Crypto Technical Analyst",
        description:
          "An expert cryptocurrency technical analysis assistant that provides in-depth market analysis and sophisticated trading insights based on advanced technical analysis",
        image: `${DEPLOYMENT_URL}/icon.svg`,
        instructions: `I am an experienced cryptocurrency technical analyst and day trader that provides comprehensive market analysis using advanced technical indicators and sophisticated pattern recognition.

For each analysis request, I will conduct a focused technical analysis using essential market data:

1. Core Market Analysis (Using klines data):
- Identify key price levels and trend direction
- Analyze candlestick patterns and chart formations
- Evaluate trend structure and market phases
- Detect potential reversals and continuation patterns

2. Market Momentum (Using ticker data):
- Assess 24h price movement and volatility
- Evaluate buying/selling pressure
- Analyze volume trends
- Monitor price momentum

Optional Additional Analysis (if requested):
- Order book analysis (using depth endpoint)
- Recent trade flow analysis (using trades endpoint)
- Aggregated volume analysis (using aggTrades endpoint)

To perform analysis, I need:
- Symbol: I require a trading pair symbol. While you can input common cryptocurrency names or symbols (e.g. "Bitcoin", "BTC", or "BTCUSDT"), I will always convert them to USDT trading pairs for analysis.
- Endpoints: Core data sources (required: klines,ticker) and optional additional sources

Available data endpoints:
Core (Required):
- klines: Essential candlestick data for pattern recognition
- ticker: 24h statistics for momentum analysis

Optional:
- depth: Order book analysis for support/resistance
- trades: Recent trade flow analysis
- aggTrades: Aggregated trade data for volume analysis
- avgPrice: Current average price
- ticker/price: Latest price data
- ticker/bookTicker: Best bid/ask analysis
- exchangeInfo: Trading rules and info
- time: Server time sync

For basic analysis, use:
  "endpoints": "klines,ticker"

For comprehensive analysis, add optional endpoints:
  "endpoints": "klines,ticker,depth,trades"

Important: All analysis is performed using USDT trading pairs. I will automatically convert any input to the appropriate USDT pair format:

Input → Trading Pair Used
"Bitcoin" or "BTC" → BTCUSDT
"Ethereum" or "ETH" → ETHUSDT 
"Binance Coin" or "BNB" → BNBUSDT
"Cardano" or "ADA" → ADAUSDT
"XRP" → XRPUSDT
"Solana" or "SOL" → SOLUSDT
"Dogecoin" or "DOGE" → DOGEUSDT
"Polkadot" or "DOT" → DOTUSDT
"Avalanche" or "AVAX" → AVAXUSDT
"Chainlink" or "LINK" → LINKUSDT
"Polygon" or "MATIC" → MATICUSDT
"Near Protocol" or "NEAR" → NEARUSDT
"Litecoin" or "LTC" → LTCUSDT
"Uniswap" or "UNI" → UNIUSDT
"Bitcoin Cash" or "BCH" → BCHUSDT
"Stellar" or "XLM" → XLMUSDT
"Algorand" or "ALGO" → ALGOUSDT
"Cosmos" or "ATOM" → ATOMUSDT
"VeChain" or "VET" → VETUSDT
"Filecoin" or "FIL" → FILUSDT

You can also input the USDT trading pair directly (e.g. "BTCUSDT", "ETHUSDT"). Note that all analysis will be performed using the USDT trading pair format regardless of input method.

I will provide a focused analysis report including:
- Current market structure and trend analysis
- Key technical indicator readings
- Important price levels and patterns
- Trading opportunities with specific triggers
- Basic risk management guidelines

My analysis emphasizes actionable insights based on essential technical data, helping traders make well-informed decisions with proper risk management.`,
        tools: [],
      },
    },
    paths: {
      "/api/tools/binance": {
        post: {
          summary: "Get cryptocurrency technical analysis data",
          description:
            "Fetches technical indicators based on request body properties, endpoints takes comman separated endpoints and symbol takes the symbol to analyse",
          operationId: "get-crypto-analysis",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["endpoints", "symbol"],
                  properties: {
                    endpoints: {
                      type: "string",
                      description: "Comma-separated list of endpoints to query",
                      example: "klines,ticker",
                      enum: [
                        "aggTrades",
                        "avgPrice",
                        "depth",
                        "exchangeInfo",
                        "klines",
                        "ticker",
                        "ticker/price",
                        "ticker/bookTicker",
                        "trades",
                        "time",
                      ],
                    },
                    symbol: {
                      type: "string",
                      pattern: "^[A-Z0-9]+USDT$",
                      example: "BTCUSDT",
                      description:
                        "The trading pair symbol (e.g., BTCUSDT, ETHUSDT)",
                    },
                  },
                },
              },
            },
          },
          responses: {
            "200": {
              description:
                "Successful response with data from all requested endpoints",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      results: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            endpoint: {
                              type: "string",
                              description: "The endpoint that was queried",
                            },
                            symbol: {
                              type: "string",
                              description: "The trading pair symbol",
                            },
                            data: {
                              type: "object",
                              description: "The technical analysis data",
                            },
                            description: {
                              type: "string",
                              description: "Description of the endpoint",
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            "400": {
              description: "Invalid request parameters",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      error: {
                        type: "string",
                      },
                      message: {
                        type: "string",
                      },
                    },
                  },
                },
              },
            },
            "500": {
              description: "Server error",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      error: {
                        type: "string",
                      },
                      message: {
                        type: "string",
                      },
                      availableEndpoints: {
                        type: "object",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  };

  return NextResponse.json(pluginData);
}
