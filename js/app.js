const coffees = [
	{ name: 'Coffee 1', image: 'img/coffee1.jpg', description: 'Un café suave y aromático, con un sabor equilibrado y un final agradable. Ideal para acompañar el desayuno o disfrutar en una pausa tranquila.' },
	{ name: 'Coffee 2', image: 'img/coffee2.jpg', description: 'Notas tostadas y un sabor equilibrado se unen en esta taza, perfecta para acompañar una conversación o un momento de descanso.' },
	{ name: 'Coffee 3', image: 'img/coffee3.jpg', description: 'Una opción de sabor intenso y con carácter, pensada para quienes disfrutan tomarse su tiempo con cada taza.' },
	{ name: 'Coffee 4', image: 'img/coffee4.jpg', description: 'Su aroma envolvente y su final cálido hacen de este café una compañía agradable para cualquier momento del día.' },
	{ name: 'Coffee 5', image: 'img/coffee5.avif', description: 'Un café clásico y reconfortante, fácil de disfrutar solo o junto a tu desayuno y tus momentos favoritos.' },
	{ name: 'Coffee 6', image: 'img/coffee6.jpg', description: 'Su sabor redondo y su delicado toque tostado crean una taza equilibrada para disfrutar sin prisa.' },
	{ name: 'Coffee 7', image: 'img/coffee7.avif', description: 'Una taza aromática y equilibrada, ideal para hacer una pausa y disfrutar de un momento para ti.' },
	{ name: 'Coffee 8', image: 'img/coffee8.jpg', description: 'Su sabor profundo convierte cada taza en una buena pausa para recargar energía durante el día.' },
	{ name: 'Coffee 9', image: 'img/coffee9.jpg', description: 'Suave al paladar y con un aroma que invita a repetir, es una opción agradable para cualquier ocasión.' },
	{ name: 'Coffee 10', image: 'img/coffee10.webp', description: 'Una mezcla de notas tostadas y un toque reconfortante, pensada para disfrutar a cualquier hora.' }
];

if ('serviceWorker' in navigator && window.isSecureContext) {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('./serviceworker.js').catch((error) => {
			console.error('No se pudo registrar el service worker:', error);
		});
	});
}

const coffeeList = document.querySelector('#coffee-list');

if (coffeeList) {
	coffeeList.innerHTML = coffees.map((coffee, index) => `
		<article class="coffee-card">
			<img src="${coffee.image}" alt="${coffee.name}">
			<h3>${coffee.name}</h3>
			<p class="coffee-description">${coffee.description}</p>
			<a class="btn" href="detalle.html?id=${index}">Ver más</a>
		</article>
	`).join('');
} else {
	const coffeeDetail = document.querySelector('#coffee-detail');
	const coffeeId = new URLSearchParams(window.location.search).get('id');
	const coffeeIndex = coffeeId === null ? -1 : Number(coffeeId);
	const coffee = Number.isInteger(coffeeIndex) ? coffees[coffeeIndex] : undefined;

	if (coffeeDetail && coffee) {
		document.title = `${coffee.name} | Cafe PWA`;
		coffeeDetail.innerHTML = `
			<img class="coffee-detail-image" src="${coffee.image}" alt="${coffee.name}">
			<div class="coffee-detail-copy">
				<p class="coffee-detail-label">Detalle del café</p>
				<h1>${coffee.name}</h1>
				<h2>Descripción</h2>
				<p>${coffee.description}</p>
			</div>
		`;
	} else if (coffeeDetail) {
		coffeeDetail.innerHTML = '<p>No se encontró ese café.</p>';
	}
}
