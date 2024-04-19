import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
 const [products , setProducts] = useState([]);
 const [page , setPage] = useState(1)

 async function fetchproduct(){
    try{
   const response = await axios.get('https://dummyjson.com/products');
          setProducts(response.data.products)
    }catch{
      (err)=>{
        console.log(err)
      }
    }   
 };

 useEffect(()=>{
   fetchproduct()
 },[])

 function handlegape(pagen){
  
   setPage(pagen)
 }
  return (
    <>
      <h1>pagination</h1>
      <div style={{display:"grid",width : "100%" , gridTemplateColumns : "1fr 1fr 1fr" , gap : "10px"}}>
        {products.length > 0 && products.slice(page * 6 -6 , page*6).map((item)=>(
          <li style={{width:"90%" , padding : "5px" , background : "wheat", }} key={item.id}>
            <img style={{width : "100%" , height:"150px" , }} src={item.thumbnail} alt={item.title} />
          </li>
        ))};
     <div style={{display : "flex"  , gap : '5px'}}>
       <button disabled = {page == 1} onClick={()=>{
         if(page > 1){
          setPage(page - 1)
         }
     }} >pre</button>
     {[...Array(products.length / 6) ].map((_ , i)=>(
       <span style={{padding : "10px" , border : "1px solid black" , background : page == i+1 ? "grey" : "white"}} key={i} onClick={()=> handlegape(i+1)} >{i+1}</span>
     ))}
     <button disabled = {page == 5}  onClick={()=>{
         if(page < 5){
          setPage(page + 1)
         }
     }}>next</button>
     </div>
      </div>
    </>
  )
}

export default App
