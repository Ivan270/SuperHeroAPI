let heroStats_arr = [];
$(function () {
	$('#btn-buscar').click(function () {
		buscarHero();
		$('#title').fadeOut(500);
		$('#title').fadeIn(500);
		$('#form-label').fadeOut(750);
		$('#form-label').fadeIn(750);
		$('#form_title').fadeOut(500);
		$('#form_title').fadeIn(500);
		$('#form-label').fadeOut(750);
		$('#form-label').fadeIn(750);
	});

	function buscarHero() {
		let id_Hero = $('#inputBusqueda').val();
		if (validacion(id_Hero) == false) {
			errorInput();
			return;
		}
		getHero(id_Hero);
	}

	function validacion(id) {
		let expression = /^\d{1,3}$/;
		if (expression.test(id)) {
			return true;
		}
		return false;
	}

	function errorInput() {
		alert('Elige un número válido');
		$('#inputBusqueda').focus();
	}

	function getHero(id) {
		$.ajax({
			type: 'GET',
			url: `https://superheroapi.com/api.php/531892024589180/${id}`,
			success: function (response) {
				$('#heroId').html(newCard(response));
				$('#inputBusqueda').val('');
				$('#inputBusqueda').focus();
				cleanHeroArray();
				recorrerPowerStats(response);
				statsChart(response);
			},
			error: function (error) {
				console.log(error);
			},
		});
	}
	
	function newCard(hero) {
		let card = `
    <div class="card my-2 pe-1 mx-2 pb-2 text-bg-dark bg-gradient g-0 shadow">
                <div class="row">
                    <div class="col-md-4">
                        <img src="${hero.image.url}" class="img-fluid rounded-start"/>
                    </div>
                    <div class="col-md-8">
                        <div class="card-header font-monospace">Héroe ID: ${hero.id}</div>
                        <div class="card-title">
                            <h5 class="">Nombre: ${hero.name}</h5>
                        </div>
                        <ul class='list-group list-group-flush fs-6'>
                            <li class="list-group-item text-bg-warning" style="font-size: 11px">Conexiones: ${hero.connections['group-affiliation']}</li>
                            <li class="list-group-item text-bg-warning" style="font-size: 11px">Publicado por: ${hero.biography.publisher}</li>
                            <li class="list-group-item text-bg-warning" style="font-size: 11px">Ocupación: ${hero.work.occupation}</li>
                            <li class="list-group-item text-bg-warning" style="font-size: 11px">Primera aparición: ${hero.biography['first-appearance']}</li>
                            <li class="list-group-item text-bg-warning" style="font-size: 11px">Altura: ${hero.appearance.height[1]}</li>
                            <li class="list-group-item text-bg-warning" style="font-size: 11px">Peso: ${hero.appearance.weight[1]}</li>
                            <li class="list-group-item text-bg-warning" style="font-size: 11px">Alias: ${hero.biography.aliases}</li>
                        </ul>
                        
                    </div>
                </div>
            </div>
            `;
		return card;
	}
	function cleanHeroArray() {
		heroStats_arr = [];
	}

	function recorrerPowerStats(hero) {
		Object.entries(hero.powerstats).forEach(([key, value]) => {
			let statsHero = {
				label: key,
				y: parseInt(value),
			};
			heroStats_arr.push(statsHero);
			// console.log(heroStats_arr);
		});
	}

	function statsChart(hero) {
		var options = {
			theme: 'dark2',
			title: {
				text: `Estadísticas de ${hero.name}`,
			},
			data: [
				{
					type: 'pie',
					startAngle: 45,
					showInLegend: 'true',
					legendText: '{label}',
					indexLabel: '{label} ({y})',
					dataPoints: heroStats_arr,
				},
			],
		};
		$('#chartContainer').CanvasJSChart(options);
	}
	
});