module.exports = {
  title: 'json-form',
  plugins: ['demo-container'],
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: 'API', link: '/api/' },
      { text: '示例', link: '/example/' },
    ],
    sidebar: {
      '/api/': 'auto',
      '/example/': 'auto'
    }
  }
}
