// const $ = require('jquery');
//
// window.jQuery = $

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery-ui/ui/widgets/autocomplete.js'

import {business, owner} from '../db.json';


const {getBusinesses, getOwners} = require('./api.js');
console.log("in index");

var businessList = business
var ownerList = owner;

console.log(businessList);
console.log(ownerList);

$('.carousel').carousel({
	interval: 4000
});

function renderBusinessCards(){
	var html ='<div class="row">'
	businessList.forEach(function (business) {
		html += createBusinessCardHtml(business)
	});
	html += '</div>';

	$("#search-results").html(html);

}

renderBusinessCards();


function renderFilteredBusinessCards(filteredBusinessList){
	var html ='<div class="row">'
	filteredBusinessList.forEach(function (business) {
		html += createBusinessCardHtml(business)
	});
	html += '</div>';

	$("#search-results").html(html);

}

getBusinesses().then((businesses) => {
	businesses.forEach(({id, name, address}) => {
		console.log(`id#${id} - ${name} - ${address}`);
	});
}).catch((error) => {
	alert('Oh no! Something went wrong.\nCheck the console for details.')
	console.log(error);
});


// getOwners().then((owners) => {
// 	owners.forEach(({id, businessId, firstName, lastName}) => {
// 		console.log(`id#${id} - ${businessId} - ${firstName} - ${lastName}`);
// 	});
// }).catch((error) => {
// 	alert('Oh no! Something went wrong.\nCheck the console for details.')
// 	console.log(error);
// });

// $("#main-search").on('click', function (event) {
//   event.preventDefault();
//   console.log("main search button clicked");
//   var userSearchInput = ($("#user-search-input").val()).toLowerCase();
//   console.log(userSearchInput);
//
//   var filteredBusinesses = [];
//
//   businessList.forEach(function (business) {
//     if((business.name.toLowerCase()).includes(userSearchInput) ||(business.category.toLowerCase()).includes(userSearchInput)){
//       filteredBusinesses.push(business)
//     }
//   })
//
//   console.log(filteredBusinesses);
//
//
// })

$("#user-search-input").on("keyup" , function (event) {
	event.preventDefault();
	var userSearchInput = ($("#user-search-input").val()).toLowerCase();
	console.log(userSearchInput);
	console.log(userSearchInput.length);

	var filteredBusinesses = [];

	businessList.forEach(function (business) {
		if((business.name.toLowerCase()).includes(userSearchInput) ||(business.category.toLowerCase()).includes(userSearchInput) || (business.affiliation.toLowerCase()).includes(userSearchInput)){
			filteredBusinesses.push(business)
		}
	})

	console.log(filteredBusinesses);
	if(filteredBusinesses.length > 0) {
		renderFilteredBusinessCards(filteredBusinesses)
	} else {
		var html = "Sorry, no results!";
		$("#search-results").html(html);
	}




})


function createBusinessCardHtml(business){
	var html = "";
	html += '<div class="col-xs-4 mx-auto mt-5">';
	html += '<div class="card h-100" style="width: 18rem;">';
	html += '<img class="card-img-top" src="img/'+ business.imageUrl+'" alt="Card image cap">';
	html += '<div class="card-body">';
	html += '<h5 class="card-title">'+ business.name +'</h5>';
	html += '<h6 class="card-subtitle mb-2 text-muted">'+ business.firstName + " " + business.lastName +'</h6>';
	html += '<h6 class="card-subtitle mb-2 text-muted">'+ business.affiliation +'</h6>';
	html += '<p class="card-text">'+ business.description +'</p>';
	html += '</div>';
	html += '<div class="card-body text-center">';
	html += '<a href="" class="card-link" data-id="'+business.id +'"> Learn More</a>';
	html += '</div>';
	html += '</div>';
	html += '</div>';

	return html
}

function createBusinessTable(){

}

//
// var availableTags = [
//   "ActionScript",
//   "AppleScript",
//   "Asp",
//   "BASIC",
//   "C",
//   "C++",
//   "Clojure",
//   "COBOL",
//   "ColdFusion",
//   "Erlang",
//   "Fortran",
//   "Groovy",
//   "Haskell",
//   "Java",
//   "JavaScript",
//   "Lisp",
//   "Perl",
//   "PHP",
//   "Python",
//   "Ruby",
//   "Scala",
//   "Scheme"
// ];
//
// $( "#tags" ).autocomplete({
//   source: availableTags
// });



$('.card-link').on("click", function(event){
	event.preventDefault()
	console.log("card link button clicked");
	var businessId = $(this).attr("data-id")
	console.log(businessId);
	var selectedBusinessObject = businessList[businessId - 1];

	var queryString = $.param({id: businessId})

	window.location.replace("/profile.html?" + queryString);





	// $().redirect('/profile.html', selectedBusinessObject)
	// $("#test-container").html("test test test")


	// $.ajax({
	// 	type: "GET",
	// 	url: "/api/business",
	// 	data: businessId,
	// 	dataType: "json",
	// 	success: function(data, textStatus) {
	// 			// data.redirect contains the string URL to redirect to
	//
	// 		console.log(data);
	// 		window.location.href = "/profile.html";
	//
	// 	}
	// });


})


$.urlParam = function (name) {
	var results = new RegExp('[\?&]' + name + '=([^&#]*)')
		.exec(window.location.search);

	return (results !== null) ? results[1] || 0 : false;
}

var profileBusinessId = $.urlParam('id')

var profileBusiness = businessList[profileBusinessId-1];
console.log(profileBusiness);
var businessAddress = profileBusiness.address

// var geocoder = new google.maps.Geocoder();
// geocoder.geocode( { 'address': businessAddress}, function(results, status) {
// 	if (status == 'OK') {
// 		console.log(results);
// 		// map.setCenter(results[0].geometry.location);
// 		// var marker = new google.maps.Marker({
// 		// 	map: map,
// 		// 	position: results[0].geometry.location
// 		// });
// 	} else {
// 		alert('Geocode was not successful for the following reason: ' + status);
// 	}
// });


// googleMapsClient.geocode({
// 	address: '1600 Amphitheatre Parkway, Mountain View, CA'
// }, function(err, response) {
// 	if (!err) {
// 		console.log(response.json.results);
// 	}
// });

$('#profile-title').html(profileBusiness.name)

var businessHtml = "";
businessHtml += '<ol class="breadcrumb">'
businessHtml += '<li class="breadcrumb-item">'
businessHtml += '<a href="directory.html">Home</a>'
businessHtml += '</li>'
businessHtml += '<li class="breadcrumb-item active">Portfolio Item</li>'
businessHtml += '</ol>'
businessHtml += '<h1 class="mt-4 mb-3" id="">' + profileBusiness.name + ' ';
// businessHtml += '<small>'+ profileBusiness.firstName + ' ' + profileBusiness.lastName  +'</small>'
businessHtml += '</h1>'
businessHtml += '<div class="row">'
businessHtml += '<div class="col-md-6">'
businessHtml += '<img class="img-fluid" src="img/'+ profileBusiness.imageUrl +'" alt="">'
businessHtml += '<div id="map" style="width: 320px; height: 480px;"></div>';
businessHtml += '</div>'
businessHtml += '<div class="col-md-6">'
businessHtml += '<h3 class="my-3"><img id="affiliation-logo" src="img/'+ profileBusiness.affiliationLogoUrl +'" alt=""> '+profileBusiness.firstName + ' ' + profileBusiness.lastName + ' - <span>'+ profileBusiness.affiliation +'</span></h3>'
// businessHtml += '<p>'+ profileBusiness.affiliation +'</p>'

businessHtml += '<p>'+ profileBusiness.description +'</p>'
businessHtml += '<hr>'
businessHtml += '<ul id="project-dets-list">'
businessHtml += '<li><strong>Address: </strong>'+ profileBusiness.address + '</li>'
businessHtml += '<li><strong>Phone: </strong>'+ profileBusiness.phone + '</li>'
businessHtml += '<li><strong>Website: </strong><a target="_blank" href="'+ profileBusiness.website +'">'+ profileBusiness.website + '</a></li>'
businessHtml += '</ul>'
businessHtml += '</div>'
businessHtml += '</div>'

$("#profile-container").html(businessHtml)