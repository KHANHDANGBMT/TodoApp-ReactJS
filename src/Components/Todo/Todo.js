import React, { memo } from 'react';

const todo = props => (
  <li>
    <div className="view">
      <input className="toggle"/>
      <label>dljf</label>
      <button className="destroy"/>
    </div>
  </li>
)

export default memo(todo);