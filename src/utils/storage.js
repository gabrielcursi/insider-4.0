import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getMoviesSave(key) {
  const myMovies = await AsyncStorage.getItem(key);

  let moviesSalve = JSON.parse(myMovies) || [];
  return moviesSalve;
}

export async function saveMovie(key, newMovie) {
  let moviesStored = await getMoviesSave(key);

  const hasMovie = moviesStored.some((item) => item.id === newMovie.id);

  if (hasMovie) {
    console.log('ESSE FILME JA EXISTE NA SUA LISTA');
    return;
  }

  moviesStored.push(newMovie);

  await AsyncStorage.setItem(key, JSON.stringify(moviesStored));

  console.log('FILME SALVO COM SUCESSO');
}

export async function deleteMovie(id) {
  let moviesStored = await getMoviesSave('@saved');

  let myMovies = moviesStored.filter(item => {
    return (item.id !== id)
  })

  await AsyncStorage.setItem('@saved', JSON.stringify(myMovies))

  console.log('FILME DELETADO COM SUCESSO')
  return myMovies  
}


export async function hasMovie(movie) {
  let moviesStored = await getMoviesSave('@saved');

  const hasMovie = moviesStored.find(item => item.id === movie.id)

  if(hasMovie) return true

  return false
  
}