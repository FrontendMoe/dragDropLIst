import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [count, setCount] = useState(0)
  const [selectedItems, setSelectedItems] = useState([
    "1" 
  ])
 const [Items, setItems] = useState(['1' , '2' , '3']);
  return (
		<>
			<div>
				{Items.map((item) => (
					<div draggable> {item}</div>
				))}
			</div>
			<div>
				<p>Selected Items</p>
				{selectedItems.map((el) => (
					<div>{el}</div>
				))}
			</div>
		</>
	);
}

export default App
