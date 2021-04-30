import React from 'react';

function Search(props) {
  return (
    <div style={{position: "absolute", top: "1%", right: "5%"}}>
    <form className="form-inline my-2 my-lg-0" onSubmit={props.onFormSubmit}>
     <input className="form-control" type="search" placeholder="Search " aria-label="Search" onChange={props.onInputChange}/>
     <button className="btn btn-outline-dark my-2 my-sm-0" type="submit">Filter</button>
    </form>
    </div>
  );
}

export default Search;
