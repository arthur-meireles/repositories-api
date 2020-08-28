const express = require('express');
const cors = require('cors');
const { v4: uuid, isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get('/repositories', (request, response) => {
	response.send(repositories);
});

app.post('/repositories', (request, response) => {
	const { title, url, techs } = request.body;
	let repositorie = {
		id: uuid(),
		title,
		url,
		techs,
		likes: 0,
	};
	repositories.push(repositorie);
	response.send(repositorie);
});

app.put('/repositories/:id', (request, response) => {
	const { id } = request.params;
	const { title, url, techs } = request.body;

	const repositorieIndex = repositories.findIndex(
		repositorie => repositorie.id === id,
	);
	if (repositorieIndex < 0) {
		return response.status(404).json({ error: 'Repositorie id not found' });
	}
	const repositorie = {
		id,
		title,
		url,
		techs,
	};
	repositories[repositorieIndex] = repositorie;
	response.send(repositorie);
});

app.delete('/repositories/:id', (request, response) => {
	const { id } = request.params;
	const { title, url, techs } = request.body;

	const repositorieIndex = repositories.findIndex(
		repositorie => repositorie.id === id,
	);
	if (repositorieIndex < 0) {
		return response.status(404).json({ error: 'Repositorie id not found' });
	}

	repositories.splice(repositorieIndex, 1);
	response.send({message: 'Sucessful deleted'});
});

app.post('/repositories/:id/like', (request, response) => {
	// TODO
});

module.exports = app;
