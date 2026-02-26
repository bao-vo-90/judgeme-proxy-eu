export default async function handler(req, res) {
  const { product_id } = req.query;

  const API_TOKEN_EU = process.env.JUDGE_ME_API_TOKEN_EU;
  const SHOP_DOMAIN_EU = process.env.SHOP_DOMAIN_EU;

  if (!API_TOKEN_EU || !SHOP_DOMAIN_EU) {
    return res.status(500).json({ error: 'Missing environment variables' });
  }

  try {
    const url = `https://api.judge.me/api/v1/reviews?api_token=${API_TOKEN_EU}&shop_domain=${SHOP_DOMAIN_EU}&per_page=10&rating=5&published=true${product_id ? `&product_id=${product_id}` : ''}`;

    const response = await fetch(url);
    res.setHeader('Access-Control-Allow-Origin', '*');

    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
}