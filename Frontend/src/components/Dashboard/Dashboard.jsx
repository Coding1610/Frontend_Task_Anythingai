import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { useSelector } from 'react-redux';
import { getEnv } from '@/helpers/getEnv';
import Loading from '../Loading';
import { useFetch } from '@/hooks/useFtech';
import Comments from '@/components/Comments';

const Dashboard = () => {

    const user = useSelector((state) => state.user);

    const navigate = useNavigate();

    const {data:userCount, loading} = useFetch(`${getEnv('VITE_API_BASE_URL')}/get-user-count`, {
        method:'get',
        credentials:'include'
    },[]);

    if(loading) return <Loading/>

    return(
        <>

        {user?.isLoggedIn 
        ? 
        <>
        {user?.user?.role === 'User' 
        ?          
        <>
        <div className="mx-auto animate-fade-in w-full px-7 sm:px-14 font-roboto mt-6 mb-8">
        <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold">Welcome back, {user?.user?.name}</h1>
        </div>

        <Comments/>
        
        </div>
        </>
        :
        <>
        <div className="mx-auto animate-fade-in w-full px-7 sm:px-14 font-roboto mt-6 mb-6">
            <div className="mb-8 animate-fade-in">
                <h1 className="text-3xl font-bold">Welcome back, {user?.user?.name}</h1>
                <p className="text-gray-500 mt-2">Monitor platform activity, manage users and ensure smooth system operations</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 staggered-animate">
                <Card className="flex flex-col justify-center items-center h-[250px] bg-darkRed text-white">
                    <h2 className='sm:text-5xl text-2xl text-center font-bold'>{userCount?.userCount}</h2>
                    <p className='text-xl text-center'>Total Users</p>
                </Card>
            </div>
        </div>
        </>
        }
        </>
        :
        <>
        {navigate('/')}
        </>
        }
        </>
    );
};

export default Dashboard;