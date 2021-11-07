import { useQuery } from "react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
    return axios.get(`http://localhost:3000/superheroes`)
}

const fetchFriends = () => {
    return axios.get(`http://localhost:3000/friends`)
}

const ParallelQueryPage = () => {

    const {data: superHeroes} = useQuery('super-heroes', fetchSuperHeroes)
    const {data: friends} = useQuery('friends', fetchFriends) 

    return <div>ParallelQueryPage</div>
}
export default ParallelQueryPage