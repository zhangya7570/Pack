import {observable, action} from 'mobx';

class HomeStore {
    @observable name;
    @observable age;

    @action
    changeAge = i => {
        this.age = this.age + Number(i);
    }

    constructor() {
        this.name = 'Mr Cloud';
        this.age = 25;
    }
}
const home = new HomeStore();
export default home;