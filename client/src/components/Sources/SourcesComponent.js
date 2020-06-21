import React, { useState, useEffect } from 'react';
import { GetSources, Subscribe, Unsubscribe } from '../../API/user.api';
import SourcesCard from './SourcesCard';

const SourcesComponent = () => {
    const [sources, setSources] = useState([]);
    const [userSources, setUserSources] = useState([]);

    const GetSourcesList = async () => {
        try {

            const res = await GetSources();
            if (res.status === "ok") {
                setSources(res.sources);
                setUserSources(res.userSources);
            }

        } catch (error) {
            console.log("server error: ", error);
        }
    }

    useEffect(() => {
        GetSourcesList();
    }, []);


    const handleSubscribe = async (id, cb) => {
        const res = await Subscribe(id);
        if (res.message === "success") {
            setUserSources(res.sources);
        }
    }

    const handleUnsubscribe = async (id, cb) => {
        const res = await Unsubscribe(id);
        if (res.message === "success") {
            setUserSources(res.sources);
        }
    }


    const AllSources = sources.map(source => (
        <SourcesCard
            key={source.id}
            userSources={userSources}
            handleSubscribe={handleSubscribe}
            handleUnsubscribe={handleUnsubscribe}
            source={source}
        />
    ));


    return (
        <div className="d-flex flex-wrap justify-content-around">
            {AllSources}
        </div>
    );
}

export default SourcesComponent;