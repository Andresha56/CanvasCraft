import React, { useState } from 'react'
import 'react-quill/dist/quill.snow.css'; // Import CSS for the Snow theme
import ReactQuill from 'react-quill';
import "./TextEditor.css"
function TextEditor() {
    const [editorValue, setEditorValue] = useState('');
    return (
        <div className='textEditor-cotainer'>
            <ReactQuill
            className='textEditor'
                value={editorValue}
                modules={{
                    toolbar: [
                        [{ header: [1, 2, false] }],
                        ['bold', 'italic', 'underline'],
                        ['image', 'code-block'],
                        [{ 'color': [] }],
                    ]
                }}
                theme="snow"
                onChange={(value) => setEditorValue(value)}
            />
        </div>
    )
}

export default TextEditor