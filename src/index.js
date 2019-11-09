const $ = require('jquery');
window.jQuery = $

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


getOwners().then((owners) => {
	owners.forEach(({id, businessId, firstName, lastName}) => {
		console.log(`id#${id} - ${businessId} - ${firstName} - ${lastName}`);
	});
}).catch((error) => {
	alert('Oh no! Something went wrong.\nCheck the console for details.')
	console.log(error);
});

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
	html += '<a href="#" class="card-link"> Learn More</a>';
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