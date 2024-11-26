# Crypto Technical Analysis Agent

A sophisticated cryptocurrency technical analysis AI assistant that provides comprehensive market analysis and trading insights using advanced technical indicators and pattern recognition. The agent leverages Binance's public market data API to provide real-time analysis.

## Overview

This BitteProtocol agent serves as an expert cryptocurrency technical analyst, offering in-depth market analysis through a combination of technical indicators, pattern recognition, and multi-timeframe analysis. It integrates with Binance's market data endpoints to fetch real-time cryptocurrency data.

## Features

- Deep Market Structure Analysis
- Volume Profile and Order Flow Analysis
- Advanced Technical Indicator Analysis
- Market Psychology and Sentiment Evaluation
- Risk Management and Position Sizing
- Comprehensive Trading Plan Generation
- Real-time Binance Market Data Integration

## Binance API Integration

The agent utilizes Binance's public REST API endpoints to fetch market data. No API key is required for these public endpoints. The integration includes:

- Real-time market data access
- Support for all major cryptocurrency pairs
- Standard Binance API rate limits apply
- Automatic data normalization and processing

### Binance Endpoints Used

| Endpoint | Description | Data Provided |
|----------|-------------|---------------|
| `/api/v3/klines` | Candlestick data | OHLCV data for technical analysis |
| `/api/v3/depth` | Order book | Market depth and liquidity |
| `/api/v3/trades` | Recent trades | Latest market transactions |
| `/api/v3/ticker/24hr` | 24h statistics | Price and volume statistics |
| `/api/v3/aggTrades` | Aggregated trades | Consolidated trade data |


## API Endpoints

The agent exposes a REST API endpoint:

POST /api/tools/binance


### Request Parameters

| Parameter  | Type   | Description                          | Example                    |
|-----------|--------|--------------------------------------|----------------------------|
| endpoints | string | Comma-separated list of data points  | `klines,ticker,depth,trades` |
| symbol    | string | Trading pair (USDT pairs only)       | `BTCUSDT`                 |

### Available Endpoints

- `klines`: Candlestick data for pattern recognition
- `ticker`: 24h statistics for momentum analysis
- `depth`: Order book analysis
- `trades`: Recent trade flow analysis
- `aggTrades`: Aggregated trade data
- `avgPrice`: Current average price
- `ticker/price`: Latest price data
- `ticker/bookTicker`: Best bid/ask analysis
- `exchangeInfo`: Trading rules and info
- `time`: Server time sync

### Recommended Endpoint Combination

For optimal analysis, use: 

"endpoints": "klines,ticker,depth,trades,aggTrades"

## Supported Trading Pairs

The agent automatically converts common cryptocurrency names to USDT trading pairs:

| Input Format | Trading Pair |
|--------------|-------------|
| "Bitcoin" or "BTC" | BTCUSDT |
| "Ethereum" or "ETH" | ETHUSDT |
| "Binance Coin" or "BNB" | BNBUSDT |
| "Cardano" or "ADA" | ADAUSDT |
| "XRP" | XRPUSDT |
| "Solana" or "SOL" | SOLUSDT |
| And many more... |

## Analysis Output

The agent provides comprehensive analysis including:

1. Multi-timeframe market structure analysis
2. Technical indicator readings and interpretations
3. Volume profile and order flow insights
4. Trading opportunities with specific triggers
5. Risk management guidelines
6. Alternative scenarios and invalidation levels

## Error Handling

The API includes proper error handling with specific status codes:

- `200`: Successful response with analysis data
- `400`: Invalid request parameters
- `500`: Server error with available endpoints
