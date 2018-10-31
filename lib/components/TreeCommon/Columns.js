// Класс для хранения столбцов
// проксирует методы массива во вне
// поддерживает специфическое апи для управления столбцами
class Columns {
    
    constructor(items) {
        this.items = items;
        this.totalWidth = items.reduce((acc, c) => acc + c.width, 0);
        items.forEach((item) => {
            item.ratio = item.width / this.totalWidth;
        });
    }

    copy() {
        return new Columns(this.items);
    }

    set(index, item) {
        this.items[index] = item;
    }

    get(index) {
        return this.items[index];
    }

    setEnabled(name, enabled) {
        let column = this.items.find((c) => c.name === name);
        if (column) {
            column.isDisabled = !enabled;
        }
    }

    find(f) {
        return this.items.find(f);
    }

    reduce(f, initialValue) {
        return initialValue !== undefined ? this.items.reduce(f, initialValue) : this.items.reduce(f);
    }

    map(f) {
        return this.items.map(f);
    }

    sort(f) {
        return this.items.sort(f);
    }

    forEach(f) {
        this.items.forEach(f);
    }

    indexOf(item) {
        return this.items.indexOf(item);
    }

    findColumn(name, columns) {
        columns = columns || this.items
        for (let i = 0; i < columns.length; i ++) {
            let column = columns[i];
            if (column.name === name) {
                return column;
            }

            if (column.columns && column.columns.length > 0) {
                let found = this.findColumn(name, column.columns);
                if (found) return found;
            }
            
        }
    }


}

export default Columns;