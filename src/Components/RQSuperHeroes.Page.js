import {useQuery} from 'react-query';
import axios from 'axios';

const fetchSuperHeroes = () => {
    return axios.get('http://localhost:3000/superheroes')
}

const RQSuperHeroesPage = () => {

    const onSuccess = (data) => {
        console.log('Perform sied effect after data fetching', data)
    }

    const onError = (error) => {
        console.log('Perform sied effect after encountering error', error)
    }


    const {isLoading, data, isError, error, isFetching, refetch} = useQuery(
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
            onError
        }
        
        )

    console.log(isLoading, isFetching)

    if(isLoading || isFetching){
        return <h2>Loading...</h2>
    }

    if(isError){
        return <h2>{error.message}</h2>
    }
    return (
        <>
            <h2>RQ Super Heroes Page</h2>
            <button onClick={refetch}>Fetch heroes</button>
            {
                data?.data.map((hero) => {
                    return <div key={hero.name}>{hero.name}</div>
                })
            }
        </>
    )
}
export default RQSuperHeroesPage