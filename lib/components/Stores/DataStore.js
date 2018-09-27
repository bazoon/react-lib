export default class DataStore {

    constructor(config) {
        this.fields = config.fields;
        this.url = config.url;
        this.data = config.data || [];
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

    load() {
        return fetch('/data').then((r) => {
            return r.json().then((data) => {
                this.data = data;
                return data;
            })
        });
    }

    sort(field, sortDirection) {
        this.data.sort((a, b) => {
            var item1 = a[field];
            var item2 = b[field]

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

    forEach(fn) {
        this.data.forEach(fn);
    } 

    sync() {
        console.log('sending to url ' + this.url);
        console.log(this.changedItems);
    }



}