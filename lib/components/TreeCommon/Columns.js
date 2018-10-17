// Класс для хранения столбцов
// проксирует методы массива во вне
// поддерживает специфическое апи для управления столбцами
class Columns {
    
    constructor(items) {
        this.items = items;
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