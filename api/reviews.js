export default async function handler(req, res) {
  const API_TOKEN = process.env.JUDGE_ME_API_TOKEN_EU;
  const SHOP_DOMAIN = process.env.SHOP_DOMAIN_EU;

  if (!API_TOKEN || !SHOP_DOMAIN) {
    return res.status(500).json({ error: 'Missing environment variables' });
  }

  try {
    const url = `https://api.judge.me/api/v1/reviews?api_token=${API_TOKEN}&shop_domain=${SHOP_DOMAIN}&per_page=100&published=true`;

    const response = await fetch(url);
    res.setHeader('Access-Control-Allow-Origin', '*');

    const data = await response.json();
    const allReviews = data.reviews || [];

    const featuredReviews = allReviews.filter(r => r.featured === true);

    res.status(200).json({ reviews: featuredReviews });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
}