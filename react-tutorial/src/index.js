import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

  function Square(props){
    return(
        <button className = "square"
                onClick = { () => props.onClick() } >
            {props.value}
        </button>
    );
  }
  
  class Board extends React.Component {
    renderSquare(i) {
      return <Square value = { this.props.position[i] }
                     onClick = { () => this.props.onClick(i) } />;
    }
  
    render() {
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            history: [{ squares : Array(9).fill(null) }],
            positionNumber: 0,
            xIsNext: true,
        }
    }

    handleClick(i){
        const moveNum = this.state.positionNumber;
        const history = this.state.history.slice(0,  moveNum + 1);
        const current = history[moveNum];
        const arr = current.squares.slice(); 

        if(calculateWinner(arr) || arr[i]){
            return;
        }

        arr[i] = this.state.xIsNext ? 'X' : '0';
        this.setState( {history : history.concat([{squares: arr}]),
                        positionNumber : moveNum +1,
                        xIsNext: !this.state.xIsNext,
                    });
    }

    jumpToPosistion(i){
        this.setState({ positionNumber: i,
                        xIsNext: (i % 2) === 0,
                    });
    }

    render() {
      const history = this.state.history;
      const current = history[this.state.positionNumber];
      const winner = calculateWinner(current.squares)

      const moves = history.map((position,idx) => {
        const buttonLabel = idx ? "go to move " + idx : "go to start"
        return(
            <li key = {idx}>
                <button onClick = {() =>  this.jumpToPosistion(idx) }> {buttonLabel} </button>
            </li>
            );
        });
      let status;
      if(winner){
        status = "Winner: " + winner;
      }else{
        status = "Next player: " + (this.state.xIsNext ? 'X' : '0');
      }

      return (
        <div className="game">
          <div className="game-board">
            <Board onClick = { (i) => this.handleClick(i) }
                   position = { current.squares } />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  
  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />);
  