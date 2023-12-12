import React, { useContext, useEffect } from 'react';
import noteContext from '../context/noteContext';

function About() {
  const a = useContext(noteContext);
  useEffect(() => {
    a.update();
  }, [])
  
  return (
    <div>This is about {a.state.name} and he studies in class {a.state.class}</div>
  )
}

export default About;
