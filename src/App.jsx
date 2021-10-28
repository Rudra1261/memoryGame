import { Button, Grid } from '@mui/material'
import {  useState, useEffect } from 'react'
import Flippy, { FrontSide, BackSide } from 'react-flippy'

function App() {

  {
    window.onbeforeunload = event => {
      const e = event || window.event
      e.preventDefault();
      if (e) {
        e.returnValue = '';
      }
      return '';

    }
  }
  const randomize = array => {
    let arr = []
    let len = array.length
    for (let i = 0; i < len; i++) {
      let rnum = Math.floor(Math.random() * array.length)
      arr = [...arr, array[rnum]]
      array.splice(rnum, 1)
    }
    return arr
  }
  const [openendCard, setOpenedCard] = useState([])
  const [arr, setArr] = useState(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'])
  const [tempArray, setTempArray] = useState(() => randomize(arr.concat(arr)))
  const [played, setPlayed] = useState(0)
  const [matched, setMatched] = useState([])
  const [moves, setMoves] = useState(0)
  function flipCard(index, element) {
    setOpenedCard(opened => [...opened, index, element])
    console.log(openendCard)
  }
  useEffect(() => {
    if (openendCard < 4) return
    const firstMatched = openendCard[1]
    const secondMatched = openendCard[3]
    if (firstMatched === secondMatched) {
      if (!matched.includes(firstMatched)) 
      setMatched([...matched, firstMatched])
    }
    if (openendCard.length === 4) setTimeout(() => setOpenedCard([]), 500)

  }, [openendCard])
  const handleClick = () => {
    setMoves(moves => moves += 1)
  }
  if (matched.length === 8){
    alert("Congratulations you've won")
    setMatched([])
    setTempArray(() => randomize(arr.concat(arr)))
    console.log(tempArray)
    setMoves(0)
    setPlayed(prev => prev+=1)
  }
  return (
    <>
      {/* {bool && (<Grid container><Grid item><h1>You've WON</h1></Grid></Grid>)} */}
      <Grid container>
        <Grid item xs={6}>
          <h3>Moves : {moves}</h3>
        </Grid>
        <Grid item xs={6}>
          <h3>Matches played : {played}</h3>
        </Grid>
      </Grid>

      
      <Grid container>
        {tempArray.map((element, index) => {
          let isFlipped = false
          if (openendCard.includes(index)) isFlipped = true
          if (matched.includes(element)) isFlipped = true
          return (

            <Grid item container xs={12} sm={6} md={3} key={index}>
              <Button onClick={() => {
                flipCard(index, element)
                handleClick()
              }}>
                <Flippy isFlipped={isFlipped}>
                  <FrontSide style={{ backgroundColor: 'red', minWidth: '150px', minHeight: '150px' }}>

                  </FrontSide>
                  <BackSide style={{ backgroundColor: 'black' }}>
                    {element} <br />
                  </BackSide>
                </Flippy>
              </Button>
            </Grid>

          )
        })}
      </Grid>
    </>
  );
}

export default App;
