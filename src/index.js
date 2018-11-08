import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import registerServiceWorker from './registerServiceWorker';
import { shuffle, sample } from 'underscore';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import AddPlayerForm from './AddPlayerForm';

const players = [
    {
        name: 'C.Ronaldo',
        imageUrl: 'images/authors/Ronaldo.jpg',
        imageSource: 'Star Football',
        clubs: ['Juventus']
    },
    {
        name: 'Neymar',
        imageUrl: 'images/authors/Neymar.jpg',
        imageSource: 'Star Football',
        clubs: ['Paris Saint Germain']
    },
    {
        name: 'Salah',
        imageUrl: 'images/authors/Salah.jpg',
        imageSource: 'Star Football',
        clubs: ['Liverpool']
    },
    {
        name: 'Bale',
        imageUrl: 'images/authors/Bale.jpg',
        imageSource: 'Star Football',
        clubs: ['Real Madrid']
    },
    {
        name: 'Lukaku',
        imageUrl: 'images/authors/Lukaku.jpg',
        imageSource: 'Star Football',
        clubs: ['Manchester United']
    },
    {
        name: 'Messi',
        imageUrl: 'images/authors/Messi.jpg',
        imageSource: 'Star Football',
        clubs: ['Barcalona']
    },
    {
        name: 'Hazard',
        imageUrl: 'images/authors/Hazard.jpg',
        imageSource: 'Star Football',
        clubs: ['Chelsea']
    },

];

function getTurnData(players) {
    const allPlayers = players.reduce(function (p, c) {
        return p.concat(c.clubs);
    }, []);
    const fourRandomPlayers = shuffle(allPlayers).slice(0, 4);
    const answer = sample(fourRandomPlayers);

    return {
        clubs: fourRandomPlayers,
        player: players.find((player) => player.clubs.some((title) => title === answer))
    }
}


function resetState(){
    return {
        turnData: getTurnData(players),
        highlight: ''
    };
}
let state = resetState();

function onAnswerSelected(answer) {
    const isCorrect = state.turnData.player.clubs.some((club) => club === answer);
    state.highlight = isCorrect ? 'correct' : 'wrong';
    render();
}



function App() {
    return <AuthorQuiz {...state} 
    onAnswerSelected={onAnswerSelected}
    onContinue={()=>{
        state = resetState();
        render();
    }} />;
}
const PlayerWrapper = withRouter(({history}) =>
<AddPlayerForm onAddPlayer={(player)=>{
    players.push(player);
    history.push('/');
}} />);


function render() {
    ReactDOM.render(
        <BrowserRouter>
            <React.Fragment>
                <Route exact path="/" component={App} />
                <Route path="/add" component={PlayerWrapper} />
            </React.Fragment>
        </BrowserRouter>, document.getElementById('root'));
}
render();
registerServiceWorker();
