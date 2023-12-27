import React, { useContext, useEffect } from 'react';
import noteContext from '../context/noteContext';

function About() {
  const a = useContext(noteContext);
  useEffect(() => {
    
  }, [])
  
  return (
    <div>This is about Pankaj and he studies in class</div>
  )
}

export default About;
