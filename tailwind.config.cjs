/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1rem",
      },
      fontSize: {
        "2xs": ".625rem",
      },
      backgroundPosition: {
        "right-1": "right 0.5rem center",
      },
      backgroundImage: {
        checkmark:
          "url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAxNSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMS40NjcgMy43MjY5NkMxMS43NTU5IDMuOTE1ODYgMTEuODM3IDQuMzAzMiAxMS42NDgxIDQuNTkyMUw3LjM5ODExIDExLjA5MjFDNy4yOTc5NSAxMS4yNDUzIDcuMTM1NjggMTEuMzQ2OCA2Ljk1NDE0IDExLjM3QzYuNzcyNTkgMTEuMzkzMiA2LjU5MDAxIDExLjMzNTYgNi40NTQ1OCAxMS4yMTI1TDMuNzA0NTggOC43MTI1M0MzLjQ0OTE3IDguNDgwMzQgMy40MzAzNSA4LjA4NTA2IDMuNjYyNTQgNy44Mjk2NUMzLjg5NDczIDcuNTc0MjQgNC4yOTAwMSA3LjU1NTQxIDQuNTQ1NDIgNy43ODc2MUw2Ljc1MzA0IDkuNzk0NTNMMTAuNjAxOSAzLjkwODA0QzEwLjc5MDggMy42MTkxNCAxMS4xNzgxIDMuNTM4MDcgMTEuNDY3IDMuNzI2OTZaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K)",
        chevron:
          'url("data:image/svg+xml;base64,PHN2ZwogIHdpZHRoPSIxNSIKICBoZWlnaHQ9IjE1IgogIHZpZXdCb3g9IjAgMCAxNSAxNSIKICBmaWxsPSJub25lIgogIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKPgogIDxwYXRoCiAgICBkPSJNMy4xMzUyMyA2LjE1ODAzQzMuMzI0MSA1Ljk1NjU3IDMuNjQwNTIgNS45NDYzNyAzLjg0MTk3IDYuMTM1MjNMNy41IDkuNTY0NjRMMTEuMTU4IDYuMTM1MjNDMTEuMzU5NSA1Ljk0NjM3IDExLjY3NTkgNS45NTY1NyAxMS44NjQ4IDYuMTU4MDNDMTIuMDUzNiA2LjM1OTQ5IDEyLjA0MzQgNi42NzU5MSAxMS44NDIgNi44NjQ3N0w3Ljg0MTk3IDEwLjYxNDhDNy42NDk2NCAxMC43OTUxIDcuMzUwMzYgMTAuNzk1MSA3LjE1ODAzIDEwLjYxNDhMMy4xNTgwMyA2Ljg2NDc3QzIuOTU2NTcgNi42NzU5MSAyLjk0NjM3IDYuMzU5NDkgMy4xMzUyMyA2LjE1ODAzWiIKICAgIGZpbGw9IiNmZmYiCiAgICBmaWxsLXJ1bGU9ImV2ZW5vZGQiCiAgICBjbGlwLXJ1bGU9ImV2ZW5vZGQiCiAgPjwvcGF0aD4KPC9zdmc+Cg==")',
      },
      typography: ({ theme }) => ({
        dark: {
          css: {
            "--tw-prose-body": theme("colors.neutral.500"),
            "--tw-prose-headings": theme("colors.neutral.500"),
            "--tw-prose-bold": theme("colors.neutral.500"),
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
