export const withErrorHandling = (fn) => async (req, res) => {
  try {
    return await fn(req, res);
  } catch (error) {
    console.error('Scraping error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Scraping failed', 
        message: error.message 
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};