import HTTPError from "./HTTPError";
import * as Express from "express";

export default function errorHandler(
	err: HTTPError,
	req: Express.Request,
	res: Express.Response,
	next: Express.NextFunction
) {
	const status = err.status || 500;
	const message = err.message || "Something went wrong";
	res.status(status).send({
		error: true,
		status,
		message
	});
}
