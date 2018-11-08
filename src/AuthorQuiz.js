import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className="row">
      <div className="jumbotron col-10 offset-1">
        <h1>Star Football Player</h1>
        <p>Select the club owned the football player shown</p>
      </div>
    </div>
  );
}

function Club({ title, onClick }) {
  return (
    <div className="answer" onClick={() => { onClick(title); }}>
      <h4>{title}</h4>
    </div>
  )
}

function Turn({ player, clubs, highlight, onAnswerSelected }) {

  function highLightToBgColor(highlight) {
    const mapping = {
      none: '',
      correct: 'green',
      wrong: 'red'
    }
    return mapping[highlight];
  }

  return (<div className="row turn" style={{ backgroundColor: highLightToBgColor(highlight) }}>
    <div className="col-4 offset-1">
      <img src={player.imageUrl} className="playerImage" alt="Football Player"></img>
    </div>
    <div className="col-5 offset-1">
      {clubs.map((title) => <Club title={title} key={title} onClick={onAnswerSelected} />)}
    </div>
  </div>);
}
Turn.prototype = {

}

function Continue({ show, onContinue }) {
  return (
    <div className="continue">
      <Link to="/add"><button className="btn btn-primary btn-lg offset-1">Add a player</button></Link>
      {
        show ?
          <button className="btn btn-primary btn-lg float-right buttonContinue" onClick={onContinue}>Continue</button>

          : null
      }
    </div>
  );
}

function AuthorQuiz({ turnData, highlight, onAnswerSelected, onContinue }) {
  return (
    <div className="container-fluid">
      <Hero />
      <Turn {...turnData} highlight={highlight} onAnswerSelected={onAnswerSelected} />
      <Continue show={highlight === 'correct'} onContinue={onContinue} />
    </div>
  );

}

export default AuthorQuiz;
