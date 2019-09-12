import React from 'react';
import uuid from "uuid";
import RichTextEditor from 'react-rte';
import {connect} from "react-redux";
import {addNote, updateNote} from "../redux/actionCreators";
import Footer from "../components/Footer";
import Title from "../components/Title";
import ReactHtmlParser from 'react-html-parser';
import { GoogleLogin } from 'react-google-login';
import {Link} from "react-router-dom"

class AddEdit extends React.Component{

  state = {
      note: RichTextEditor.createEmptyValue(),
      title: '',
      currentlyEditingNote: null,
      pageTitle: 'Add New Note'
  }

  componentDidMount() {
    const search = this.props.location.search; 
    const params = new URLSearchParams(search);
    const mode = params.get('mode');
    const noteId = params.get('noteId');

    if(mode === 'editing' && noteId) {
        const {notes} = this.props;
        const note = notes.find( i => i.id === String(noteId));
        this.setState({
            note: RichTextEditor.createValueFromString(note.content, 'html'),
            title: note.title,
            pageTitle: 'Edit Note',
            currentlyEditingNote: note.id
        });
    }
  }
  
  onSaveButtonPressed = () => {
    this.state.currentlyEditingNote ? this.updateNote() : this.addNote();
  }

  addNote = () => {
    const {title, note} = this.state;
    const {addNote} = this.props;
    const noteId = uuid();

    addNote(noteId, title, note.toString('html'));

    this.resetFields();
  }

  updateNote = () => {
    const {title, note, currentlyEditingNote} = this.state;

    if(!currentlyEditingNote) return;

    const {updateNote} = this.props;

    updateNote(currentlyEditingNote, title, note.toString('html'));

    this.resetFields();
  }

  resetFields = () => {
    this.setState({
        title: '',
        note: RichTextEditor.createEmptyValue(),
        currentlyEditingNote: null
    });
  }

  onChange = (note) => {
    this.setState({note});
  };

  responseGoogle = (data) => {
    console.log('sign in done', data);
    
  }

  render() {


      return (
          <div className="App">
                <Title />

                

                <div className="container">
                    <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">{this.state.pageTitle}</li>
                    </ol>
                    </nav>

                    <div className="d-flex justify-content-center flex-row mb-2">
                        <input className="form-control" type="text" placeholder="Title..." value={this.state.title}
                        onChange={(e) => this.setState({title: e.target.value})}/>
                    </div>
                    <RichTextEditor
                        value={this.state.note}
                        onChange={this.onChange}
                        style={{height: 200}}
                        className="mb-2"
                    />
                    <button className="btn btn-primary" onClick={this.onSaveButtonPressed}>Save</button>
                    <Link to="/">
                        <button className="btn btn-link">Cancel</button>
                    </Link>
                </div>

                <Footer />
          </div>
      );
  }

  
}

const mapStateToProps = (state) => {
    return {
        notes: state.notes
    }
}

export default connect(mapStateToProps, {addNote, updateNote})(AddEdit);