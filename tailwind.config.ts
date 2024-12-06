import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
			dark:{

				1:'#1C1F2E',
				2:'#161925',
			},
			blue:{
				1:'#0e78f9'
			},
			sky:{
				1:'#C9DDFF'
			},
			orange:{
				1:'#FF742E'
			},
			yellow:{
				1:"#F9A90E"
			},
			purple:{
				1:"#830EF9"
			}
			
  			
  			
  			
  		},
		backgroundImage:{

			hero:"url('/images/hero-background.png')"

		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
