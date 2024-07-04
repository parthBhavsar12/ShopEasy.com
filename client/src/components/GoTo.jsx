import React from 'react';
import { Link } from 'react-router-dom';

export default function Goto(props) {
  return (
    <div className="go_to"><span>{props.title}<Link to={props.slug}>{props.goto}</Link></span></div>
  )
}