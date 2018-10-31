import EventEmitter from '../../../utils/EventEmitter';
import { stringify } from 'qs';



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
        this.loadOptions = {};
        this.sortParams = {};
        this.filterParams = {};
        this.shouldCacheFilter = config.shouldCacheFilter;
        this.pageSize = config.pageSize;
        if (this.pageSize) {
            this.currentPage = 0;
        }
    }

    findById(id) {
        for (let i = 0; i < this.data.length; i++) {
            let item = this.data[i];
            if (item.id == id) {
                return item;
            }
        }
    }

    findByField(value, field) {
        for (let i = 0; i < this.data.length; i++) {
            let item = this.data[i];
            if (item[field] == value) {
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

    getTotal() {
        return this.total || 0;
    }

    getCount() {
        return this.data && this.data.length;
    }

    load() {
        const options = this.getLoadOptions();
        options.body.action = "list";
        options.method = 'POST';
        options.body = JSON.stringify(options.body);
        this.emit('beforeload');

        if (this.url) {
            return fetch(this.url, options).then((r) => {
                return r.json().then((r) => {
                    this.data = r.data || [];
                    this.summaryData = r.summary || [];
                    this.total = r.total;
                    this.emit('load');
                });
            });
        } 
        
        this.emit('load');
        return Promise.resolve();
    }

    remove(id) {
        const body = {
            id: id
        };
        
        const item = this.findById(id);
        if (!item) return;

        const index = this.data.indexOf(item);
        if (index > -1) {
            const promise = fetch(this.url, {
                method: 'delete',
                body: JSON.stringify(body)
            });

            promise.then(()=> {
                this.data.splice(index, 1);
                this.emit('load');
            });
        }
    }

    update(id, payload) {
        const keys = Object.keys(payload);
        
        keys.forEach((key) => {
            this.setValueById(id, key, payload[key]);
        });

        let body = Object.assign({}, payload);
        body.id = id;

        const promise = fetch(this.url, {
            method: 'post',
            body: JSON.stringify(body)
        });

        promise.then(() => this.load());
    }

    getPageSize() {
        return this.pageSize;
    }

    getCurrentPage() {
        return this.currentPage;
    }

    setCurrentPage(page) {
        this.currentPage = page;
        this.load }

    getLoadOptions() {
        const body = {
            sortParams: this.sortParams,
            filterParams: this.filterParams
        };

        if (this.pageSize) {
            body.pageSize = this.pageSize;
            body.currentPage = this.currentPage;
        }
        
        return {
            body: body,
        };
    }


    // Deprecated?
    constructUrl() {
        let url = this.url;
        const hasSortParams = Object.keys(this.sortParams).length > 0;
        const hasFilterParams = Object.keys(this.filterParams).length > 0;

        if (hasSortParams) {
            url += `?${stringify(this.sortParams)}`;
        } 

        if (hasFilterParams && hasSortParams) {
            url += `&${stringify(this.filterParams)}`;
        } 

        if (hasFilterParams && !hasSortParams) {
            url += `?${stringify(this.filterParams)}`;
        }

        return url;
    }

    sort(field, sortDirection) {
        if (this.isRemoteSort) {
            this.remoteSort(field, sortDirection);
        } else {
            this.localSort();
        }
    }

    remoteSort(field, sortDirection) {
        
        this.sortParams = {
            property: field,
            direction: sortDirection
        };

        this.load();
    }

    localSort(field, sortDirection) {
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

    clearFilters() {
        this.filterParams = {};
    }

    filter(params) {
        if (this.shouldCacheFilter && this.filterParams[params.field] === params.value) {
            return;
        }
        
        if (!params.value) {
            delete this.filterParams[params.field];
        } else {
            this.filterParams[params.field] = {
                value: params.value,
                ordering: params.ordering || 'eq'
            };
            this.currentPage = 0;
        }
        this.load();
    }

    forEach(fn) {
        this.data.forEach(fn);
    } 

    sync() {
        const options = {
            method: "POST",
            body: JSON.stringify({
                action: "sync",
                items: this.changedItems
            })
        };

        return fetch(this.url, options).then(() => this.changedItems = []);
    }



}