import React from "react";
import "./Home.css";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
const Home = () => {
  const [color, setColor] = useState("");
  const [call, setCall] = useState([]);
  const [ticket, setTicket] = useState();
  const [tick, setTick] = useState([[], [], []]);
  const [value,  setValue] = useState([]);
  
  const handle = async () => {
    console.log("haiiiii");
    try {
      const { data } = await axios.get("http://localhost:5000/scramble");
      setCall(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const startGame = () => {
    alert("hello");
    let val=[ ...value]
    for (let i = 0; i < call.length; i++) {
      (function (i) {
        setTimeout(function () {
          setTicket(call[i]);
          // setValue(...value,call[i])
         
          val.push(call[i])
          setValue(val)
         
        }, 100 * i);
      })(i);
    }
  };
  console.log(value);
  //  useEffect(() => {
  //   Array.from(Array(90), (e, i) => {
  //     return i + 1;
  //     setArr(...arr, i + 1);
  //   });
  // }, []);
const handleChange=(e)=>{
  function checkArray(value,array)  
  {  
    var status = 'Absent';  
    
    for(var i=0; i<array.length; i++)  
  {  
      var name = array[i];  
      if(name === value){  
        status = 'Present';  
        break;  
      }  
    }  
    alert(status) ;  
    setColor("red")
  }  
  checkArray(e.target.value,value)
}
const handleCorner=()=>{
  const dat=tick._entries[0].filter((val)=>val!==0)
  const sat=tick._entries[2].filter((val)=>val!==0)
  if(value.includes(dat[0]) && value.includes(dat[dat.length-1] )&&value.includes(sat[0])  &&value.includes(sat[sat.length-1])  ){
      console.log( dat[0] ," ",dat[dat.length-1],' ',sat[0], " ",sat[sat.length-1])
      alert("claimed")
  }else{
    alert("not found")
  } 
}
const handleFive=()=>{
  alert()
}

const handleFirst=()=>{
  const dat=tick._entries[0].filter((val)=>val!==0)
  if(dat.every(r => value.includes(r))){
  
   alert('claimed');
  }else{
    alert('Did not find all');
  }

  
}

const handleSecond=()=>{
  const dat=tick._entries[1].filter((val)=>val!==0)
  if(dat.every(r => value.includes(r))){
    alert('claimed');
   }else{
     alert('Did not find all');
   }
}

const handleThird=()=>{
  const dat=tick._entries[0].filter((val)=>val!==0)
  if(dat.every(r => value.includes(r))){
    alert('claimed');
   }else{
     alert('Did not find all');
   }
}

const handleTambola=()=>{
  const dat=tick._entries[0].filter((val)=>val!==0)
   const sat=tick._entries[0].filter((val)=>val!==0)
   const mat=tick._entries[0].filter((val)=>val!==0)
  if(dat.every(r => value.includes(r)) && sat.every(r => value.includes(r)) &&  mat.every(r => value.includes(r))){
    alert('claimed')
   }else{
     alert('Did not find all');
   }
}

  const handleTck = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/ticket");
      setTick(data);
      console.log(data);
      console.log(tick._entries[0]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button className="get" onClick={handle}>
        Get lot
      </button>
      <div>
        <h2>{ticket}</h2>
      </div>

      <button onClick={startGame}>Start game</button>
      <button onClick={handleTck}>Get ticket</button>
      <div >
        {value.map((val)=>{
          return (<span>{val} _</span>)
        })}_
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          border: "solid 1px red",
          width: "428px",
          marginTop: "30pxF",
        }}
      >
        {tick._entries &&
          tick._entries[0].map((data) => {
            return (
              <div
                style={{ display: "flex", flexDirection: "row" }}
                className="item1"
               >
                <input
                
                  style={{ width: "20px"}}
                  value={data === 0 ? "" : data}
                  onClick={handleChange}
                />
              </div>
            );
          })}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          border: "solid 1px red",
          width: "428px",
        }}
      >
        {tick._entries &&
          tick._entries[1].map((data) => {
            return (
              
              <div
                className="item1"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <input
                  style={{ width: "20px" }}
                  placeholder={data === 0 ? "" : data}
                  //disabled
                  value={data === 0 ? "" : data}
                  onClick={handleChange}
                />
              </div>
            );
          })}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          border: "solid 1px red",
          width: "428px",
        }}
      >
        {tick._entries &&
          tick._entries[2].map((data) => {
            return (
              <div
                style={{ display: "flex", flexDirection: "column" }}
                className="item1"
              >
                <input
                  style={{ width: "20px" }}
                  value={data === 0 ? "" : data}
                  onClick={handleChange}
                />
              </div>
            );
          })}

      </div>
          <button style={{marginLeft:"8px"}} onClick={handleCorner}>Corner</button>
          <button style={{marginLeft:"8px"}} onClick={handleFive}>First five</button>
          <button style={{marginLeft:"8px"}} onClick={handleFirst}>1st row</button>
          <button style={{marginLeft:"8px"}} onClick={handleSecond}>2nd row</button>
          <button style={{marginLeft:"8px"}} onClick={handleThird}>3rd row</button>
          <button style={{marginLeft:"8px"}} onClick={handleTambola}>Tambola</button>
    </>
  );
};

export default Home;
