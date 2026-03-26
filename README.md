# News Fetcher Backend

Express.js backend API for fetching news from NewsAPI.org

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file with your NewsAPI key:
```
PORT=5000
NEWS_API_KEY=your_key_here
```

3. Start the server:
```bash
npm run dev
```

## API Endpoints

- `GET /api/news/headlines` - Get top headlines
- `GET /api/news/category/:category` - Get news by category
- `GET /api/news/search?q=query` - Search news

## Get API Key

Visit https://newsapi.org to get your free API key.
