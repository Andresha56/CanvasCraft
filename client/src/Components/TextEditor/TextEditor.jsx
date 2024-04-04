import React, { useEffect, useState, useRef } from 'react';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { socket } from '../../Socket';
import { useLocation } from 'react-router-dom';
import "./TextEditor.css";

function TextEditor() {
    const [editorValue, setEditorValue] = useState('');
    const [readOnly, setReadOnly] = useState(true); 
    const location = useLocation();
    const editorRef = useRef(null);

    useEffect(() => {
        console.log("The rrom ID is ",location.state.roomId+ " " +location.state.username )
        if (!location.state) return; 

        const { username, roomId } = location.state;
        if (!username || !roomId) return; 

        socket.once('load-doc', doc => {
            const editor = editorRef.current?.getEditor(); 
            if (editor) {
                setReadOnly(false); // Make editor editable
                editor.setContents(doc);
            }
        });

        socket.emit("joinRoom", {
            username: username,
            roomId: roomId,
        });
    }, [location.state]);

    useEffect(() => {
        const handleReceiveChanges = (delta) => {
            const editor = editorRef.current?.getEditor();
            if (editor) {
                editor.updateContents(delta);
            }
        };
        socket.on('receive-changes', handleReceiveChanges);

        return () => {
            socket.off('receive-changes', handleReceiveChanges);
        };
    }, []);

    const handleEditorChange = (content, delta, source) => {
        if (source === 'user') {
            socket.emit("text-change", delta);
        }
        setEditorValue(content);
    };

    return (
        <div className='textEditor-container'>
            <ReactQuill
                ref={editorRef}
                className='textEditor'
                value={editorValue}
                onChange={handleEditorChange}
                modules={{
                    toolbar: [
                        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                        [{ 'font': [] }],
                        ['bold', 'italic', 'underline', 'strike'],
                        ['image', 'code-block'],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
                        [{ 'color': [] }, { 'background': [] }],
                        [{ 'script': 'sub' }, { 'script': 'super' }],
                        [{ 'align': [] }],
                        [{ 'indent': '-1' }, { 'indent': '+1' }],
                    ]
                }}
                theme="snow"
                readOnly={readOnly} 
            />
        </div>
    );
}

export default TextEditor;
