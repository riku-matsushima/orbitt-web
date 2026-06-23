export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { password } = JSON.parse(event.body || '{}');
  const correct = process.env.SITE_PASSWORD;

  if (!correct) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Server misconfigured' }) };
  }

  if (password === correct) {
    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true, token: correct })
    };
  }

  return {
    statusCode: 401,
    body: JSON.stringify({ ok: false })
  };
};
