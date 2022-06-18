module.exports = {
  content: ["./pages/*.{html,js,svelte,ts}"],
  darkMode: "class",
  theme: {
    extend: {}
  },
  plugins: [],
  purge: {
    enabled: !process.env.ROLLUP_WATCH,
    content: ["./pages/**/index.html", "./pages/**/*.svelte"],
    options: {
      defaultExtractor: (content) => [
        ...(content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []),
        ...(content.match(/(?<=class:)[^=>\/\s]*/g) || [])
      ]
    }
  }
};
