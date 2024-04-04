/**
 * Написать функцию tree(), которая принимает в качестве аргумента иерархический объект
 *  со свойствами name, items и выводит структурированный вывод дерева в консоль.
 */

const obj= {
	"name": 1,
	"items": [
		{
			"name": 2,
			"items": [{"name": 3}, {"name": 4}]
		},
		{
			"name": 5,
			"items": [{"name": 6}]
		}
	]
}

const NODE_SYMBOL = '│ └── '
const PARENT_SYMBOL = '├── '

function tree(obj, step = 0, isParent = true){
	if (step === 0) {
		console.log(`${obj.name}`);
	} else {
		const spacesCount = step > 0 ? new Array(step - (isParent ? 1 : 2)).fill('  ') : [];
		console.log(`${spacesCount.join('')}${isParent ? PARENT_SYMBOL : NODE_SYMBOL}${obj.name}`);
	}

	if (obj.items && obj.items.length) {
		++step;

		obj.items.forEach(el=> {
			const parent = !!(el.items && el.items.length);

			tree(el, step, parent);
		})
	}
}

tree(obj);