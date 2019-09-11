import React from 'react';
import uuid from "uuid";
import { CSSTransitionGroup } from 'react-transition-group'
import {ProgressBar} from "react-bootstrap";
import RichTextEditor from 'react-rte';
import { store, findAll } from '../lib/storage';

class App extends React.Component{

  state = {
      notes: [],
      progress: 0,
      note: RichTextEditor.createEmptyValue(),
      title: '',
      currentlyEditingNote: null
  }

  componentDidMount() {
    const notes = findAll();
    this.setState({notes});
  }
  
  saveNote = () => {
      const {title, note, currentlyEditingNote} = this.state;
      const noteId = currentlyEditingNote ? currentlyEditingNote : uuid();

      const obj = {
          title,
          note: note.toString('html'),
          id: noteId
      };

      store(obj);

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


      return (
          <div className="App">
              <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto">
                  <h3 className="display-4"></h3>
              </div>

              <div className="container">

                  <ul>
                      {this.state.notes.map( i => {
                          return (
                              <li onClick={() => {
                                  this.setState({
                                      title: i.title,
                                      note: RichTextEditor.createValueFromString(i.note, 'html'),
                                      currentlyEditingNote: i.id
                                  })
                              }}>{i.title}</li>
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
                            <button onClick={this.saveNote}>+</button>
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

export default App;
