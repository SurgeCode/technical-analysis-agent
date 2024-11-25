import { NextResponse } from 'next/server';

const BINANCE_API_BASE = 'https://data-api.binance.vision/api/v3';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { endpoints: endpointsParam, symbol } = body;


    console.log(body)
    
    const availableEndpoints = {
      aggTrades: 'Get compressed, aggregate trades. Trades that fill at the same time, from the same order, with the same price will have the quantity aggregated.',
      avgPrice: 'Get current average price for a symbol.',
      depth: 'Get order book depth data.',
      exchangeInfo: 'Get exchange trading rules and symbol information.',
      klines: 'Get candlestick data (klines/OHLCV) for a symbol.',
      ticker: 'Get 24 hour rolling window price change statistics.',
      'ticker/price': 'Get latest price for a symbol.',
      'ticker/bookTicker': 'Get best price/qty on the order book for a symbol.',
      trades: 'Get recent trades for a symbol.',
      time: 'Test connectivity to the Rest API and get the current server time.',
    };

    if (!endpointsParam) {
      return NextResponse.json({
        error: 'Missing endpoints parameter',
        message: 'Please specify endpoints in the request body',
        availableEndpoints,
      }, { status: 400 });
    }

    const endpoints = endpointsParam.split(',').map((ep: string) => ep.trim());
    
    const results = await Promise.all(
      endpoints.map(async (endpoint: string) => {
        let url = `${BINANCE_API_BASE}/${endpoint}`;
        if (symbol) {
          url += `?symbol=${symbol.toUpperCase()}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        return {
          endpoint,
          symbol: symbol || null,
          data,
          description: availableEndpoints[endpoint as keyof typeof availableEndpoints],
        };
      })
    );

    return NextResponse.json({ results });

  } catch (error) {
    return NextResponse.json({
      error: 'Failed to fetch data from Binance API',
      message: error instanceof Error ? error.message : 'Unknown error occurred',
    }, { status: 500 });
  }
}