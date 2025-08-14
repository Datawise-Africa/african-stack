import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { email, name, interests } = body;

    // Validate email
    if (!email || !email.includes('@')) {
      return new Response(
        JSON.stringify({
          error: 'Please provide a valid email address'
        }),
        { status: 400 }
      );
    }

    // Here you would typically:
    // 1. Save to your database
    // 2. Send to your email service (Mailchimp, ConvertKit, etc.)
    // 3. Send confirmation email
    
    console.log('Newsletter subscription:', { email, name, interests });

    // For demo purposes, we'll just return success
    // In production, implement actual subscription logic
    
    return new Response(
      JSON.stringify({
        message: 'Successfully subscribed to newsletter',
        email,
        name,
        interests
      }),
      { 
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    
    return new Response(
      JSON.stringify({
        error: 'Internal server error'
      }),
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
};
