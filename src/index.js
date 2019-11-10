// const $ = require('jquery');
//
// window.jQuery = $

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery-ui/ui/widgets/autocomplete.js'
import {business, owner} from '../db.json';

const {getBusinesses, getOwners} = require('./api.js');
const {googleMapsKey, twilioSid, twilioAuth, twilioToNumber, twilioFromNumber} = require('./keys')

console.log("in index");

var businessList = business;

var ownerList = owner;

console.log(businessList);
console.log(ownerList);


$(document).on('click', '#add-business', function () {
	console.log("add btn");
})


$('.carousel').carousel({
    interval: 4000
});

function renderBusinessCards(){
	var html ='<div class="row">'
	businessList.forEach(function (business) {
		// html += createBusinessCardHtml(business)
		html += createLongBusinessCard(business)

	});
	html += '</div>';

    $("#search-results").html(html);

}

renderBusinessCards();

function renderFilteredBusinessCards(filteredBusinessList){
	var html ='<div class="row">'
	filteredBusinessList.forEach(function (business) {
		// html += createBusinessCardHtml(business)
		html += createLongBusinessCard(business)
	});
	html += '</div>';


    $("#search-results").html(html);

}

// getBusinesses().then((businesses) => {
// 	businesses.forEach(({id, name, address}) => {
// 		console.log(`id#${id} - ${name} - ${address}`);
// 	});
// }).catch((error) => {
// 	alert('Oh no! Something went wrong.\nCheck the console for details.')
// 	console.log(error);
// });


function filterBusinesses(userSearchInput){

    var filteredBusinesses = [];

    businessList.forEach(function (business) {
        if((business.name.toLowerCase()).includes(userSearchInput) ||(business.category.toLowerCase()).includes(userSearchInput) || (business.affiliation.toLowerCase()).includes(userSearchInput)){
            filteredBusinesses.push(business)
        }
    })

    return filteredBusinesses
}

$("#user-search-input").on("keyup" , function (event) {
    event.preventDefault();
    var userSearchInput = ($("#user-search-input").val()).toLowerCase();
    console.log(userSearchInput);
    console.log(userSearchInput.length);

    var filteredBusinesses = filterBusinesses(userSearchInput)

    if(filteredBusinesses.length > 0) {
        renderFilteredBusinessCards(filteredBusinesses)
    } else {
        var html = "Sorry, no results!";
        $("#search-results").html(html);
    }

})

function createLongBusinessCard(business){
	var html = "";

	html += '<div class="card col-xs-12 w-100 mb-5 shadow bg-white rounded">';
	html += '<div class="card-header" id="directory-c-header">';
	html += '<h3>'+ business.name+'<span class="float-right"><img style="height: 50px" src="img/'+business.affiliationLogoUrl +'" alt=""></span></h3>';
	html += '</div>';
	html += '<div class="card-body">';
	html += '<div class="row">';

	html += '<div class="col-xs-12 col-md-3 text-center">';
	html += '<img style="width: 12.5em; height: 12.5em; object-fit: cover" src="img/'+ business.imageUrl +'" alt="...">';

	html += '</div>';

	html += '<div class="col-xs-12 col-md-9">';
		html += '<h4 class="card-subtitle mb-2 text-muted">'+ business.firstName + " " + business.lastName + ' - ' + business.affiliation +'</h4>';

	html += '<p class="card-text">'+ business.description +'</p>';
	// html += '<a href="" class="btn btn-primary" id="class-link" data-id="'+business.id +'">Learn More</a>';
	// html += '<a id="long-card-learn-more" href="" class="card-link" data-id="'+business.id +'"> Learn More</a>';
	html += '<button id="long-card-learn-more" type="button" class="btn btn-link card-link" data-id="'+ business.id+'">Learn More</button>'
	html += '</div>';
	html += '</div>';
	html += '</div>';
	html += '</div>';


	return html
}


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



$('.card-link').on("click", function(event){
    event.preventDefault()
    var businessId = $(this).attr("data-id")
    var queryString = $.param({id: businessId})
    window.location.replace("/profile.html?" + queryString);
})


$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)')
        .exec(window.location.search);

    return (results !== null) ? results[1] || 0 : false;
}

var profileBusinessId = $.urlParam('id')
var profileBusiness = businessList[profileBusinessId-1];


function createProfilePage(){
    //Creates the profile business name
    $('#profile-title').html(profileBusiness.name)

    //renders page header image
    renderPageHeaderImage();

    //renders profile page details
    renderProfileDetails();
}

createProfilePage();

function createEmbedMapString(stringInput){
    stringInput = stringInput.replace(/\s+/g, '')
    return stringInput.replace(/\s+/g, '%')
}

function createPageHeaderHtml(){
    var pageHeaderHtml = "";
    pageHeaderHtml += '<div class="page-header">';
    pageHeaderHtml += '<div class="container">';
    pageHeaderHtml += '<div class="row">';
    pageHeaderHtml += '<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">';
    pageHeaderHtml += '<div class="page-caption">';
    pageHeaderHtml += '<h1 class="page-title"></h1>';
    pageHeaderHtml += '</div>';
    pageHeaderHtml += '</div>';
    pageHeaderHtml += '</div>';
    pageHeaderHtml += '</div>';
    pageHeaderHtml += '</div>';

    return pageHeaderHtml
}

function renderPageHeaderImage(){
    var pageHeaderHtml = createPageHeaderHtml();

    $('#page-header').html(pageHeaderHtml).css({'background-image': 'url(img/'+profileBusiness.imageUrl+')', 'background-size': 'cover', 'max-width': '100%', 'height': '35%', 'background-position':'center' });
}

function createProfileHtml(){
    var businessHtml = "";
    // businessHtml += '<ol class="breadcrumb">'
    // businessHtml += '<li class="breadcrumb-item">'
    // businessHtml += '<a href="directory.html">Home</a>'
    // businessHtml += '</li>'
    // businessHtml += '<li class="breadcrumb-item active">Portfolio Item</li>'
    // businessHtml += '</ol>'
    businessHtml += '<h1 class="mt-4 mb-3 text-center display-4" id="">' + profileBusiness.name + ' ';
    businessHtml += '</h1>';
    businessHtml += '<div class="row">';
    businessHtml += '<div class="col-lg-6 col-sm-12 text-center">';
    // businessHtml += '<img class="img-fluid" src="img/'+ profileBusiness.imageUrl +'" alt="">'
    businessHtml += '<iframe width="500" height="450" frameborder="0"' +
        ' style="border:0" src="https://www.google.com/maps/embed/v1/place?q='+ createEmbedMapString(profileBusiness.address) +'&key='+ googleMapsKey +'" allowfullscreen></iframe>';
    businessHtml += '</div>';
    businessHtml += '<div class="col-lg-6 col-sm-12">';
    businessHtml += '<h3 class="my-3"><img id="affiliation-logo" src="img/'+ profileBusiness.affiliationLogoUrl +'" alt=""> '+profileBusiness.firstName + ' ' + profileBusiness.lastName + ' - <span>'+ profileBusiness.affiliation +'</span></h3>';
    // businessHtml += '<p>'+ profileBusiness.affiliation +'</p>'

    businessHtml += '<p>'+ profileBusiness.description +'</p>';
    businessHtml += '<hr>';
    businessHtml += '<ul id="project-dets-list">';
    businessHtml += '<li><strong>Address: </strong>'+ profileBusiness.address + '</li>';
    businessHtml += '<li><strong>Phone: </strong>'+ profileBusiness.phone + '</li>';
    businessHtml += '<li><strong>Website: </strong><a target="_blank" href="'+ profileBusiness.website +'">'+ profileBusiness.website + '</a></li>';
    businessHtml += '</ul>';
	businessHtml += '<hr>';
	businessHtml += '<div class="row text-center"><div class="col"><i' +
        ' class="fab fa-instagram fa-3x"></i></div><div' +
        ' class="col"><i class="fab' +
        ' fa-facebook-square fa-3x"></i></div><div' +
        ' class="col"><i class="fab fa-yelp fa-3x"></i></div><div' +
        ' class="col"><i class="fab fa-twitter-square' +
        ' fa-3x"></i></div></div><br>';
	businessHtml += '<button type="button" id="send-info-btn" class="btn' +
        ' btn-primary btn-block">Send Info</button>';


	businessHtml += '</div>';
    businessHtml += '</div>';

    return businessHtml;
}

function renderProfileDetails(){
    var businessHtml = createProfileHtml()
    $("#profile-container").html(businessHtml)
}

$("#send-info-btn").on("click", function () {
	console.log(profileBusiness);
	sendSms(profileBusiness);
})

function sendSms(info){
	console.log("sending sms");
	var SID = twilioSid
	var Key = twilioAuth

	var bodyHtml = "Thank you for using VB Book: Here is your requested info! " + info.name + " - " + info.phone + " - " + info.website;

	$.ajax({
		type: 'POST',
		url: 'https://api.twilio.com/2010-04-01/Accounts/' + SID + '/Messages.json',
		data: {
			"To" : twilioToNumber,
			"From" : twilioFromNumber,
			"Body" : '"'+ bodyHtml + '"'
		},
		beforeSend: function (xhr) {
			xhr.setRequestHeader ("Authorization", "Basic " + btoa(SID + ':' + Key));
		},
		success: function(data) {
			console.log(data);
		},
		error: function(data) {
			console.log(data);
		}
	});
};

