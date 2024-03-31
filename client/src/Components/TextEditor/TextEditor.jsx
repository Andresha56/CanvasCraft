import React, { useState } from 'react'
import 'react-quill/dist/quill.snow.css';
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
                        [{ 'header': [1, 2, 3, 4, 5, 6, false] },],
                        [{ 'font': [] }],
                        ['bold', 'italic', 'underline','strike'],
                        ['image', 'code-block'],
                        [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
                        [{ 'color': [] }, { 'background': [] }],
                        [{ 'script': 'sub'}, { 'script': 'super' }],   
                        [{ 'align': [] }],
                        [{ 'indent': '-1'}, { 'indent': '+1' }], 
                       
                    ]
                }}
                theme="snow"
                onChange={(value) => setEditorValue(value)}
            />
        </div>
    )
}

export default TextEditor