$(document).ready(function() {

	$("#clearAll").on("click", function () {
		$("#search-result").empty();
	});

	$("#search").on("click", function (event) {

		$("#search-result").empty();
		
		event.preventDefault();

		var input = $("#search-input").val().trim();
		var limit = $("#search-limit").val();
		var startYear = $("#search-startYear").val().trim() + "0101";
		var endYear = $("#search-endYear").val().trim() + "0101";

		var apiKey = "363a9df561ad4ff38619a427376c4648";
		var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
		url += '?' + $.param({
			'api-key': apiKey,
			'q' : input, 
			'begin_date' : startYear,
			'end_date' : endYear 
		});
		$.ajax({
			url: url,
			method: 'GET',
		}).done(function(result) {

			var results = result.response.docs;

			for (var i = 0; i < parseInt(limit); i++) {
				var container = $("<div id=\"rowResult\" class=\"well\">");
				var title = $("<h3>").text(results[i].headline.main);
				var pubDate = $("<p>").text(results[i].pub_date.slice(0,10));
				var sectionName = $("<p>").text(results[i].section_name);				
				var articleURL = $("<a>").attr("href", results[i].web_url).text(results[i].web_url);

				container.append(title);
				container.append(pubDate);
				container.append(sectionName);
				container.append(articleURL);		

				container.append("<hr>");

				$("#search-result").append(container);


			}
		});
	});
});