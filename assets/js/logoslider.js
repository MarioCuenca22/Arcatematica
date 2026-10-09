// Carrusel de logos del pie. Se para al pasar el ratón o tocarlo
// y vuelve a moverse 1 segundo después.
(function () {

	var RESUME_DELAY = 1000;

	function setup(list) {

		if (list.children.length < 2)
			return;

			var slider = document.createElement('div');

			slider.className = 'logo-slider';
			list.parentNode.insertBefore(slider, list);
			slider.appendChild(list);

		// Los logos se duplican para que el bucle no dé saltos.
			var originals = Array.prototype.slice.call(list.children);

			originals.forEach(function (item) {

				var clone = item.cloneNode(true);

				clone.setAttribute('aria-hidden', 'true');
				list.appendChild(clone);

			});

		// Pausa al pasar por encima, hacer clic o tocar.
			var timer = null,
				hovering = false;

			function resume() {

				timer = null;

				if (hovering)
					return;

				slider.classList.remove('is-paused');

			}

			function pause() {

				slider.classList.add('is-paused');

				if (timer)
					clearTimeout(timer);

				timer = setTimeout(resume, RESUME_DELAY);

			}

			slider.addEventListener('mouseenter', function () {

				hovering = true;
				pause();

			});

			slider.addEventListener('mouseleave', function () {

				hovering = false;
				pause();

			});
			slider.addEventListener('click', pause);
			slider.addEventListener('focusin', pause);
			slider.addEventListener('touchstart', pause, { passive: true });

	}

	function init() {

		var lists = document.querySelectorAll('#footer .footer-certs');

		Array.prototype.forEach.call(lists, setup);

	}

	if (document.readyState === 'loading')
		document.addEventListener('DOMContentLoaded', init);
	else
		init();

})();
