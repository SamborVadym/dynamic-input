import { useState, useRef, useEffect } from 'react';

const tagsList = ['React', 'Next.js', 'Tailwind', 'JavaScript', 'CSS'];

export const DynamicInput = () => {
    const [elements, setElements] = useState([]);
    const [inputText, setInputText] = useState('');
    const inputRef = useRef(null);

    const addTagAtCursor = (tag) => {
        const cursorPosition = inputRef.current.selectionStart;
        const beforeCursor = inputText.slice(0, cursorPosition);
        const afterCursor = inputText.slice(cursorPosition);

        const newElements = [
            ...elements,
            { type: 'text', value: beforeCursor },
            { type: 'tag', value: tag },
            { type: 'text', value: afterCursor },
        ];

        const filteredElements = newElements.filter(el => el.value.trim() !== '');

        setElements(filteredElements);
        setInputText('');
    };

    const removeTag = (index) => {
        const newElements = elements.filter((_, i) => i !== index);

        setElements(newElements);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Backspace' && inputText === '') {
            const lastElement = elements[elements.length - 1];
            if (lastElement) {
                if (lastElement.type === 'tag') {
                    removeTag(elements.length - 1);
                } else {
                    setElements(elements.slice(0, -1));
                }
            }
        }
    };

    // Обробка зміни тексту
    const handleTextChange = (e) => {
        setInputText(e.target.value);
    };

    useEffect(() => {
        inputRef.current.focus();
    }, [elements]);

    return (
        <div className="container">
            <div className="border border-gray-300 rounded-lg py-4 px-2 flex flex-wrap gap-2 items-center">
                {elements.map((el, index) => (
                    el.type === 'tag' ? (
                        <span key={index} className="bg-gray-300 rounded-full px-2 py-1 flex items-center">
                            {el.value}
                            <button
                                onClick={() => removeTag(index)}
                                className="ml-2 text-black hover:text-red-500"
                            >
                            &times;
                          </button>
                        </span>
                    ) : (<span key={index} className="text">{el.value}</span>)
                ))}
                <input
                    ref={inputRef}
                    type="text"
                    value={inputText}
                    onChange={handleTextChange}
                    onKeyDown={handleKeyDown}
                    className="outline-none flex-grow"
                    placeholder="Type text here..."
                />
            </div>
            <button disabled={!elements?.length} className="mt-2 bg-black text-white p-2 rounded-md disabled:opacity-5" onClick={() => setElements([])}>Clear All elements</button>

            <div className="flex gap-2 mt-4">
                {tagsList.map((tag, index) => (
                    <span
                        key={index}
                        onClick={() => addTagAtCursor(tag)}
                        className="bg-gray-200 px-3 py-1 rounded-full cursor-pointer"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
};
