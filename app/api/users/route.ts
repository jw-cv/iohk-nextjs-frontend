import { NextResponse } from 'next/server';
import { User } from '@/hooks/useUsers';

export const dynamic = 'force-dynamic';

const GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT || 'http://localhost:8080/graphql';

export async function GET() {
  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query {
            users {
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
      throw new Error(`Failed to fetch data from GraphQL API. HTTP error! status: ${response.status}`);
    }

    const { data } = await response.json();
    const processedData: User[] = data.users.map((user: User) => ({
      ...user,
      birthDate: new Date(user.birthDate),
    }));

    return NextResponse.json(processedData);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}