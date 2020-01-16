import { observable, computed, action } from 'mobx';

class MessageStore {
    @observable list;

    @computed
    get getList() {
        return this.list.filter(v => v.like === false)
    }


    @action
    addList = obj => this.list.push(obj);

    @action
    changeLike = id => {
        let len = this.list.length;
        for (let i = 0; i < len; i++) {
            if (this.list[i].id === id) {
                this.list[i].like = !this.list[i].like
            }
        }
    }

    constructor() {
        this.list = [
            {
                name: 'banana',
                id: 0,
                title: '香蕉',
                like: false
            },
            {
                name: 'apple',
                id: 1,
                title: '苹果',
                like: false
            },
            {
                name: 'waterMelon',
                id: 2,
                title: '西瓜',
                like: false
            },
            {
                name: 'pear',
                id: 3,
                title: '梨',
                like: false
            },
            {
                name: 'banana',
                id: 0,
                title: '香蕉',
                like: false
            },
            {
                name: 'apple',
                id: 1,
                title: '苹果',
                like: false
            },
            {
                name: 'waterMelon',
                id: 2,
                title: '西瓜',
                like: false
            },
            {
                name: 'pear',
                id: 3,
                title: '梨',
                like: false
            }
        ];
    }
}
const message = new MessageStore();
export default message;