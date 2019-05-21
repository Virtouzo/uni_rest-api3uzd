interface Item {
	id: number;
	name: string;
	price: number;
	bought: boolean;
}

export default class Shop {
	private items: Item[] = [];
	private counter = 0;

	public add(item: Pick<Item, "name" | "price">) {
		this.items.push({
			...item,
			id: this.counter++,
			bought: false,
		});
	}

	public addWithId(item: Item) {
		this.items.push(item);
	}

	private findItemIndex(id: number) {
		return this.items.findIndex(item => item.id == id);
	}

	public remove(id: number) {
		let i = this.findItemIndex(id);
		if (i == -1) throw new Error('Invalid item id!');
		if (this.items[i].bought) throw new Error('Item was already bought!');
		this.items[i].bought = true;
	}

	public get() {
		return this.items.slice();
	}

	public findId(id: number) {
		return this.items.find(item => item.id == id);
	}

	public update(item: Item) {
		let i = this.findItemIndex(item.id);
		this.items[i] = item;
	}
}
