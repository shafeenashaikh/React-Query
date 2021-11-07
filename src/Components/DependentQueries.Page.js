
import { useQuery } from "react-query";
import axios from "axios";

const fetchUserByEmail = (email) => {
    return axios.get(` http://localhost:3000/users/${email}`)
}

const fetchCourseByChannelId = (channelId) => {
    return axios.get(`http://localhost:3000/channels/${channelId}`)
}

const DependentQueriesPage = ({email}) => {

    const { data: user} = useQuery(['user', email], ()=> 
    fetchUserByEmail(email)
    )
    const channelId = user?.data.channelId

    useQuery(['course', channelId], () => fetchCourseByChannelId(channelId),{
        enabled: !!channelId,
    })

    return <div>DependentQueriesPage</div>
}
export default DependentQueriesPage