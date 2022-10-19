import React, { useRef, useState,useEffect } from 'react'
import styled from 'styled-components'
import { useThrottle } from "use-throttle"
export const SerchBox = ({setQuery,loading,setLoading,suggestion}) => {
  const [text,setText]=useState("")
  const [active,setActive] = useState(0)
  const scrollRef=useRef()
  const throtalText=useThrottle(text,1000)
   

  
  useEffect(()=>{
    setQuery(throtalText)

  },[throtalText,setQuery])
  const handleChange=(e)=>{
    setText(e.target.value)
    // setQuery(e.target.value)
    setLoading(true)

  }
  const handleCross=()=>{
    setText("")
  }
  const handleKeyButton=(e)=>{
    // console.log(scrollRef.current?.scrollTop);
    
    switch(e.keyCode){
      case 40:
        if (active >= 5) {
          setActive((prev) => prev + 1);
          scrollRef.current.scrollTop += 38.05;
        } else {
          setActive((prev) => prev + 1);
        }
        break
        case 38:
          if (active <= 2) {
            scrollRef.current.scrollTop -= 38.05;
            setActive((prev) => prev - 1);
          } else {
            setActive((prev) => prev - 1);
          }
          break;
          case 13:
            window.location.href="/"
            break;
    
          default:
            return;
    }

  }
  
  

  return (
    <>

      <SerchWrapper onKeyUp={handleKeyButton}>
          <Image src="https://www.freeiconspng.com/uploads/search-icon-png-21.png"/>
          <Input value={text} onChange={handleChange}/>
          <RightSIde>
            {text && <Image
            src="https://cdn.iconscout.com/icon/premium/png-256-thumb/cross-3158260-2635455.png"
            style={{
              cursor: 'pointer',
            }}
            onClick={handleCross}
            />}
            {loading && (
              <StyledSpinner viewBox="0 0 50 50">
                <circle
                  className="path"
                  cx="25"
                  cy="25"
                  r="20"
                  fill="none"
                  strokeWidth="4"
                  />
              </StyledSpinner>
            )}
          </RightSIde>
        
      </SerchWrapper>
      {suggestion.length>0 && <SuggestionBox ref={scrollRef} active={active} len={suggestion.length} limit={5}>
        {suggestion.map((cv,index)=>{
          return <ShowBox key={cv} onMouseOver={()=>setActive(index+1)}>{cv}</ShowBox>
        })}

        </SuggestionBox>}
    </>
  )
}
const SuggestionBox=styled.div`
    border: 2px solid black;
    display: flex;
    flex-direction: column;
    border-radius: 20px;
    width: 30%;
    margin: auto;
    padding: 10px 30px;
    max-height: 300px;
    overflow-y: scroll;
    text-align: left;
    
    border-top-color: ${({len})=>(len?"transparent":"black")};
    & *{
      flex: 1;
      text-align: left;
      padding: 10px;
      padding-left: 50px;
    }
    & :nth-child(${({active})=>active}){
      background-color: lightblue;
      color: black;
      font-weight: 700;
      cursor: pointer;

    }

`
const ShowBox=styled.div`
  
`
const SerchWrapper=styled.div`
    border: 2px solid black;
    display: flex;
    flex-direction: row;
    border-radius: 20px;
    width: 30%;
    margin: auto;
    padding: 10px 30px;
`
const RightSIde= styled.div`
`
const Image=styled.img`
height: 30px;
margin-left: -10px;
    
`
const Input=styled.input`
border: none;
outline: none;
font-size: 20px;
flex: 1;
margin-left: 5px;
`
const StyledSpinner = styled.svg`
  animation: rotate 2s linear infinite;
  width: 20px;
  height: 20px;

  & .path {
    stroke: #5652bf;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;


