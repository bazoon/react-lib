function findInTree(tree, id) {
	for (let i = 0; i < tree.length; i++) {
		var item = tree[i];
		
		if (item.id === id) {
			return item;
		}
		if (item.children) {
			let childItem = findInTree(item.children, id);
			if (childItem) {
				return childItem;
			}
		}
	}
}

export default {
    findInTree
};