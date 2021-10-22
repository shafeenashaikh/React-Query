import {useQuery} from 'react-query';
import axios from 'axios';

const RQSuperHeroesPage = () => {

    const {isLoading, data } = useQuery('super-heroes', ()=>{
        return axios.get('http://localhost:3000/superheroes')
    })

    if(isLoading){
        return <h2>Loading...</h2>
    }
    return (
        <>
            <h2>RQ Super Heroes Page</h2>
            {
                data?.data.map((hero) => {
                    return <div key={hero.name}>{hero.name}</div>
                })
            }
        </>
    )
}
export default RQSuperHeroesPage