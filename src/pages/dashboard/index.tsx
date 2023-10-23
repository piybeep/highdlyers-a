import useAxiosAuth from "@/lib/hook/useAxiosAuth";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function index() {
    const axiosAuth = useAxiosAuth()
    const { data: session } = useSession()
    const [users, setUsers] = useState([])
    useEffect(() => {
        getUsers()
        console.log(session)
    }, [session])

    const getUsers = async () => {
        const data = await axiosAuth.get('users')
            .then(res => res.data.users)
            .catch(error => console.log(error))

        console.log(data)
    }

    useEffect(() => {
        axiosAuth.get('users')
            .then(res => {
                setUsers(res.data.users)
            })
            .catch(error => {
                console.log(error)
                setUsers([])
            })
    }, [])

    useEffect(() => {
        console.log(users)
    }, [users])

    return (
        <div>
            <button onClick={() => signOut()}>Выйти</button>
        </div>
    );
};