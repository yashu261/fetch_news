const axios = require('axios');

const NEWS_API_BASE_URL = 'https://newsapi.org/v2';
const API_KEY = process.env.NEWS_API_KEY;

// Mock data for demo mode
const getMockArticles = (category = 'general') => [
  {
    source: { id: null, name: 'Demo News' },
    author: 'John Demo',
    title: 'Breaking: Latest Technology Innovations',
    description: 'Discover the most recent breakthroughs in artificial intelligence, quantum computing, and space exploration that are shaping our future.',
    url: 'https://example.com/tech-news',
    urlToImage: 'https://images.unsplash.com/photo-1677442d019e157be52e69ae3688dc91a3154ef27?w=500&h=300&fit=crop',
    publishedAt: new Date().toISOString(),
    content: 'Demo content about technology innovations...'
  },
  {
    source: { id: null, name: 'Demo News' },
    author: 'Jane Reporter',
    title: 'Market Update: Strong Economic Growth Expected',
    description: 'Financial analysts predict robust economic growth in the coming quarters despite global challenges and market volatility.',
    url: 'https://example.com/business',
    urlToImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=300&fit=crop',
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    content: 'Demo content about business and markets...'
  },
  {
    source: { id: null, name: 'Demo News' },
    author: 'Sports Correspondent',
    title: 'Championship Final: Historic Victory for Team A',
    description: 'In an exciting championship match, Team A clinched an unprecedented victory with a stunning performance that will be remembered for years.',
    url: 'https://example.com/sports',
    urlToImage: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&h=300&fit=crop',
    publishedAt: new Date(Date.now() - 172800000).toISOString(),
    content: 'Demo content about sports events...'
  },
  {
    source: { id: null, name: 'Demo News' },
    author: 'Health Expert',
    title: 'New Study: Benefits of Regular Exercise',
    description: 'Scientists reveal groundbreaking findings about how regular physical activity can improve overall health and longevity.',
    url: 'https://example.com/health',
    urlToImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&h=300&fit=crop',
    publishedAt: new Date(Date.now() - 259200000).toISOString(),
    content: 'Demo content about health and wellness...'
  },
  {
    source: { id: null, name: 'Demo News' },
    author: 'Entertainment Writer',
    title: 'Movie Premiere: Blockbuster Film Breaks Box Office Records',
    description: 'The highly anticipated film has surpassed expectations, breaking multiple box office records and becoming an instant classic.',
    url: 'https://example.com/entertainment',
    urlToImage: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&h=300&fit=crop',
    publishedAt: new Date(Date.now() - 345600000).toISOString(),
    content: 'Demo content about entertainment...'
  }
];

// Get top headlines
exports.getHeadlines = async (req, res) => {
  try {
    const { country = 'us', page = 1, pageSize = 20 } = req.query;
    
    // Use demo mode if no API key is configured
    if (!API_KEY || API_KEY === 'your_news_api_key_here') {
      return res.json({
        status: 'ok',
        totalResults: 50,
        articles: getMockArticles().slice(0, pageSize)
      });
    }
    
    const response = await axios.get(`${NEWS_API_BASE_URL}/top-headlines`, {
      params: {
        country,
        apiKey: API_KEY,
        page,
        pageSize
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching headlines:', error.message);
    // Return mock data on error
    res.json({
      status: 'ok',
      totalResults: 50,
      articles: getMockArticles()
    });
  }
};

// Get news by category
exports.getNewsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const { country = 'us', page = 1, pageSize = 20 } = req.query;

    // Use demo mode if no API key is configured
    if (!API_KEY || API_KEY === 'your_news_api_key_here') {
      return res.json({
        status: 'ok',
        totalResults: 50,
        articles: getMockArticles(category).slice(0, pageSize)
      });
    }

    const response = await axios.get(`${NEWS_API_BASE_URL}/top-headlines`, {
      params: {
        category,
        country,
        apiKey: API_KEY,
        page,
        pageSize
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching news by category:', error.message);
    // Return mock data on error
    res.json({
      status: 'ok',
      totalResults: 50,
      articles: getMockArticles()
    });
  }
};

// Search news
exports.searchNews = async (req, res) => {
  try {
    const { q, page = 1, pageSize = 20, sortBy = 'publishedAt' } = req.query;

    if (!q) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    // Use demo mode if no API key is configured
    if (!API_KEY || API_KEY === 'your_news_api_key_here') {
      return res.json({
        status: 'ok',
        totalResults: 20,
        articles: getMockArticles().slice(0, pageSize)
      });
    }

    const response = await axios.get(`${NEWS_API_BASE_URL}/everything`, {
      params: {
        q,
        apiKey: API_KEY,
        page,
        pageSize,
        sortBy
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error searching news:', error.message);
    // Return mock data on error
    res.json({
      status: 'ok',
      totalResults: 20,
      articles: getMockArticles()
    });
  }
};
