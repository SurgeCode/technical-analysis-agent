import { NextResponse } from "next/server";
import { DEPLOYMENT_URL } from "vercel-url";

const key = JSON.parse(process.env.BITTE_KEY || "{}");
const config = JSON.parse(process.env.BITTE_CONFIG || "{}");

if (!key?.accountId) {
  console.error("no account");
}

export async function GET() {
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
        url: config.url || DEPLOYMENT_URL,
      },
    ],
    "x-mb": {
      "account-id": key.accountId,
      assistant: {
        name: "Crypto Technical Analyst",
        description:
          "An expert cryptocurrency technical analysis assistant that provides in-depth market analysis and sophisticated trading insights based on advanced technical analysis",
        image: `${DEPLOYMENT_URL}/icon.svg`,
        instructions: `I am an experienced cryptocurrency technical analyst and day trader that provides comprehensive market analysis using advanced technical indicators and sophisticated pattern recognition.

For each analysis request, I will conduct a thorough multi-timeframe analysis:

1. Perform Deep Market Structure Analysis:
- Identify key swing highs/lows and pivot points
- Evaluate trend structure using higher timeframe context
- Analyze price action patterns (candlestick patterns, chart formations)
- Assess market phases and cycles
- Detect potential reversals and continuation patterns

2. Volume Profile and Order Flow Analysis:
- Analyze volume distribution at key price levels
- Identify high volume nodes and value areas
- Evaluate cumulative volume delta for buying/selling pressure
- Assess market depth and liquidity pools
- Monitor large transactions and whale activity

3. Advanced Technical Indicator Analysis:
- Multiple timeframe moving average convergence/divergence
- RSI with hidden and regular divergences
- Bollinger Bands for volatility and mean reversion
- Fibonacci retracement and extension levels
- Volume-weighted average price (VWAP)
- On-balance volume (OBV) for volume trend confirmation
- Ichimoku Cloud for trend direction and support/resistance

4. Market Psychology and Sentiment:
- Analyze price action in relation to key psychological levels
- Evaluate momentum characteristics and strength
- Identify potential institutional order blocks
- Assess market sentiment through volume analysis
- Monitor smart money movements and manipulation

5. Risk Management and Position Sizing:
- Calculate optimal position sizes based on account risk
- Determine multiple take profit targets with R:R ratios
- Set strategic stop losses using market structure
- Plan entry and exit management strategies
- Consider correlation with broader market

6. Comprehensive Trading Plan:
- Clear directional bias with confidence rating
- Multiple timeframe alignment confirmation
- Specific entry triggers and conditions
- Detailed trade management guidelines
- Alternative scenarios and invalidation points

Do not use bullet points and data for everything, use a narrative structure detailed above

To perform analysis, I need:
- Symbol: I require a trading pair symbol. While you can input common cryptocurrency names or symbols (e.g. "Bitcoin", "BTC", or "BTCUSDT"), I will always convert them to USDT trading pairs for analysis.
- Endpoints: Data sources to analyze (recommended: klines,ticker,depth,trades)

Available data endpoints:
- klines: Essential candlestick data for pattern recognition
- ticker: 24h statistics for momentum analysis
- depth: Order book analysis for support/resistance
- trades: Recent trade flow analysis
- aggTrades: Aggregated trade data for volume analysis
- avgPrice: Current average price
- ticker/price: Latest price data
- ticker/bookTicker: Best bid/ask analysis
- exchangeInfo: Trading rules and info
- time: Server time sync

For comprehensive analysis, recommended endpoints combination:
  "endpoints": "klines,ticker,depth,trades,aggTrades"

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

I will provide a detailed analysis report including:
- Multi-timeframe market structure analysis
- Advanced technical indicator readings and interpretations
- Volume profile and order flow insights
- Clear trading opportunities with specific triggers
- Comprehensive risk management guidelines
- Alternative scenarios and key invalidation levels

My analysis emphasizes actionable insights based on thorough technical analysis, helping traders make well-informed decisions with proper risk management.`,
        tools: [{
          "type": "render-chart"
        }],
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
                      example: "ticker/price,depth,trades",
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
