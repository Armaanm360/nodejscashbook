import {} from '';
import { IAdmin, IMember, ITrainee } from './src/common/types/commontypes';

declare global {
  namespace Express {
    interface Request {
      admin: IAdmin;
      user: IAdmin;
      member: IMember;
      trainee: ITrainee;
      upFiles: string[];
    }
  }
}
