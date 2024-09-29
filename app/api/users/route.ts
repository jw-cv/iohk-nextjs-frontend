import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:8080/query';

export async function GET() {
  try {
    console.log('Fetching data from:', GRAPHQL_ENDPOINT);
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query GetAllCustomers {
            customers {
              id
              name
              surname
              number
              gender
              country
              dependants
              birthDate
            }
          }
        `,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { data } = await response.json();
    
    if (!data || !data.customers) {
      throw new Error('Unexpected data structure in the API response');
    }

    return NextResponse.json(data.customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch customers', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}