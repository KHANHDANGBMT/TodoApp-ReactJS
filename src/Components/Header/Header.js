import React, { memo, useState } from 'react';
import { connect } from 'react-redux';
import { addOneTodo } from "../../store/actions";

const Header = props => {
    const [text, setText] = useState('');
    const { addOneTodo } = props;
    const onAddTodo = (e = {}) => {
        if (e.key === 'Enter' && text.trim()) {
            const newText = text.trim();
            addOneTodo({
              id: new Date().valueOf(),
              text: newText,
              isCompleted: false,
            });
            setText("");
        }
    }

    return (
        <header className="header">
            <h1>Todos</h1>
            <input
                value={text}
                className="new-todo"
                onChange={(e) => setText(e.target.value)}
                onKeyPress={(e) => onAddTodo(e)}
            />
        </header>
    );
}
const mapDispatchToProps = dispatch=>{
    return {
      addOneTodo: (todo)=>{dispatch(addOneTodo(todo));}
    };
}
export default memo(connect(null, mapDispatchToProps)(Header)); 