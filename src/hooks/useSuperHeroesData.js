import { request } from '../utils/axios-utils';
import {useQuery, useMutation, useQueryClient} from 'react-query';

const fetchSuperHeroes = () => {
    // return axios.get('http://localhost:3000/superheroes')
    return request({url: '/superheroes'})
}

const addSuperHero = (hero) => {
    // return axios.post(` http://localhost:3000/superheroes`, hero)
    return request({url: '/superheroes', method: 'post', data: hero})
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
        // onSuccess: (data) => {
        //     // queryClient.invalidateQueries('super-heroes')
        //     queryClient.setQueryData('super-heroes', (oldQueryData) => {
        //         return {
        //             ...oldQueryData,
        //             data: [...oldQueryData.data, data.data],
        //         }
        //     })
        // }
        onMutate: async(newHero) => {
            await queryClient.cancelQueries('super-heroes')
            const previousHeroData = queryClient.getQueryData('super-heroes')
            queryClient.setQueryData('super-heroes', (oldQueryData) => {
                      return {
                          ...oldQueryData,
                          data: [...oldQueryData.data,
                        {id: oldQueryData?.data?.lenght + 1, ...newHero}
                    ],
                        }
                    })
                    return {
                        previousHeroData,
                    }
        },
        onError: (_error, _hero, context) => {
            queryClient.setQueryData('super-hero', context.previousHeroData)
        },
        onSettled: () => {
            queryClient.invalidateQueries('super-heroes')
        },
    })
}

export default useSuperHeroesData