import React, {useState, useEffect} from 'react';
import moment from 'moment';
import Search from '../Search'
import { Link } from 'react-router-dom';
import axios from"axios"

function Table() {
    const [allNumbers, setallNumbers] = useState([])
    const [searchVal, setSearchVal] = useState("")
    const [viewType, setViewType] = useState("allNumbers")
    const [pageNo, setPageNo] = useState(0)

    useEffect(() => {
        fetch(`http://localhost:5000/users`)
          .then(res => {
          return res.json()
          })
          .then(res => {
              setallNumbers([...res])
            console.log(res)
          })
          .catch(err => {
              console.log(err)
          })
    }, [])


  const inputChange = (e) => {
    let val = e.target.value
    setSearchVal(val)
  }
  

  const formSubmit = (e) => {
    console.log("search")
    e.preventDefault()
    setViewType("search")
  }

 const  deleteStudent=(id)=>{
    console.log(id)
    setallNumbers([])
    let result=[]
    result=allNumbers.filter(post=>{
      return post.Id!=id
    })
    setallNumbers([...result])
}
  const next = () => {
    setallNumbers([])
    setPageNo(pageNo + 1)
    fetch(`http://localhost:5000/users`)
    .then(res => {
      return res.json()
    })
    .then(res => {

      setallNumbers([...res])
    })
    .catch(err => {
      console.log(err)
    })
  }
  let Numbers = []

  switch(viewType){
    case "allNumbers":
      Numbers = allNumbers.slice(5*pageNo,5*(pageNo+1))
      break;
    
    case "search":
       Numbers = allNumbers.filter(item => item.Country.toLowerCase() === searchVal.toLowerCase()).slice(5*pageNo,5*(pageNo+1))
       
       break;

    default:
       break;
  }
  

  return (
    <div className="container">
      {Numbers.length > 0 ?
      <div>
        <Search onFormSubmit={formSubmit} onInputChange={inputChange}/>
        <div className="card-deck" style= {{position:"absolute",top:150,left:20 ,right:20}}>
                {Numbers.map((item,index)=>
                    <div class="card"key={index}>
                    <div class="card-body">
                    <p class="card-text">Name: {item.FullName}</p>
                    <p class="card-text">Email: {item.Email}</p>
                    <p class="card-text">Country: {item.Country}</p>
                    {/* <a><Link className="edit-link" to={"/users/" + item.Id}>
                        Edit
                    </Link></a> */}
                    <button className="btn btn-danger" onClick={()=>deleteStudent(item.Id)} size="sm" variant="danger">Delete</button>
                    </div>
                    </div>   
                )}
                </div>
      {
      <div className="btn-group">
        <button id="next"style={{position:"absolute",top: 450 ,left:350}} onClick={next} className="btn btn-outline-info">
          Next
        </button>
      </div>
      }
      </div>
      : <p className="m-5">Data loading..</p>}
    </div>
  );
}

export default Table;