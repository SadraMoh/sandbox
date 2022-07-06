'use strict';


class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    };
  }

  async componentDidMount() {
    const todos = await (await fetch('/todo/list')).json();
    this.setState({ todos });
  }

  async addTodo(todo) {

    todo = await (await fetch('/todo/add', { method: 'POST', body: JSON.stringify(todo), headers: { 'Content-Type': 'application/json' } })).json();

    this.setState({ todos: [...this.state.todos, todo] });
  }

  async removeTodo(todo) {
    await fetch('/todo/delete/' + todo.id, { method: 'DELETE', body: JSON.stringify(todo), headers: { 'Content-Type': 'application/json' } });

    this.setState({ todos: this.state.todos.filter(t => t !== todo) });
  }

  async toggleTodo(todo) {
    await fetch('/todo/update/' + todo.id, { method: 'POST', body: JSON.stringify({ ...todo, completed: !todo.completed }), headers: { 'Content-Type': 'application/json' } });

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
        <button className="add" onClick={() => this.props.added({ title: this.state.text, completed: false })}>Add</button>
      </div>
    )
  }
}

const e = React.createElement;

const domContainer = document.getElementById('root');
const root = ReactDOM.createRoot(domContainer);
root.render(e(TodoList));
