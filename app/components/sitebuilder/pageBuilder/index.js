import React from 'react';
import Base from '../Base';
import "../../../../styles/index.css"
const Pagebuilder = (props) => {
  console.log(props);
  return (
    <>
      <Base {...props} />
    </>
  )
}

export default Pagebuilder