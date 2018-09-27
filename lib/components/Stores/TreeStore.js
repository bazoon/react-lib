import DataStore from "./DataStore";


export default class TreeStore extends DataStore {
    
    findById(id, data) {
        const d = data || this.data;

        for (let i = 0; i < d.length; i++) {
            let item = d[i];
            if (item.id === id) {
                return item;
            }
            if (item.children && item.children.length > 0) {
                return this.findById(id, item.children);
            }
        }
    }
}