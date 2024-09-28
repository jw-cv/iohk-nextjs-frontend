import { NextResponse } from 'next/server';
import { Customer } from '@/models/Customer';

export const dynamic = 'force-dynamic';

const GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT || 'http://localhost:8080/query';

export async function GET() {
  try {
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
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`Failed to fetch data from GraphQL API. HTTP error! status: ${response.status}, body: ${errorText}`);
    }

    const { data } = await response.json();
    
    if (!data || !data.customers) {
      console.error('Unexpected data structure:', data);
      throw new Error('Unexpected data structure in the API response');
    }

    const processedData = data.customers.map((customer: Customer) => ({
      ...customer,
      birthDate: customer.birthDate, // Keep birthDate as a string
      number: Number(customer.number),
      dependants: Number(customer.dependants),
      gender: customer.gender.toUpperCase(), // Ensure gender is uppercase to match the enum
    }));

    return NextResponse.json(processedData);
  } catch (error) {
    console.error('Error fetching customers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch customers', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}