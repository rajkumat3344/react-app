import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';
import 'bulma/css/bulma.css';
import Coins from "./Components/Coins";
import './CSS/Coin.css';


function App() {

    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(()=>{
        axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false')
            .then(res => {
                setCoins(res.data);
            })
            .catch(error => console.log(error));
    }, []);

    const handleChange = (e) => {
        setSearch(e.target.value);
    }

    const filteredCoins = coins.filter(coin =>
        coin.name.includes(search.toLowerCase())
    )

  return (
    <div className="App">
        <h1 className="title is-1 is-spaced heading ">Search Currency</h1>
        <div className="container">
                <input className="input is-primary is-medium search"
                       type="text"
                       placeholder="Search"
                       onChange={handleChange}
                />
            </div>
        {filteredCoins.map(coin => {
            return(
                <Coins key={coin.id}
                       name={coin.name}
                       image={coin.image}
                       symbol={coin.symbol}
                       marketcap={coin.market_cap}
                       price={coin.current_price}
                       priceChange={coin.price_change_percentage_24h}
                       volume={coin.total_volume}
                       />
            )
        })}

    </div>
  );
}

export default App;
