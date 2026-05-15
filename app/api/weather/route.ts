import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city') || 'Sorocaba';
  const apiKey = process.env.OPEN_WEATHER_MAP_API_KEY;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;

  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json({ error: 'Erro ao buscar clima' }, { status: res.status });
  }

  return NextResponse.json(data);
}