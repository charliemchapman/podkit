import React from 'react';
import ReactDOM from 'react-dom';
import ReactQuill from 'react-quill';
/* 
 * Simple editor component that takes placeholder text as a prop 
 */
class HtmlEditor extends React.Component {
    constructor (props) {
      super(props)
      this.state = { }
      this.handleChange = this.handleChange.bind(this)
    }
    
    handleChange (html) {
        this.props.onChange(html);
    }
    
    render () {
      return (
        <div className="html-editor">
          <ReactQuill 
            theme='snow'
            onChange={this.handleChange}
            value={this.props.value}
            modules={HtmlEditor.modules}
            formats={HtmlEditor.formats}
            bounds={'.app'}
           />
         </div>
       )
    }
  }
  
  /* 
   * Quill modules to attach to editor
   * See https://quilljs.com/docs/modules/ for complete options
   */
  HtmlEditor.modules = {
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, 
       {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'video'],
      ['clean']
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    }
  }
  /* 
   * Quill editor formats
   * See https://quilljs.com/docs/formats/
   */
  HtmlEditor.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ]

  export default HtmlEditor;