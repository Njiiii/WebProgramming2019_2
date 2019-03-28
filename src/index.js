import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.deletePerson = this.deletePerson.bind(this)
    this.state = {
      persons: [],
      newName: '',
      newNumber: ''
    }
  }

  componentDidMount(){
    console.log('did mount')
    axios
      .get('http://localhost:3001/api/persons')
      .then(response => {
        console.log('promise fulfilled')
        this.setState({persons: response.data})
      })
  }

  //Tämä metodi lisää uuden henkilön nimen ja numeron 'persons' -listaan.
  addPerson = (event) => {
    event.preventDefault()    
    
    //nameObject on tietokantaan lisättävä nimi, name arvo otetaan newNamesta, number arvo otetaan newNumberista ja id on 'persons' -listan pituus + 1.
    const nameObject = {
        name: this.state.newName,
        number: this.state.newNumber,
        id: this.state.persons.length + 1
    }

    //Lisätään nameObject tietokantaan
    axios
      .post('http://localhost:3001/api/persons', nameObject)
      .then(response => {
        this.setState({
          persons: this.state.persons.concat(nameObject),
          newName: '',
          newNumber: ''
        })
      })
  }
  

  //handeNameChange -metodi toimii eventhandlerina tekstilaatikolle, johon kirjoitetaan haluttu nimi.
  //Ilman tätä tekstilaatikkoon ei voida kirjoittaa mitään.
  handleNameChange = (event) => {
      //console.log(event.target.value)
      this.setState({newName: event.target.value})
  }

  //handleNumberChange on sama kuin handleNameChange, mutta puhelinnumerolle tarkoitetulle tekstikentälle.
  handleNumberChange = (event) => {
    this.setState({newNumber: event.target.value})
  }


  //Poistetaan henkilö id:n perusteella. 
  deletePerson = (id) => {
    const name = this.state.persons[id].name //indeksi [id - 1] koska listan ensimmäisen henkilön indeksi on 0 ja id 1
    return() => {
      if(window.confirm('Poistetaanko henkilö ' + name + '?')){ //Varmisetetaan käyttäjältä haluaako hän varmasti poistaa kyseisen henkilön
        fetch('http://localhost:3001/api/persons' + id, {
          method: 'DELETE'
        })
        .then(response => response.json())
        .catch(error => error)
        console.log('person ' + name + ' deleted')
      }
    }
  }

  render() { 

    const persons = () => this.state.persons.map(name => 
      <p key={name.id}>
        
        {name.name}: {name.number}   
        
        <button onClick={this.deletePerson(name.id)}>
          Poista 
        </button>

      </p>)

      


    return (
        <div>
            <h2>
                Puhelinluettelo
            </h2>

            <form onSubmit={this.addPerson}>
                <div>
                    Nimi: <input value={this.state.newName} onChange={this.handleNameChange} />
                </div>

                <div>
                  Numero: <input value={this.state.newNumber} onChange={this.handleNumberChange} />
                </div>

                <div>
                    <button type="submit">
                        Lisää
                    </button>
                </div>
            </form>
            <form>
              <h2>
                  Numerot
              </h2>
              {persons()}
            </form>
        </div>  
    )
  }
}


//ÄLÄ POISTA!!!
ReactDOM.render(
    <App />,
    document.getElementById('root')
  )


