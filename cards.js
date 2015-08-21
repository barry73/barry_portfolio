var poposDictionary = {};

function fetchData() {

	var rawTemplate = $('#thumbnail-template').html();

	$.get('https://barryophotos.firebaseio.com/photoportfolio.json', function(popos) {

		for (var i = 0; i < popos.length; i++) {
			var currentPopos = popos[i];
			var stampedTemplate = Mustache.render(rawTemplate, currentPopos);
			$('#cards-container').append(stampedTemplate);
  	};

    buildDictionary(popos);
    bindEventListeners();
    // Stamp out our cards here.

 
  });
}

function bindEventListeners()	{

	$('.card').click(function(e) {
		var targetId = e.target.id;
		var info = poposDictionary[targetId];

		var rawTemplate = $('#lightbox-template').html();
		var stampedTemplate = Mustache.render(rawTemplate, info);

		$('#lightbox-container').html(stampedTemplate);
		$('#lightbox-container').fadeIn();
		$('#mask').fadeIn();
	});

	$('#mask').click(function() {
		$('#lightbox-container').fadeOut();
		$('#mask').fadeOut();
	});
	
}

// somebody clicked a card
function buildDictionary(popos) {
  for (var i = 0; i < popos.length; i++) {
    var currentPopos = popos[i];
    poposDictionary[currentPopos.id] = currentPopos;
  }
}

fetchData();
