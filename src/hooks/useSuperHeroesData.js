import axios from 'axios';
import {useQuery} from 'react-query';

const fetchSuperHeroes = () => {
    return axios.get('http://localhost:3000/superheroes')
}

export const useSuperHeroesData = (onSuccess, onError) => {

    return useQuery(
        'super-heroes', 
        fetchSuperHeroes,
        // {
        //     refetchOnMount: true,
        //     refetchOnWindowFocus: true,
        //     refetchInterval: 2000,
        //     refetchIntervalInBackground: true,
        // }

        // {
        //     enabled: false,
        // }
    //onSuccess and onError 

        {
            onSuccess,
            onError,
            select: (data) => {
                const superHeroeNames = data.data.map((hero) => hero.name)
                return superHeroeNames
                },
        })
}
export default useSuperHeroesData