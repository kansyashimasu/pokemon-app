import { useEffect, useState } from "react";
import "./App.css";
import { getAllPokemon, getPokemon } from "./utils/pokemon";
import Card from "./components/Card";
import Navbar from "./components/Navbar";

function App() {
  const initialUrl = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true); //ロード画面表示
  const [pokemonData, setPokemonData] = useState([]); // 一つ一つの詳細なポケモンデータを格納

  // 次のポケモンの情報
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");

  useEffect(() => {
    // Promiseを使う際はasync関数を使う
    const fetchPokemonData = async () => {
      let res = await getAllPokemon(initialUrl);
      // 各ポケモンのデータを取得
      loadPokemon(res.results);
      setNextUrl(res.next);
      setPrevUrl(res.previous); //1ページ目はnullになる
      setLoading(false);
    };
    fetchPokemonData();
  }, []);

  const loadPokemon = async (data) => {
    // Promise.all=全てのfetchが終わるまでという意味
    // ()内には配列を入れる
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  // 次へボタンを押したら今表示されているデータ以降を受け取る
  const handleNextPage = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextUrl);
    await loadPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  // 前へボタンを押したら
  const handlePrevPage = async () => {
    if (!prevUrl) {
      return;
    }
    setLoading(true);
    let data = await getAllPokemon(prevUrl);
    await loadPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="App">
        {loading ? (
          <h1>ロード中・・・</h1>
        ) : (
          <div className="pokemonCardContainer">
            {pokemonData.map((pokemon, index) => (
              <Card key={index} pokemon={pokemon} />
            ))}
          </div>
        )}
        <div className="btn">
          <button onClick={() => handlePrevPage()}>前へ</button>
          <button onClick={() => handleNextPage()}>次へ</button>
        </div>
      </div>
    </>
  );
}

export default App;
