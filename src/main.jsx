import React from 'react'
import { createRoot } from 'react-dom/client'
import { AnimatePresence } from 'motion/react'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')).render(<React.StrictMode><AnimatePresence mode="wait"><App /></AnimatePresence></React.StrictMode>)
