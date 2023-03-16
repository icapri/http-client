import { HttpClient } from '../http';

const baseUrl = 'https://swapi.dev/api/';

const peopleUri = baseUrl.concat('people');
const planetsUri = baseUrl.concat('planets');
// const starshipsUri = baseUrl.concat('starships');

test('HttpClient', async () => {
  const http = new HttpClient();

  const people = await http.get(peopleUri);
  const planets = await http.get(planetsUri);
  // const starships = await http.get(starshipsUri);

  expect(people).toBeDefined();
  expect(planets).toBeDefined();
  // expect(starships).toBeDefined();
});
