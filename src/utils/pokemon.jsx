export const getAllPokemon = (url) => {
  // 非同期処理の結果を返す(Promise)
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => resolve(data));
  });
};

// ポケモンの中のURL情報の取得
export const getPokemon = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        resolve(data);
      });
  });
};
