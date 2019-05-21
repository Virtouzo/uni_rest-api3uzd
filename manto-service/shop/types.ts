import * as t from "io-ts";

const NumberFromString = new t.Type<number, string, number>(
	"NumberFromString",
	t.number.is,
	(u, c) =>
		t.string.validate(u, c).chain(s => {
			const n = +s;
			return isNaN(n) ? t.failure(u, c, "cannot parse to a number") : t.success(n);
		}),
	String
);

export const Paramsid = t.type({
	id: NumberFromString
});

export const RequestItem = t.type({
	name: t.string,
	price: t.number
});

export const ItemidsValType = t.type({
	items: t.array(t.number)
});
