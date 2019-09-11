import React from 'react';
import uuid from "uuid";
import RichTextEditor from 'react-rte';
import {connect} from "react-redux";
import {addNote, updateNote} from "../redux/actionCreators";

class App extends React.Component{

  state = {
      note: RichTextEditor.createEmptyValue(),
      title: '',
      currentlyEditingNote: null
  }

  componentDidMount() {

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

  render() {

    const notes = this.props.notes ? this.props.notes : [];

      return (
          <div className="App">
              <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                  <h3 className="display-4">React NOTES</h3>
              </div>

              <div className="container">

                  <ul>
                      {notes.map( i => {
                          return (
                              <li onClick={() => {
                                  this.setState({
                                      title: i.title,
                                      note: RichTextEditor.createValueFromString(i.content, 'html'),
                                      currentlyEditingNote: i.id
                                  })
                              }} key={i.id}>{i.title}</li>
                          )
                      })}
                  </ul>
                  
              <RichTextEditor
                    value={this.state.note}
                    onChange={this.onChange}
                />
                  <div className="d-flex justify-content-center flex-row">
                      <input type="text" placeholder="title..." value={this.state.title}
                        onChange={(e) => this.setState({title: e.target.value})}/>
                      <div className="todo-wrap">
                            <button onClick={this.onSaveButtonPressed}>+</button>
                      </div>
                  </div>

              </div>
              <div className="container">
                  <footer className="pt-4 my-md-5 pt-md-5 border-top">
                      
                  </footer>
              </div>
          </div>
      );
  }

  
}

const mapStateToProps = (state) => {
    return {
        notes: state.notes
    }
}

export default connect(mapStateToProps, {addNote, updateNote})(App);