import { Injectable } from '@nestjs/common';
import * as moment from 'moment-timezone';

@Injectable()
export class MomentService {
  getMoment(): moment.Moment {
    moment.tz.setDefault('Europe/Moscow').locale('ru');
    return moment();
  }
}
