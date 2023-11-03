import { useState, useEffect } from 'react'

// Stylesheets
import './App.css'
import './course-unit-view/page.css'

// Page components
import ContentPage from './course-unit-view/page'

// Shadcn (atomic) components
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage } from "@/components/ui/avatar"

import { ThemeProvider } from "./components/theme-control/theme-provider"
import { ModeToggle } from "./components/theme-control/mode-toggle"

// Lucide icons


function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  
  useEffect(() => {
    async function fetchData() {
      // console.log(import.meta.env.VITE_API_URL);
  
      try {
        const resp = await fetch(`${import.meta.env.VITE_API_URL}posts`);
        if (!resp.ok) {
          throw new Error('Network response was not ok.');
        }
        const result = await resp.json();
        setData(result);
        console.log(result);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    }

    fetchData();
  }, [])
  

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className={"hidden flex-col md:flex"}>
          <div className="flex h-14 items-center px-4 border-b">
            <div className="ml-auto flex items-center space-x-1">
              <ModeToggle />
              <Avatar className={"pd-xml-auto"}>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>RL</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
        <ContentPage />
      </ThemeProvider>
    </>
  )
}

export default App
