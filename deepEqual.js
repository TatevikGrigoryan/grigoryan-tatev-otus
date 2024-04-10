/**
 * Необходимо разработать функцию deepEqual, которая будет проводить глубокое сравнение между переданными объектами actual и expected.
 * Под глубоким сравнением понимается то, что собственные свойства дочерних объектов также рекурсивно сравниваются.
 * Если объекты не идентичны, вывести ошибку с путем до неидентичного свойства (например, используя нотацию JSON Path - $.store.book.author).
 * Идеальную функцию сравнения написать невозможно, поэтому постарайтесь реализовать самые важные моменты:
 *
 * Рекурсия останавливается, когда найдено отличие
 * Сравниваются собственные итерируемые свойства, без учета прототипа
 */

const obj1 = {
	a: {
		b: 1,
	},
};
const obj2 = {
	a: {
		b: 2,
	},
};
const obj3 = {
	a: {
		b: 1,
	},
};

function deepEqual(obj1, obj2,parentKey = ''){
	if (Object.keys(obj1).length !== Object.keys(obj2).length) {
		return 'ERROR with lengths';
	}

	let idx = 0;

	for (let key in obj1) {
		const errText = parentKey ? `ERROR ${parentKey}.${key}` : `ERROR ${key}`;

		if (!obj2.hasOwnProperty(key)) {
			return errText;
		}

		if (
			(typeof obj1[key] === "undefined" && typeof obj2[key] !== 'undefined') ||
			(typeof obj1[key] !== "undefined" && typeof obj2[key] === 'undefined')
		) {
			return errText;
		}

		if (
			(obj1[key] !== null && obj2[key] === null) ||
			(obj1[key] === null && obj2[key] !== null)
		) {
			return errText;
		}

		if (typeof obj1[key] !== 'object' && typeof obj2[key] !== "function" && obj1[key] !== obj2[key]) {
			return errText;
		}

		if (
			typeof obj1[key] === 'object' && obj1[key] !== null &&
			typeof obj2[key] === 'object' && obj1[key] !== null
		) {
			const res = deepEqual(obj1[key], obj2[key], key);

			if (res !== 'OK') {
				return res
			}
		}

		if (idx === Object.keys(obj1).length - 1) {
			return 'OK';
		}

		idx++;
	}
}

console.log(deepEqual(obj1, obj3));

console.log(deepEqual(obj1, obj2));