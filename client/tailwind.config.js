export const safelist = [
  'bg-purple-500',
  'bg-blue-500',
  'bg-green-500',
  'bg-pink-500',
  'bg-rose-500',
  'bg-fuchsia-500',
  'bg-red-500',
];
export const theme = {
  extend: {
    colors: {
      'dark-navy': '#090a0a', // You can name it whatever you like
    },
    animation: {
      scroll: 'scroll 40s linear infinite',
    },
    keyframes: {
      scroll: {
        '0%': { transform: 'translateX(0)' },
        '100%': { transform: 'translateX(-50%)' },
      },
    }
  },
};
export const plugins = [];