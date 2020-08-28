const express = require('express');
const cors = require('cors');
const { v4: uuid, isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get('/repositories', (request, response) => {
	response.json(repositories);
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
		return response.status(400).json({ error: 'Repositorie id not found' });
	}
	const repositorie = {
		id,
		title,
		url,
		techs,
		likes: repositories[repositorieIndex].likes,
	};
	repositories[repositorieIndex] = repositorie;
	response.send(repositorie);
});

app.delete('/repositories/:id', (request, response) => {
	const { id } = request.params;

	const repositorieIndex = repositories.findIndex(
		repositorie => repositorie.id === id,
	);
	if (repositorieIndex < 0) {
		return response.status(400).json({ error: 'Repositorie id not found' });
	}

	repositories.splice(repositorieIndex, 1);
	response.status(204).json({ message: 'Sucessful deleted' });
});

app.post('/repositories/:id/like', (request, response) => {
	const { id } = request.params;

	const repositorieIndex = repositories.findIndex(
		repositorie => repositorie.id === id,
	);
	if (repositorieIndex < 0) {
		return response.status(400).json({ error: 'Repositorie id not found' });
	}
	repositories[repositorieIndex].likes++;

	response.send(repositories[repositorieIndex]);
});

module.exports = app;
