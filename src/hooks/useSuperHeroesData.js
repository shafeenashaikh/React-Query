import axios from 'axios';
import {useQuery, useMutation, useQueryClient} from 'react-query';

const fetchSuperHeroes = () => {
    return axios.get('http://localhost:3000/superheroes')
}

const addSuperHero = (hero) => {
    return axios.post(` http://localhost:3000/superheroes`, hero)
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
            // select: (data) => {
            //     const superHeroeNames = data.data.map((hero) => hero.name)
            //     return superHeroeNames
            //     },
        })
}

export const useAddSuperHeroData = ()=> {
    const queryClient = useQueryClient()
    return useMutation(addSuperHero, {
        onSuccess: (data) => {
            // queryClient.invalidateQueries('super-heroes')
            queryClient.setQueryData('super-heroes', (oldQueryData) => {
                return {
                    ...oldQueryData,
                    data: [...oldQueryData.data, data.data],
                }
            })
        }
    })
}

export default useSuperHeroesData