import { adjustWaterLevel } from './tasks'; // ta logique métier

export const config = {
  runtime: 'edge',
};

export default async function handler() {
  try {
    await adjustWaterLevel();
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (error) {
    console.error('Cron failed:', error);
    return new Response(JSON.stringify({ ok: false, error: error }), { status: 500 });
  }
}