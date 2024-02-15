import React from 'react';

export default function MoveAway(props) {
  return (
    <div className="go_to"><span>{props.title}<a href="/">{props.goto}</a></span></div>
  )
}