import { useState, useEffect } from 'react';
import './App.css'
import "prismjs/themes/prism-okaidia.css";
import Editor from 'react-simple-code-editor';
import prism from 'prismjs';
import Markdown from 'react-markdown';
import axios from 'axios';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/atom-one-dark.css';




function App() {
  const [code, setCode] = useState("");
  const [review, setReviw] = useState("");



  useEffect(() => {
    prism.highlightAll();
  }, [])

  function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCode(e.target.result);
      };
      reader.readAsText(file);
    }
  }

  async function reviewCode() {
    const response = await axios.post("https://codehelp-2.onrender.com/ai/get-review", { code });
    setReviw(response.data);
  }

  async function correctCode() {
    const response = await axios.post("https://codehelp-2.onrender.com/ai/get-code", { code });
    setReviw(response.data);
  }

  return (
    <div className='flex flex-col item-center min-h-screen bg-gray-900 text-white p-6 gap-6'>
      <header className='w-full text-center py-4 text-3xl font-bold bg-gradient-to-r from-blue-600 to-red-600 shadow-lg rounded-lg'>
        🤖 AI Code Helper
      </header>
      <div className='flex flex-row gap-6 w-full '>
        <div className='w-1/2 h-full bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 overflow-auto'>
          {/*file upload*/}

          <input type="file"
            accept='.js , .py, .css, .cpp, .c, .cs, .ts, .java, .html, .json, .xml, .txt'
            onChange={handleFileUpload}
            className='mb-4 text-sm text-gray-400 rounded-lg cursor-pointer bg-gray-500 hover:bg-green-500 text-black transform transition duration-300 hover:scale-105' />

          {/*code editor */}

          <div className='border border-gray-600 rounded-lg p-4 bg-gray-900'>
            <Editor value={code} onValueChange={(code) => setCode(code)}
              highlight={(code) => prism.highlight(code, prism.languages.javascript, 'javascript')}
              padding={10}
              style={{ fontFamily: 'fire Code,monospace', fontSize: 14, backgroundColor: '#282c34', color: '#abb2bf' }}
            >

            </Editor>
          </div>
          <button onClick={reviewCode} className='w-full py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-red-500 hover:to-yellow-500 border border-gray-700 rounded-lg mt-4 gap-3 transform transition duration-300 hover:scale-105'>
            Review Code
          </button>
          <button onClick={correctCode} className='w-full py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-red-500 hover:to-green-500 border border-gray-700 rounded-lg mt-4 gap-3 transform transition duration-300 hover:scale-105'>
            Correct Code
          </button>



        </div>

        <div className='w-1/2 h-full bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 overflow-auto'>
          <h2 className='text-xl font-bold mb-4'>Output</h2>
          {/* Copy Button */}
          <div className="flex justify-end mb-2">
            <button
              onClick={() => navigator.clipboard.writeText(review)}
              className='px-4 py-1 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm'
            >
              Copy
            </button>
          </div>
          <Markdown rehypePlugins={[rehypeHighlight]}>
            {review}
          </Markdown>

        </div>
      </div>
    </div>
  )
}

export default App;
