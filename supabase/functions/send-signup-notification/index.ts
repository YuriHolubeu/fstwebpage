const NOTIFICATION_EMAIL = Deno.env.get('NOTIFICATION_EMAIL') || 'focus.structure.tool@gmail.com'
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

const TABLE_LABELS: Record<string, string> = {
  waitlist_subscriptions: 'app waitlist',
  vip_subscription_requests: 'VIP subscription request',
  newsletter_subscriptions: 'newsletter subscription'
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders() })
  }

  if (req.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405)
  }

  if (!RESEND_API_KEY) {
    return json({ error: 'RESEND_API_KEY is not configured' }, 500)
  }

  const payload = await req.json().catch(() => null)
  const signup = normalizeSignupPayload(payload)

  if (!signup?.email || signup.interests.length === 0) {
    return json({ error: 'Invalid payload' }, 400)
  }

  const interests = signup.interests.join(', ')
  const subject = `New Focus Structure Tool signup: ${interests}`
  const sourcePath = signup.sourcePath || 'unknown page'
  const message = signup.message || 'No message provided.'

  const resendResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'Focus Structure Tool <onboarding@resend.dev>',
      to: [NOTIFICATION_EMAIL],
      subject,
      text: [
        'New signup received.',
        '',
        `Name: ${signup.name || 'Unknown'}`,
        `Email: ${signup.email}`,
        `Interest: ${interests}`,
        `Source page: ${sourcePath}`,
        '',
        'Message:',
        message
      ].join('\n')
    })
  })

  if (!resendResponse.ok) {
    return json({ error: await resendResponse.text() }, 502)
  }

  return json({ ok: true })
})

function normalizeSignupPayload (payload: any) {
  if (!payload) return null

  if (payload.email && Array.isArray(payload.interests)) {
    return {
      name: payload.name,
      email: payload.email,
      message: payload.message,
      sourcePath: payload.source_path,
      interests: payload.interests
    }
  }

  const record = payload.record || payload.new_record
  if (record?.email) {
    const tableName = payload.table || payload.table_name
    return {
      name: record.name,
      email: record.email,
      message: record.message,
      sourcePath: record.source_path,
      interests: [TABLE_LABELS[tableName] || tableName || 'subscription']
    }
  }

  return null
}

function corsHeaders () {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  }
}

function json (body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders(),
      'Content-Type': 'application/json'
    }
  })
}
