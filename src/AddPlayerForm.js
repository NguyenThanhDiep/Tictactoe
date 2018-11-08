import React from 'react';
import "./AddPlayerForm.css";

class PlayerForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            imageUrl: '',
            clubs: [],
            clubTemp: ''
        };
        this.onFieldChange=this.onFieldChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleAddPlayer=this.handleAddPlayer.bind(this);
    }
    onFieldChange(event){
        this.setState({[event.target.name]: event.target.value});
    }
    handleSubmit(event){
        event.preventDefault();
        this.props.onAddPlayer(this.state);
    }
    handleAddPlayer(event){
        this.setState({
            clubs: this.state.clubs.concat([this.state.clubTemp]),
            clubTemp: ''
        });
    }
    render() {
        return (
        <form onSubmit={this.handleSubmit}>
            <div className="AddPlayerForm_input">
                <label htmlFor="name">Name</label>
                <input type="text" name="name" value={this.state.name} onChange={this.onFieldChange}></input>
            </div>
            <div className="AddPlayerForm_input">
                <label htmlFor="imageUrl">Image Url</label>
                <input type="text" name="imageUrl" value={this.state.imageUrl} onChange={this.onFieldChange} />
            </div>
            <div className="AddPlayerForm_input">
               {this.state.clubs.map((club)=><p key={club}>{club}</p>)}
               <label htmlFor="clubTemp">Clubs</label>
               <input type="text" name="clubTemp" value={this.state.clubTemp} onChange={this.onFieldChange} />
               <input type="button" value="+" onClick={this.handleAddPlayer}/>
            </div>
            <input type="submit" value="Add"/>
        </form>);
    }
}

function AddPlayerForm({match, onAddPlayer}) {
    return (
        <div className="AddPlayerForm">
            <h1>Add Player</h1>
            <PlayerForm onAddPlayer={onAddPlayer} />
        </div>
    )
}
export default AddPlayerForm;