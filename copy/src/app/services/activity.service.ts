import { Injectable } from '@angular/core';
import { IActivity } from '../shared/activity.model';
import { SAVED_ACTIVITIES }  from '../shared/activities';

@Injectable()
export class ActivityService {

  constructor() { }

  getActivities(): IActivity[]{
    return SAVED_ACTIVITIES.slice(0);
  }

  getTotalActivities(allActivities: IActivity[]){
    return allActivities.length;
  }

 






}
