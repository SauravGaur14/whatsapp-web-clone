/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "chat-background": "url('chat-bg.png')",
        "qr-code": "url('/qr-code.svg')",
      },
      colors: {
        "secondary": "#8696a0",
        "teal-light": "#7ae3c3",
        "photopicker-overlay-background": "#1e2a31cc",
        "dropdown-background": "#233138",
        "dropdown-background-hover": "#182229",
        "input-background": " #2a3942",
        "primary-strong": "#e9edef",
        "panel-header-background": "#202c33",
        "panel-header-icon": "#aebac1",
        "icon-lighter": "#8696a0",
        "icon-green": "#00a884",
        "search-input-container-background": "#111b21",
        "conversation-border": "#8696a026",
        "conversation-panel-background": "#0b141a",
        "background-default-hover": "#202c33",
        "incoming-background": "#202c33",
        "outgoing-background": "#005c4b",
        "bubble-meta": "#FFFFFF99",
        "icon-ack": "#53bdeb",
        "button-primary":"#008069"
      },
      gridTemplateColumns: {
        main: "1fr 2.4fr",
      },
    },
  },
  plugins: [],
};
