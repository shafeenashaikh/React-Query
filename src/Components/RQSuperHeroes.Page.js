import { useState } from "react";
import { Link } from "react-router-dom";
import useSuperHeroesData, { useAddSuperHeroData } from "../hooks/useSuperHeroesData"

const RQSuperHeroesPage = () => {

    const [name, setName] = useState('');
    const [ alterEgo, setAlterEgo] = useState('')

    const onSuccess = (data) => {
        console.log('Perform sied effect after data fetching', data)
    }

    const onError = (error) => {
        console.log('Perform sied effect after encountering error', error)
    }


    const {isLoading, data, isError, error, isFetching, refetch} = useSuperHeroesData(onSuccess, onError)

    console.log(isLoading, isFetching)

    //useMutation hook
    const {mutate: addHero} = useAddSuperHeroData()

    const handleAddHeroClick = () => {
        console.log({name, alterEgo})
        const hero = {name, alterEgo}
        addHero(hero)
    }

    if(isLoading){
        return <h2>Loading...</h2>
    }

    if(isError){
        return <h2>{error.message}</h2>
    }
    return (
        <>
            <h2>RQ Super Heroes Page</h2>
            <div>
                <input
                    type='text'
                    value={name}
                    onChange={(e)=> setName(e.target.value)}
                />
                <input
                    type='text'
                    value={alterEgo}
                    onChange={(e)=> setAlterEgo(e.target.value)}
                />
                <button onClick={handleAddHeroClick}>Add heroes</button>

            </div>
            <button onClick={refetch}>Fetch heroes</button>
            {
                data?.data.map((hero) => {
                    return <div key={hero.id}>
                                <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
                        </div>
                })
            }
            {/* {data.map((heroName) => {
                return <div key={heroName}>{heroName}</div>
            })} */}
        </>
    )
}
export default RQSuperHeroesPage