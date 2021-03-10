import React, { Fragment } from 'react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { Header } from 'semantic-ui-react';
import ActivityListItem from './ActivityListItem';

const ActivityList = () => {
    const { activityStore } = useStore();
    const { groupedActivities } = activityStore;

    return (
        <>
            {groupedActivities.map(([group, activities]) => (
                <Fragment key={group}>
                    <Header sub color='teal'>
                        {group}
                    </Header>
                    {activities.map(activity => (
                        <ActivityListItem key={activity.id} activity={activity} />
                    ))}
                </Fragment>
            ))}
        </>

    )
};

//! DO NOT FORGET TO MAKE SURE THE COMPONENT IS OBSERVING THE OBSERVABLES
export default observer(ActivityList);
