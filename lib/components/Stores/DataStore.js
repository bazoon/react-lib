import EventEmitter from '../../../utils/EventEmitter';

export default class DataStore extends EventEmitter {

    constructor(config) {
        super();
        this.fields = config.fields;
        this.url = config.url;
        this.data = config.data || [];
        this.summaryData = config.summaryData || [],
        this.changedIds = {};
        this.changedItems = [];
        this.removed = []
        this.isRemoteSort = config.isRemoteSort || false;
    }

    findById(id) {
        for (let i = 0; i < this.data.length; i++) {
            let item = this.data[i];
            if (item.id === id) {
                return item;
            }
        }
    }

    setValueById(id, field, value) {
        var item = this.findById(id);
        if (item) {
            item[field] = value; 
            if (!this.changedIds[item.id]) {
                this.changedItems.push(item); 
                this.changedIds[item.id] = true;
            }
        }
    }

    getData() {
        return this.data;
    }

    getSummaryData() {
        return this.summaryData;
    }

    load() {
        return fetch('/data').then((r) => {
            return r.json().then((r) => {
                this.data = r.data || [];
                this.summaryData = r.summary || [];
                this.emit('load');
            });
        });
    }

    sort(field, sortDirection) {
        this.data.sort((a, b) => {
            var item1 = a[field];
            var item2 = b[field];

            switch(true) {
                case typeof(item1) === 'string':
                    return sortDirection === 'asc' ? item1.localeCompare(item2) : item2.localeCompare(item1);
                case typeof(item1) === 'number':
                    return sortDirection === 'asc' ? item1 - item2 : item2 - item1;
                default:
                    return 0;
            }
        });
        
    }

    filter(params) {
        return fetch('/data/filter').then((r) => {
            return r.json().then((data) => {
                this.data = data;
                this.emit('load');
                return data;
            })
        });
    }

    forEach(fn) {
        this.data.forEach(fn);
    } 

    sync() {
        console.log('sending to url ' + this.url);
        console.log(this.changedItems);
    }



}