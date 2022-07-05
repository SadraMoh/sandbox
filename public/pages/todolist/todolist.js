'use strict';


class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        { id: crypto.randomUUID(), title: 'Learn React', completed: false },
        { id: crypto.randomUUID(), title: 'Learn TypeScript', completed: false },
        { id: crypto.randomUUID(), title: 'Learn Node.js', completed: true },
        { id: crypto.randomUUID(), title: 'Learn Angular', completed: false },
        { id: crypto.randomUUID(), title: 'Learn Vue.js', completed: true },
      ]
    };
  }

  addTodo(todo) {
    this.setState({ todos: [...this.state.todos, todo] });
  }

  removeTodo(todo) {
    this.setState({ todos: this.state.todos.filter(t => t !== todo) });
  }

  toggleTodo(todo) {
    this.setState({ todos: this.state.todos.map(t => (t === todo ? { ...t, completed: !t.completed } : t)) });
  }

  render() {
    return (
      <div className="container">
        <div className="todolist">
          <Adder added={(todo) => this.addTodo(todo)}></Adder>
          <ul>
            {this.state.todos.map(todo => (
              <li key={todo.id}>
                <Todo todo={todo} removed={(removedTodo) => this.removeTodo(removedTodo)} checked={(checkedTodo) => this.toggleTodo(checkedTodo)}></Todo>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}


class Todo extends React.Component {

  props;
  
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {

    const checkStyle = this.props.todo.completed ? { textDecoration: 'line-through' } : {};
    
    return (
      <label className="todo">
        <input className="checkbox" type="checkbox" checked={this.props.todo.completed == true} onChange={() => this.props.checked(this.props.todo)} />
        <span className="label" style={checkStyle}>{this.props.todo.title}</span>
        <button className="delete" onClick={() => this.props.removed(this.props.todo)}>X</button>
      </label>
    )
  }
}

class Adder extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  render() {

    return (
      <div className="form">
        <input className="textbox" type="text" value={this.state.text} onChange={(e) => this.setState({ text: e.target.value })} />
        <button className="add" onClick={() => this.props.added({ id: crypto.randomUUID(), title: this.state.text, completed: false })}>Add</button>
      </div>
    )
  }
}

const e = React.createElement;

const domContainer = document.getElementById('root');
const root = ReactDOM.createRoot(domContainer);
root.render(e(TodoList));
