import { useQuery } from "react-query";
import axios from "axios";

const fetchColors = () => {
    return axios.get(`http://localhost:3000/colors`)
}

const InfiniteQueriesPage = () => {
    const {isLoading, isError, error, data} = useQuery(['colors'], fetchColors)

    if (isLoading) {
        return <h2>Loading...</h2>
    }

    if (isError){
        return <h2>{error.message}</h2>
    }

    return (
        <>
            <div>
                {data?.data.map((color) => {
                    return (
                        <div>
                            <h2>
                                {color.id}. {color.label}
                            </h2>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
export default InfiniteQueriesPage;