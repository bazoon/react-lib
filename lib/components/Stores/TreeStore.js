import DataStore from "./DataStore";


export default class TreeStore extends DataStore {
    
    loadChildren(id) {
        let options = {
            body: {
                id
            }
        };
        options.body.action = "list";
        options.method = 'POST';
        options.body = JSON.stringify(options.body);

        return fetch(this.url, options).then((r) => {
            return r.json().then((data) => {
                let parent = this.findById(id, this.data);
                if (!parent) {
                    console.log(id, this.data)
                }
                parent.children = data;
                return data;
            });
        });
    }

    findById(id, data) {
        const d = data || this.data;

        for (let i = 0; i < d.length; i++) {
            let item = d[i];
            if (item.id === id) {
                return item;
            }
            if (item.children && item.children.length > 0) {
                const childItem = this.findById(id, item.children);
                if (childItem) {
                    return childItem;
                }
            }
        }
    }

    countExpanded(t) {
        let r = 0;
        for (let i = 0; i < t.length; i++) {
            let child = t[i]
            r += 1;
            if (child.expanded) {
                r += this.countExpanded(child.children || []); 	
            }
            
        }	
        return r;
    }
    

    findByIndex() {
        let current = 0
    
        return function get(tree, index) {
            for (let i = 0; i < tree.length; i++) {
                
                let child = tree[i];
                if (current == index) {
                    return child;
                }
                
                current++;
                
                if (child.expanded && child.children) {
                    let r = get(child.children, index);
                    if (r) return r;
    
                }
            }
        }	
    }
    
}