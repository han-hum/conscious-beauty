import adapter from '@sveltejs/adapter-static';

const config = {
  kit: {
    adapter: adapter({
      fallback: 'index.html' // this helps with dynamic routes like [id]
    })
  }
};

export default config;
