// Formulario de contacto. Para que envíe, hay que poner la URL del servicio
// de formularios en el action del <form> (ahora es "#" y muestra un error).
(function() {

	var form = document.querySelector('#contact form');

	if (!form)
		return;

	var status = document.getElementById('form-status'),
		submit = form.querySelector('input[type="submit"]'),
		texts = {
			ca: {
				sending: 'Enviant el missatge…',
				ok: 'Missatge enviat. Us respondrem el més aviat possible.',
				error: 'No s\'ha pogut enviar el missatge. Torneu-ho a provar o escriviu a arcatematica@gmail.com.'
			},
			es: {
				sending: 'Enviando el mensaje…',
				ok: 'Mensaje enviado. Le responderemos lo antes posible.',
				error: 'No se ha podido enviar el mensaje. Inténtelo de nuevo o escriba a arcatematica@gmail.com.'
				},
				en: {
					sending: 'Sending message…',
					ok: 'Message sent. We will reply as soon as possible.',
					error: 'The message could not be sent. Please try again or write to arcatematica@gmail.com.'
			}
		},
		t = texts[texts[document.documentElement.lang] ? document.documentElement.lang : 'ca'];

	function show(type, message) {
		status.className = 'form-status ' + type;
		status.textContent = message;
	}

	form.addEventListener('submit', function(e) {

		e.preventDefault();

		if (!form.reportValidity())
			return;

		var endpoint = form.getAttribute('action');

		if (!endpoint || endpoint === '#') {
			show('error', t.error);
			return;
		}

		submit.disabled = true;
		show('sending', t.sending);

		fetch(endpoint, {
			method: 'POST',
			body: new FormData(form),
			headers: { 'Accept': 'application/json' }
		})
			.then(function(res) {
				if (!res.ok)
					throw new Error(res.status);
				form.reset();
				show('ok', t.ok);
			})
			.catch(function() {
				show('error', t.error);
			})
			.then(function() {
				submit.disabled = false;
			});

	});

	form.addEventListener('reset', function() {
		status.className = 'form-status';
		status.textContent = '';
	});

})();
