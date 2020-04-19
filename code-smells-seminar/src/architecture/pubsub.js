import UserModel from '../models/user';
import CompanyModel from '../models/company';
import SalaryModel from '../models/salary';

class UserService {
  signup = async (user) => {
    const userRecord = await UserModel.create(user);
    const companyRecord = await CompanyModel.create(user);
    const salaryRecord = await SalaryModel.create(user, salary);

    eventTracker.track(
      'user_signup',
      userRecord,
      companyRecord,
      salaryRecord
    );

    intercom.createUser(
      userRecord
    );

    gaAnalytics.event(
      'user_signup',
      userRecord
    );

    await EmailService.startSignupSequence(userRecord)

    //...more stuff

    return { user: userRecord, company: companyRecord };
  }
}


// Solution
class UserServiceImproved {
  signup = async (user) => {
    const userRecord = await UserModel.create(user);
    const companyRecord = await CompanyModel.create(user);
    eventEmitter.emit('user_signup', { user: userRecord, company: companyRecord })
    return userRecord;
  }
}


// ============ userSignals.js =============
eventEmitter.on('user_signup', ({ user, company }) => {

    eventTracker.track(
      'user_signup',
      user,
      company,
    );

    intercom.createUser(
      user
    );

    gaAnalytics.event(
      'user_signup',
      user
    );
  })
