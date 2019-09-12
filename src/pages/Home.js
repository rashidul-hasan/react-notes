import React from 'react';
import uuid from "uuid";
import RichTextEditor from 'react-rte';
import {connect} from "react-redux";
import {addNote, updateNote} from "../redux/actionCreators";
import ReactHtmlParser from 'react-html-parser';
import Footer from "../components/Footer";
import Title from "../components/Title";
import { GoogleLogin } from 'react-google-login';
import {Link} from "react-router-dom"

class Home extends React.Component{

  responseGoogle = (data) => {
    console.log('sign in done', data);
  }

  render() {
      
    const notes = this.props.notes ? this.props.notes : [];

      return (
          <div className="App">
              <Title />

              <div className="container">
                     <Link to="/add-or-edit">
                        <button type="button" className="btn btn-primary mb-2">Add New Note</button>
                    </Link>
              
              {/* <GoogleLogin
                clientId="1066567032794-nnpoocs7oprap8vuvv3jhp4f5lhr5elu.apps.googleusercontent.com"
                buttonText="Sign in with Google"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                cookiePolicy={'single_host_origin'}
                prompt={"consent"}
                isSignedIn={true}
              /> */}

                {notes.map( i => {
                    return (
                    <div className="card mb-2" onClick={() => {}} key={i.id}>
                        <div className="card-body">
                            <h5 className="card-title">{i.title}</h5>
                            <div className="card-text">{ ReactHtmlParser(i.content) }</div>
                            <Link to={`/add-or-edit?mode=editing&noteId=${i.id}`} className="card-link">Edit</Link>
                            <a href="#" className="card-link">View</a>
                        </div>
                    </div>  
                    )
                })
                }
            
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

export default connect(mapStateToProps, {addNote, updateNote})(Home);