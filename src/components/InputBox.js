import React from 'react';


export const InputBox = (props) => {

    const onSubmit = (e) => {
    	e.preventDefault();
	      const inputBox = document.getElementById("input-todo");
	      const todo = inputBox.value;

	      if (todo === "") {
	        return;
	      }
	      props.onAddTodo(todo);
	      inputBox.value = "";
    }

    return (
        <form className="form-inline" onSubmit={onSubmit}>
	        <input type="text" className="form-control mb-2 mr-sm-2"
	               placeholder="Add a todo..." id="input-todo" style={{width: '75%'}} autofocus />
	        <button type="submit" className="btn btn-primary mb-2" style={{width: '23%'}} >Add</button>
	      </form>
    )
}
