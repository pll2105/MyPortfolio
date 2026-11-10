/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './js/**/*.js',
  ],

  corePlugins: {
    // Keep preflight disabled — Bootstrap reboot handles the reset
    preflight: false,
  },

  theme: {
    extend: {
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        body:    ['"IBM Plex Sans"',       'system-ui', 'sans-serif'],
        mono:    ['ui-monospace', 'Menlo', 'Consolas', 'monospace'],
      },
      colors: {
        // Light mode
        bg:        'var(--bg)',
        surface:   'var(--surface)',
        ink:       'var(--ink)',
        muted:     'var(--muted)',
        line:      'var(--line)',
        accent:    'var(--accent)',
        highlight: 'var(--highlight)',
        // Project card gradients
        'grad-blue-from':   '#2f5bff',
        'grad-blue-to':     '#1b2f8f',
        'grad-orange-from': '#e0662f',
        'grad-orange-to':   '#a33a0e',
        'grad-green-from':  '#0f9d7a',
        'grad-green-to':    '#0a5c49',
        'grad-purple-from': '#6a3fd6',
        'grad-purple-to':   '#3a1f8a',
        // Terminal
        'term-bg':    '#0e1527',
        'term-bar':   '#18223a',
        'term-text':  '#cfe0ff',
        'term-prompt':'#ffc857',
        'term-name':  '#7c9bff',
      },
      borderRadius: {
        card: '12px',
        btn:  '8px',
        chip: '999px',
      },
      boxShadow: {
        terminal: '6px 6px 0 var(--accent)',
        card:     '0 2px 12px rgba(0,0,0,0.08)',
        'card-hover': '0 6px 24px rgba(0,0,0,0.14)',
      },
    },
  },

  plugins: [],
};
