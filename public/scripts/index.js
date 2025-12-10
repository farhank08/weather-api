const form = document.getElementById('form');
const input = document.getElementById('form-input');
const dashboard = document.getElementById('dashboard');

const loadForm = async () => {
	form.addEventListener('submit', async (event) => {
		event.preventDefault();

		const location = input.value.trim();

		try {
			const response = await axios.get(`/api/weather`, {
				params: { location },
			});
			const { data } = response;
			const { success, payload, message } = data;

			if (!success) {
				console.error(message);
				return;
			}

			loadDashboard(payload);
		} catch (error) {
			console.error(error.message);
			return;
		}
	});
};

const loadDashboard = (data) => {
	dashboard.innerHTML = '';

	const {
		cloudcover,
		conditions,
		datetime,
		feelslike,
		humidity,
		solarenergy,
		solarradiation,
		sunrise,
		sunset,
		temp,
		uvindex,
	} = data.currentConditions;

	const locationCard = document.createElement('div');
	locationCard.classList.add('card');

	const address = document.createElement('p');
	address.innerText = `Address: ${data.resolvedAddress}`;

	const latitude = document.createElement('p');
	latitude.innerText = `Latitude: ${data.latitude}`;

	const longitude = document.createElement('p');
	longitude.innerText = `Longitude: ${data.longitude}`;

	const time = document.createElement('p');
	const time12 = new Date(`1970-01-01T${datetime}`).toLocaleTimeString('en-us', {
		hour: 'numeric',
		minute: '2-digit',
		second: '2-digit',
		hour12: true,
	});
	time.innerText = `Time: ${time12}`;

	const timezone = document.createElement('p');
	timezone.innerText = `Time-zone: ${data.timezone}`;

	locationCard.appendChild(address);
	locationCard.appendChild(latitude);
	locationCard.appendChild(longitude);
	locationCard.appendChild(time);
	locationCard.appendChild(timezone);

	const temperatureCard = document.createElement('div');
	temperatureCard.classList.add('card');

	const temperature = document.createElement('p');
	temperature.innerText = `Temperature: ${temp}°C`;

	const feelsLike = document.createElement('p');
	feelsLike.innerText = `Temperature: ${feelslike}°C`;

	const condition = document.createElement('p');
	condition.innerText = `Condition: ${conditions}`;

	const humid = document.createElement('p');
	humid.innerText = `Humidity: ${humidity}%`;

	temperatureCard.appendChild(temperature);
	temperatureCard.appendChild(feelsLike);
	temperatureCard.appendChild(condition);
	temperatureCard.appendChild(humid);

	const skyCard = document.createElement('div');
	skyCard.classList.add('card');

	const clouds = document.createElement('p');
	clouds.innerText = `Cloud Coverage: ${cloudcover}%`;

	const uvIndex = document.createElement('p');
	uvIndex.innerText = `UV Index: ${uvindex}`;

	skyCard.appendChild(clouds);
	skyCard.appendChild(uvIndex);

	const sunCard = document.createElement('div');
	sunCard.classList.add('card');

	const sunRise = document.createElement('p');
	const sunRiseTime = new Date(`1970-01-01T${sunrise}`).toLocaleTimeString('en-us', {
		hour: 'numeric',
		minute: '2-digit',
		second: '2-digit',
		hour12: true,
	});
	sunRise.innerText = `Sunrise: ${sunRiseTime}`;

	const sunSet = document.createElement('p');
	const sunSetTime = new Date(`1970-01-01T${sunset}`).toLocaleTimeString('en-us', {
		hour: 'numeric',
		minute: '2-digit',
		second: '2-digit',
		hour12: true,
	});
	sunSet.innerText = `Sunset: ${sunSetTime}`;

	const solarEnergy = document.createElement('p');
	solarEnergy.innerText = `Solar Energy: ${solarenergy} MJ/m²`;

	const solarRadiation = document.createElement('p');
	solarRadiation.innerText = `Solar Radiation: ${solarradiation} W/m²`;

	sunCard.appendChild(sunRise);
	sunCard.appendChild(sunSet);
	sunCard.appendChild(solarEnergy);
	sunCard.appendChild(solarRadiation);

	dashboard.appendChild(locationCard);
	dashboard.appendChild(temperatureCard);
	dashboard.appendChild(skyCard);
	dashboard.appendChild(sunCard);
};

loadForm();
