import { useEffect, useState, useRef } from 'react';
import './App.css';

function App() {
	const [highlightedINdex, setHighlightedINdex] = useState(2);
	const [items, setItems] = useState(['1', '2', '3', '4', '5']);
	const [selectedItems, setSelectedItems] = useState(['1']);
	const [draggedItem, setDraggedItem] = useState(null);
	const itemsRef = useRef([]);

	const handleOnDrag = (e, item) => {
		setDraggedItem(item);
	};

	const handleOnDrop = (e) => {
		e.preventDefault();
		const rect = e.target.getBoundingClientRect();
		const offsetY = e.clientY - rect.top;

		let insertionIndex = 0;
		itemsRef.current.forEach((item, index) => {
			const itemRect = item.getBoundingClientRect();
			const itemOffsetY = itemRect.top - rect.top + itemRect.height / 2;
			if (offsetY >= itemOffsetY) {
				insertionIndex = index + 1;
			}
		});

		const updatedItems = [...selectedItems].filter((el) => el !== -1);
		updatedItems.splice(insertionIndex, 0, draggedItem);
		setSelectedItems(updatedItems);
		setDraggedItem(null);
	};

	const handleDragOver = (e) => {
		e.preventDefault();
		const rect = e.target.getBoundingClientRect();
		const offsetY = e.clientY - rect.top;

		let insertionIndex = 0;
		itemsRef.current.forEach((item, index) => {
			const itemRect = item.getBoundingClientRect();
			const itemOffsetY = itemRect.top - rect.top + itemRect.height / 2;
			if (offsetY >= itemOffsetY) {
				insertionIndex = index + 1;
			}
		});

		setHighlightedINdex(insertionIndex);
		const newVAls = [...selectedItems].filter((el) => el !== -1);
		newVAls.splice(highlightedINdex, 0, -1);

		setSelectedItems([...newVAls]);
	};

	return (
		<div className='flex justify-center items-center h-screen space-x-4'>
			<div className='border p-4 space-y-4'>
				{items.map((item, index) => (
					<div
						draggable
						className='border p-2'
						onDrag={(e) => handleOnDrag(e, item)}
						key={item}>
						{item}
					</div>
				))}
			</div>
			<div className='border pb-4 space-y-4'>
				<p className='border px-4'>Selected Items</p>
				<div
					onDrop={handleOnDrop}
					onDragOver={handleDragOver}
					className='px-4 pt-4'>
					{selectedItems.map((el, index) =>
						el !== -1 ? (
							<div
								ref={(el) => (itemsRef.current[index] = el)}
								key={index}>
								{el}
							</div>
						) : (
							<div
								ref={(el) => (itemsRef.current[index] = el)}
								className='bg-black h-2'
								key={index}></div>
						)
					)}
				</div>
			</div>
		</div>
	);
}

export default App;
