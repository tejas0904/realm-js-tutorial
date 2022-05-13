import React, {useEffect, useMemo} from 'react';

import {Task} from './models/Task';
import {TaskRealmContext} from './models';
import {TaskManager} from './components/TaskManager';

const {useRealm, useQuery} = TaskRealmContext;

export const AppSync = ({userId}) => {
  const realm = useRealm();
  const result = useQuery(Task);
  console.log('result :: ',result);

  const tasks = useMemo(() => result.sorted('createdAt'), [result]);

  useEffect(() => {
    realm.subscriptions.update(mutableSubs => {
      result.length > 0 && mutableSubs.add(result);
    });
  }, [realm, result]);

  return <TaskManager tasks={tasks} userId={userId} />;
};
