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

    // ----handle---changes----in--editor---
    const handleEditorChange = (content, delta, source) => {
        if (source === 'user') {
            socket.emit("text-change", delta);
        }
        setEditorValue(content);
    };


    // -----on--document---load---
    useEffect(() => {
        if (!location.state) return;

        const { username, roomId, newRoom } = location.state;
        if (!username || !roomId) return;

        socket.once('load-doc', docString => {
            const editor = editorRef.current?.getEditor();
            console.log("The content after page loding is ",JSON.parse(docString))
            if (editor) {
                setReadOnly(false);
                // Parse the docString back into an object
                editor.setContents(JSON.parse(docString));
            }
        });

        socket.emit("joinRoom", {
            username,
            roomId,
            newRoom
        });

    }, [location.state]);

    // -------receive--and---share---changes-------
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
    // ----save---document--on---change----
    useEffect(()=>{
        const intervel=setInterval(()=>{
            const editor = editorRef.current?.getEditor();
            if(editor){
                const newData=editor.getContents()
                console.log(newData)
                JSON.stringify(editor.getContents())
                socket.emit("save-document",JSON.stringify(editor.getContents()));
            }
        },[4000]);
        return ()=>{
            clearInterval(intervel);
        }
    },[])

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
